# Intersect

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/intersect/

## Service Info

- **Parameter:** Details
- **geometries:** Specifies an array of points, multipoints, polylines, or polygons. The structure of each geometry in the array is the same as the structure of the JSON geometry objects returned by ArcGIS REST API.Syntax:
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
- **geometry:** Specifies a single geometry of any type with a dimension equal to or greater than the elements of geometries. The structure of geometry is the same as the structure of the JSON geometry objects returned by ArcGIS REST API. The use of simple syntax is not supported.Syntax:
Use dark colors for code blocksCopy1
2
3
4
{
  "geometryType" : "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon>"
  "geometry" : { <geometry1> }
}ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
{
  "geometryType": "esriGeometryPolygon",
  "geometry": {
    "rings": [
      [[-117,34],[-116,34],[-117,33],[-117,34]],
      [[-115,44],[-114,43],[-115,43],[-115,44]]
    ]
  }
}
- **sr:** Sets the well-known ID (WKID) or a spatial reference JSON object for the input geometries. For a list of valid WKID values, see Using spatial references.
- **f:** The response format. The default response format is html.Values: html  | json  | pjson

## Description

The intersect operation is performed on a geometry service resource. This operation constructs the set-theoretic intersection between an array of geometries and another geometry. The dimension of each resultant geometry is the minimum dimension of the input geometry in the geometries array and the other geometry specified by the geometry parameter. This operation calls simplify on the input geometries and geometry. You can provide arguments to the intersect operation as query parameters defined in the following parameters table.

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
2
3
4
{
  "geometryType" : "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon>"
  "geometry" : { <geometry1> }
}
```

