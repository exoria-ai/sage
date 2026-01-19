# Submit a job

> Source: [/rest/services-reference/enterprise/submit-gp-job/](https://developers.arcgis.com/rest/services-reference/enterprise/submit-gp-job/)

**URL:**: https://<task-url>/submitJob

**Methods:**: GETPOST

**Version Introduced:**: 9.3

## Description

The `submitJob` operation is performed on an asynchronous [`task`](/rest/services-reference/enterprise/gp-task/) resource. The result of this operation is a [`Jobs`](/rest/services-reference/enterprise/gp-job/) resource. You can provide arguments to the `submitJob` operation as query parameters defined in the parameters table below.

To run a synchronous geoprocessing service task, see [Execute a task](/rest/services-reference/enterprise/execute-gp-task/) .

## Request parameters

| Parameter | Description |
|---|---|
| <gpParameter1>, <gpParameter2>, ...(Optional) | The various input parameters accepted by the corresponding geoprocessing task. These parameters are listed in the parameters property of the JSON representation associated with the geoprocessing task resource.The valid values for the input parameters are dependent on the data type of the parameter. These values are discussed in more detail in Geoprocessing services data types. |
| context(Optional) | Added at 10.6.1. The context of the service can be specified. Currently, context supports outSR, processSR, and extent. The outSR property is the spatial reference of the output geometries. The processSR property is the spatial reference that the model will use to perform geometry operations.The spatial reference can be specified as either a well-known ID or a spatial reference JSON object. If the outSR value is not specified, the output geometries are in the spatial reference of the input geometries. If processSR is specified and outSR is not specified, the output geometries are in the spatial reference of the process spatial reference. For more information, see Using spatial references.extent will only process features that overlap the specified extent. The output features will have an extent that is the same or larger than the extent value. |
| returnTrueCurves(Optional) | Added at 10.5. If true, true curves will be returned in the results if the features have curves. The default is false.Values: true \| falseDefault: false |
| simplifyFeatures(Optional) | Added at 11.4, there is an option to maintain the original geometry without simplifying it by setting this option to false. Simplifying return features can siginificantly reduce the size of the response while fulfiling the accuracy needs for most analysis, espeically for complex and large geometries.Values: true \| falseDefault: true |
| f(Optional) | The response format. The default response format is html. Support for geojson was added at 10.5.Values: html \| json \| kmz \| geojsonDefault: html |

## Input parameters

Learn more about the syntax and examples of supported input [data types](/rest/services-reference/enterprise/gp-data-types/). For the `output_feature_service_name` parameter, see the last section.

## GET request example usage

With the `submitJob` operation, the majority of the parameters that you include in a request are dependent on the input parameter types of the geoprocessing task you are submitting. You must encode the URL if the client you are using does not encode a request automatically.

### Example 1: Submit a job

Submit a job to the `ERGByChemical` task.

Submit a request with values for the `Incident_Point` parameter and HTML return type. There is no need to provide other parameters if you want to use the default value.



```
https://organization.example.com/<context>/rest/services/PublicSafety/EMModels/GPServer/ERGByChemical/submitJob?Incident_Point={"features":[{"geometry":{"x":-104.44,"y":34.83},"attributes":{"Id":43,"Name":"Incident"}}]}&f=html
```

### Example 2: Request a different output spatial reference

Submit a job to the task similar to Example 1 but request that the output spatial reference be Web Mercator (102100) on 10.6 or earlier:

Adding `env:outSR` to the request with value 102100.



```
https://organization.example.com/<context>/rest/services/PublicSafety/EMModels/GPServer/ERGByChemical/submitJob?Incident_Point={"features":[{"geometry":{"x":-104.44,"y":34.83},"attributes":{"Id":43,"Name":"Incident"}}]}&env:outSR=102100&f=html
```

### Example 3: Request a processing extent

Submit a job to a geoprocessing task but request that the extent have `xmin` 7,602,115, `ymin` 660,605, `xmax` 7,619,050, and `ymax` 676,100 with the extent in spatial reference in NAD 1983 State Plane Oregon North (WKID 102726, feet).

The value of the `input` parameter is `points`, and the `context` has a value as above.



```
https://organization.example.com/<context>/rest/services/ServiceName/GPServer/TaskName/submitJob?input=points&context={extent:{"xmin":7602115,"ymin":660605,"xmax":7619050,"ymax":676100,spatialReference:{"wkid":102726}}}
```

## JSON response

The response of the `submitJob` operation is the [`Jobs`](/rest/services-reference/enterprise/gp-job/) resource.

## Output feature service name

Providing a value to the output feature service name parameter will enable your federated asynchronous geoprocessing service to generate a hosted feature service for all of your feature and table results. To learn more about how to publish a geoprocessing service with this parameter, see [Use web tools with an output feature service](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/use-web-tools-with-output-feature-class.htm).

JSON schema for the `esri_out_feature_service_name` parameter. Some properties will not have any effect in an earlier version of ArcGIS Enterprise.



```
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "JSON Schema for esri_out_feature_service_name",
    "description": "The JSON schema for the output feature service name parameter. Before ArcGIS Enterprise 11, only a string, which is the name of the desired output feature service name, is valid. Starting at ArcGIS Enterprise 11, new properties allow the overwrite of an output feature service.",
    "type": [
        "string",
        "object"
    ],
    "properties": {
        "serviceProperties": {
            "description": "Provide a name to create a new output feature service. Use a service URL or the name of a service to specify an existing hosted feature service to be overwritten.",
            "type": "object",
            "properties": {
                "serviceUrl": {
                    "description": "The URL of a hosted feature service which will be overwritten.",
                    "type": "string",
                    "format": "uri"
                },
                "name": {
                    "description": "The name of a hosted feature service when creating a new output feature service. You can also use the name to specify a hosted feature service to be overwritten, but this is not recommended",
                    "type": "string"
                }
            }
        },
        "itemProperties": {
            "desciption": "Specify whether you want to overwrite an existing hosted feature service, along with the portal item metadata.",
            "type": "object",
            "properties": {
                "overwrite": {
                    "description": "Whether you want to overwrite an existing hosted feature service.",
                    "type": "boolean"
                },
                "itemId": {
                    "description": "The itemId of the hosted feature service to be overwritten. This is recommended to specify an existing hosted feature service.",
                    "type": "string"
                },
                "tags": {
                    "description": "Tags to be added for the new or overwritten hosted feature service in addition to default tags.",
                    "type": "string"
                },
                "description": {
                    "description": "Description of the new or overwritten hosted feature service.",
                    "type": "string"
                },
                "snippet": {
                    "description": "Snippet of the new or overwritten hosted feature service",
                    "type": "string"
                },
                "newFeatureServiceOnOverwriteFail":{
                    "description": "Whether to try reprojecting the result into the spatial reference of the existing hosted feature service during overwrite.",
                    "type": "boolean"
                }
            }
        }
    }
}
```

### Example 1: Request an output feature service as the result using a string

This example specify the `output_requests_hosted_featureservice` as the name of the output feature service.



```
https://organization.example.com/<context>/rest/services/ServiceName/GPServer/TaskName/submitJob?in_features={"url":"https://sampleserver6.arcgisonline.com/arcgis/rest/services/LocalGovernment/CitizenRequests/FeatureServer/0"}&buffer_distance_or_field={"distance":10,"units":"esriMiles"}&line_side=FULL&line_end_type=ROUND&method=PLANAR&esri_out_feature_service_name=output_requests_hosted_featureservice&f=json
```

### Example 2: Request an output feature service as the result using a JSON object

This example uses a JSON object when creating a new output feature service. Only `name` of the `serviceProperties`, and `tags`, `description`, and `snippet` for the `itemProperties` are available if you want to specify them.

The sample JSON used in the following request is



```
{
  "serviceProperties":{
    "name":"output_requests_hosted_featureservice"
  },
  "itemProperties":{
    "tags":"resultTag",
    "description":"demo description",
    "snippet":"demo snippet"
  }
}
```

A similar request as example 1 but using the JSON object above instead for the `esri_out_feature_service_name` parameter. You may need to manually encode the request if your client does not encode it.



```
https://organization.example.com/<context>/rest/services/ServiceName/GPServer/TaskName/submitJob?in_features={"url":"https://sampleserver6.arcgisonline.com/arcgis/rest/services/LocalGovernment/CitizenRequests/FeatureServer/0"}&buffer_distance_or_field={"distance":10,"units":"esriMiles"}&line_side=FULL&line_end_type=ROUND&method=PLANAR&esri_out_feature_service_name={"serviceProperties":{"name":"output_requests_hosted_featureservice"},"itemProperties":{"tags":"resultTag","description":"demo description","snippet":"demo snippet"}}&f=json
```

### Overwrite an output feature service

Starting with ArcGIS Enterprise 11.0, you can overwrite an output feature service when you submit a job.

To overwrite an existing hosted feature service, the user running the web tool must be the owner of that hosted feature service or a user assigned an administrator role. This requirement is in addition to all other prerequisites when using the output feature service. To learn more about the prerequisites, see [Use web tools with an output feature service](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/use-web-tools-with-output-feature-class.htm). Use the `name`, `serviceURL`, or `itemID` property of the hosted feature service to specify the hosted feature service to overwrite. If the existing hosted feature service contains critical information, back up the data, as the overwrite process will delete all existing layers of the hosted feature layer. When possible, use `serviceURL` or `itemID`, because they provide the most accurate identification of a hosted feature service. Using a name to identify a hosted feature service may not provide an exact match in some circumstances.

Sample JSON to use an `itemID` to overwrite an output feature service.



```
{
  "itemProperties":  {
    "itemId": "52d34e7598e7484188228xxxxxx",
    "overwrite": true
  }
}
```

Sample JSON to use a `serviceURL` to overwrite an output feature service.



```
{
  "serviceProperties": {
    "serviceUrl": "https://organization.example.com/<context>/rest/services/Hosted/FeatureServiceName/FeatureServer"
  },
  "itemProperties": {
    "overwrite": true
  }
}
```

Sample JSON to use a `name` to overwrite an output feature service.



```
{
  "serviceProperties": {
    "name": "currentfeatureservicename"
  },
  "itemProperties": {
    "overwrite": true
  }
}
```

In addition, you can specify the tags, description, and snippet of the new service. The new description and snippet will overwrite the existing descriptions and snippets of the hosted feature service, and the new tags will merge with existing tags.

Sample JSON to overwrite an output feature service with tags, description, and snippet.



```
{
  "itemProperties": {
    "itemId": "52d34e7598e7484188228xxxxxx",
    "overwrite": true,
    "tags": "a, b, c",
    "description": "custom description",
    "snippet": "custom snippet"
  }
}
```

You can also set an additional property when submitting a job with the output feature service parameter. For example, the geoprocessing result's spatial reference may differ from the hosted feature service you want to overwrite, or there may be temporary issues with the data store. In these cases, the overwrite will fail, resulting in a failed geoprocessing service run. However, you can use the `newFeatureServiceOnOverwriteFail` property to keep the geoprocessing result, especially after a long run. If the overwrite fails, an incrementing number will be appended to the current hosted feature service name, for example, `currentname_1`. These new hosted feature services will have the new spatial reference from the latest geoprocessing result.

Sample JSON using the `newFeatureServiceOnOverwriteFail` property to overwrite an output feature service with an extra attempt.



```
{
  "itemProperties": {
    "itemId": "52d34e7598e7484188228xxxxxx",
    "overwrite": true,
    "newFeatureServiceOnOverwriteFail": true
  }
}
```

## Output image service

With ArcGIS Enterprise 11.4 and later, you can use the `esri_out_image_service` parameter to generate shared instance image services for all of your raster results for your asynchronous geoprocessing services, regardless if they are on a federated or a stand-alone server. To learn more about output image service, see [Use an output image service](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/use-web-tools-with-output-image-service.htm).

The JSON schema for the `esri_out_image_service` parameter. You can specifiy an explicit name if you have one output raster parameter, or multiple explicit names for multiple output raster parameter starting at ArcGIS Enterprise 11.5 or later. You can also use a combination of `prefix` and `names` if you want some of your output with explicit names, and the rest of them using the prefix format. The `overwrite` property is only available starting at ArcGIS Enterprise 11.5.



```
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "JSON Schema for esri_out_image service",
    "description": "The JSON schema for the output image service parameter.",
    "type": [
        "string",
        "object"
    ],
    "properties": {
        "serviceProperties": {
            "description": "Specify the prefix for your result.",
            "type": "object",
            "properties": {
                "prefix": {
                    "description": "The prefix of your output image services.",
                    "type": "string"
                },
                "name":{
                    "description": "The explicit name of your output image service when you have a single output raster parameter.",
                    "type": "string"
                },
                "names":{
                    "description": "The names of the outout raster parameter which you want to specific an explicit output image service name.",
                    "type": "object",
                    "patternProperties ": {
                      "^.*$": {
                        "description": "The key will be the name of the output raster parameter, and the value will be the explicit name you want to specify for that output parameter.",
                        "type": "string"
                      }
                    }
                },
                "format":{
                    "description": "The format of the image service data source. This property only applies when the output is in memory. Default is crf.",
                    "type": "string",
                    "enum": ["crf", "tif"]
                },
                "folder":{
                    "description": "The folder of your image service in the server directory. If this folder does not exist, it will be created.",
                    "type": "string"
                }
            }
        },
        "itemProperties": {
            "description": "The metadata for the portal item of your web imagery layers, and the metadata of your image services.",
            "type": "object",
            "properties": {
                "tags": {
                    "description": "New tags of the new web imagery layer item and the image service.",
                    "type": "string"
                },
                "description": {
                    "description": "New description of the new web imagery layer item and the image service.",
                    "type": "string"
                },
                "snippet": {
                    "description": "New snippet of the new web imagery layer item and the image service.",
                    "type": "string"
                },
                "folder": {
                    "description": "The folder of new web imagery layer item. If this folder does not exist, it will be created.",
                    "type": "string"
                },
                "overwrite":{
                    "description": "Whether you want to overwrite existing image services.",
                    "type": "boolean"
                }
            }
        }
    }
}
```

### Example 1: Provide a prefix in string format

This example requests an output image service as a result by providing a prefix in string format.



```
https://organization.example.com/<context>/rest/services/ServiceName/GPServer/TaskName/submitJob?inputRaster=choice1&esri_out_image_service=testing
```

### Example 2: Provide a JSON object

This example requests an output image service as the result using a JSON object with optional properties specification.

The sample JSON used in the following request.



```
{
  "serviceProperties":{
    "prefix": "testing",
    "format": "tif",
    "folder": "all_image_services"
  },
  "itemProperties":{
    "tags": "resultTag",
    "description": "demo description",
    "snippet": "demo snippet",
    "folder": "analyst_testing"
  }
}
```

A similar request as example 1 but using the JSON object above instead for the `esri_out_image_service_name` parameter. You may need to manually encode the request if your client does not encode it.



```
https://organization.example.com/<context>/rest/services/ServiceName/GPServer/TaskName/submitJob?inputRaster=choice1&esri_out_image_service={"serviceProperties":{"prefix":"testing","format":"tif","folder":"all_image_services"},"itemProperties":{"tags":"resultTag","description":"demo description","snippet":"demo snippet","folder":"analyst_testing"}}&f=json
```

### Example 3: Provide a JSON object by specify explicit names for different output parameters

This example specifies the `output_raster_layer` output parameter to have an image service with a name `california_clip`, and the `processed_output_raster` output parameter to have an image service with a name `california_processed`.



```
{
  "serviceProperties":{
    "names": {
        "output_raster_layer": "california_clip",
        "processed_output_raster": "california_processed"
    }
  }
}
```

### Overwrite an image service

With ArcGIS Enterprise 11.5 or later, you can overwrite an existing image service when you submit a job.

To overwrite an existing image service, the user running the web tool must be the owner of that image service or a user assigned an administrator role. This requirement is in addition to all other prerequisites when using the output image service. To learn more about the prerequisites, see [Use an output image service](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/use-web-tools-with-output-image-service.htm). Use the `name` property if you have only one image service to overwrite. Use the `prefix` property if your existing image services follow the `<prefix>_<output parameter name>` format. You can also use `names` property if your output image service is explicitly specified before. If the existing image service contains critical information, back up the data, as the overwrite process will delete the data of the image service first.

All other properties, like the snippet, summary, tags, and format are also available if you want to overwrite them.

Sample JSON to use prefix to overwrite two existing image services corresponding to two required raster output parameters, which are `testrun_first_raster_output` and `testrun_second_raster_output` in the `all_image_services` folder of ArcGIS Server.



```
{
  "serviceproperties": {
    "prefix": "testrun",
    "folder": "all_image_services"
  },
  "itemProperties": {
    "overwrite":  true
  }
}
```

Sample JSON to use names to overwrite several exisiting image services corresponding to multiple raster outputs, along with some other metadata to be overwritten.



```
{
  "serviceproperties": {
    "names": {
      "Output_Terrian": "terrian",
      "Output_Slope": "slope",
      "Output_Processed_Raster": "processed"
    }
  },
  "itemProperties": {
    "overwrite":  true,
    "tags": "daily, updates",
    "snippet": "Dec 29, 2024",
    "description": "Script update results."
  }
}
```