# Simplify

> Source: [/rest/services-reference/enterprise/simplify/](https://developers.arcgis.com/rest/services-reference/enterprise/simplify/)

**URL:**: https://<root>/Utilities/Geometry/GeometryServer/simplify

**Methods:**: GET

**Version Introduced:**: 9.3

## Description

The `simplify` operation is performed on a [geometry service resource](/rest/services-reference/enterprise/geometry-service/). Simplify permanently alters the input geometry so that the geometry becomes topologically consistent. This resource applies the `simplify` operation to each geometry in the input array. For more information, see [ITopologicalOperator.Simplify Method](https://resources.arcgis.com/en/help/arcobjects-cpp/componenthelp/index.html#/Simplify_Method/000w000003w0000000/).

You can provide arguments to the `simplify` operation as query parameters defined in the following parameters table:

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html. Values: html \| json |
| geometries | The array of geometries to be simplified. The structure of each geometry in the array is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API.JSON structures:Syntax: { "geometryType" : "<esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon>" "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ] }The geometries parameter is an array of input geometries. All geometries in this array should be of the type defined by geometryType.Example: { "geometryType" : "esriGeometryPolyline", "geometries" : [ { "paths" : [ [[-117,34],[-116,34],[-117,33]], [[-115,44],[-114,43],[-115,43]] ] }, { "paths" : [ [[32,17],[31,17],[30,17],[30,16]] ] } ] }Simple Syntax for point geometries: When using points, in addition to the JSON structures, you can specify the geometries with a simpler comma-separated syntax. Syntax: geometries=x1, y1, x2, y2, ..., xn, yn Example: geometries=-104.53, 34.74, -63.53, 10.23URL based: For a large set of geometries, you can specify a URL to the input geometries stored in a JSON structure in a file on a public server. The expected format of the file’s contents will be exactly the same as that expected if the geometries were directly embedded in the request. Syntax: geometries={ "url" : "<URL to file>" } Example: geometries={ "url" : "http://myserver/mygeometries/afile.txt" } |
| sr | The well-known ID of the spatial reference or a spatial reference JSON object for the input and output geometries. |

## Example usage

In this example, a polygon with one ring is simplified into a polygon with two rings. This URL is decoded, but the actual URL must be encoded.

[`https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/simplify?sr=4326&geometries={"geometryType":"esriGeometryPolygon","geometries":[{"rings":[[[-117,34],[-115,36],[-115,33],[-117,36],[-117,34]]]}]}`](https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/simplify?sr=4326&geometries=%7B%22geometryType%22%3A%22esriGeometryPolygon%22%2C%22geometries%22%3A%5B%7B%22rings%22%3A%5B%5B%5B-117%2C34%5D%2C%5B-115%2C36%5D%2C%5B-115%2C33%5D%2C%5B-117%2C36%5D%2C%5B-117%2C34%5D%5D%5D%7D%5D%7D&f=html)

## JSON Response syntax



```
{
  "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ]
}
```

## JSON Response example



```
{"geometries": [{"rings": [
 [
  [
   -116.19999999999999,
   34.80000000000007
  ],
  [
   -116.99999999999994,
   34.00000000000006
  ],
  [
   -116.99999999999994,
   36.00000000000006
  ],
  [
   -116.19999999999999,
   34.80000000000007
  ]
 ],
 [
  [
   -116.19999999999999,
   34.80000000000007
  ],
  [
   -114.99999999999994,
   36.00000000000006
  ],
  [
   -114.99999999999994,
   33.00000000000006
  ],
  [
   -116.19999999999999,
   34.80000000000007
  ]
 ]
]}]}
```