# Buffer

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/buffer/

## Service Info

- **Parameter:** Details
- **geometries:** Specifies the array of geometries to be buffered. The spatial reference of the geometries is specified by inSR. The structure of each geometry in the array is the same as the structure of the JSON geometry objects returned by ArcGIS REST API.The geometries property is an array of input geometries. All geometries in this array should be of the type defined by the geometryType property.Syntax:Use dark colors for code blocksCopy1
2
3
4
{
  "geometryType" : "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon>"
  "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ]
}Example:Use dark colors for code blocksCopy1
2
3
4
5
6
7
8
{
  "geometryType" : "esriGeometryPoint",
  "geometries" :
  [
    {"x" : -104.5, "y" : 34.74},
    {"x" : -63.53, "y" : 10.23}
  ]
}
Simple Syntax for point geometries: When using points, in addition to the JSON structures, you can specify the geometries with a simpler comma-separated syntax. Syntax: geometries=x1, y1, x2, y2, ..., xn, yn  Example: geometries=-104.53, 34.74, -63.53, 10.23
URL based:  For a large set of geometries, you can specify a URL to the input geometries stored in a JSON structure in a file on a public server. The expected format of the file’s contents will be exactly the same as that expected if the geometries were directly embedded in the request. Syntax: geometries={ "url" : "<URL to file>" }  Example: geometries={ "url" : "http://myserver/mygeometries/afile.txt" }
- **inSR:** Specifies the well-known ID (WKID) of the spatial reference or a spatial reference JSON object for the input geometries. For a list of valid WKID values, see Using spatial references.
- **outSR(Optional):** Specifies the WKID of the spatial reference or a spatial reference JSON object for the returned geometries. For a list of valid WKID values, see Using spatial references.If outSR is not specified, the output geometries are in the spatial reference specified by bufferSR. If neither outSR nor bufferSR is specified, the output geometries are in the spatial reference specified by inSR.
- **bufferSR(Optional):** Specifies the WKID of the spatial reference or a spatial reference JSON object in which the geometries are buffered. For a list of valid WKID values, see Using spatial references.If bufferSR is not specified, the geometries are buffered in the spatial reference specified by outSR. If neither bufferSR nor outSR is specified, the geometries are buffered in the spatial reference specified by inSR.
- **distances:** Specifies the distances that each of the input geometries is buffered. The distance units are specified by unit .SyntaxUse dark colors for code blocksCopy1
distances=<distance1>, <distance2>, ..., <distanceN>ExampleUse dark colors for code blocksCopy1
distances=100, 123.45
- **unit(Optional):** Specifies the units for calculating each buffer distance. If unit is not specified, the units are derived from bufferSR. If bufferSR is not specified, the units are derived from inSR.
For a list of valid units, see esriSRUnitType Constants and esriSRUnit2Type Constants.
- **unionResults(Optional):** If true, all geometries buffered at a given distance are unioned into a single (possibly multipart) polygon, and the unioned geometry is placed in the output array. The default is false.Values: true | false
- **geodesic(Optional):** Set geodesic to true to buffer the input geometries using geodesic distance. Geodesic distance is the shortest path between two points along the ellipsoid of the earth. If geodesic is set to false, the 2D Euclidean distance is used to buffer the input geometries. The default value depends on the geometry type, unit, and bufferSR.
- **f:** The response format. The default response format is html.Values: html  | json  | pjson

## Description

The buffer operation is performed on a geometry service resource. The result of this operation is buffered polygons at the specified distances for the input geometry array. Options are available to union buffers and to use geodesic distance. This operation calls simplify on the input geometries. You can provide arguments to the buffer operation as query parameters defined in the following parameters table.

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
{
  "geometryType" : "esriGeometryPoint",
  "geometries" :
  [
    {"x" : -104.5, "y" : 34.74},
    {"x" : -63.53, "y" : 10.23}
  ]
}
```

```json
1
distances=<distance1>, <distance2>, ..., <distanceN>
```

