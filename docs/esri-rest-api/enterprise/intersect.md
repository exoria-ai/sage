# Intersect

> Source: [/rest/services-reference/enterprise/intersect/](https://developers.arcgis.com/rest/services-reference/enterprise/intersect/)

**URL:**: https://<root>/Utilities/Geometry/GeometryServer/intersect

**Methods:**: GET

**Version Introduced:**: 10.0

## Description

The `intersect` operation is performed on a [geometry service resource](/rest/services-reference/enterprise/geometry-service/). This operation constructs the set-theoretic intersection between an array of geometries and another geometry. The dimension of each resultant geometry is the minimum dimension of the input geometry in the `geometries` array and the other geometry specified by the `geometry` parameter. This operation calls `simplify` on the input `geometries` and `geometry`. You can provide arguments to the `intersect` operation as query parameters defined in the following parameters table.

## Request parameters

| Parameter | Details |
|---|---|
| geometries | Specifies an array of points, multipoints, polylines, or polygons. The structure of each geometry in the array is the same as the structure of the JSON geometry objects returned by ArcGIS REST API.Syntax: { "geometryType" : "<esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon>" "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ] }Example: { "geometryType" : "esriGeometryPolyline", "geometries" : [ { "paths" : [ [[-117,34],[-116,34],[-117,33]], [[-115,44],[-114,43],[-115,43]] ] }, { "paths" : [ [[32,17],[31,17],[30,17],[30,16]] ] } ] } |
| geometry | Specifies a single geometry of any type with a dimension equal to or greater than the elements of geometries. The structure of geometry is the same as the structure of the JSON geometry objects returned by ArcGIS REST API. The use of simple syntax is not supported.Syntax: { "geometryType" : "<esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon>" "geometry" : { <geometry1> } }Example { "geometryType": "esriGeometryPolygon", "geometry": { "rings": [ [[-117,34],[-116,34],[-117,33],[-117,34]], [[-115,44],[-114,43],[-115,43],[-115,44]] ] } } |
| sr | Sets the well-known ID (WKID) or a spatial reference JSON object for the input geometries. For a list of valid WKID values, see Using spatial references. |
| f | The response format. The default response format is html.Values: html \| json \| pjson |

## Example usage

The following is a decoded sample request URL (the actual URL must be encoded) for `intersect` that demonstrates how to calculate the intersection of two polygons:

[`https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/intersect?sr=4269&geometries={"geometryType":"esriGeometryPolygon","geometries":[{"rings":[[[-72,40],[-71,40],[-71,39],[-72,39],[-72,40]]]},{"rings":[[[-74,37],[-74,41],[-73,41],[-73,37],[-74,37]]]}]}&geometry={"geometryType":"esriGeometryPolygon","geometry":{"rings":[[[-75,39],[-74,40],[-73,39],[-72,40],[-71,39],[-71,38],[-75,38],[-75,39]]]}}`](https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/intersect?sr=4269&geometries=%7B%22geometryType%22%3A%22esriGeometryPolygon%22%2C%22geometries%22%3A%5B%7B%22rings%22%3A%5B%5B%5B-72%2C40%5D%2C%5B-71%2C40%5D%2C%5B-71%2C39%5D%2C%5B-72%2C39%5D%2C%5B-72%2C40%5D%5D%5D%7D%2C%7B%22rings%22%3A%5B%5B%5B-74%2C37%5D%2C%5B-74%2C41%5D%2C%5B-73%2C41%5D%2C%5B-73%2C37%5D%2C%5B-74%2C37%5D%5D%5D%7D%5D%7D&geometry=%7B%22geometryType%22%3A%22esriGeometryPolygon%22%2C%22geometry%22%3A%7B%22rings%22%3A%5B%5B%5B-75%2C39%5D%2C%5B-74%2C40%5D%2C%5B-73%2C39%5D%2C%5B-72%2C40%5D%2C%5B-71%2C39%5D%2C%5B-71%2C38%5D%2C%5B-75%2C38%5D%2C%5B-75%2C39%5D%5D%5D%7D%7D&f=html)

## JSON Response syntax



```
{
  "geometryType" : "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon>"
  "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ]
}
```

## JSON Response example



```
{
 "geometryType": "esriGeometryPolygon",
 "geometries": [
  {"rings": [[
   [
    -70.99999999999994,
    39.00000000000006
   ],
   [
    -71.99999999999994,
    39.00000000000006
   ],
   [
    -71.99999999999994,
    40.00000000000006
   ],
   [
    -70.99999999999994,
    39.00000000000006
   ]
  ]]},
  {"rings": [[
   [
    -72.99999999999994,
    38.00000000000006
   ],
   [
    -73.99999999999994,
    38.00000000000006
   ],
   [
    -73.99999999999994,
    40.00000000000006
   ],
   [
    -72.99999999999994,
    39.00000000000006
   ],
   [
    -72.99999999999994,
    38.00000000000006
   ]
  ]]}
 ]
}
```