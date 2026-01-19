# Renderer objects

> Source: [/rest/services-reference/enterprise/renderer-objects/](https://developers.arcgis.com/rest/services-reference/enterprise/renderer-objects/)

This topic discusses the JSON representation of renderer objects. The following renderers are discussed here:

-   Simple renderer
-   Unique value renderer
-   Class breaks renderer

### Simple renderer

A simple renderer is a renderer that uses one symbol only. The `type` property for simple renderers is `simple`. The `rotationType` property controls the origin and direction of rotation. If the `rotationType` is defined as `arithmetic`, the symbol is rotated from east in a counter-clockwise direction where east is the 0° axis. If the `rotationType` is defined as `geographic`, the symbol is rotated from north in a clockwise direction where north is the 0° axis. The `rotationExpression` property is a constant value or an expression that derives the angle of rotation based on the feature attribute value. When an attribute name is specified in `rotationExpression`, it's enclosed in square brackets, for example, `[Rotation]`.



```
{
  "type" : "simple",
  "symbol" :  <symbol>,
  "label" : "<label>",
  "description" : "<description>",
  "rotationType": "<arithmetic | geographic>",
  "rotationExpression": "<expression>"
}
```



```
{
  "type": "simple",
  "symbol":
  {
    "type": "esriSMS",
    "style": "esriSMSCircle",
    "color": [255,0,0,255],
    "size": 5,
    "angle": 0,
    "xoffset": 0,
    "yoffset": 0,
    "outline":
  {
    "color": [0,0,0,255],
    "width": 1
    }
  },
  "label": "",
  "description": "",
  "rotationType": "geographic",
  "rotationExpression": "[Rotation] * 2"
}
```

### Unique value renderer

A unique value renderer symbolizes groups of features that have matching field values. The type property for unique value renderers is uniqueValue. The rotationType property controls the origin and direction of rotation. If the rotationType is defined as arithmetic, the symbol is rotated from east in a counter-clockwise direction where east is the 0° axis. If the rotationType is defined as geographic, the symbol is rotated from north in a clockwise direction where north is the 0° axis. The `rotationExpression` property is a constant value or an expression that derives the angle of rotation based on the feature attribute value. When an attribute name is specified in `rotationExpression`, it's enclosed in square brackets, for example, `[Rotation]`.



```
{
  "type" : "uniqueValue",
  "field1" : "<field1>",
  "field2" : "<field2>",
  "field3" : "<field3>",
  "fieldDelimiter" : "<fieldDelimiter>",
  "defaultSymbol" :  <symbol>,
  "defaultLabel" : "<defaultLabel>",
  "uniqueValueInfos" : [
    {
      "value" : "<value1>",
      "label" : "<label1>",
      "description" : "<description1>",
      "symbol" :  <symbol1>
    },
    {
      "value" : "<value2>",
      "label" : "<label2>",
      "description" : "<description2>",
      "symbol" :  <symbol2>
    }
  ],
  "rotationType": "<arithmetic | geographic>",
  "rotationExpression": "<expression>"
}
```



```
{
  "type": "uniqueValue",
  "field1": "SubtypeCD",
  "field2": null,
  "field3": null,
  "fieldDelimiter": ", ",
  "defaultSymbol":
  {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "color": [130,130,130,255],
    "width": 1
  },
  "defaultLabel": "\u003cOther values\u003e",
  "uniqueValueInfos": [
    {
      "value": "1",
      "label": "Duct Bank",
      "description": "Duct Bank description",
      "symbol":
      {
        "type": "esriSLS",
        "style": "esriSLSDash",

        "color": [76,0,163,255],
        "width": 1
      }
    },
    {
      "value": "2",
      "label": "Trench",
      "description": "Trench description",
      "symbol":
      {
        "type": "esriSLS",
        "style": "esriSLSDot",
        "color": [115,76,0,255],
        "width": 1
      }
    }
  ],
  "rotationType": "geographic",
  "rotationExpression": "[Rotation] * 2"
}
```

### Class breaks renderer

A class breaks renderer symbolizes each feature based on the value of some numeric field. The type property for class breaks renderer is classBreaks. The rotationType property controls the origin and direction of rotation. If the rotationType is defined as arithmetic, the symbol is rotated from east in a counter-clockwise direction where east is the 0° axis. If the rotationType is defined as geographic, the symbol is rotated from north in a clockwise direction where north is the 0° axis. The `rotationExpression` property is a constant value or an expression that derives the angle of rotation based on the feature attribute value. When an attribute name is specified in `rotationExpression`, it's enclosed in square brackets, for example, `[Rotation]`.

The `classificationMethod` property determines the classification method that was used to generate class breaks. The `normalizationType` property accepts either `normalizationField`, `normalizationType`, and `normalizationTotal`. Use `normalizationType` to determine how the data was normalized. If `normalizationType` is missing, it means no normalization was applied. When `normalizationType` is `esriNormalizeByField`, use `normalizationField` to determine the field used to normalize the data. When `normalizationType` is `esriNormalizeByPercentOfTotal`, use `normalizationTotal` to determine the total value. The `defaultSymbol` property symbolizes features whose value does not belong in any of the specified `classBreaks`. The `backgroundFillSymbol` property symbolizes polygon features with proportional symbols, use `backgroundFillSymbol` to specify a simple fill symbol to represent polygon features, and use marker symbols of varying sizes in `classBreakInfos` to indicate the quantity.



```
{
  "type": "classBreaks",
  "field": "<field>",
  "classificationMethod": "<classification method>",
  "normalizationType": "<esriNormalizeByField | esriNormalizeByLog | esriNormalizeByPercentOfTotal>",
  "normalizationField": "<normalization field>", //when normalizationType is esriNormalizeByField
  "normalizationTotal": <total value>, //when normalizationType is esriNormalizeByPercentOfTotal
  "defaultSymbol": <symbol>,
  "defaultLabel": "<label>",
  "backgroundFillSymbol": <simple fill symbol>, //supported only for polygon features
  "minValue": <minValue>, //when missing, it defaults to 0
  "classBreakInfos": [
    {
      "classMaxValue": <classMaxValue1>,
      "label": "<label1>",
      "description": "<description1>",
      "symbol":  <symbol1>
    },
    {
      "classMaxValue": <classMaxValue2>,
      "label": "<label2>",
      "description": "<description2>",
      "symbol":  <symbol2>
    }
  ],
  "rotationType": "<arithmetic | geographic>",
  "rotationExpression": "<expression>"
}
```



```
{
  "type": "classBreaks",
  "field": "Shape.area",
  "classificationMethod": "esriClassifyManual",
  "defaultSymbol": {
    "type": "esriSFS",
    "style": "esriSFSDiagonalCross",
    "color": [255,0,0,255],
    "outline": {
      "type": "esriSLS",
      "style": "esriSLSSolid",
      "color": [110,110,110,255],
      "width": 0.5
    }
  }
  "minValue": 10.0,
  "classBreakInfos": [
    {
      "classMaxValue": 1000,
      "label": "10.0 - 1000.000000",
      "description": "10 to 1000",
      "symbol":
      {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [236,252,204,255],
        "outline": {
          "type": "esriSLS",
          "style": "esriSLSSolid",
          "color": [110,110,110,255],
          "width": 0.4
        }
      }
    },
    {
      "classMaxValue": 8000,
      "label": "1000.000001 - 8000.000000",
      "description": "1000 to 8000",
      "symbol": {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [218,240,158,255],
        "outline": {
          "type": "esriSLS",
          "style": "esriSLSSolid",
          "color": [110,110,110,255],
          "width": 0.4
        }
      }
    },
    {
      "classMaxValue": 10000,
      "label": "8000.000001 - 10000.000000",
      "description": "8000 to 10000",
      "symbol": {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [255,255,0,255],
        "outline": {
          "type": "esriSLS",
          "style": "esriSLSSolid",
          "color": [110,110,110,255],
          "width": 0.4
        }
      }
    }
  ],
  "rotationType": "geographic",
  "rotationExpression": "[Rotation] * 2"
}
```