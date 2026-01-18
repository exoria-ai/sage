# Union

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/union/

## Service Info

- **Parameter:** Details
- **geometries:** Specifies the array of geometries to be unioned. The structure of each geometry in the array is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API.The geometries parameter is an array of input geometries. All geometries in this array should be of the type defined by geometryType.Syntax:
Use dark colors for code blocksCopy1
2
3
4
{
  "geometryType" : "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon>"
  "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ]
}Example:
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
- **sr:** Specifies the well-known ID (WKID) of the spatial reference or a spatial reference JSON object for the input geometries. For a list of valid WKID values, see Using spatial references.
- **f:** The response format. The default format is html.Values: html  | json  | pjson

## Description

The union operation is performed on a geometry service resource. This operation constructs the set-theoretic union of the geometries in the input array. All inputs must be of the same type. This operation calls simplify on the input geometries.

You can provide arguments to the union operation as query parameters defined in the following parameters table.

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

```json
1
https://organization.example.com/<context>/rest/services/Utilities/Geometry/GeometryServer/union?sr=102113&geometries={"geometryType":"esriGeometryPolygon","geometries":[{"rings":[[[0,0],[0,1000000],[1000000,-1000000],[0,0]]]},{"rings":[[[0,0],[0,1000000],[1000000,1000000],[0,0]]]}]}
```

