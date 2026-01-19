# Feature object

> Source: [/rest/services-reference/enterprise/feature-object/](https://developers.arcgis.com/rest/services-reference/enterprise/feature-object/)

## Overview

This topic discusses the JSON representation of feature objects.



```
{
  "geometry": <geometry>,

  "attributes": {
    "name1": <value1>,
    "name2": <value2>,
  }
}
```



```
{
  "geometry": {"x": -118.15, "y": 33.80},

  "attributes": {
    "OWNER": "Joe Smith",
    "VALUE": 94820.37,
    "APPROVED": true,
    "LASTUPDATE": 1227663551096
  }
}
```

A feature consists of the following two properties. All properties are optional.

-   The `geometry` specifies the feature geometry. It can be any of the supported geometry types. It is a JSON object as defined in the [Geometry Objects](/rest/services-reference/enterprise/geometry-objects/) documentation.
-   The `attributes` property specifies the feature attributes. It is a JSON object that contains a dictionary of name-value pairs. The names are the feature field names. The values are the field values, and they can be any of the standard JSON types: string, number, and boolean. Note that date values are encoded as numbers. The number represents the number of milliseconds since epoch (January 1, 1970) in UTC.