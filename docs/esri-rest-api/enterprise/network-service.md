# Network Service

> Source: [/rest/services-reference/enterprise/network-service/](https://developers.arcgis.com/rest/services-reference/enterprise/network-service/)

**URL:**: https://<root>/<serviceName>/NAServer

**Methods:**: GET

**Child Resources:**: Network Layer, Network dataset layer, Network Diagram Service, Parcel Fabric Service, Relational Catalog Service, Scene Service, Stream Service, Trace Network Service, Utility Network Service, Validation Service, Vector Tile Service, Version Management Service

**Version Introduced:**: 9.3

## Description

The routing services resource represents routing services published with ArcGIS Server. The resource provides information about the service such as the service description and the various network layers (route, closest facility, and service area layers) contained in the routing services.

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html .Values: html \| json \| pjson |

## Example usage

Below is a sample request URL for the routing services resource:



```
https://organization.example.com/<context>/rest/services/NetworkAnalysis/SanDiego/NAServer?f=pjson
```

## JSON Response syntax



```
{
  "currentVersion": <currentVersion>, //Added at 10.0 SP1
  "serviceDescription": "<serviceDescription>",
  "routeLayers": [
    "<routeLayerName1>",
    "<routeLayerName2>"
  ],
  "serviceAreaLayers": [
    "<serviceAreaLayerName1>",
    "<serviceAreaLayerName2>"
  ],
  "closestFacilityLayers": [
    "<closestFacilityLayerName1>",
    "<closestFacilityLayerName2>"
  ]
}
```

## JSON Response example



```
{
  "currentVersion": 10.8,
  "serviceDescription": "Test Map and Network Service Description",
  "routeLayers": [
    "Route"
  ],
  "serviceAreaLayers": [
    "Service Area"
  ],
  "closestFacilityLayers": [
    "Closest Facility"
  ]
}
```