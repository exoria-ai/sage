# Domain objects

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/domain-objects/

## Examples

```json
1
2
3
4
5
{
  "type": "range",
  "name": "<domainName>",
  "range": [ <minValue>, <maxValue> ]
}
```

```json
1
2
3
4
5
{
  "type": "range",
  "name": "Measured Length",
  "range": [1,10000]
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
{
  "type": "codedValue",
  "name": "<domainName>",
  "codedValues": [
  {"name": "<codeName1>", "code": <code1>},
  {"name": "<codeName2>", "code": <code2> }
  ]
}
```

