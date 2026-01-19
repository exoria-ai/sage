# Acquire Locks

> Source: [/rest/services-reference/enterprise/lr-acquire-locks/](https://developers.arcgis.com/rest/services-reference/enterprise/lr-acquire-locks/)

**URL:**: https://<locks-url>/acquire

**Methods:**: GET

**Required Capability:**: The ArcGIS Location Referencing license is required to use this resource.

**Version Introduced:**: 10.7

## Description

This operation acquires a set of LRS locks to enable edits on the editable LRS layers in the service.

An error response is returned when conflict prevention is not enabled on the LRS. Refer to the `conflictPreventionEnabled` property of the [Locks](/rest/services-reference/enterprise/lr-locks/) resource.

## Request parameters

| Parameter | Details |
|---|---|
| f(Optional) | Specifies the response format. The default response format is html.Values: html \| json \| pjson |
| editVersion(Required) | The name of the geodatabase version to associate with the locks.Syntax: editVersion=<version>Example: editVersion="user1.version1" |
| acquireLocks(Optional) | Specifies locks to acquire. You can lock a network or an event layer on a route or line. Derived network layers cannot be locked.Syntax: [ { "routeId": "<routeId>", "layerId": <layerId> }\| { "lineId": "<lineId>", "layerId": <layerId> }, ... ] |

## Example usage

The following are sample URLs for acquiring locks.

### Example 1

The following is a URL for acquiring a single lock.



```
https://sampleserver/arcgis/rest/services/MyLRS/MapServer/exts/LRServer/locks/acquire?f=json&editVersion=sde.job_42&acquireLocks=[{"routeId":"I90","layerId":3}]
```

### Example 2

The following is a URL for acquiring multiple locks.



```
https://sampleserver/arcgis/rest/services/MyLRS/MapServer/exts/LRServer/locks/acquire?f=json&editVersion=sde.job_42&acquireLocks=[{"routeId":"I90","layerId":3},{"lineId":"NWS Line A","layerId":4}]
```

## JSON Response syntax



```
{
  "acquireStatus": "<status>",  // one of: esriSuccess, esriReconcileRequired, esriCouldNotAcquireAllLocks
  "acquiredLocks": [
    {
      "routeId": "<routeId>",
      "layerId": <layerId>
    },
    {
      "lineId": "<lineId>",
      "layerId": <layerId>
    },
    ...
  ] |
  "unavailableLocks": [
    {
    ...
    },
    {
      "lineId": "<lineId>",
      "lineName": "<lineName>",
      "layerId": <layerId>,
      "lrsNetworkId": <networkId>,
      "lrsNetworkName": "<networkName>",
      "user": "<username>",
      "versionName": "<versionName>",
      "versionGuid": "<versionGuid>",
      "lockDate": <timestamp>,
      "eventFeatureClassName": "<eventFeatureClassName>"
    },
    ...
  ]
}
```

## JSON Response example



```
{
  "acquireStatus": "esriCouldNotAcquireAllLocks",

  "unavailableLocks": [
    {
      "routeId": "{50918F06-7D4C-43D4-B39A-3AA02E9CF075}",
      "routeName": "RouteA",
      "layerId": 2,
      "lrsNetworkId": 1,
      "lrsNetworkName" : "LRSN_Cont",
      "user": "alice",
      "versionName": "alice.job_65",
      "versionGuid": "{DA09CF20-D98A-4F80-8599-061C21B2C3D9}",
      "lockDate": 1397509340000,
      "eventFeatureClassName": ""
    },
    {
      "lineId": "{9AF33B43-2BFE-4EA1-96FB-152E6CF7CA3B}",
      "lineName": "LineB",
      "layerId": 6,
      "lrsNetworkId": 2,
      "lrsNetworkName" : "LRSN_Engg",
      "user": "bob",
      "versionName": "bob.job_67",
      "versionGuid": "{FC4818D6-974E-4020-85C5-9DAA0FD539E0}",
      "lockDate": 1397509340000,
      "eventFeatureClassName": "P_Anomaly"
    }
  ]
}
```