# Project

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/project/

## Service Info

- **Parameter:** Details
- **f:** The response format. The default response format is html. Values: html | json
- **geometries:** The array of geometries to be projected. The structure of each geometry in the array is the same as the structure of the JSON geometry objects returned by ArcGIS REST API.JSON structures:Syntax:
Use dark colors for code blocksCopy1
2
3
4
{
  "geometryType" : "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon>"
  "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ]
}NoteSupport for the esriGeometryEnvelope geometry type was added at 9.3 SP1.The geometries parameter is an array of input geometries. All geometries in this array should be of the type defined by geometryType.Example:
Use dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
{
  "geometryType" : "esriGeometryPolyline",
    "geometries" :
  [
    {
      "paths" :
      [
        [[-117,34],[-116,34],[-117,33]],
        [[-115,44],[-114,43],[-115,43]]
      ]
    },
    {
      "paths" :
      [
        [[32,17],[31,17],[30,17],[30,16]]
      ]
    }
  ]
}
Simple Syntax for point geometries: When using points, in addition to the JSON structures, you can specify the geometries with a simpler comma-separated syntax. Syntax: geometries=x1, y1, x2, y2, ..., xn, yn  Example: geometries=-104.53, 34.74, -63.53, 10.23
URL based:  For a large set of geometries, you can specify a URL to the input geometries stored in a JSON structure in a file on a public server. The expected format of the file’s contents will be exactly the same as that expected if the geometries were directly embedded in the request. Syntax: geometries={ "url" : "<URL to file>" }  Example: geometries={ "url" : "http://myserver/mygeometries/afile.txt" }
- **inSR:** The well-known ID (WKID) of the spatial reference or a spatial reference JSON object for the input geometries. For a list of valid WKID values, see Using spatial references.
- **outSR:** The WKID of the spatial reference or a spatial reference JSON object for the returned geometries. For a list of valid WKID values, see Using spatial references.
- **transformation:** (Optional) The WKID or a JSON object specifying the geographic transformation (also known as datum transformation) to be applied to the projected geometries. Note that a transformation is needed only if the output spatial reference contains a different geographic coordinate system than the input spatial reference or if projecting between different vertical systems. If a vertical transformation is used, it may require data files that are not installed by default. A separate setup is included to install ArcGIS Coordinate Systems Data, which contains the data files required for the GEOCON transformation method and vertical transformation files for the United States (VERTCON and GEOID12B) and the world (EGM2008). Additionally, it contains updated NTv2 files for the UK and Switzerland plus a new grid file for the Crossrail project in the greater London area.For a list of valid geographic transformation ID values and well-known text strings, see Using spatial references.The easiest way to specify a geographic transformation is by using its WKID; however, a transformation can also be specified as a JSON object. This form is especially useful if creating a custom transformation or a composite transformation.A single transformation can be specified in JSON format by using the field name wkid, name, or wkt.The following examples all specify the same geographic transformation:WKIDUse dark colors for code blocksCopy1
15851WKID in JSON format:Use dark colors for code blocksCopy1
{"wkid" : 15851 }Well-known text (WKT):Use dark colors for code blocksCopy1
{"wkt" : "GEOGTRAN[\"NAD_1927_To_WGS_1984_79_CONUS\",GEOGCS[\"GCS_North_American_1927\",DATUM[\"D_North_American_1927\",SPHEROID[\"Clarke_1866\",6378206.4,294.9786982]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],METHOD[\"NADCON\"],PARAMETER[\"Dataset_conus\",0.0]]"}If a custom transformation is specified using a JSON object, it should use the well-known text string representation. See Example 2 below.A composite transformation chains two geographic transformations together. For example, suppose you want to project your data from NAD83 to WGS84. You can first apply a transformation from NAD83 to NAD27, and then apply a transformation from NAD27 to WGS84. Again, when specifying the individual transformation, you can use its WKID, name, or WKT.The following example of a composite transformation from NAD83 to WGS84 uses the WKID field to specify the individual transformation. The JSON object begins with the field name geoTransforms and has an array of two transformations. You should also specify whether to transform forward or backward.Use dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
{
  "geoTransforms": [
    {
      "wkid": "1241",
      "transformForward": false
    },
    {
      "wkid": "15851",
      "transformForward": true
    }
  ]
}If using a vertical transformation, it must be specified as a composite transformation even if it contains only one transformation.The following example is a composite transformation with one vertical transformation. The JSON object begins with the field name hvTransforms and has an array of one transformation.Use dark colors for code blocksCopy1
{"hvTransforms": [{"wkid": 4453}]}To find the best transformation based on your data and the input and output spatial references, use FindTransformations.NoteSpecifying only the transformation name is invalid. Using an invalid JSON object is equivalent to leaving the transformation parameter blank. In the next release, using an invalid JSON object will result in an error.Invalid transformation JSON object:Use dark colors for code blocksCopy1
{"name" : "NAD_1927_To_WGS_1984_79_CONUS"}If transformation is not specified, a search is made through the gtdefaults.json file in the pedata folder for an applicable transformation. If Vertical is set to true, a search is made through the hvtdefaults.json file in the pedata folder for an applicable horizontal or vertical transformation. The pedata folder, the gtdefaults.json, and the hvtdefaults.json files are installed automatically in your server directory when you install ArcGIS Server. If an appropriate transformation is not found in the gtdefaults.json or the hvtdefaults.json file, or if the appropriate file does not exist, the server chooses the best transformation to use based on the input data and spatial references.
- **transformForward:** (Optional) A Boolean value indicating whether or not to transform forward. The forward or reverse direction of the transformation is implied in the name of the transformation. The default value is true.Values: true | false
- **vertical:** (Optional) Specifies whether to project vertical coordinates. The default value is false. If vertical is set to true, both inSR and outSR must have a vertical coordinate system.Values: true | false

## Description

The project operation is performed on a geometry service resource. This operation projects an array of input geometries from the input spatial reference to the output spatial reference.

This operation calls simplify on the input geometries.

You can provide arguments to the project operation as query parameters defined in the following parameters table:

## Request Parameters

## Response

## Examples

```json
1
2
3
4
{
  "geometryType" : "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon>"
  "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ]
}
```

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
{
  "geometryType" : "esriGeometryPolyline",
    "geometries" :
  [
    {
      "paths" :
      [
        [[-117,34],[-116,34],[-117,33]],
        [[-115,44],[-114,43],[-115,43]]
      ]
    },
    {
      "paths" :
      [
        [[32,17],[31,17],[30,17],[30,16]]
      ]
    }
  ]
}
```

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
```

