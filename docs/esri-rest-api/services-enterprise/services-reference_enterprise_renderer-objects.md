# Renderer objects

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/renderer-objects/

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
{
  "type" : "simple",
  "symbol" :  <symbol>,
  "label" : "<label>",
  "description" : "<description>",
  "rotationType": "<arithmetic | geographic>",
  "rotationExpression": "<expression>"
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

