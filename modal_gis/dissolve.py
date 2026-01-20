"""
SAGE GIS Processing Tools - Modal Functions

Serverless geoprocessing using GeoPandas on Modal.
These functions can be called from the SAGE MCP server.

Deploy: modal deploy modal_gis/dissolve.py
Test:   modal run modal_gis/dissolve.py::test_dissolve
"""

import modal
import json
import hashlib
from typing import Optional

# Define the Modal app
app = modal.App("sage-gis-tools")

# Build image with GeoPandas and dependencies
geopandas_image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install(
        "libgdal-dev",
        "libgeos-dev",
        "libproj-dev",
        "gdal-bin",
        "unzip",
    )
    .pip_install(
        "geopandas>=0.14.0",
        "pyproj>=3.6.0",
        "shapely>=2.0.0",
        "requests>=2.31.0",
        "fiona>=1.9.0",
        "fastapi",  # Required for web endpoints
    )
)

# Vercel Blob secret (set via: modal secret create vercel-blob BLOB_READ_WRITE_TOKEN=xxx)
vercel_secret = modal.Secret.from_name("vercel-blob", required_keys=["BLOB_READ_WRITE_TOKEN"])


# Core dissolve logic - not a Modal function, can be called directly
def _dissolve_layer_impl(
    input_url: str,
    dissolve_field: str,
    output_fields: Optional[list[str]] = None,
    simplify_tolerance: Optional[float] = 0.0001,
    agg_funcs: Optional[dict[str, str]] = None,
) -> dict:
    """
    Download a zipped shapefile/geodatabase, dissolve by field, return GeoJSON.

    Args:
        input_url: URL to zipped shapefile or file geodatabase
        dissolve_field: Field to dissolve by (e.g., "f_school", "desc_fire")
        output_fields: Fields to include in output (default: dissolve field only)
        simplify_tolerance: Geometry simplification in degrees (None to skip)
        agg_funcs: Aggregation functions for fields, e.g., {"acres": "sum", "valland": "sum"}

    Returns:
        dict with geojson string, stats, and field info
    """
    import geopandas as gpd
    import tempfile
    import zipfile
    import requests
    from pathlib import Path

    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir = Path(tmpdir)

        # Download the zip file
        print(f"Downloading: {input_url}")
        zip_path = tmpdir / "input.zip"
        response = requests.get(input_url, timeout=120, stream=True)
        response.raise_for_status()

        # Stream to file (handles large downloads)
        with open(zip_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"Downloaded: {zip_path.stat().st_size / 1024 / 1024:.1f} MB")

        # Extract
        extract_dir = tmpdir / "extracted"
        extract_dir.mkdir()

        with zipfile.ZipFile(zip_path, 'r') as z:
            z.extractall(extract_dir)

        # Find readable file (.shp or .gdb)
        shp_files = list(extract_dir.rglob("*.shp"))
        gdb_dirs = list(extract_dir.rglob("*.gdb"))

        if shp_files:
            input_path = shp_files[0]
            print(f"Reading shapefile: {input_path.name}")
        elif gdb_dirs:
            input_path = gdb_dirs[0]
            print(f"Reading geodatabase: {input_path.name}")
            # For GDB, we need to list layers and pick one
            import fiona
            layers = fiona.listlayers(input_path)
            print(f"Available layers: {layers}")
            input_path = f"{input_path}"  # fiona/geopandas handle GDB path
        else:
            raise ValueError(f"No .shp or .gdb found. Contents: {list(extract_dir.rglob('*'))}")

        # Read the data
        gdf = gpd.read_file(input_path)
        original_count = len(gdf)
        original_crs = gdf.crs
        available_fields = [c for c in gdf.columns if c != 'geometry']

        print(f"Loaded {original_count} features with CRS {original_crs}")
        print(f"Available fields: {available_fields}")

        # Validate dissolve field exists
        if dissolve_field not in gdf.columns:
            return {
                "error": f"Field '{dissolve_field}' not found",
                "available_fields": available_fields,
                "sample_values": {f: gdf[f].head(3).tolist() for f in available_fields[:10]}
            }

        # Dissolve
        print(f"Dissolving by '{dissolve_field}'...")
        if agg_funcs:
            dissolved = gdf.dissolve(by=dissolve_field, aggfunc=agg_funcs, as_index=False)
        else:
            # No aggregation - just dissolve geometries
            dissolved = gdf.dissolve(by=dissolve_field, as_index=False)

        print(f"Dissolved to {len(dissolved)} features")

        # Simplify geometry if requested
        if simplify_tolerance and simplify_tolerance > 0:
            # Need to simplify in a projected CRS for accuracy, then back to WGS84
            if dissolved.crs and not dissolved.crs.is_projected:
                # Project to UTM zone 10N (covers Solano County)
                dissolved_proj = dissolved.to_crs("EPSG:32610")
                # Convert tolerance from degrees to meters (rough: 1 degree ≈ 111km)
                tolerance_meters = simplify_tolerance * 111000
                dissolved_proj['geometry'] = dissolved_proj.geometry.simplify(tolerance_meters)
                dissolved = dissolved_proj.to_crs("EPSG:4326")
            else:
                dissolved['geometry'] = dissolved.geometry.simplify(simplify_tolerance)

        # Ensure output is WGS84 for GeoJSON compatibility
        if dissolved.crs and dissolved.crs != "EPSG:4326":
            dissolved = dissolved.to_crs("EPSG:4326")

        # Filter to requested output fields
        if output_fields:
            keep = [dissolve_field] + [f for f in output_fields if f in dissolved.columns]
            keep = list(dict.fromkeys(keep))  # Dedupe while preserving order
            dissolved = dissolved[keep + ['geometry']]

        # Convert datetime columns to strings (fixes JSON serialization)
        import pandas as pd
        for col in dissolved.columns:
            if col != 'geometry':
                if pd.api.types.is_datetime64_any_dtype(dissolved[col]):
                    dissolved[col] = dissolved[col].astype(str)
                elif dissolved[col].dtype == 'object':
                    # Check for Timestamp objects in object columns
                    sample = dissolved[col].dropna().head(1)
                    if len(sample) > 0 and isinstance(sample.iloc[0], pd.Timestamp):
                        dissolved[col] = dissolved[col].astype(str)

        # Get unique values for the dissolve field
        unique_values = dissolved[dissolve_field].dropna().unique().tolist()
        # Ensure unique_values are JSON serializable
        unique_values = [str(v) if isinstance(v, pd.Timestamp) else v for v in unique_values]

        # Convert to GeoJSON
        geojson_str = dissolved.to_json()

        return {
            "geojson": geojson_str,
            "stats": {
                "input_features": original_count,
                "output_features": len(dissolved),
                "input_crs": str(original_crs),
                "output_crs": "EPSG:4326",
                "dissolve_field": dissolve_field,
                "unique_values": unique_values[:50],  # Limit for large result sets
                "unique_count": len(unique_values),
            },
            "fields": {
                "available_in_source": available_fields,
                "included_in_output": [c for c in dissolved.columns if c != 'geometry'],
            }
        }


@app.function(image=geopandas_image, timeout=600, memory=4096, secrets=[vercel_secret])
def dissolve_and_store(
    input_url: str,
    dissolve_field: str,
    output_fields: Optional[list[str]] = None,
    simplify_tolerance: Optional[float] = 0.0001,
    agg_funcs: Optional[dict[str, str]] = None,
    output_name: Optional[str] = None,
) -> dict:
    """
    Dissolve a layer and upload result to Vercel Blob storage.

    Returns URL to the stored GeoJSON file.
    """
    import os
    import requests

    # Run the dissolve
    result = _dissolve_layer_impl(
        input_url=input_url,
        dissolve_field=dissolve_field,
        output_fields=output_fields,
        simplify_tolerance=simplify_tolerance,
        agg_funcs=agg_funcs,
    )

    if "error" in result:
        return result

    # Generate filename
    if output_name:
        filename = f"gis/{output_name}.geojson"
    else:
        # Hash-based name for caching
        hash_input = f"{input_url}_{dissolve_field}_{simplify_tolerance}"
        file_hash = hashlib.md5(hash_input.encode()).hexdigest()[:8]
        filename = f"gis/dissolved_{dissolve_field}_{file_hash}.geojson"

    # Upload to Vercel Blob
    blob_token = os.environ["BLOB_READ_WRITE_TOKEN"]

    print(f"Uploading to Vercel Blob: {filename}")

    upload_response = requests.put(
        f"https://blob.vercel-storage.com/{filename}",
        headers={
            "Authorization": f"Bearer {blob_token}",
            "Content-Type": "application/geo+json",
            "x-api-version": "7",
            "x-content-type": "application/geo+json",
        },
        data=result["geojson"],
    )

    if not upload_response.ok:
        return {
            "error": f"Blob upload failed: {upload_response.status_code}",
            "detail": upload_response.text,
            "stats": result["stats"],
        }

    blob_data = upload_response.json()

    return {
        "output_url": blob_data.get("url"),
        "stats": result["stats"],
        "fields": result["fields"],
    }


# === Web Endpoints for MCP Integration ===

@app.function(image=geopandas_image, timeout=600, memory=4096)
@modal.fastapi_endpoint(method="POST", docs=True)
def dissolve_api(data: dict) -> dict:
    """
    HTTP endpoint: Dissolve a shapefile and return GeoJSON.

    POST body:
    {
        "input_url": "https://...Parcels_Public_Aumentum_Shapefiles.zip",
        "dissolve_field": "f_school",
        "simplify_tolerance": 0.0001,
        "output_fields": ["desc_fire", "acres"]  // optional
    }
    """
    try:
        # Call the implementation directly
        return _dissolve_layer_impl(
            input_url=data["input_url"],
            dissolve_field=data["dissolve_field"],
            output_fields=data.get("output_fields"),
            simplify_tolerance=data.get("simplify_tolerance", 0.0001),
            agg_funcs=data.get("agg_funcs"),
        )
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}


@app.function(image=geopandas_image, timeout=600, memory=4096, secrets=[vercel_secret])
@modal.fastapi_endpoint(method="POST", docs=True)
def dissolve_and_store_api(data: dict) -> dict:
    """
    HTTP endpoint: Dissolve and store result in Vercel Blob.

    POST body:
    {
        "input_url": "https://...Parcels_Public_Aumentum_Shapefiles.zip",
        "dissolve_field": "f_school",
        "output_name": "school_districts"  // optional custom name
    }

    Returns:
    {
        "output_url": "https://....vercel-storage.com/gis/school_districts.geojson",
        "stats": {...}
    }
    """
    import os
    import requests as http_requests

    # Run the dissolve
    result = _dissolve_layer_impl(
        input_url=data["input_url"],
        dissolve_field=data["dissolve_field"],
        output_fields=data.get("output_fields"),
        simplify_tolerance=data.get("simplify_tolerance", 0.0001),
        agg_funcs=data.get("agg_funcs"),
    )

    if "error" in result:
        return result

    # Generate filename
    output_name = data.get("output_name")
    if output_name:
        filename = f"gis/{output_name}.geojson"
    else:
        hash_input = f"{data['input_url']}_{data['dissolve_field']}_{data.get('simplify_tolerance', 0.0001)}"
        file_hash = hashlib.md5(hash_input.encode()).hexdigest()[:8]
        filename = f"gis/dissolved_{data['dissolve_field']}_{file_hash}.geojson"

    # Upload to Vercel Blob
    blob_token = os.environ["BLOB_READ_WRITE_TOKEN"]

    upload_response = http_requests.put(
        f"https://blob.vercel-storage.com/{filename}",
        headers={
            "Authorization": f"Bearer {blob_token}",
            "Content-Type": "application/geo+json",
            "x-api-version": "7",
            "x-content-type": "application/geo+json",
        },
        data=result["geojson"],
    )

    if not upload_response.ok:
        return {
            "error": f"Blob upload failed: {upload_response.status_code}",
            "detail": upload_response.text,
            "stats": result["stats"],
        }

    blob_data = upload_response.json()

    return {
        "output_url": blob_data.get("url"),
        "stats": result["stats"],
        "fields": result["fields"],
    }


@app.function(image=geopandas_image, timeout=300)
@modal.fastapi_endpoint(method="POST", docs=True)
def inspect_layer(data: dict) -> dict:
    """
    Inspect a shapefile to see available fields and sample data.

    POST body:
    {
        "input_url": "https://...Parcels_Public_Aumentum_Shapefiles.zip"
    }
    """
    import geopandas as gpd
    import tempfile
    import zipfile
    import requests
    from pathlib import Path

    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir = Path(tmpdir)

        # Download
        zip_path = tmpdir / "input.zip"
        response = requests.get(data["input_url"], timeout=120, stream=True)
        response.raise_for_status()

        with open(zip_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        # Extract
        extract_dir = tmpdir / "extracted"
        extract_dir.mkdir()

        with zipfile.ZipFile(zip_path, 'r') as z:
            z.extractall(extract_dir)

        # Find and read
        shp_files = list(extract_dir.rglob("*.shp"))
        gdb_dirs = list(extract_dir.rglob("*.gdb"))

        if shp_files:
            gdf = gpd.read_file(shp_files[0])
        elif gdb_dirs:
            gdf = gpd.read_file(gdb_dirs[0])
        else:
            return {"error": "No readable GIS file found"}

        # Analyze fields
        fields_info = {}
        for col in gdf.columns:
            if col == 'geometry':
                continue

            dtype = str(gdf[col].dtype)
            non_null = gdf[col].notna().sum()
            unique_count = gdf[col].nunique()

            # Sample values (for potential dissolve fields)
            if unique_count <= 50:
                unique_vals = gdf[col].dropna().unique().tolist()[:20]
            else:
                unique_vals = gdf[col].dropna().head(5).tolist()

            fields_info[col] = {
                "dtype": dtype,
                "non_null": int(non_null),
                "unique_count": int(unique_count),
                "sample_values": unique_vals,
                "good_for_dissolve": unique_count <= 100 and unique_count > 1,
            }

        # Identify best dissolve candidates
        dissolve_candidates = [
            f for f, info in fields_info.items()
            if info["good_for_dissolve"]
        ]

        return {
            "feature_count": len(gdf),
            "crs": str(gdf.crs),
            "geometry_type": gdf.geometry.geom_type.iloc[0] if len(gdf) > 0 else None,
            "bounds": gdf.total_bounds.tolist(),
            "fields": fields_info,
            "dissolve_candidates": dissolve_candidates,
        }


# === Local Testing ===

@app.local_entrypoint()
def test_dissolve():
    """Test the dissolve function locally."""

    # Test with Solano County parcels - dissolve by fire district
    parcels_url = "https://solanocountysftpsa.blob.core.windows.net/solano-county-ca-gis-public-sftp/root/Parcels_Public_Aumentum_GIS/Parcels_Public_Aumentum_Shapefiles.zip"

    print("=" * 60)
    print("Testing inspect_layer...")
    print("=" * 60)

    # First inspect to see available fields
    inspect_result = inspect_layer.remote({"input_url": parcels_url})

    print(f"Feature count: {inspect_result.get('feature_count')}")
    print(f"CRS: {inspect_result.get('crs')}")
    print(f"Dissolve candidates: {inspect_result.get('dissolve_candidates')}")

    # Show some field details
    if "fields" in inspect_result:
        print("\nKey fields:")
        for field in ["f_school", "desc_fire", "fund_water", "wa_status", "sitecity"]:
            if field in inspect_result["fields"]:
                info = inspect_result["fields"][field]
                print(f"  {field}: {info['unique_count']} unique values")

    print("\n" + "=" * 60)
    print("Testing dissolve_layer by 'desc_fire'...")
    print("=" * 60)

    # Test dissolve by fire district
    result = dissolve_layer.remote(
        input_url=parcels_url,
        dissolve_field="desc_fire",
        simplify_tolerance=0.0001,
    )

    if "error" in result:
        print(f"Error: {result['error']}")
        print(f"Available fields: {result.get('available_fields')}")
    else:
        print(f"Input features: {result['stats']['input_features']}")
        print(f"Output features: {result['stats']['output_features']}")
        print(f"Unique values: {result['stats']['unique_values']}")

        # Save sample output locally
        with open("/tmp/dissolved_fire_districts.geojson", "w") as f:
            f.write(result["geojson"])
        print(f"\nSaved to /tmp/dissolved_fire_districts.geojson")

    print("\nDone!")
# Force rebuild Tue Jan 20 10:08:21 CST 2026
