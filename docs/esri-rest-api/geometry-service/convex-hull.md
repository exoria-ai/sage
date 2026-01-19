# Convex Hull

> Source: [/rest/services-reference/enterprise/convex-hull/](https://developers.arcgis.com/rest/services-reference/enterprise/convex-hull/)

**URL:**: https://<root>/Utilities/Geometry/GeometryServer/convexHull

**Methods:**: GET

**Version Introduced:**: 10.0

## Description

The `convexHull` operation is performed on a [geometry service resource](/rest/services-reference/enterprise/geometry-service/). It returns the convex hull of the input geometries. The input geometries can be points, multipoints, polylines, or polygons, but they all must be the same type. The convex hull is typically a polygon but can also be a polyline or point in degenerate cases.

You can provide arguments to the `convexHull` operation as query parameters defined in the following parameters table.

## Request parameters

| Parameter | Details |
|---|---|
| geometries | Specifies the geometries whose convex hull is to be created. The structure of each geometry is the same as the structure of the JSON geometry objects returned by ArcGIS REST API.Syntax: { "geometryType" : "<esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon>" "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ] }Example: { "geometryType" : "esriGeometryPolyline", "geometries" : [ { "paths" : [ [[-117,34],[-116,34],[-117,33]], [[-115,44],[-114,43],[-115,43]] ] }, { "paths" : [ [[32,17],[31,17],[30,17],[30,16]] ] } ] } |
| sr | Specifies the well-known ID (WKID) or a spatial reference JSON object for the output geometry. For a list of valid WKID values, see Using spatial references. |
| f | The response format. The default response format is html.Values: html \| json \| pjson |

## Example usage

The following is a decoded sample request URL (the actual URL must be encoded) for `convexHull`:

[`https://sampleserver6.arcgisonline.com/ArcGIS/rest/Utilities/services/Geometry/GeometryServer/convexHull?geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":-117,"y":34},{"x":-116.5,"y":34.5},{"x":-116,"y":33}]}&sr=4326&f=html`](https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/convexHull?sr=4326&geometries=%7B%22geometryType%22%3A%22esriGeometryPoint%22%2C%22geometries%22%3A%5B%7B%22x%22%3A-117%2C%22y%22%3A34%7D%2C%7B%22x%22%3A-116.5%2C%22y%22%3A34.5%7D%2C%7B%22x%22%3A-116%2C%22y%22%3A33%7D%5D%7D&f=html)

## JSON Response syntax



```
{
  "geometryType" : "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon>"
  "geometry" : { <geometry1> }
}
```

## JSON Response example



```
{
 "geometryType": "esriGeometryPolygon",
 "geometry": {"rings": [[
  [
   -116,
   33
  ],
  [
   -117,
   34
  ],
  [
   -116.5,
   34.5
  ],
  [
   -116,
   33
  ]
 ]]}
}
```