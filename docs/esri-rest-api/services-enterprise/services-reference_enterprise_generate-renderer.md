# Generate Renderer (Feature Service/Layer)

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/generate-renderer/

## Service Info

- **Parameter:** Details
- **f:** The response format. The default response format is html .
Values: html | json
- **classificationDef:** Description: The definition with which the renderer is generated.Note: Use either the ClassBreaks or UniqueValue classification definition.Syntax: classificationDef = classification definitionExample:Use dark colors for code blocksCopy1
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
20
21
22
23
24
25
26
27
28
29
//classBreaks classification definition
classificationDef = {
  "type": "classBreaksDef",
  "classificationField": "POP2010",
  "classificationMethod": "esriClassifyNaturalBreaks",
  "breakCount": 5,
  "normalizationType": "esriNormalizeByField",
  "normalizationField": "Area"
}

//uniqueValue classification definition with symbology
classificationDef = {
  "type": "uniqueValueDef",
  "uniqueValueFields": ["Type", "AdminClass"],
  "fieldDelimiter": ",",
  "baseSymbol":
  {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "width": 2
  },
  "colorRamp":
  {
    "type": "algorithmic",
    "fromColor": [115,76,0,255],
    "toColor": [255,25,86,255],
    "algorithm": "esriHSVAlgorithm"
  }
}
- **where:** Description: A where clause for which the data needs to be classified. Any legal SQL where clause operating on the fields in the layer/table is allowed.Example: where = POP2000 > 350000
- **gdbVersion:** Description: The geodatabase version from which the data will be rendered. This parameter applies only if the isDataVersioned  property of the layer is true .If this is not specified, the renderer will be generated from the published map’s version.
Syntax: gdbVersion=<version>
Example: gdbVersion=SDE.DEFAULT

## Description

The generateRenderer operation is performed on a layer/table resource. This operation groups data using the supplied classificationDef (classification definition) and an optional where clause. The result is a renderer object. Use baseSymbol and colorRamp to define the symbols assigned to each class. If the operation is performed on a table, the result is a renderer object containing the data classes and no symbols.

You can provide arguments to the generateRenderer operation as defined in the following parameters table:

## Request Parameters

## Examples

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
20
21
22
23
24
25
26
27
28
29
//classBreaks classification definition
classificationDef = {
  "type": "classBreaksDef",
  "classificationField": "POP2010",
  "classificationMethod": "esriClassifyNaturalBreaks",
  "breakCount": 5,
  "normalizationType": "esriNormalizeByField",
  "normalizationField": "Area"
}

//uniqueValue classification definition with symbology
classificationDef = {
  "type": "uniqueValueDef",
  "uniqueValueFields": ["Type", "AdminClass"],
  "fieldDelimiter": ",",
  "baseSymbol":
  {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "width": 2
  },
  "colorRamp":
  {
    "type": "algorithmic",
    "fromColor": [115,76,0,255],
    "toColor": [255,25,86,255],
    "algorithm": "esriHSVAlgorithm"
  }
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
20
21
22
23
24
25
26
27
28
29
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
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
{
 "type": "uniqueValue",
 "field1": "EVENTID",
 "field2": "",
 "field3": "",
 "fieldDelimiter": ",",
 "defaultSymbol": {
  "type": "esriSLS",
  "style": "esriSLSSolid",
  "width": 2
 },
 "defaultLabel": "",
 "uniqueValueInfos": [
  {
   "value": "",
   "label": "",
   "description": "",
   "symbol": {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "width": 2,
    "color": [
     115,77,0,255
    ]
   }
  },
  {
   "value": "Alberto",
   "label": "Alberto",
   "description": "",
   "symbol": {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "width": 2,
    "color": [
     120,122,1,255
    ]
   }
  },
  {
   "value": "Beryl",
   "label": "Beryl",
   "description": "",
   "symbol": {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "width": 2,
    "color": [
     83,133,3,255
    ]
   }
  },
  {
   "value": "Chris",
   "label": "Chris",
   "description": "",
   "symbol": {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "width": 2,
    "color": [
     39,143,4,255
    ]
   }
  },
  {
   "value": "Debby",
   "label": "Debby",
   "description": "",
   "symbol": {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "width": 2,
    "color": [
     255,25,86,255
    ]
   }
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
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
```

