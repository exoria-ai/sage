# Feature (Scene Service)

> Source: [/rest/services-reference/enterprise/feature-scene-service/](https://developers.arcgis.com/rest/services-reference/enterprise/feature-scene-service/)

**URL:**: https://<root>/<serviceName>/SceneServer/layers/<layerID>/nodes/<nodeID>/features/<featuredatabundleID>

**Methods:**: GET

**Version Introduced:**: 10.3.1

## Description

Returns a feature data resource (bundle).

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html.Values: html \| json |

## Example usage



```
https://organization.example.com/server/rest/services/Hosted/downtown/SceneServer/layers/0/nodes/0/features/0_0_1
```