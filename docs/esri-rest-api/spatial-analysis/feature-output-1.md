# Feature output

> Source: [/rest/services-reference/enterprise/spatial-analysis/reference/feature-output-1/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/reference/feature-output-1/)

All the spatial analysis tasks create new data. This new data is typically features, but in some cases, such as with the Aggregate Points task, the output may include tables. There are two ways that the output can be returned to you:

-   A URL to a feature service layer
-   A feature collection

## URL to a feature service

One of the optional input parameters to a task is `outputName`. If the `outputName` parameter is specified, the output will be a feature service that is hosted at your organization. You provide the feature service name for the `outputName` parameter. The layer name or names in the feature service are determined by the task. The output URL will be the URL to a layer in the service.

In ArcGIS Enterprise 10.9.1 and later, many analysis tasks allow you to overwrite an existing feature service by providing the item ID of the existing feature service and setting the `overwrite` property as `true`. You must either be the owner of the feature service or have administrative privileges to overwrite the item. The name and spatial reference of the existing feature service must be maintained. You cannot overwrite a feature service that is referenced by other dependent items, such as a view layer. Any view layers or other dependent layers associated with the specified feature service must be deleted before the feature service can be overwritten.

The following tasks do not support overwrite: Create Route Layers and Extract Data. Overwrite is supported for Dissolve Boundaries, Enrich Layers, Find Point Clusters, and Summarize Center and Dispersion in ArcGIS Enterprise 11.0 and later. Overwrite is supported for Find Hot Spots, Find Outliers, and Find Similar Locations in ArcGIS Enterprise 11.1 and later.

## Feature collection output

If the `outputName` parameter is not specified, results will be returned as a feature collection. For more information about feature collections and feature sets, see the following:

-   [`featureCollection`](/web-map-specification/objects/featureCollection/)
-   [`featureSet`](/rest/services-reference/enterprise/featureset-object/)

Example feature collection:



```
{
    "layerDefinition": {
        "geometryType": "esriGeometryPoint",
        "fields": [
            {
                "name": "Id",
                "type": "esriFieldTypeOID",
                "alias": "Id"
            },
            {
                "name": "Name",
                "type": "esriFieldTypeString",
                "alias": "Name"
            }
        ]
    },
    "featureSet": {
        "geometryType": "esriGeometryPoint",
        "spatialReference": {
            "wkid": 4326
        },
        "features": [
            {
                "geometry": {
                    "x": -104.44,
                    "y": 34.83
                },
                "attributes": {
                    "Id": 43,
                    "Name": "Feature 1"
                }
            },
            {
                "geometry": {
                    "x": -100.65,
                    "y": 33.69
                },
                "attributes": {
                    "Id": 67,
                    "Name": "Feature 2"
                }
            }
        ]
    }
}
```

In addition to output features, some tasks may output a table of statistics (such as the Aggregate Points task). Tables are a subset of features; that is, they contain attributes but no geometry. Their syntax is the same as a feature collection, but with no spatial components.

Example table output:



```
{
    "layerDefinition": {
        "fields": [
            {
                "name": "Id",
                "type": "esriFieldTypeString",
                "alias": "Id"
            },
            {
                "name": "State_Name",
                "type": "esriFieldTypeString",
                "alias": "State Name"
            },
            {
                "name": "State_Abbr",
                "type": "esriFieldTypeString",
                "alias": "State Abbr"
            }
        ]
    },
    "featureSet": {
        "features": [
            {
                "attributes": {
                    "Id": 43,
                    "State_Name": "California",
                    "State_Abbr": "CA"
                }
            },
            {
                "attributes": {
                    "Id": 67,
                    "State_Name": "Colorado",
                    "State_Abbr": "CO"
                }
            }
        ]
    }
}
```