# Layer objects

> Source: [/rest/services-reference/enterprise/layer/](https://developers.arcgis.com/rest/services-reference/enterprise/layer/)

## Overview

This topic discusses the JSON representation of layer objects. This object allows overrides on pop-up content and drawing behavior for individual layers of a web service. When used with a feature collection, this object also contains geographic features and their attributes.

Example



```
"layers": [
  {
    "layerDefinition": {. . .},
    "featureSet": {. . .},
    "popupInfo": {. . .}
  }
]
```

## Properties

| Property | Details |
|---|---|
| featureSet | A feature set object containing the geometry and attributes of the features in the layer. Used with feature collections only. |
| id | A number indicating the index position of the layer in the WMS or map service. |
| layerDefinition | An array of layer definition objects defining the attribute schema and drawing information for the layer. |
| layerUrl | A string URL to a service that should be used for all queries against the layer. Used with hosted tiled map services on ArcGIS Online when there is an associated feature service that allows for queries. |
| legendUrl | A string URL to a legend graphic for the layer. Used with WMS layers. The URL usually contains a GetLegendGraphic request. |
| name | A string containing a unique name for the layer. Used with WMS layers, where it can sometimes be derived from the layer's index position. |
| title | A user-friendly string title for the layer that can be used in a table of contents. Used with WMS layers. |
| popupInfo | A popup info object defining the pop-up window content for the layer. |