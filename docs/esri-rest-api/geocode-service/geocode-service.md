# Geocode Service

> Source: [/rest/services-reference/enterprise/geocode-service/](https://developers.arcgis.com/rest/services-reference/enterprise/geocode-service/)

**URL:**: https://<catalog-url>/<serviceName>/GeocodeServer

**Methods:**: GET

**Operations:**: Find Address Candidates, Geocode Addresses, Reverse Geocode, Suggest

**Version Introduced:**: 9.3

## Description

Geocoding is the process of assigning a location, usually in the form of coordinate values (points), to an address by comparing the descriptive location elements in the address to those present in the reference material. Addresses come in many forms, ranging from the common address format of a house number followed by the street name and succeeding information, to other location descriptions such as postal zone or census tract. An address includes any type of information that distinguishes a place.

The `GeocodeServer` resource represents a geocode (locator) service and provides basic information associated with the geocode service, such as the service description, address fields, spatial reference, and locator properties. The `GeocodeServer` resource supports the following operations:

| Operation | Details |
|---|---|
| Find Address Candidates | Returns a list of candidates based on address and location. |
| Reverse Geocode | Returns information about all the address fields pertaining to the reverse geocoded address as well as its exact location. |
| Geocode Addresses | Performs batch geocoding. |
| Suggest | Returns a list of autocomplete suggestions for an input text string. Added at 10.3. |

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html .Values: html \| json |

## Example usage

The following is a sample request URL for an `ESRI_Geocode_USA` geocode service:



```
https://organization.example.com/<context>/rest/services/Locators/ESRI_Geocode_USA/GeocodeServer
```

## JSON Response syntax



```
{
  "currentVersion": <currentVersion>,
  "serviceDescription": "<serviceDescription>",
  "capabilities": "<capabilities>",
  "addressFields": [
    {
      "name": "<fieldName1>",
      "alias": "<fieldAlias1>",
      "required": <true | false>,
      "type": "<fieldType1>"
    },
    {
      "name": "<fieldName2>",
      "alias": "<fieldAlias2>",
      "required": <true | false>,
      "type": "<fieldType2>"
    }
  ],
  //If the locator supports geocoding using single line address
  "singleLineAddressField": {
    "name": "<fieldName1>",
    "alias": "<fieldAlias1>",
    "required": <true | false>,
    "type": "<fieldType1>"
  },
  "candidateFields": [
    {
      "name": "<fieldName1>",
      "alias": "<fieldAlias1>",
      "type": "<fieldType1>"
    },
    {
      "name": "<fieldName2>",
      "alias": "<fieldAlias2>",
      "type": "<fieldType2>"
    }
  ],
  "intersectionCandidateFields": [
    {
      "name": "<fieldName1>",
      "alias": "<fieldAlias1>",
      "type": "<fieldType1>"
    },
    {
      "name": "<fieldName2>",
      "alias": "<fieldAlias2>",
      "type": "<fieldType2>"
    }
  ],
  "spatialReference": <spatialReference>,
  "locatorProperties": {
    "<key1>": "<value1>",
    "<key2>": "<value2>"
  },
  "locators": [  //Returns names of locators participating in a composite locator.
    {
      "name": "<name1>"
    },
    {
      "name": "<name2>"
    },
    {
      "name": "<name3>"
    },
    {
      "name": "<name4>"
    },
    {
      "name": "<name5>"
    }
  ]
}
```

## JSON Response example



```
{
  "currentVersion": 10.1,
  "serviceDescription": "null",
  "capabilities": "Geocode,ReverseGeocode,Suggest",
  "addressFields": [
    {
      "name": "Street",
      "type": "esriFieldTypeString",
      "alias": "Street or Intersection",
      "required": true,
      "length": 100
    },
    {
      "name": "City",
      "type": "esriFieldTypeString",
      "alias": "City or Placename",
      "required": false,
      "length": 40
    },
    {
      "name": "State",
      "type": "esriFieldTypeString",
      "alias": "State",
      "required": false,
      "length": 20
    },
    {
      "name": "ZIP",
      "type": "esriFieldTypeString",
      "alias": "ZIP Code",
      "required": false,
      "length": 10
    }
  ],
  "singleLineAddressField": {
    "name": "Single Line Input",
    "type": "esriFieldTypeString",
    "alias": "Full Address",
    "required": false,
    "length": 100
  },
  "candidateFields": [
    {
      "name": "Shape",
      "type": "esriFieldTypeGeometry",
      "alias": "Shape",
      "required": false
    },
    {
      "name": "Score",
      "type": "esriFieldTypeDouble",
      "alias": "Score",
      "required": false
    },
    {
      "name": "Match_addr",
      "type": "esriFieldTypeString",
      "alias": "Match_addr",
      "required": false,
      "length": 120
    },
    {
      "name": "Side",
      "type": "esriFieldTypeString",
      "alias": "Side",
      "required": false,
      "length": 1
    },
    {
      "name": "From",
      "type": "esriFieldTypeString",
      "alias": "From",
      "required": false,
      "length": 10
    },
    {
      "name": "To",
      "type": "esriFieldTypeString",
      "alias": "To",
      "required": false,
      "length": 10
    },
    {
      "name": "PreDir",
      "type": "esriFieldTypeString",
      "alias": "PreDir",
      "required": false,
      "length": 6
    },
    {
      "name": "PreType",
      "type": "esriFieldTypeString",
      "alias": "PreType",
      "required": false,
      "length": 6
    },
    {
      "name": "StreetName",
      "type": "esriFieldTypeString",
      "alias": "StreetName",
      "required": false,
      "length": 32
    },
    {
      "name": "SufType",
      "type": "esriFieldTypeString",
      "alias": "SufType",
      "required": false,
      "length": 6
    },
    {
      "name": "SufDir",
      "type": "esriFieldTypeString",
      "alias": "SufDir",
      "required": false,
      "length": 6
    },
    {
      "name": "City",
      "type": "esriFieldTypeString",
      "alias": "City",
      "required": false,
      "length": 20
    },
    {
      "name": "State",
      "type": "esriFieldTypeString",
      "alias": "State",
      "required": false,
      "length": 2
    },
    {
      "name": "ZIP",
      "type": "esriFieldTypeString",
      "alias": "ZIP",
      "required": false,
      "length": 5
    },
    {
      "name": "Ref_ID",
      "type": "esriFieldTypeInteger",
      "alias": "Ref_ID",
      "required": false
    },
    {
      "name": "User_fld",
      "type": "esriFieldTypeString",
      "alias": "User_fld",
      "required": false,
      "length": 120
    },
    {
      "name": "Addr_type",
      "type": "esriFieldTypeString",
      "alias": "Addr_type",
      "required": false,
      "length": 20
    }
  ],
  "intersectionCandidateFields": [
    {
      "name": "Shape",
      "type": "esriFieldTypeGeometry",
      "alias": "Shape",
      "required": false
    },
    {
      "name": "Score",
      "type": "esriFieldTypeDouble",
      "alias": "Score",
      "required": false
    },
    {
      "name": "Match_addr",
      "type": "esriFieldTypeString",
      "alias": "Match_addr",
      "required": false,
      "length": 120
    },
    {
      "name": "Addr_type",
      "type": "esriFieldTypeString",
      "alias": "Addr_type",
      "required": false,
      "length": 20
    },
    {
      "name": "Side1",
      "type": "esriFieldTypeString",
      "alias": "Side1",
      "required": false,
      "length": 1
    },
    {
      "name": "From1",
      "type": "esriFieldTypeString",
      "alias": "From1",
      "required": false,
      "length": 10
    },
    {
      "name": "To1",
      "type": "esriFieldTypeString",
      "alias": "To1",
      "required": false,
      "length": 10
    },
    {
      "name": "PreDir1",
      "type": "esriFieldTypeString",
      "alias": "PreDir1",
      "required": false,
      "length": 6
    },
    {
      "name": "PreType1",
      "type": "esriFieldTypeString",
      "alias": "PreType1",
      "required": false,
      "length": 6
    },
    {
      "name": "StreetName1",
      "type": "esriFieldTypeString",
      "alias": "StreetName1",
      "required": false,
      "length": 32
    },
    {
      "name": "SufType1",
      "type": "esriFieldTypeString",
      "alias": "SufType1",
      "required": false,
      "length": 6
    },
    {
      "name": "SufDir1",
      "type": "esriFieldTypeString",
      "alias": "SufDir1",
      "required": false,
      "length": 6
    },
    {
      "name": "City1",
      "type": "esriFieldTypeString",
      "alias": "City1",
      "required": false,
      "length": 20
    },
    {
      "name": "State1",
      "type": "esriFieldTypeString",
      "alias": "State1",
      "required": false,
      "length": 2
    },
    {
      "name": "ZIP1",
      "type": "esriFieldTypeString",
      "alias": "ZIP1",
      "required": false,
      "length": 5
    },
    {
      "name": "Ref_ID1",
      "type": "esriFieldTypeInteger",
      "alias": "Ref_ID1",
      "required": false
    },
    {
      "name": "User_fld1",
      "type": "esriFieldTypeString",
      "alias": "User_fld1",
      "required": false,
      "length": 120
    },
    {
      "name": "Side2",
      "type": "esriFieldTypeString",
      "alias": "Side2",
      "required": false,
      "length": 1
    },
    {
      "name": "From2",
      "type": "esriFieldTypeString",
      "alias": "From2",
      "required": false,
      "length": 10
    },
    {
      "name": "To2",
      "type": "esriFieldTypeString",
      "alias": "To2",
      "required": false,
      "length": 10
    },
    {
      "name": "PreDir2",
      "type": "esriFieldTypeString",
      "alias": "PreDir2",
      "required": false,
      "length": 6
    },
    {
      "name": "PreType2",
      "type": "esriFieldTypeString",
      "alias": "PreType2",
      "required": false,
      "length": 6
    },
    {
      "name": "StreetName2",
      "type": "esriFieldTypeString",
      "alias": "StreetName2",
      "required": false,
      "length": 32
    },
    {
      "name": "SufType2",
      "type": "esriFieldTypeString",
      "alias": "SufType2",
      "required": false,
      "length": 6
    },
    {
      "name": "SufDir2",
      "type": "esriFieldTypeString",
      "alias": "SufDir2",
      "required": false,
      "length": 6
    },
    {
      "name": "City2",
      "type": "esriFieldTypeString",
      "alias": "City2",
      "required": false,
      "length": 20
    },
    {
      "name": "State2",
      "type": "esriFieldTypeString",
      "alias": "State2",
      "required": false,
      "length": 2
    },
    {
      "name": "ZIP2",
      "type": "esriFieldTypeString",
      "alias": "ZIP2",
      "required": false,
      "length": 5
    },
    {
      "name": "Ref_ID2",
      "type": "esriFieldTypeInteger",
      "alias": "Ref_ID2",
      "required": false
    },
    {
      "name": "User_fld2",
      "type": "esriFieldTypeString",
      "alias": "User_fld2",
      "required": false,
      "length": 120
    }
  ],
  "spatialReference": {"wkt": "GEOGCS[\"Lat Long WGS84\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]]"},
  "locatorProperties": {
    "MinimumCandidateScore": 10,
    "SideOffsetUnits": "Feet",
    "UICLSID": "{AE5A3A0E-F756-11D2-9F4F-00C04F8ED1C4}",
    "SpellingSensitivity": 80,
    "MinimumMatchScore": 85,
    "EndOffset": "3",
    "IntersectionConnectors": "& @ | and",
    "MatchIfScoresTie": "True",
    "SideOffset": "20",
    "SuggestedBatchSize": 1000,
    "WriteXYCoordFields": "False",
    "WriteStandardizedAddressField": "False",
    "WriteReferenceIDField": "True",
    "WritePercentAlongField": "False"
  }
}
```