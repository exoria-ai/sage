# Symbol Objects

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/symbol-objects/

## Examples

```json
1
[ <red>, <green>, <blue>, <alpha> ]
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
{
  "type": "esriSMS",
  "style": "< esriSMSCircle | esriSMSCross | esriSMSDiamond | esriSMSSquare | esriSMSX | esriSMSTriangle >",
  "color": <color>,
  "size": <size>,
  "angle": <angle>,
  "xoffset": <xoffset>,
  "yoffset": <yoffset>,
  "outline": { //if outline has been specified
    "color": <color>,
    "width": <width>
  }
}
```

