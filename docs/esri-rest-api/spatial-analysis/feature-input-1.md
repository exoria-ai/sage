# Feature input

> Source: [/rest/services-reference/enterprise/spatial-analysis/reference/feature-input-1/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/reference/feature-input-1/)

All standard spatial analysis tasks have input parameters that take features as their input. Features can be input in one of two ways:

1.  Specify a URL to a feature service layer (or a map service layer that has `query` as one of its capabilities) along with an optional filter.
2.  Specify a feature collection.

## URL to a feature service

You can specify the URL to a [feature service layer](/rest/services-reference/enterprise/query-feature-service-layer/) or a [map service layer](/rest/services-reference/enterprise/query-feature-service-layer/) that has query capability.

URL syntax:



```
{
"url": "<url to feature or map service layer>"
"serviceToken": "<token to allow access to feature service layer>"
"filter": "<attribute query string to select features to process>"
}
```

If your layer is on a secure server, you need to provide a token that allows the analysis service to access your layer.

In addition to supplying the URL, you can supply a filter string for an SQL WHERE clause, but without the WHERE statement. The following is an example:



```
{
  "url": "https://services.arcgis.com/f126c8da131543019b05e4bfab6fc6ac/arcgis/rest/services/hospitals/FeatureServer/0",
  "filter": "STATE='CA'"
}
```

If no filter is supplied, all features are available to the analysis service.

## featureCollection

The other option is to send a `featureCollection` instead of a layer. For more information about feature collections and feature sets, see the following:

-   [`featureCollection`](/web-map-specification/objects/featureCollection/)
-   [`featureSet`](/rest/services-reference/enterprise/featureset-object/)

This is an example of a feature collection of points with `Id` and `Name` attributes.



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