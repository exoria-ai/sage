# Execute a task

> Source: [/rest/services-reference/enterprise/execute-gp-task/](https://developers.arcgis.com/rest/services-reference/enterprise/execute-gp-task/)

**URL:**: https://<task-url>/execute

**Methods:**: GETPOST

**Version Introduced:**: 9.3

## Description

The `execute` operation is performed on a [`task`](/rest/services-reference/enterprise/gp-task/) resource for synchronous geoprocessing services. The result contains an array of result parameters and the geoprocessing task messages. Each result parameter provides the parameter name, data type, and value.

The information provided by each result parameter is identical to the information provided by the [`results` parameter](/rest/services-reference/enterprise/gp-result/) resource. Based on the [data type](/rest/services-reference/enterprise/gp-data-types/) of the parameter, the value follows different syntax.

You can provide arguments to the `execute` operation as query parameters. These parameters include the input parameters accepted by this service and their corresponding values. The input values for the `execute` operation are identical to the input values for the [`submitJob`](/rest/services-reference/enterprise/submit-gp-job/) operation. Additionally, you can specify environment parameters such as `context`.

## Request parameters

| Parameter | Details |
|---|---|
| <gpParameter1>, <gpParameter2>, ...(Optional) | The various input parameters accepted by the corresponding geoprocessing task. These parameters are in the parameters array of the JSON representation associated with the task resource.The valid values for the input parameters are dependent on the data type of the parameter. |
| context(Optional) | This option was added at 10.6.1. context supports outSR, processSR, and extent:outSR is the spatial reference of the output geometries.processSR is the spatial reference that the model will use to perform geometry operations.extent will only process features that overlap the specified extent. The output features will have an extent that is the same or larger than the extent value. The syntax for extent follows the syntax of the envelope object. |
| returnZ(Optional) | If true, z-values will be included in the results if the GPFeatureRecordSetLayer value has z-values. Otherwise, z-values will not be returned. The default is false.Values: true \| false |
| returnM(Optional) | If true, m-values will be included in the results if the GPFeatureRecordSetLayer value has m-values. Otherwise, m-values will not be returned. The default is false.Values: true \| false |
| returnTrueCurves(Optional) | If true, true curves will be returned in the results if the GPFeatureRecordSetLayer value has curves. The default is false.Values: true \| false |
| returnFeatureCollection(Optional) | This option was added at 10.6. If true, the feature collection of the GPFeatureRecordSetLayer results will be returned. The default is false.Values: true \| false |
| returnColumnName(Optional) | This option was added at 11.0. If true, column names of all columns of the GPValueTable result will be returned when all columns have a unique and not empty name. The default is false.Values: true \| false |
| simplifyFeatures(Optional) | Added at 11.4, there is an option to maintain the original input geometry without simplifying it by setting this option to false. Simplifying input features can significantly reduce the size of the response while fulfilling the accuracy needs for most analysis, especially for complex and large geometries.Values: true \| falseDefault: true |
| f(Optional) | The response format. The default response format is html. Support for geojson was added at 10.5.Values: html \| json \| kmz \| geojson |

## Example usage

With this operation, the majority of the parameters that you include in a request are dependent on the input parameter types of the geoprocessing task that you are running. The `execute` and `submitJob` operations share the same syntax for all input parameter types, and examples of all input parameter types are discussed in [Submit a job](/rest/services-reference/enterprise/submit-gp-job/).

Example 1: Run the `MessageInABottle` task originating at `lat-long [0, 0]` for 50 days:

Sample GET request. You may need to encode the request if the client doesn't encode it automatically.



```
https://organization.example.com/<context>/rest/services/Specialty/ESRI_Currents_World/GPServer/MessageInABottle/execute?Input_Point={"features":[{"geometry":{"x":0,"y":0}}]}&Days=50
```

Example 2: Run the `Viewshed` task, and define the output spatial reference as `WGS84 (wkid: 4326)`:

The GET request uses the context parameter to specify the output spatial reference with a JSON return. You may need to encode the request if the client doesn't encode it automatically.



```
https://organization.example.com/<context>/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed/execute?Input_Observation_Point={"features":[{"geometry":{"x":8598136.9169,"y":4197867.5324,"spatialReference":{"wkid":54003}}}]}&Viewshed_Distance={"distance":15000,"units":"esriMeters"}&context={"outSR":{"wkid":4326}}&f=json
```

## JSON Response schema

The JSON schema for a response.



```
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "required": [
        "results",
        "messages"
    ],
    "properties": {
        "results": {
            "description": "If there are any results from a successful run, they are listed here.",
            "type": "array",
            "items": {
                "description": "A result parameter",
                "type": "object",
                "required": [
                    "paramName",
                    "dataType",
                    "value"
                ],
                "properties": {
                    "paramName": {
                        "description": "The name of this result parameter",
                        "type": "string"
                    },
                    "dataType": {
                        "description": "The data type of this result parameter",
                        "type": "string"
                    },
                    "value": {
                        "description": "The value of this parameter. Its type is dependent on the data type."
                    }
                },
                "additionalProperties": false
            }
        },
        "messages": {
            "description": "Messages for this job, if any",
            "type": "array",
            "items": {
                "description": "An individual message",
                "type": "object",
                "required": [
                    "type",
                    "description"
                ],
                "properties": {
                    "type": {
                        "description": "Type of message",
                        "type": "string",
                        "enum": [
                            "esriJobMessageTypeInformative",
                            "esriJobMessageTypeWarning",
                            "esriJobMessageTypeError"
                        ]
                    },
                    "description": {
                        "description": "The content of this message",
                        "type": "string"
                    }
                },
                "additionalProperties": false
            }
        }
    }
}
```

## JSON Response example

A run with three `MultiValue` output parameter values and informative messages for a synchronous geoprocessing service on a Linux server.



```
{
    "results": [
        {
            "paramName": "Output_rasters",
            "dataType": "GPMultiValue:GPRasterDataLayer",
            "value": [
                {
                    "url": "https://organization.example.com/<context>/rest/directories/arcgisoutput/ServiceName_GPServer/_ags_outrd01.tif",
                    "format": "tif"
                },
                {
                    "url": "https://organization.example.com/<context>/rest/directories/arcgisoutput/ServiceName_GPServer/_ags_outrd11.tif",
                    "format": "tif"
                }
            ]
        },
        {
            "paramName": "Output_doubles",
            "dataType": "GPMultiValue:GPDouble",
            "value": [
                85768.567850000007,
                -9678.4560000000001,
                -34545.546000000002
            ]
        },
        {
            "paramName": "Output_strings",
            "dataType": "GPMultiValue:GPString",
            "value": [
                "California",
                "Texas",
                "Alaska"
            ]
        }
    ],
    "messages": [
        {
            "type": "esriJobMessageTypeInformative",
            "description": "Start Time: Thursday, December 29, 2022 3:53:59 PM"
        },
        {
            "type": "esriJobMessageTypeInformative",
            "description": "output tif is at server Z:\\data\\arcgis\\arcgisserver\\directories\\arcgisjobs\\multivalue_sync_gpserver\\j4ec3404995084181a647c54c7e89b426\\scratch\\_ags_outrd01.tif"
        },
        {
            "type": "esriJobMessageTypeInformative",
            "description": "output tif is at server Z:\\data\\arcgis\\arcgisserver\\directories\\arcgisjobs\\multivalue_sync_gpserver\\j4ec3404995084181a647c54c7e89b426\\scratch\\_ags_outrd11.tif"
        },
        {
            "type": "esriJobMessageTypeInformative",
            "description": "Succeeded at Thursday, December 29, 2022 3:54:04 PM (Elapsed Time: 5.07 seconds)"
        }
    ]
}
```

A run with one result parameter `Output` value and no messages.



```
{
  "results": [
    {
      "paramName": "Output",
      "dataType": "GPFeatureRecordSetLayer",
      "value": {
        "geometryType": "esriGeometryPolyline",
        "spatialReference": {
          "wkid": 102113
        },
        "features": [
          {
            "attributes": {
              "FID": 1,
              "FNODE_": 0,
              "Shape_Length": 1978374.8698808267
            },
            "geometry": {
              "paths": [
                [
                  [
                    0,
                    0
                  ],
                  [
                    -108217.97210000083,
                    26094.129900000989
                  ],
                  [
                    -217996.3478000015,
                    44553.482400000095
                  ],
                  [
                    -329200.10810000077,
                    49628.166999999434
                  ],
                  [
                    -433777.05680000037,
                    87783.983500000089
                  ],
                  [
                    -534112.75899999961,
                    136007.38540000096
                  ],
                  [
                    -643737.89559999853,
                    155360.90810000151
                  ],
                  [
                    -755033.3936999999,
                    153047.74670000002
                  ],
                  [
                    -866085.40799999982,
                    145333.35249999911
                  ],
                  [
                    -976217.62999999896,
                    129114.93939999864
                  ],
                  [
                    -1087511.3233000003,
                    126718.78040000051
                  ],
                  [
                    -1198617.1088999994,
                    119823.3104000017
                  ],
                  [
                    -1305317.4675999992,
                    88084.511799998581
                  ],
                  [
                    -1411935.6565000005,
                    56073.440000001341
                  ],
                  [
                    -1518314.0241999999,
                    23275.155000001192
                  ],
                  [
                    -1626332.2846999988,
                    -3633.6050999984145
                  ],
                  [
                    -1736260.3031000011,
                    -21179.790600001812
                  ],
                  [
                    -1847319.2710000016,
                    -13568.72899999842
                  ],
                  [
                    -1922858.3764999993,
                    27404.295000001788
                  ]
                ]
              ]
            }
          }
        ],
        "exceededTransferLimit": false
      }
    }
  ],
  "messages": []
}
```