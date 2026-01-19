# Project

> Source: [/rest/services-reference/enterprise/project/](https://developers.arcgis.com/rest/services-reference/enterprise/project/)

**URL:**: https://<root>/Utilities/Geometry/GeometryServer/project

**Methods:**: GET

**Version Introduced:**: 9.3

## Description

The `project` operation is performed on a [geometry service resource](/rest/services-reference/enterprise/geometry-service/). This operation projects an array of input geometries from the input spatial reference to the output spatial reference.

This operation calls `simplify` on the input `geometries`.

You can provide arguments to the `project` operation as query parameters defined in the following parameters table:

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html. Values: html \| json |
| geometries | The array of geometries to be projected. The structure of each geometry in the array is the same as the structure of the JSON geometry objects returned by ArcGIS REST API.JSON structures:Syntax: { "geometryType" : "<esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon>" "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ] }The geometries parameter is an array of input geometries. All geometries in this array should be of the type defined by geometryType.Example: { "geometryType" : "esriGeometryPolyline", "geometries" : [ { "paths" : [ [[-117,34],[-116,34],[-117,33]], [[-115,44],[-114,43],[-115,43]] ] }, { "paths" : [ [[32,17],[31,17],[30,17],[30,16]] ] } ] }Simple Syntax for point geometries: When using points, in addition to the JSON structures, you can specify the geometries with a simpler comma-separated syntax. Syntax: geometries=x1, y1, x2, y2, ..., xn, yn Example: geometries=-104.53, 34.74, -63.53, 10.23URL based: For a large set of geometries, you can specify a URL to the input geometries stored in a JSON structure in a file on a public server. The expected format of the file’s contents will be exactly the same as that expected if the geometries were directly embedded in the request. Syntax: geometries={ "url" : "<URL to file>" } Example: geometries={ "url" : "http://myserver/mygeometries/afile.txt" } |
| inSR | The well-known ID (WKID) of the spatial reference or a spatial reference JSON object for the input geometries. For a list of valid WKID values, see Using spatial references. |
| outSR | The WKID of the spatial reference or a spatial reference JSON object for the returned geometries. For a list of valid WKID values, see Using spatial references. |
| transformation | (Optional) The WKID or a JSON object specifying the geographic transformation (also known as datum transformation) to be applied to the projected geometries. Note that a transformation is needed only if the output spatial reference contains a different geographic coordinate system than the input spatial reference or if projecting between different vertical systems. If a vertical transformation is used, it may require data files that are not installed by default. A separate setup is included to install ArcGIS Coordinate Systems Data, which contains the data files required for the GEOCON transformation method and vertical transformation files for the United States (VERTCON and GEOID12B) and the world (EGM2008). Additionally, it contains updated NTv2 files for the UK and Switzerland plus a new grid file for the Crossrail project in the greater London area.For a list of valid geographic transformation ID values and well-known text strings, see Using spatial references.The easiest way to specify a geographic transformation is by using its WKID; however, a transformation can also be specified as a JSON object. This form is especially useful if creating a custom transformation or a composite transformation.A single transformation can be specified in JSON format by using the field name wkid, name, or wkt.The following examples all specify the same geographic transformation:WKID 15851WKID in JSON format: {"wkid" : 15851 }Well-known text (WKT): {"wkt" : "GEOGTRAN[\"NAD_1927_To_WGS_1984_79_CONUS\",GEOGCS[\"GCS_North_American_1927\",DATUM[\"D_North_American_1927\",SPHEROID[\"Clarke_1866\",6378206.4,294.9786982]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],METHOD[\"NADCON\"],PARAMETER[\"Dataset_conus\",0.0]]"}If a custom transformation is specified using a JSON object, it should use the well-known text string representation. See Example 2 below.A composite transformation chains two geographic transformations together. For example, suppose you want to project your data from NAD83 to WGS84. You can first apply a transformation from NAD83 to NAD27, and then apply a transformation from NAD27 to WGS84. Again, when specifying the individual transformation, you can use its WKID, name, or WKT.The following example of a composite transformation from NAD83 to WGS84 uses the WKID field to specify the individual transformation. The JSON object begins with the field name geoTransforms and has an array of two transformations. You should also specify whether to transform forward or backward. { "geoTransforms": [ { "wkid": "1241", "transformForward": false }, { "wkid": "15851", "transformForward": true } ] }If using a vertical transformation, it must be specified as a composite transformation even if it contains only one transformation.The following example is a composite transformation with one vertical transformation. The JSON object begins with the field name hvTransforms and has an array of one transformation. {"hvTransforms": [{"wkid": 4453}]}To find the best transformation based on your data and the input and output spatial references, use FindTransformations.Invalid transformation JSON object: {"name" : "NAD_1927_To_WGS_1984_79_CONUS"}If transformation is not specified, a search is made through the gtdefaults.json file in the pedata folder for an applicable transformation. If Vertical is set to true, a search is made through the hvtdefaults.json file in the pedata folder for an applicable horizontal or vertical transformation. The pedata folder, the gtdefaults.json, and the hvtdefaults.json files are installed automatically in your server directory when you install ArcGIS Server. If an appropriate transformation is not found in the gtdefaults.json or the hvtdefaults.json file, or if the appropriate file does not exist, the server chooses the best transformation to use based on the input data and spatial references. |
| transformForward | (Optional) A Boolean value indicating whether or not to transform forward. The forward or reverse direction of the transformation is implied in the name of the transformation. The default value is true.Values: true \| false |
| vertical | (Optional) Specifies whether to project vertical coordinates. The default value is false. If vertical is set to true, both inSR and outSR must have a vertical coordinate system.Values: true \| false |

## Example usage

### Example 1

This example is a decoded URL that projects two polygons from WGS84 (4326) to Web Mercator (3857). A geographic transformation is not specified since the Web Mercator projection has as its underlying geographic coordinate system WGS84, which is the input coordinate system. The actual URL must be encoded.

[`https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=3857&geometries={"geometryType":"esriGeometryPolygon","geometries":[{"rings":[[[-117,34],[-116,34],[-117,33],[-117,34]],[[-115,44],[-114,43],[-115,43],[-115,44]]]},{"rings":[[[32,17],[31,17],[30,17],[30,16],[32,17]]]}]}`](https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=3857&geometries=%7B%22geometryType%22%3A%22esriGeometryPolygon%22%2C%22geometries%22%3A%5B%7B%22rings%22%3A%5B%5B%5B-117%2C34%5D%2C%5B-116%2C34%5D%2C%5B-117%2C33%5D%2C%5B-117%2C34%5D%5D%2C%5B%5B-115%2C44%5D%2C%5B-114%2C43%5D%2C%5B-115%2C43%5D%2C%5B-115%2C44%5D%5D%5D%7D%2C%7B%22rings%22%3A%5B%5B%5B32%2C17%5D%2C%5B31%2C17%5D%2C%5B30%2C17%5D%2C%5B30%2C16%5D%2C%5B32%2C17%5D%5D%5D%7D%5D%7D&transformation=&transformForward=true&vertical=false&f=html)

### Example 2

This example is a decoded URL that projects the same two polygons as in Example 1 from WGS84 (4326) to North American Equidistant Conic (102010). The output spatial reference has as its underlying geographic coordinate system NAD83 (4269), so a geographic transformation is specified. The transformation is customized, so the well-known text representation is used. The actual URL must be encoded.

[`https://sampleserver6.arcgisonline.com//rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102010&geometries={"geometryType":"esriGeometryPolygon","geometries":[{"rings":[[[-117,34],[-116,34],[-117,33],[-117,34]],[[-115,44],[-114,43],[-115,43],[-115,44]]]},{"rings":[[[32,17],[31,17],[30,17],[30,16],[32,17]]]}]}&transformation={"wkt":"GEOGTRAN[\"WGS_1984_(ITRF00)_To_NAD_1983_CORS96\",GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],GEOGCS[\"GCS_NAD_1983_CORS96\",DATUM[\"D_NAD_1983_CORS96\",SPHEROID[\"GRS_1980\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],METHOD[\"Coordinate_Frame\"],PARAMETER[\"X_Axis_Translation\",0.0],PARAMETER[\"Y_Axis_Translation\",0.0],PARAMETER[\"Z_Axis_Translation\",0.0],PARAMETER[\"X_Axis_Rotation\",0.05],PARAMETER[\"Y_Axis_Rotation\",0.05],PARAMETER[\"Z_Axis_Rotation\",0.05],PARAMETER[\"Scale_Difference\",0.00062]]"}&transformForward=true`](https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102010&geometries=%7B%22geometryType%22%3A%22esriGeometryPolygon%22%2C%22geometries%22%3A%5B%7B%22rings%22%3A%5B%5B%5B-117%2C34%5D%2C%5B-116%2C34%5D%2C%5B-117%2C33%5D%2C%5B-117%2C34%5D%5D%2C%5B%5B-115%2C44%5D%2C%5B-114%2C43%5D%2C%5B-115%2C43%5D%2C%5B-115%2C44%5D%5D%5D%7D%2C%7B%22rings%22%3A%5B%5B%5B32%2C17%5D%2C%5B31%2C17%5D%2C%5B30%2C17%5D%2C%5B30%2C16%5D%2C%5B32%2C17%5D%5D%5D%7D%5D%7D&transformation=%7B%22wkt%22%3A%22GEOGTRAN%5B%5C%22WGS_1984_%28ITRF00%29_To_NAD_1983_CORS96%5C%22%2CGEOGCS%5B%5C%22GCS_WGS_1984%5C%22%2CDATUM%5B%5C%22D_WGS_1984%5C%22%2CSPHEROID%5B%5C%22WGS_1984%5C%22%2C6378137.0%2C298.257223563%5D%5D%2CPRIMEM%5B%5C%22Greenwich%5C%22%2C0.0%5D%2CUNIT%5B%5C%22Degree%5C%22%2C0.0174532925199433%5D%5D%2CGEOGCS%5B%5C%22GCS_NAD_1983_CORS96%5C%22%2CDATUM%5B%5C%22D_NAD_1983_CORS96%5C%22%2CSPHEROID%5B%5C%22GRS_1980%5C%22%2C6378137.0%2C298.257222101%5D%5D%2CPRIMEM%5B%5C%22Greenwich%5C%22%2C0.0%5D%2CUNIT%5B%5C%22Degree%5C%22%2C0.0174532925199433%5D%5D%2CMETHOD%5B%5C%22Coordinate_Frame%5C%22%5D%2CPARAMETER%5B%5C%22X_Axis_Translation%5C%22%2C0.0%5D%2CPARAMETER%5B%5C%22Y_Axis_Translation%5C%22%2C0.0%5D%2CPARAMETER%5B%5C%22Z_Axis_Translation%5C%22%2C0.0%5D%2CPARAMETER%5B%5C%22X_Axis_Rotation%5C%22%2C0.05%5D%2CPARAMETER%5B%5C%22Y_Axis_Rotation%5C%22%2C0.05%5D%2CPARAMETER%5B%5C%22Z_Axis_Rotation%5C%22%2C0.05%5D%2CPARAMETER%5B%5C%22Scale_Difference%5C%22%2C0.00062%5D%5D%22%7D&transformForward=true&vertical=false&f=html)

## JSON Response syntax



```
{
  "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ]
}
```

## JSON Response example



```
{"geometries": [
 {"rings": [
  [
   [
    -1737650.7129008123,
    -473996.6369644385
   ],
   [
    -1848408.540568451,
    -562386.1795645067
   ],
   [
    -1823020.773501082,
    -454417.4648747938
   ],
   [
    -1737650.7129008123,
    -473996.6369644385
   ]
  ],
  [
   [
    -1369813.360931299,
    469215.42086622305
   ],
   [
    -1444833.0243950596,
    484692.3956431877
   ],
   [
    -1421786.7261078632,
    593378.3213571347
   ],
   [
    -1369813.360931299,
    469215.42086622305
   ]
  ]
 ]},
 {"rings": [[
  [
   9716960.872910285,
   5699112.827825871
  ],
  [
   9788208.551747562,
   5465424.7095700875
  ],
  [
   9679435.580886034,
   5485794.912330535
  ],
  [
   9698784.71666737,
   5592350.699075353
  ],
  [
   9716960.872910285,
   5699112.827825871
  ]
 ]]}
]}
```

## Example 3

This decoded example URL (the actual URL must be encoded) projects a point that has z-values from GCS\_ITRF\_1988 (WKID = 104115) and vertical coordinate system ITRF\_1988 (WKID = 115729) to GCS\_ITRF\_1989 (WKID = 104116) and vertical coordinate system ITRF\_1989 (WKID = 115730). A horizontal-vertical transformation is specified. The horizontal-vertical transformation was found by using [`FindTransformations`](/rest/services-reference/enterprise/findtransformations/) and copying the result.

[`https://organization.example.com/<context>/rest/services/Utilities/Geometry/GeometryServer/project?inSR={"wkid":4326,"vcsWkid":3855}&outSR={"wkid":6322, "vcsWkid":115762}&geometries={"geometryType":"esriGeometryPoint","geometries": [{"x":10,"y":11,"z":5}]}&transformation={"hvTransforms":[{"wkid":1943,"latestWkid":108034,"transformForward":true,"name":"ITRF_1988_To_ITRF_2000_1"},{"wkid":1942,"latestWkid":108033,"transformForward":false,"name":"ITRF_1989_To_ITRF_2000_1"}],"srIn":{"wkid":104115,"latestWkid":8988,"vcsWkid":115729,"latestVcsWkid":115729},"srOut":{"wkid":104116,"latestWkid":8989,"vcsWkid":115730,"latestVcsWkid":115730}}]}&transformForward=true&vertical=true`](https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=%7B%22wkid%22%3A+104115%2C+%22vcsWkid%22%3A+115729%7D&outSR=%7B%22wkid%22%3A+104116%2C+%22vcsWkid%22%3A+115730%7D&geometries=%7B%22geometryType%22%3A%22esriGeometryPoint%22%2C%22geometries%22%3A%5B%7B%22x%22%3A10%2C%22y%22%3A11%2C%22z%22%3A5%7D%5D%7D&transformation=%7B%22hvTransforms%22%3A%5B%7B%22wkid%22%3A1943%2C%22latestWkid%22%3A108034%2C%22transformForward%22%3Atrue%2C%22name%22%3A%22ITRF_1988_To_ITRF_2000_1%22%7D%2C%7B%22wkid%22%3A1942%2C%22latestWkid%22%3A108033%2C%22transformForward%22%3Afalse%2C%22name%22%3A%22ITRF_1989_To_ITRF_2000_1%22%7D%5D%2C%22srIn%22%3A%7B%22wkid%22%3A104115%2C%22latestWkid%22%3A8988%2C%22vcsWkid%22%3A115729%2C%22latestVcsWkid%22%3A115729%7D%2C%22srOut%22%3A%7B%22wkid%22%3A104116%2C%22latestWkid%22%3A8989%2C%22vcsWkid%22%3A115730%2C%22latestVcsWkid%22%3A115730%7D%7D&transformForward=true&vertical=true&f=html)

The output looks like the following:



```
{"geometries": [{
 "x": 10.000000321738815,
 "y": 11.000000189921916,
 "z": 4.921163795005509
}]}
```