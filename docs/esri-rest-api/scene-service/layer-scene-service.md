# Layer (Scene Service)

> Source: [/rest/services-reference/enterprise/layer-scene-service/](https://developers.arcgis.com/rest/services-reference/enterprise/layer-scene-service/)

**URL:**: https://<root>/<serviceName>/SceneServer/layers/<layerID>

**Methods:**: GET

**Child Resources:**: Node

**Version Introduced:**: 10.3.1

## Description

Returns detailed information about a single layer, including:

-   Field schema
-   Profile metadata
-   Store metadata
-   Symbology

This information includes a link to the root 3dNodeIndexDocument.

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html.Values: html \| json |

## Example usage



```
https://organization.example.com/server/rest/services/Hosted/downtown/SceneServer/layers/0
```