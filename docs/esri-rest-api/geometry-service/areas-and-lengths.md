# Areas and Lengths

> Source: [/rest/services-reference/enterprise/areas-and-lengths/](https://developers.arcgis.com/rest/services-reference/enterprise/areas-and-lengths/)

**URL:**: https://<root>/Utilities/Geometry/GeometryServer/areasAndLengths

**Methods:**: GET

**Version Introduced:**: 9.3

## Description

The `areasAndLengths` operation is performed on a [geometry service resource](/rest/services-reference/enterprise/geometry-service/). This operation calculates areas and perimeter lengths for each polygon specified in the input array. The input polygon is simplified when the `calculationType` is not `planar`. You can provide arguments to the `areasAndLengths` operation as query parameters defined in the following parameters table.

## Request parameters

| Parameter | Details |
|---|---|
| polygons | Specifies the array of polygons whose areas and lengths are to be computed. The spatial reference of the polygons is specified by sr. The structure of each polygon in the array is the same as the structure of the JSON polygon objects returned by ArcGIS REST API.JSON structures:Syntax: 2 3 { "geometries" : [ <geometry1>, <geometry1>, ..., <geometryN> ] }Example: [ { "rings" : [ [[-117,34],[-116,34],[-117,33],[-117,34]], [[-115,44],[-114,43],[-115,43],[-115,44]] ] }, { "rings" : [ [[32,17],[31,17],[30,17],[30,16],[32,17]] ] } ]For a large set of geometries, you can specify a URL to the input geometries stored in a JSON structure in a file on a public server. The expected format of the file's contents will be the same as that expected if the polygons were directly embedded in the request.URL-based syntax polygons={"url":"<URL to file>"}URL-based example polygons={"url":"https://<myserver>/<mygeometries>/<afile.txt>"} |
| sr | Specifies the well-known ID (WKID) of the spatial reference or a spatial reference JSON object for the input polygons. For a list of valid WKID values, see Using spatial references. |
| lengthUnit | Specifies the length unit used to calculate the perimeters of the polygons. If calculationType is planar, lengthUnit can be an integer representing any well-known ID (WKID) of an esriSRUnitType constant. If lengthUnit is not specified, the units are derived from sr. If calculationType is not planar, lengthUnit must be a WKID of a linear esriSRUnitType constant, such as esriSRUnit_Kilometer (9036) or esriSRUnit_SurveyMile (9035). It cannot be an angular unit. If lengthUnit is not specified, the units are meters. For a list of valid units, see esriSRUnitType Constants and esriSRUnit2Type Constant. |
| areaUnit | Specifies the area unit used to calculate the areas of the polygons. If calculationType is planar, the areaUnit can be an integer representing the well-known id (WKID) of any esriSRUnitType constant or one of the additional values shown below. If areaUnit is not specified, the units are derived from sr. If calculationType is not planar, areaUnit must be a WKID of a linear esriSRUnitType constant, such as esriSRUnit_Kilometer (9036) or esriSRUnit_SurveyMile (9035), or one of the additional values shown below. It cannot be an angular unit. If areaUnit is not specified, the units are meters. For a list of valid units, see esriSRUnitType Constants and esriSRUnit2Type Constant.Additional Values for areaUnit : esriSquareInches \| esriSquareFeet \| esriSquareYards \| esriAcres \| esriSquareMiles \| esriSquareMillimeters \| esriSquareCentimeters \| esriSquareDecimeters \| esriSquareMeters \| esriAres \| esriHectares \| esriSquareKilometersSyntaxIf one of the additional values for the area unit is used, put it in JSON format. {"areaUnit": "<esriAreaUnits>"}Examples {"areaUnit": "esriSquareFeet"} {"areaUnit": "esriHectares"} |
| calculationType | Specifies the type defined for the area and length calculation of the input geometries. The type can be one of the following values:planar — Planar measurements use 2D Euclidean distance to calculate area and length. Use this type only if the area or length needs to be calculated in the given spatial reference. Otherwise, use preserveShape .geodesic — Use this type to calculate an area or length using only the vertices of the polygon and define the lines between the points as geodesic segments independent of the actual shape of the polygon. A geodesic segment is the shortest path between two points on an ellipsoid.preserveShape — This type calculates the area or length of the geometry on the surface of the earth ellipsoid. The shape of the geometry in its coordinate system is preserved. |
| f | The response format. The default response format is html .Values: html \| json \| pjson |

## Example usage

The following is a decoded sample request URL (the actual URL must be encoded) for `areasAndLengths` demonstrating how the areas and lengths of two polygons are calculated. The lengths are returned in miles, and the areas are returned in acres.

[`https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/areasAndLengths?sr=102009&polygons=[{"rings":[[[-628833,206205],[-630269,192298],[-631848,173991],[-616471,341822],[-620213,301450],[-625923,237538],[-628833,206205]]]},{"rings":[[[0,0],[0,100000],[100000,100000],[100000,0],[0,0]]]}]&lengthUnit=9035&areaUnit={"areaUnit":"esriAcres"}&calculationType=preserveShape&f=html`](https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/areasAndLengths?sr=102009&polygons=%5B%7B%22rings%22%3A%5B%5B%5B-628833%2C206205%5D%2C%5B-630269%2C192298%5D%2C%5B-631848%2C173991%5D%2C%5B-616471%2C341822%5D%2C%5B-620213%2C301450%5D%2C%5B-625923%2C237538%5D%2C%5B-628833%2C206205%5D%5D%5D%7D%2C%7B%22rings%22%3A%5B%5B%5B0%2C0%5D%2C%5B0%2C100000%5D%2C%5B100000%2C100000%5D%2C%5B100000%2C0%5D%2C%5B0%2C0%5D%5D%5D%7D%5D&lengthUnit=9035&areaUnit=%7B%22areaUnit%22%3A%22esriAcres%22%7D&calculationType=preserveShape&f=html)

## JSON Response syntax



```
{
  "areas": [ <area1>, <area2>, ..., <areaN> ],
  "lengths": [ <length1>, <length2>, ..., <lengthN> ]
}
```

## JSON Response example



```
{
  "areas": [
    2150.340979272913,
    2800449.740201426
  ],
  "lengths": [
    222.93213167603818,
    264.5927746444603
  ]
}
```