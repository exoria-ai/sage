# Geometry objects

> Source: [/rest/services-reference/enterprise/geometry-objects/](https://developers.arcgis.com/rest/services-reference/enterprise/geometry-objects/)

## Overview

This topic defines the JSON formats of the geometry and spatial reference objects. Geometry types can act as accepted values for operations, such as the [Difference](/rest/services-reference/enterprise/difference/) operation for geometry service resources or the feature layer-level [Query](/rest/services-reference/enterprise/query-feature-service-layer/) operation, or in the properties of a layer resource, when operations and properties include a geometryType parameter or response property.

The following geometry objects are discussed:

-   Point
-   Multipoint
-   Polyline
-   Polygon
-   Envelope

### Spatial reference

A [spatial reference](/rest/services-reference/enterprise/using-spatial-references/) can be defined using a well-known ID (wkid) or well-known text used. The xy and z tolerance values are 1 mm or the equivalent in the unit of the coordinate system. If the coordinate system uses feet, the tolerance is `0.00328083333` ft. The resolution values are 10x smaller or 1/10 the tolerance values. Thus, `0.0001` m or `0.0003280833333` ft. For geographic coordinate systems using degrees, the equivalent of a mm at the equator is used.

The well-known ID (WKID) for a given spatial reference can occasionally change. For example, the WGS 1984 Web Mercator (Auxiliary Sphere) projection was originally assigned WKID 102100 but was later changed to 3857. To ensure backward compatibility with older spatial data servers, the JSON wkid property will always be the value that was originally assigned to an SR when it was created.

An additional property, `latestWkid`, identifies the current WKID value (as of a given software release) associated with the same spatial reference.

A spatial reference can optionally include a definition for a vertical coordinate system (VCS), which is used to interpret the z-values of a geometry. A VCS defines units of measure, the location of where z is 0, and whether the positive vertical direction is up or down. When a vertical coordinate system is specified with a WKID, the same caveat as mentioned above applies. There are two VCS WKID properties: `vcsWkid` and `latestVcsWkid`. A VCS WKT can also be embedded in the string value of the wkt property. In other words, the WKT syntax can be used to define an SR with both horizontal and vertical components in one string. If either part of an SR is custom, the entire SR will be serialized with only the wkt property.

### Point

A point (specified as `esriGeometryPoint`) contains `x` and `y` properties along with an optional `spatialReference` property. A point can also contain `m`, `z`, and `id` properties. A point is empty when its x property is present and has the value `null`. An empty point has no location in space.



```
{
  "x": <x>,
  "y": <y>,
  "z": <z>,
  "m": <m>,
  "id":<id>,
  "spatialReference": { <spatialReference> }
}
```

A 2D-point with a spatial reference

2D



```
{
  "x": -118.15,
  "y": 33.80,
  "spatialReference": { "wkid": 4326 }
}
```

A 3D-point

3D



```
{
  "x": -118.15,
  "y": 33.80,
  "z": 10.0
}
```

A point with m and id properties.



```
{
  "x": 10,
  "y": 42,
  "m": 9,
  "id": 1
}
```

An empty point

Empty



```
{
  "x": null
}
```

### Multipoint

A multipoint (specified as `esriGeometryMultipoint`) contains an array of points, along with an optional `spatialReference` property. A multipoint can also have Boolean-valued `hasZ`, `hasM`, and `id` properties. These properties control the interpretation of elements of the points array. Omitting the `hasZ`, `hasM`, or `id` properties is equivalent to setting the properties to `false`.

Each element of the points array is itself an array of two, three, or four numbers. It will have two elements for 2D points, two or three elements for 2D points with Ms, three elements for 3D points, and three or four elements for 3D points with Ms. In all cases, the x-coordinate is at index 0 of a point's array, and the y-coordinate is at index 1. For 2D points with Ms, the m-coordinate, if present, is at index 2. For 3D points, the z-coordinate is required and is at index 2. For 3D points with Ms, the z-coordinate is at index 2, and the m-coordinate, if present, is at index 3.

If the points array contains an empty point, it is ignored.

A multipoint can also have an array of integer values called `ids` representing the ids of the points. The `ids` array must have the same number of elements as the `points` array.

An empty multipoint has a points array with no elements.



```
{
  "hasM": <true|false>,
  "hasZ": <true|false>,
  "points":
  [
    [ <x1>, <y1>, <z1>, <m1> ],
    [ <x2>, <y2>, <z2>, <m2> ], ...,
    [ <xn>, <yn>, <zn>, <mn> ]
  ],
  "ids":
  [
    [ <id1>, <id2>, ..., <idn> ],
  ]
  "spatialReference": { <spatialReference> }
}
```

A 2D-multipoint with a spatial reference



```
{
  "points":
  [
    [-97.06138, 32.837],
    [-97.06133, 33.836],
    [-98.2, 34.834],
    [-97, 40]
  ],
  "spatialReference": { "wkid": 4326 }
}
```

A 3D-multipoint



```
{
  "hasZ": true,
  "points":
  [
    [ -97.06138, 32.837, 35.2],
    [ -97.06133, 32.836, 35.3],
    [-97.06124, 32.834, 35.4],
    [-97.06127, 32.832, 35.5]
  ]
}
```

A 2D-multipoint with m-values and id-values



```
{
  "hasM": true,
  "points":
  [
    [-97.06138, 32.837],
    [-97.06133, 33.836],
    [-98.2, 34.834],
    [-97, 40]
  ],
  "ids": [1, 2, 3, 4]
}
```

An empty multipoint

Empty



```
{
  "points": []
}
```

### Polyline

A polyline (specified as `esriGeometryPolyline`) contains the arrays for either the `paths` or `curvePaths` properties, and a `spatialReference` property. For polylines with `curvePaths`, see the sections on [Curve objects](#curve-objects) and [Polyline with curves](#polyline-with-curves). Each path is represented as an array of points, and each point in the path is represented as an array of numbers. A polyline can also have Boolean-valued `hasM`, `hasZ`, and `ids` properties. These properties control the interpretation of elements of the points array. Omitting the `hasZ`, `hasM`, or `ids` properties is equivalent to setting the properties to `false`.

See the description of [multipoints](#multipoint) for details on how the point arrays are interpreted.

A polyline can have an `ids` property which is an array of an array of doubles. The `ids` array must have the same number of elements as the `paths` array. Each element in the `ids` array must have the same number of elements as the corresponding element in the `paths` array.

An empty polyline is represented with an empty array for the `paths` array.



```
{
  "hasZ": <true|false>,
  "hasM": <true|false>,
  "paths":
  [
    [
      [<x11>, <y11>, <z11>, <m11>], ...,
      [<x1N>, <y1N>, <z1N>, <m1N>]
    ],
    ...,
    [
      [<xk1>, <yk1>, <zk1>, <mk1>], ...,
      [<xkM>, <ykM>, <zkM>, <mkM>]
    ]
  ],
  "ids":
  [
    [ <id11>, ..., <id1N> ], ..., [ <idk1>, ..., <idkM>]
  ],
  "spatialReference": { <spatialReference> }
}
```

A 2D-polyline with a spatial reference. The polyline has one path.



```
{
  "paths": [
    [
      [-97.06138, 32.837],
      [-97.06133, 33.836],
      [-98.2, 34.834],
      [-97, 40]
    ]
  ],
  "spatialReference": {"wkid": 4326}
}
```

A 2D-polyline with m-values. The polyline has two paths.



```
{
  "hasM": true,
  "paths": [
    [
      [97.1, 32.8, 5],
      [98.6, 31, 6],
      [99, 30.5, 7],
      [99.1, 41, 8]
    ],
    [
      [-80, 40, 9],
      [-81, 50, 10]
    ]
  ]
}
```

A 3D-polyline with id-values. The polyline has three paths.



```
{
  "hasZ": true,
  "paths": [
    [
      [5, 10, 20],
      [10, 15, 18],
      [15, 10, 19],
      [20, 15, 21]
    ],
    [
      [30, 20, 22],
      [35, 15, 24],
      [30, 10, 22]
    ],
    [
      [15, 5, 12],
      [30, 5, 12]
    ]
  ],
  "ids":
  [
    [1, 2, 3, 4], [5, 6, 7], [8, 9]
  ]
}
```

Empty



```
{
  "paths": []
}
```

### Polygon

A polygon (specified as `esriGeometryPolygon`) contains the arrays for either the `rings` or `curveRings` properties, and an optional `spatialReference` property. For polygons with `curveRings` , see the sections on [Curve objects](#curve-objects) and [Polygon with curves](#polygon-with-curves). Each ring is represented as an array of points. The first point of each ring is always the same as the last point. Each point in the ring is represented as an array of numbers. A polygon can also have Boolean-valued `hasM` and `hasZ` properties and an array of `id` values.

See the description of [multipoints](#multipoint) for details on how the point arrays are interpreted.

A polygon can have an `ids` property which is an array of an array of doubles. The `ids` array must have the same number of elements as the `rings` array. Each element in the `ids` array must have the same number of elements as the corresponding element in the `rings` array.

An empty polygon is represented with an empty array for the `rings` property.

Polygons should be topologically simple. Exterior rings are oriented clockwise, while holes are oriented counterclockwise. Rings can touch at a vertex or self-touch at a vertex, but there should be no other intersections. Polygons returned by services are topologically simple.

When drawing a polygon, use the even-odd fill rule. The even-odd fill rule will guarantee that the polygon will draw correctly even if the ring orientation is not as described above.



```
{
  "hasZ": <true|false>,
  "hasM": <true|false>,
  "rings":
  [
    [
      [<x11>, <y11>, <z11>, <m11>], ...,
      [<x1N>, <y1N>, <z1N>, <m1N>]
    ],
    ...,
    [
      [<xk1>, <yk1>, <zk1>, <mk1>], ...,
      [<xkM>, <ykM>, <zkM>, <mkM>]
    ]
  ],
  "ids":
  [
    [ <id11>, ..., <id1N> ], ..., [ <idk1>, ..., <idkM>]
  ],
  "spatialReference": { <spatialReference> }
}
```

A 2D-polygon with a spatial reference. The polygon has one ring.



```
{
  "rings":
  [
    [
      [-97, 32],
      [-98, 34],
      [-96, 36],
      [-97, 32]
    ]
  ],
  "spatialReference": { "wkid": 4326 }
}
```

A 3D-polygon with m-values. The polygon has two rings. Note that the second ring does not have m-values defined. They will be set to NaN.



```
{
  "hasZ": true,
  "hasM": true,
  "rings":
  [
    [
      [-97, 32, 18.1, 10],
      [-98, 34, 18.2, 12],
      [-96, 36, 18, 14],
      [-97, 32, 18.1, 10]
    ],
    [
      [-51, 32, 19.1, null],
      [-40, 34, 19.2, null],
      [-30, 30, 19, null],
      [-28, 20, 19.1, null],
      [-51, 32, 19.1, null]
    ]
  ]
}
```

A 3D-polygon with id-values. The polygon has three rings.



```
{
  "hasZ": true,
  "rings": [
    [
      [5, 10, 20],
      [10, 15, 18],
      [15, 10, 19],
      [20, 15, 21],
      [20, 8, 22],
      [5, 10, 20]
    ],
    [
      [30, 20, 22],
      [35, 15, 24],
      [30, 10, 22],
      [30, 20, 22]
    ],
    [
      [15, 5, 12],
      [30, 5, 12],
      [30, 2, 1.5],
      [15, 5, 12]
    ]
  ],
  "ids":
  [
    [1, 2, 3, 4, 5, 1], [6, 7, 8, 6], [9, 10, 11, 9]
  ]
}
```

An empty polygon.



```
{
  "rings": []
}
```

### Curve objects

A circular arc, an elliptic arc, and a cubic Bézier curve can be represented as a JSON curve object. A curve object is a segment in a polyline or polygon. It cannot be used as a stand-alone object.

A curve object is given in a compact "curve to" manner with the first element representing the "to" point or end point. The "from" point is derived from the previous segment or curve object.

An open circular arc is represented by the `c` property. This is defined by an end point and an interior point.



```
{
  "c": [
    [<x>, <y>, <z>, <m>],
    [<interior_x>, <interior_y>]
  ]
}
```

Another way to represent an arc, which is mostly used for full circles, is by the `a` property. This is defined by the following information:

-   End point
-   Center point
-   Specifying whether the arc is minor (less than 180 degrees) or major. If minor, specify 1. If major, specify 0.
-   Specifying if the arc is oriented clockwise or counterclockwise. If clockwise, specify 1. If counterclockwise, specify 0.



```
{
  "a": [
    [<x>, <y>, <z>, <m>],
    [<center_x>, <center_y>],
    <minor>,
    <clockwise>
  ]
}
```

An elliptic arc is represented by the `a` property, an array that consists of seven elements. An `a` property with four elements represents a circular arc. The array that represents an elliptic arc is as follows:

-   End point
-   Center point
-   Specifying whether the arc is minor (less than 180 degrees) or major. If minor, specify 1. If major, specify 0.
-   Specifying if the arc is oriented clockwise or counterclockwise. If clockwise, specify 1. If counterclockwise, specify 0.
-   Specifying the angle of rotation of the major axis in radians, with a positive value being counterclockwise
-   Setting the length of the semi-major axis
-   Specifying ratio of the minor axis to major axis



```
{
  "a": [
    [<x>, <y>, <z>, <m>],
    [<center_x>, <center_y>],
    <minor>,
    <clockwise>,
    <rotation>,
    <axis>,
    <ratio>
  ]
}
```

A cubic Bezier curve is represented by the `b` property. This is defined by an end point and two control points.



```
{
  "b": [
    [<x>, <y>, <z>, <m>],
    [<x>, <y>],
    [<x>, <y>]
  ]
}
```

#### Polyline with curves

A polyline with curves contains an array for the `curvePaths` property and an optional `spatialReference` property. Each curve path is represented as an array containing points and curve objects.

A polyline that is a circular arc from (0, 0) to (3, 3) through (1, 4).



```
{
  "curvePaths": [
    [
      [0, 0],
      {"c": [[3, 3], [1, 4]]}
    ]
  ]
}
```

A polyline consisting of a line segment from (3.5, 0) to (3.5, 1) and a clockwise circle starting and ending at (3.5, 1) with center point (3, 2).



```
{
  "curvePaths":
  [
    [
      [3.5, 0],
      [3.5, 1],
      {"a": [[3.5, 1], [3, 2], 0, 1]}
    ]
  ]
}
```

A polyline containing a line segment from (6, 3) to (5, 3); a Bézier curve from (5, 3) to (3, 2) with control points (6, 1) and (2, 4); a segment from (3, 2) to (1, 2); and an elliptic arc from (1, 2) to (0, 2) with center point (0, 3), minor = 0, clockwise = 0, rotation = 2.094395102393195 (120 degrees), semi-major axis = 1.83, ratio = 0.33333333.



```
{
  "curvePaths":
  [
    [
      [6, 3],
      [5, 3],
      {"b": [[3, 2], [6, 1], [2, 4]]},
      [1, 2],
      {"a": [[0, 2], [0, 3], 0, 0, 2.094395102393195, 1.83, 0.33333333]}
    ]
  ]
}
```

### Polygon with curves

A polygon with curves contains an array of `curveRings` and an optional `spatialReference`.

A multipart polygon with m-values containing a triangle with start/end point (11, 11), a Bézier curve from (11, 11) to (15, 15) with control points (10, 17) and (18, 20), a circular arc from (15, 15) to (20, 16) through (20, 14), and paths for connecting to an older server.



```
{
  "hasM": true,
  "curveRings":
  [
    [
      [11, 11, 1],
      [10, 10, 2],
      [10, 11, 3],
      [11, 11, 4],
      {"b": [[15, 15, 2], [10, 17], [18, 20]]},
      [11, 11, 4]
    ],
    [
      [15, 15, 1],
      {"c": [[20, 16, 3], [20, 14]]},
      [15, 15, 3]
    ]
  ],
  "rings":
  [
    [
      [11, 11, 1],
      [10, 10, 2],
      [10, 11, 3],
      [11, 11, 4]
    ],
    [
      [15, 15, 1],
      [11, 11, 2],
      [12, 15.5, null],
      [15.4, 17.3, null],
      [15, 15, 3]
    ],
    [
      [20, 16 ,1],
      [20, 14, null],
      [17.6, 12.5, null],
      [15, 15, 2],
      [20, 16, 3]
    ]
  ]
}
```

### Envelope

An envelope (specified as `esriGeometryEnvelope`) is an axis-aligned rectangle defined by a range of values for each coordinate and attribute and an optional `spatialReference` property. The `zmin`, `zmax`, `mmin`, `mmax`, `idmin`, and `idmax` properties are optional.

An empty envelope has no location in space and is defined by the presence of an `xmin` property with a `null` value.



```
{
  "xmin": <xmin>,
  "ymin": <ymin>,
  "xmax": <xmax>,
  "ymax": <ymax>,
  "zmin": <zmin>,
  "zmax": <zmax>,
  "mmin": <mmin>,
  "mmax": <mmax>,
  "idmin": <idmin>,
  "idmax": <idmax>
  "spatialReference": { <spatialReference> }
}
```

A 2D-envelope with a spatial reference



```
{
  "xmin": -109.55,
  "ymin": 25.76,
  "xmax": -86.39,
  "ymax": 59.33,
  "spatialReference": { "wkid": 4326 }
}
```

A 3-D envelope



```
{
  "xmin": -109.55,
  "ymin": 25.76,
  "xmax": -86.39,
  "ymax": 59.33,
  "zmin": -12.0,
  "zmax": 13.3
}
```

A 2-D envelope with m-values and id-values



```
{
  "xmin": -109.55,
  "ymin": 25.76,
  "xmax": -86.39,
  "ymax": 59.33,
  "mmin": 12.2,
  "mmax": 18.6,
  "idmin": 1,
  "idmax": 3
}
```

An empty envelope with a spatial reference



```
{
  "xmin": null,
  "spatialReference": { "wkid": 4326 }
}
```