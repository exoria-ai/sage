# LiDAR Point Cloud Visualization for Solano County

## Project Overview

This document explores options for implementing web-based 3D LiDAR point cloud visualization for Solano County using the recently acquired USGS 3DEP LiDAR data.

## Data Source: USGS 3DEP Solano County LiDAR (2022-2023)

### Dataset Specifications

| Attribute | Value |
|-----------|-------|
| **Project ID** | CA_SolanoCounty_A23 |
| **Collection Period** | December 26, 2022 – February 14, 2023 |
| **Total Points** | 43.6 billion (43,643,317,040) |
| **Total Tiles** | 3,790 tiles |
| **Tile Size** | 2,640 ft × 2,640 ft each |
| **Coverage Area** | ~905 square miles |
| **Point Density** | 16.6 points/m² aggregate |
| **Nominal Pulse Spacing** | 0.35 meters |
| **Compressed File Size (LAZ)** | **80.6 GB** |
| **Sensor** | Leica TerrainMapper (1,800 Hz pulse rate) |
| **Horizontal CRS** | NAD83(2011), California Zone 2 (US survey feet) |
| **Vertical CRS** | NAVD88 (Geoid18) in US survey feet |

### Data Access

- **USGS Download**: https://rockyweb.usgs.gov/vdelivery/Datasets/Staged/Elevation/LPC/Projects/CA_SolanoCounty_A23/
- **NOAA Metadata**: https://www.fisheries.noaa.gov/inport/item/74845

---

## Option 1: Esri ArcGIS Point Cloud Scene Layer

### Technology Stack

Esri's approach uses the **I3S (Indexed 3D Scene Layer)** format with **SLPK (Scene Layer Package)** files:

- **I3S**: OGC community standard (v1.3) for streaming 3D data
- **SLPK**: File-based storage format for scene layers
- **Point Cloud Scene Layer**: Specialized layer type for LiDAR visualization
- Supports billions of points streamed to web and mobile

### Workflow

1. **Convert LAZ → SLPK** using ArcGIS Pro's "Create Point Cloud Scene Layer Package" tool
2. **Upload SLPK** to ArcGIS Online or ArcGIS Enterprise Portal
3. **Publish** as hosted scene layer
4. **Visualize** in Scene Viewer, ArcGIS Pro, or custom web apps

### Hosting Options

#### A. ArcGIS Online (Cloud Hosted)

**Credit-Based Pricing (2025):**
- Credits cost approximately **$0.10 per credit** ($100 per 1,000 credits)
- Scene layer storage: **1.2 credits per GB per month**
- Scene layer generation: 1 credit per 5,000 point features

**Estimated Costs for Solano LiDAR:**

| Item | Calculation | Monthly Cost |
|------|-------------|--------------|
| Storage (LAZ ~80 GB → SLPK est. ~100-150 GB) | 150 GB × 1.2 credits × $0.10 | ~$18/month |
| Plus scene layer package storage | 150 GB × 1.2 credits × $0.10 | ~$18/month |
| **Total Monthly Storage** | | **~$36/month** |
| **Annual Storage** | | **~$432/year** |

**Note:** SLPK file sizes vary. Point cloud SLPKs can be similar to or larger than source LAZ depending on LOD generation and attribute retention. Actual costs may be 1-2x this estimate.

**Your 200 credits?** Would cover roughly 1-2 months of storage for this dataset. Not viable for personal account hosting.

#### B. ArcGIS Enterprise (On-Premise)

**Requirements:**
- ArcGIS Enterprise Portal 10.5+
- ArcGIS Data Store with **Object Store** (replaces deprecated tile cache data store as of 11.4)
- Minimum 32 GB RAM for object store
- Disk space: 2× the SLPK size for publishing (est. 300+ GB free)

**Advantages:**
- No per-GB storage credits consumed
- Data stays on-premise
- Included in Enterprise license

**Infrastructure Needs:**
- Dedicated server or VM for scene cache data store
- Cloud object store option (AWS S3, Azure Blob) for scalable storage

### Solano County GIS Budget Context (FY2025-26)

Based on the FY2025-26 Recommended Budget, GIS is part of the **Department of Information Technology (DoIT)** under Regional Services. The total DoIT budget is **$48.6 million** with 74 FTE positions.

**GIS-Related Contract Line Items (FY2025-26):**

| Contract | Amount | Notes |
|----------|--------|-------|
| GIS consulting services | $416,000 | General GIS support |
| GIS flyover | $249,000 | Aerial imagery acquisition |
| GIS cloud service (NV5 Geospatial) | $160,000 | Cloud hosting/services |
| **GIS Esri software maintenance** | **$128,000** | Enterprise license |
| GIS derivative products | $96,000 | Value-added products |
| **Total GIS-related** | **$1,049,000** | |

**Key Observations:**
- The **$128,000 Esri software maintenance** confirms an enterprise-level agreement
- **NV5 Geospatial** ($160K) provides cloud GIS services - may already have infrastructure for hosting large datasets
- Active **flyover program** ($249K) suggests ongoing investment in high-resolution imagery/elevation data
- Significant **consulting budget** ($416K) indicates capacity for special projects

### Enterprise Agreement Considerations

The $128K Esri maintenance likely includes:

**Typically Included in Local Government EA:**
- ArcGIS Pro (unlimited seats)
- ArcGIS Enterprise (Server, Portal, Data Store)
- ArcGIS Online organizational subscription with credits
- Extensions (3D Analyst, Spatial Analyst, etc.)
- Technical support and training discounts

**Questions to Clarify:**
1. Is ArcGIS Enterprise currently deployed with scene cache/object store?
2. How many ArcGIS Online credits are included annually?
3. Is there existing server infrastructure for hosting large 3D datasets?
4. What's the current ArcGIS Enterprise version? (11.4+ recommended for object store)
5. **What services does NV5 Geospatial provide?** Could they host point cloud data?
6. **Is LiDAR visualization in scope for the GIS consulting contract?**

**Potential Additional Costs:**
- If hosting on AGOL exceeds included credits: ~$400-800/year
- If new server infrastructure needed: $5,000-15,000 one-time
- Staff time for setup and maintenance
- *Or potentially covered under existing NV5/consulting contracts*

---

## Option 2: Open Source Stack (Potree + COPC)

### Technology Stack

| Component | Purpose |
|-----------|---------|
| **COPC** (Cloud Optimized Point Cloud) | Modern cloud-native format for streaming LiDAR |
| **Potree** | Open-source WebGL point cloud viewer |
| **PDAL** | Point Data Abstraction Library for conversion |
| **Entwine** | Alternative octree-based format (EPT) |

### COPC Format Advantages

- **Single file**: Unlike EPT's millions of small files
- **LAZ compatible**: Any LAZ reader can read COPC
- **HTTP range requests**: Stream directly from cloud storage
- **Octree-based**: Multi-resolution progressive loading
- **OGC emerging standard**: Growing ecosystem support

### Workflow

1. **Convert LAZ → COPC** using PDAL or Entwine/Untwine
2. **Host COPC files** on cloud storage (S3, Azure, GCS) or web server
3. **Deploy Potree viewer** as static web application
4. **Integrate** with existing web mapping application

### Hosting Cost Estimates

**Cloud Storage (AWS S3 Standard):**
| Item | Calculation | Monthly Cost |
|------|-------------|--------------|
| Storage (80 GB) | $0.023/GB | ~$1.84/month |
| Data transfer (est. 500 GB/month) | $0.09/GB after first 100GB | ~$36/month |
| **Total** | | **~$38/month** |

**Note:** COPC files are similar size to LAZ. Transfer costs depend heavily on usage.

### Existing USGS Entwine Service

The USGS 3DEP data is already available in **EPT format** via AWS:
- Public bucket: `s3://usgs-lidar-public`
- Viewer: https://usgs.entwine.io/

**However:** The CA_SolanoCounty_A23 dataset does not appear to be in the Entwine index yet (it's a 2023 acquisition). It may be added in the future, providing free visualization without any hosting costs.

---

## Option 3: Hybrid Approach

Leverage existing free services where possible:

1. **For now**: Link to USGS LidarExplorer for on-demand visualization
2. **Convert to COPC**: Host on cheap cloud storage for integration with county apps
3. **Use Esri for derived products**: DEMs, contours, hillshades via existing enterprise agreement
4. **Future**: Evaluate Esri scene layer if 3D analysis workflows are needed

---

## Comparison Matrix

| Factor | Esri AGOL | Esri Enterprise | Potree/COPC |
|--------|-----------|-----------------|-------------|
| **Setup Complexity** | Low | Medium-High | Medium |
| **Monthly Cost** | ~$36-72 | Infrastructure only | ~$2-40 |
| **Annual Cost** | ~$430-860 | Staff time | ~$24-480 |
| **Integration with Esri** | Native | Native | Manual |
| **3D Analysis Tools** | Yes | Yes | Limited |
| **Mobile Support** | Yes | Yes | Limited |
| **Customization** | Limited | Moderate | Full |
| **Dependency** | Vendor | Vendor + IT | Open source |
| **Performance** | Excellent | Excellent | Very Good |

---

## Recommendations

### If Esri Enterprise is Already Deployed:

1. **Check existing infrastructure** - Does the current deployment include scene cache/object store?
2. **Pilot project** - Convert a subset of tiles to SLPK and test performance
3. **Minimal additional cost** - Leverage existing license investment

### If Starting Fresh or Budget-Constrained:

1. **COPC + Potree** offers lowest cost and full control
2. **Monitor USGS Entwine** for when Solano data is indexed (free option)
3. **Consider hybrid** - COPC for visualization, Esri for analysis

### Immediate Actions:

1. [ ] Clarify what's included in current $125K Esri EA
2. [ ] Inventory existing ArcGIS Enterprise deployment status
3. [ ] Check AGOL credit allocation and current usage
4. [ ] Test COPC conversion on sample tiles (no cost to evaluate)
5. [ ] Contact Esri account rep about point cloud hosting best practices

---

## Technical Resources

### Esri Documentation
- [Point Cloud Scene Layer](https://pro.arcgis.com/en/pro-app/latest/help/mapping/layer-properties/point-cloud-scene-layer-in-arcgis-pro.htm)
- [Create Point Cloud Scene Layer Package](https://pro.arcgis.com/en/pro-app/latest/tool-reference/data-management/create-point-cloud-scene-layer-package.htm)
- [I3S Specification (GitHub)](https://github.com/Esri/i3s-spec)
- [ArcGIS Online Credits](https://doc.arcgis.com/en/arcgis-online/administer/credits.htm)

### Open Source
- [Potree WebGL Viewer](https://github.com/potree/potree)
- [COPC Specification](https://copc.io/)
- [PDAL](https://pdal.io/)
- [Cloud-Optimized Geospatial Guide](https://guide.cloudnativegeo.org/copc/)

### Data Sources
- [USGS 3DEP on AWS](https://registry.opendata.aws/usgs-lidar/)
- [USGS LidarExplorer](https://www.usgs.gov/tools/lidarexplorer)
- [USGS Entwine Viewer](https://usgs.entwine.io/)

---

## Appendix: Sample COPC Conversion Commands

```bash
# Install PDAL (via conda recommended)
conda install -c conda-forge pdal

# Convert single LAZ to COPC
pdal translate input.laz output.copc.laz --writer copc

# Batch convert directory of LAZ files
for f in *.laz; do
  pdal translate "$f" "${f%.laz}.copc.laz" --writer copc
done

# Or use Untwine for large datasets (creates single merged COPC)
untwine --files /path/to/laz/files --output merged.copc.laz
```

---

---

## Appendix B: Solano County GIS Budget Detail

From FY2025-26 Recommended Budget (pages 272-273), Department of Information Technology contracts:

```
GIS-Related Contracts:
• $416,000 for GIS consulting services
• $249,000 for GIS flyover
• $160,000 for GIS cloud service NV5 Geospatial
• $128,000 for GIS ESRI software maintenance
• $96,000 for GIS derivative products

Total GIS Investment: ~$1.05 million annually
```

DoIT also budgets for Microsoft Azure cloud hosting ($514,000) which could potentially be leveraged for point cloud storage if the Esri Enterprise route is not pursued.

---

*Document created: January 2025*
*Data source: USGS 3DEP CA_SolanoCounty_A23 (2022-2023 acquisition)*
*Budget source: Solano County FY2025-26 Recommended Budget*
