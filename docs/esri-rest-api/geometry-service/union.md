# Union

> Source: [/rest/services-reference/enterprise/union/](https://developers.arcgis.com/rest/services-reference/enterprise/union/)

**URL:**: https://<root>/Utilities/Geometry/GeometryServer/union

**Methods:**: GET

**Version Introduced:**: 10.0

## Description

The `union` operation is performed on a [geometry service resource](/rest/services-reference/enterprise/geometry-service/). This operation constructs the set-theoretic union of the geometries in the input array. All inputs must be of the same type. This operation calls `simplify` on the input `geometries`.

You can provide arguments to the `union` operation as query parameters defined in the following parameters table.

## Request parameters

| Parameter | Details |
|---|---|
| geometries | Specifies the array of geometries to be unioned. The structure of each geometry in the array is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API.The geometries parameter is an array of input geometries. All geometries in this array should be of the type defined by geometryType.Syntax: { "geometryType" : "<esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon>" "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ] }Example: { "geometryType" : "esriGeometryPolyline", "geometries" : [ { "paths" : [ [[-117,34],[-116,34],[-117,33]], [[-115,44],[-114,43],[-115,43]] ] }, { "paths" : [ [[32,17],[31,17],[30,17],[30,16]] ] } ] } |
| sr | Specifies the well-known ID (WKID) of the spatial reference or a spatial reference JSON object for the input geometries. For a list of valid WKID values, see Using spatial references. |
| f | The response format. The default format is html.Values: html \| json \| pjson |

## Example usage

The following is a decoded sample request URL (the actual URL must be encoded) for union that demonstrates how to construct the union of two polygons.



```
https://organization.example.com/<context>/rest/services/Utilities/Geometry/GeometryServer/union?sr=102113&geometries={"geometryType":"esriGeometryPolygon","geometries":[{"rings":[[[0,0],[0,1000000],[1000000,-1000000],[0,0]]]},{"rings":[[[0,0],[0,1000000],[1000000,1000000],[0,0]]]}]}
```

## JSON Response syntax



```
{
  "geometryType": "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon>"
  "geometry": {<geometry>}
}
```

## JSON Response example



```
{
 "geometryType": "esriGeometryPolygon",
 "geometry": {
    "rings": [
      [
        [
          333333.3332999982,
          333333.3332999982
        ],
        [
          1000000,
          -1000000
        ],
        [
          0,
          0
        ],
        [
          0,
          1000000
        ],
        [
          1000000,
          1000000
        ],
        [
          333333.3332999982,
          333333.3332999982
        ]
      ]
    ]
  }
}
```