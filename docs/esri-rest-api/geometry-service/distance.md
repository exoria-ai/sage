# Distance

> Source: [/rest/services-reference/enterprise/distance/](https://developers.arcgis.com/rest/services-reference/enterprise/distance/)

**URL:**: https://<root>/Utilities/Geometry/GeometryServer/distance

**Methods:**: GET

**Version Introduced:**: 10.0

## Description

The `distance` operation is performed on a [geometry service resource](/rest/services-reference/enterprise/geometry-service/). It reports the 2D Euclidean or geodesic distance between the two geometries. This operation calls `simplify` on the input `geometry1` and `geometry2` values when the `geodesic` parameter is `true`. You can provide arguments to the `distance` operation as query parameters defined in the following parameters table.

## Request parameters

| Parameter | Details |
|---|---|
| geometry1 | Specifies the geometry from which the distance is measured. The structure of the geometry is the same as the structure of the JSON geometry objects returned by ArcGIS REST API. The use of simple syntax is not supported.Syntax {"geometryType": "<esriGeometryPoint \| esriGeometryPolyline \| esriGeometryEnvelope \| esriGeometryPolygon \| esriGeometryMultipoint>","geometry": <geometry1> }Example { "geometryType": "esriGeometryPoint", "geometry": { "x" : -118.15, "y" : 33.80 } } |
| geometry2 | Specifies the geometry to which the distance is measured. The structure of the geometry is the same as the structure of the JSON geometry objects returned by ArcGIS REST API. The use of simple syntax is not supported.Syntax {"geometryType": "<esriGeometryPoint \| esriGeometryPolyline \| esriGeometryEnvelope \| esriGeometryPolygon \| esriGeometryMultipoint>","geometry": <geometry1>}Example { "geometryType": "esriGeometryPoint", "geometry": { "x": -95.23, "y": 31.71 } } |
| sr | Specifies the well-known ID (WKID) or a spatial reference JSON object for input geometries. The spatial reference can be either a projected coordinate system (PCS) or a geographic coordinate system (GCS). For a list of valid WKID values, see Using spatial references. |
| distanceUnit(Optional) | Specifies the units for measuring distance between the geometry1 and geometry2 geometries. For a list of valid units, see esriSRUnitType Constants and esriSRUnit2Type Constants.For planar distance, if distanceUnit is not specified, the distance is in the units of the given spatial reference. If distanceUnit is specified, the unit must be compatible with the given spatial reference. That is, if sr is a PCS, distanceUnit must be linear. If sr is a GCS, distanceUnit must be angular.For geodesic distance, if distanceUnit is not specified, the distance is measured in meters. If distanceUnit is specified, the unit must be linear. |
| geodesic(Optional) | If geodesic is set to true, the geodesic distance between the geometry1 and geometry2 geometries is returned. Geodesic distance is the shortest path between two points along the ellipsoid of the earth. If geodesic is set to false or not specified, the planar distance is returned. The default value is false.Values: true \| false |
| f | The response format. The default response format is html.Values: html \| json \| pjson |

## Example usage

The following is a decoded sample request URL (the actual URL must be encoded) for `distance` that demonstrates how the geodesic distance in meters is computed between a polygon and a point:

[`https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/distance?sr=4326&geometry1={"geometryType":"esriGeometryPolygon","geometry":{"rings":[[[-117,34],[-117,35],[-116,35],[-116,34],[-117,34]]]}}&geometry2={"geometryType":"esriGeometryPoint","geometry":{"x":-115,"y":36}}&geodesic=true&f=html`](https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/distance?sr=4326&geometry1=%7B%22geometryType%22%3A%22esriGeometryPolygon%22%2C%22geometry%22%3A%7B%22rings%22%3A%5B%5B%5B-117%2C34%5D%2C%5B-117%2C35%5D%2C%5B-116%2C35%5D%2C%5B-116%2C34%5D%2C%5B-117%2C34%5D%5D%5D%7D%7D&geometry2=%7B%22geometryType%22%3A%22esriGeometryPoint%22%2C%22geometry%22%3A%7B%22x%22%3A-115%2C%22y%22%3A36%7D%7D&geodesic=true&distanceUnit=&f=html)

## JSON Response syntax



```
{"distance": <distance>}
```

## JSON Response example



```
{"distance": 143321.57818195896}
```