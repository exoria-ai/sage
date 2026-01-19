# Update Features

> Source: [/rest/services-reference/enterprise/update-features/](https://developers.arcgis.com/rest/services-reference/enterprise/update-features/)

**URL:**: https://<root>/<serviceName>/FeatureServer/<layerId>/updateFeatures

**Methods:**: POST

**Required Capability:**: Update

**Version Introduced:**: 10.0

## Description

This operation updates features in a feature layer or table. The Update Features operation is performed on a [feature service layer resource](/rest/services-reference/enterprise/layer-feature-service/).

The operation returns the results of the edits in an array of edit result objects. Each edit result identifies a single feature and indicates if the update was successful or not. If not, it also includes an [error code](/rest/services-reference/enterprise/feature-service-error-codes/) and an error description. You can provide arguments to the Update Features operation as defined in the parameters table below.

## New at 11.5

The unique IDs feature has been added to support databases with string ID fields. For more information on unique IDs, see the Layer (Feature Service) page, `useUniqueIds` in the Request parameters table below, and JSON Response example using unique IDs.

## New at 10.9

A new parameter, `timeReferenceUnknownClient` , has been added at 10.9. Setting `timeReferenceUnknownClient` as `true` indicates that the client is capable of working with date field data values that are not in UTC. For more information on this parameter, see the [Request parameters](/rest/services-reference/enterprise/update-features/#GUID-B0639AB4-599A-4105-9014-93A5CFC416B1) table below.

## Request parameters

| Parameter | Details |
|---|---|
| features | The array of features to be updated. The structure of each feature in the array is the same as the structure of the json feature object returned by the ArcGIS REST API. Features to be updated to a feature layer should include the geometry. Records to be added to a table should not include the geometry.The attributes property of the feature should include the object ID (and the global ID, if available) of the feature along with the other attributes: { ... "attributes": { "OBJECTID": 37, "OWNER": "Joe Smith", "VALUE": 94820.37, "APPROVED": true, "LASTUPDATE": 1227667627940 } }Syntax features=[<feature1>, <feature2>]Example 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 features=[ { "geometry": { "x": -118.15, "y" : 33.80 }, "attributes": { "OBJECTID": 37, "OWNER": "Joe Smith", "VALUE": 94820.37, "APPROVED": true, "LASTUPDATE": 1227667627940 } }, { "geometry": { "x": -118.37, "y": 34.086 }, "attributes": { "OBJECTID": 462, "OWNER": "John Doe", "VALUE": 17325.90, "APPROVED": false, "LASTUPDATE": 9269154204840 } } ] |
| gdbVersion | The geodatabase version to apply the edits. This parameter applies only if the isDataVersioned property of the layer is true .If the gdbVersion parameter is not specified, edits are made to the published map’s version.Syntax: gdbVersion=<version>Example: gdbVersion=SDE.DEFAULT |
| returnEditMoment | This option was added at 10.5 and works with ArcGIS Enterprise services only.Optional parameter specifying whether the response will report the time features were updated. If returnEditMoment is true , the server will report the time in the response's editMoment key. The default value is false .Values: true \| false |
| rollbackOnFailure | Specifies whether the edits should be applied only if all submitted edits succeed. If false , the server will apply the edits that succeed even if some of the submitted edits fail. If true , the server will apply the edits only if all edits succeed. The default value is true .Not all data supports setting this parameter. Query the supportsRollbackonFailureParameter property of the layer to determine whether a layer supports setting this parameter. If supportsRollbackOnFailureParameter = false for a layer, then when editing this layer, rollbackOnFailure will always be true , regardless of how the parameter is set. However, if supportsRollbackonFailureParameter = true , the rollbackOnFailure parameter value will be honored on edit operations.Values: true\|falseExample: rollbackOnFailure=true |
| trueCurveClient | This option was added at 10.5Optional parameter which is false by default is set by client to indicate to the server that client in true curve capable .When set to true by client, indicates to the server that true curves geometries should be downloaded from and that geometries containing true curves should be consumed by the feature service, without converting curves to densified polylines or polygons. When set to false by client, indicates to the server that client is not true curves capable and hence, curves are converted to densified polylines or polygons.Values: true \| false |
| timeReferenceUnknownClient | Setting timeReferenceUnknownClient as true indicates that the client is capable of working with data values that are not in UTC. If its not set to true , and the service layer's datesInUnknownTimeZone property is true , then an error is returned. The default is falseIts possible to define a service's time zone of date fields as unknown. Setting the time zone as unknown means that date values will be returned as-is from the database, rather than as date values in UTC. Non-hosted feature services can be set to use an unknown time zone using ArcGIS Server Manager. Setting the time zones to unknown also sets the datesInUnknownTimeZone layer property as true . Currently, hosted feature services do not support this setting. This setting does not apply to editor tracking date fields which are stored and returned in UTC even when the time zone is set to unknown.Most clients released prior to ArcGIS Enterprise 10.9 will not be able to work with feature services that have an unknown time setting. The timeReferenceUnknownClient parameter prevents these clients from working with the service in order to avoid problems.. Setting this parameter to true indicates that the client is capable of working with unknown date values that are not in UTC.Value: true \| false |
| useUniqueIds (Optional) | Introduced at 11.5. Indicates if unique IDs are being used. Default value is false. OIDFieldContainsHashValue must also be true when using unique IDs.Values: true \| false |
| f | The response format. The default response format is html .Values: html \| json |

## Example usage



```
https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0/updateFeatures
```

This example demonstrates how to update an array of features using the update features operation on a feature service layer resource using the following input array for the `features` parameter:



```
features=[
  {
    "attributes": {
	     "objectid": 1234567,
      "req_id": "508389",
      "req_type": "Graffiti Complaint - Private Property",
      "req_date": "09\/19\/2009",
      "req_time": "18:44",
      "address": "11TH ST and HARRISON ST",
      "x_coord": "6008925.0",
      "y_coord": "2108713.8",
      "district": "6",
      "status": 2
    },
    "geometry": {
      "x": -122.41247978999991,
      "y": 37.770630098000083
    }
  }
]
```

## JSON Response syntax



```
{
  "updateResults": [
    {
      "objectId": <objectId1>,
      "globalId": <globalId1>,
      "success": <true | false>,
      "error": { //only if success is false
        "code": <code1>,
        "description": "<description1>",
      }
    },
    {
      "objectId": <objectId2>,
      "globalId": <globalId2>,
      "success": <true | false>,
      "error": { //only if success is false
        "code": <code2>,
        "description": "<description2>",
      }
    }
  ]
}
```

## JSON Response example



```
{
  "updateResults": [
    {
      "objectId": 50,
      "success": true
    }
  ]
}
```

## JSON Response example using unique IDs

The example below shows how to update a feature using unique IDs. `useUniqueIds` and `OIDFieldContainsHashValue` are both set to `true`.



```
features=[
  {
    "attributes": {
      "uniqueIds": "yeXRMZMBed_rc6KBDj6V",
      "POP1990": 3902001
    },
    "geometry": {
      "x": -79.47,
      "y": 43.51
    }
  }
]
```

The example below shows a sample JSON response for the request above.



```
{
  "updateResults": [
    {
      "success": true,
      "objectId": 5693486419344173481, //server-genererated integer value based on feature's unique IDs
      "uniqueIds": ["yeXRMZMBed_rc6KBDj6V"]
    }
  ]
}
```