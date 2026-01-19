# Domain objects

> Source: [/rest/services-reference/enterprise/domain-objects/](https://developers.arcgis.com/rest/services-reference/enterprise/domain-objects/)

## Overview

This topic discusses the JSON representation of domain objects. Domains specify the set of valid values for a field.

The following domain objects are discussed:

-   Range Domain
-   Coded value domain
-   Inherited domain

### Range domain

Range domain specifies a range of valid values for a field. The type property for range domains is range.



```
{
  "type": "range",
  "name": "<domainName>",
  "range": [ <minValue>, <maxValue> ]
}
```



```
{
  "type": "range",
  "name": "Measured Length",
  "range": [1,10000]
}
```

### Coded value domain

Coded value domain specifies an explicit set of valid values for a field. Each valid value is assigned a unique name. The `type` property for coded value domains is `codedValue`.



```
{
  "type": "codedValue",
  "name": "<domainName>",
  "codedValues": [
  {"name": "<codeName1>", "code": <code1>},
  {"name": "<codeName2>", "code": <code2> }
  ]
}
```



```
{
  "type": "codedValue",
  "name": "Material",
  "codedValues": [
    {
      "name": "Aluminum",
      "code": "AL"
    },
    {
      "name": "Copper",
      "code": "CU"
    },
    {
      "name": "Steel",
      "code": "STEL"
    },
    {
      "name": "Not Applicable",
      "code": "NA"
    }
  ]
}
```

### Inherited domain

Inherited domains apply to domains on subtypes. It implies that the domain for a field at the subtype level is the same as the domain for the field at the layer level.



```
{
  "type": "inherited"
}
```



```
{
  "type": "inherited"
}
```