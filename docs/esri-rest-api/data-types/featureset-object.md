# FeatureSet object

> Source: [/rest/services-reference/enterprise/featureset-object/](https://developers.arcgis.com/rest/services-reference/enterprise/featureset-object/)

## Overview

This topic discusses the JSON representation of feature sets. The `featureSet` object contains [feature objects](/rest/services-reference/enterprise/feature-object/), including the values for the fields requested by the user. For layers, if you request geometry information, the geometry of each feature is also returned in the `featureSet`. For tables, the `featureSet` does not include geometries.



```
{
  "objectIdFieldName": "<objectIdFieldName>", //optional
  "globalIdFieldName": "<globalIdFieldName>", //optional
  "displayFieldName": "<displayFieldName>", //optional
  "geometryType": "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon | esriGeometryEnvelope>",
  "spatialReference": <spatialReference>, //for feature layers only.
  "hasZ": <true|false>, //optional  Default is false.
  "hasM": <true|false>, //optional  Default is false.
  "fields": [
    {"name": "<fieldName1>", "type": "<fieldType1>", "alias": "<fieldAlias1>", "length": "<length1>"},
    {"name": "<fieldName2>", "type": "<fieldType2>", "alias": "<fieldAlias2>", "length": "<length2>"}
  ],
  "features": [ //features will include geometry for feature layers only
    <feature1>,
    <feature2>
  ]
}
```



```
{
  "objectIdFieldName": "objectid",
  "globalIdFieldName": "globalid",
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 102100,
    "latestWkid": 3857
  },
  "fields": [
    {
      "name": "objectid",
      "alias": "OBJECTID",
      "type": "esriFieldTypeOID"
    },
    {
      "name": "requestid",
      "alias": "Service Request ID",
      "type": "esriFieldTypeString",
      "length": 25
    },
    {
      "name": "requesttype",
      "alias": "Problem",
      "type": "esriFieldTypeString",
      "length": 100
    },
    {
      "name": "comments",
      "alias": "Comments",
      "type": "esriFieldTypeString",
      "length": 255
    },
    {
      "name": "name",
      "alias": "Name",
      "type": "esriFieldTypeString",
      "length": 150
    },
    {
      "name": "phone",
      "alias": "Phone Number",
      "type": "esriFieldTypeString",
      "length": 12
    },
    {
      "name": "email",
      "alias": "Email Address",
      "type": "esriFieldTypeString",
      "length": 100
    },
    {
      "name": "requestdate",
      "alias": "Date Submitted",
      "type": "esriFieldTypeDate",
      "length": 36
    },
    {
      "name": "status",
      "alias": "Status",
      "type": "esriFieldTypeString",
      "length": 50
    },
    {
      "name": "globalid",
      "alias": "GlobalID",
      "type": "esriFieldTypeGlobalID",
      "length": 38
    },
    {
      "name": "building",
      "alias": "Building Name",
      "type": "esriFieldTypeString",
      "length": 25
    },
    {
      "name": "floor",
      "alias": "Floor Number",
      "type": "esriFieldTypeString",
      "length": 5
    }
  ],
  "features": [
    {
      "geometry": {
        "x": -9809161.170230601,
        "y": 5123045.5266209831
      },
      "attributes": {
       "objectid": 246362,
        "requestid": "69",
        "requesttype": "Sidewalk Damage",
        "comments": "Pothole",
        "name": "Foo Bar",
        "phone": "999-9999",
        "email": "foo@foobar.com",
        "requestdate": 1412921609000,
        "status": "Closed",
        "globalid": "{1776024F-0CA5-404E-A133-D442FB6FC0FE}",
        "building": "",
        "floor": ""
      }
    },
    {
      "geometry": {
        "x": -9074857.9234435894,
        "y": 4982391.2604217697
      },
      "attributes": {
        "objectid": 246382,
        "requestid": null,
        "requesttype": "Pothole",
        "comments": "Jhh",
        "name": "Foo Bar",
        "phone": null,
        "email": null,
        "requestdate": null,
        "status": "Unassigned",
        "globalid": "{B424A195-1EC8-4467-AE7E-24BE0EF74383}",
        "building": null,
        "floor": null
      }
    }
  ]
}
```