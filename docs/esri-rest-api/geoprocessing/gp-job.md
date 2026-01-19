# Jobs

> Source: [/rest/services-reference/enterprise/gp-job/](https://developers.arcgis.com/rest/services-reference/enterprise/gp-job/)

**URL:**: https://<task-url>/jobs/<job-id>

**Methods:**: GETPOST

**Operations:**: Cancel

**Child Resources:**: Input, Result

**Version Introduced:**: 9.3

## Description

The geoprocessing `job` resource represents a job submitted using the [`submitJob`](/rest/services-reference/enterprise/submit-gp-job/) operation. It provides the job ID, status, and messages. Additionally, if the job has successfully completed, the `job` resource provides the following information about the result and input parameters:

-   Job ID as `jobId`—A system assigned ID for each job. Each job has a unique ID.
-   Status as `jobStatus`—The current status of the job. It can be `esriJobNew`, `esriJobWaiting`, `esriJobSubmitted`, `esriJobExecuting`, `esriJobCancelling`, `esriJobCancelled`, `esriJobFailed`, `esriJobTimedOut`, `esriJobSucceeded`, `esriJobDeleting`, or `esriJobDeleted`.
-   Progress as `progress`—See the Progress messages section below.
-   Messages as `messages`—Specify whether the messages will be returned using `returnMessages`. To configure the message level, see [Show Messages](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/web-tool-settings.htm).
-   Output as `results`—All result values can be accessed using the [`results` parameter](/rest/services-reference/enterprise/gp-result/) resource or the [`results`](/rest/services-reference/enterprise/results/) resource. The JSON response specifies a relative URL to the `results` resource with a `paramUrl` field.
-   Input as `inputs`—All input parameter values are accessed using the [`inputs` parameter](/rest/services-reference/enterprise/gp-input/) resource or the [`inputs`](/rest/services-reference/enterprise/inputs/) resource. The JSON response specifies a relative URL to the `inputs` resource with a `paramUrl` field.

The `job` resource supports a [`cancel` a job](/rest/services-reference/enterprise/cancel-gp-job/) operation. This operation can be used to cancel a job before it's completed. If the geoprocessing service is Python code with no ArcPy functions, the cancellation request will not be fulfilled.

### Progress messages

For geoprocessing services published from ArcGIS Pro 2.6 or later to ArcGIS Server 10.8.1 or later, a new section, `progress`, is added in the response JSON. An HTML or KMZ response is not supported. The status message is only available when `jobStatus` is `esriJobExecuting`. When the job is in another status, such as `esriJobSubmitted` or `esriJobSucceed`, this status message will not be available. The status message will update once every 5 seconds in the REST response JSON. Starting at ArcGIS Server 11.2, you can configure the status message update frequency by editing the service properties using the ArcGIS Enterprise Admin API by providing the `progressMessageUpdateInterval` property in the service JSON with an integer in seconds. The minimum supported value is 5, which is the default value. The following is a sample truncated JSON:

Sample JSON with the `progressMessageUpdateInterval` property.



```
{
    "serviceName": "sample_service",
    "type": "GPServer",
    "properties":{
        "progressMessageUpdateInterval": 60,
        "executionType": "Asynchronous"
    }
}
```

This progress message is controlled using [arcpy.SetProgressor](https://pro.arcgis.com/en/pro-app/latest/arcpy/functions/setprogressor.htm) and other ArcPy progressor functions when you are authoring a Python script tool. As with the progressor in ArcGIS Pro, there can be only one type of progressor at a time, and there can be only one message associated with that progressor. Some system tools have a progressor set by default. Both the default progressor and the step progressor are supported. For a step progressor, although a range with negative value is supported, using a positive value for the range is recommended. In addition to the message, a step progress will also provide the percentage finished for the geoprocessing service. The calculation is based on the position, minimum, and maximum of the range. This progress message can provide performance improvement if you want to know a frequent status update of a long running geoprocessing service compared to using the [arcpy.AddMessage](https://pro.arcgis.com/en/pro-app/latest/arcpy/functions/addmessage.htm) function.

If no progressor is defined in the geoprocessing service, a default progressor will be assigned with a default progress message.

A default progressor. This is the default if no progressor is specified.



```
{
    "progress": {
        "type": "default",
        "message": "Executing..."
    }
}
```

A step progressor.



```
{
    "progress": {
        "type": "step",
        "message": "This is a step progressor with minimum 2, maximum 10, step 2",
        "percent": 0
    }
}
```

### Additional advanced configurations

Starting at ArcGIS Server 11.2, you can configure the frequency at which an asynchronous geoprocessing service updates a progress message. By default, a geoprocessing service updates the progress message every 5 seconds, and you can configure this frequency by specifying the `progressMessageUpdateInterval` property value using the ArcGIS Enterprise Admin API in the service JSON. The value will be an integer with seconds, and the most frequent check possible is every 5 seconds. The following is a truncated JSON:

Sample JSON with the `progressMessageUpdateInterval` property.



```
{
    "serviceName": "sample_service",
    "type": "GPServer",
    "properties":{
        "progressMessageUpdateInterval": 120,
        "executionType": "Asynchronous"
    }
}
```

Starting at ArcGIS Server 11.2, you can configure the frequency at which an asynchronous geoprocessing service checks if there is a cancellation request. By default, a geoprocessing service checks every 5 seconds, and you can configure this frequency by specifying the `cancellationCheckInterval` property value using the ArcGIS Enterprise Admin API in the service JSON. The value will be an integer with seconds, and the most frequent check possible is every 1 second. The following is a truncated JSON:

Sample JSON with the `cancellationCheckInterval` property.



```
{
    "serviceName": "sample_service",
    "type": "GPServer",
    "properties":{
        "cancellationCheckInterval": 20,
        "executionType": "Asynchronous"
    }
}
```

## Request parameters

| Parameter | Details |
|---|---|
| f(Optional) | The response format. The default response format is html.Values: html \| json \| kmz |
| returnMessages(Optional) | Specifies whether the job messages will be included in the response. The default is true.Values: true \| false |

## Example usage

When you submit a job and the output format is `html`, you'll be redirected to the `job` resource page with a URL similar to the following:



```
https://organization.example.com/<context>/rest/services/PublicSafety/EMModels/GPServer/ERGByChemical/jobs/jf082fc6d926043fda44169444963fe46
```

## JSON Response schema and example

### JSON Response schema



```
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "required": [
        "jobId",
        "jobStatus",
        "messages"
    ],
    "properties": {
        "jobId": {
            "description": "The unique job ID for each job.",
            "type": "string"
        },
        "jobStatus": {
            "description": "The status of a job",
            "type": "string",
            "enum": [
                "esriJobNew",
                "esriJobWaiting",
                "esriJobSubmitted",
                "esriJobExecuting",
                "esriJobCancelling",
                "esriJobCancelled",
                "esriJobFailed",
                "esriJobTimedOut",
                "esriJobSucceeded",
                "esriJobDeleting",
                "esriJobDeleted"
            ]
        },
        "progress": {
            "description": "The progress of a job. This is only available starting 10.8.1",
            "type": "object",
            "properties": {
                "type": {
                    "description": "The type of a progressor",
                    "type": "string",
                    "enum": [
                        "default",
                        "step"
                    ]
                },
                "message": {
                    "description": "The message of the corresponding progress status",
                    "type": "string"
                },
                "percent": {
                    "description": "The percentage of a step progressor",
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 100
                }
            },
            "required": [
                "type",
                "message"
            ]
        },
        "results": {
            "description": "If there are any results for a succeeded job, they will be listed here.",
            "type": "object",
            "patternProperties": {
                ".+": {
                    "description": "Each result parameter will have an entry",
                    "type": "object",
                    "properties": {
                        "paramUrl": {
                            "description": "The relative result parameter URL",
                            "type": "string",
                            "pattern": "results/.+"
                        }
                    },
                    "required": [
                        "paramUrl"
                    ],
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        },
        "inputs": {
            "description": "If there are any inputs for a succeeded job, they will be listed here.",
            "type": "object",
            "patternProperties": {
                ".+": {
                    "description": "Each input parameter will have an entry",
                    "type": "object",
                    "properties": {
                        "paramUrl": {
                            "description": "The relative input parameter URL",
                            "type": "string",
                            "pattern": "inputs/.+"
                        }
                    },
                    "required": [
                        "paramUrl"
                    ],
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
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

### JSON Response example



```
{
    "jobId": "jfae883d52a074359a0bac3d5b353fe16",
    "jobStatus": "esriJobSucceeded",
    "results": {
        "Output_Long": {
            "paramUrl": "results/Output_Long"
        },
        "Output_Feature_Class": {
            "paramUrl": "results/Output_Feature_Class"
        }
    },
    "inputs": {
        "Input_String": {
            "paramUrl": "inputs/Input_String"
        },
        "Input_Feature_Class": {
            "paramUrl": "inputs/Input_Feature_Class"
        }
    },
    "messages": [
        {
            "type": "esriJobMessageTypeInformative",
            "description": "Start Time: Friday, December 16, 2022 6:05:31 PM"
        },
        {
            "type": "esriJobMessageTypeInformative",
            "description": "Executing (Empirical Bayesian Kriging): EmpiricalBayesianKriging Z:\\data\\arcgis\\arcgisserver\\directories\\arcgissystem\\arcgisinput\\Level2_Others_Async.GPServer\\extracted\\p30\\confidencelevel2_others1.gdb\\testpts Predicted Z:\\data\\arcgis\\arcgisserver\\directories\\arcgisjobs\\level2_others_async_gpserver\\jfae883d52a074359a0bac3d5b353fe16\\scratch\\scratch.gdb/outgl Z:\\data\\arcgis\\arcgisserver\\directories\\arcgisjobs\\level2_others_async_gpserver\\jfae883d52a074359a0bac3d5b353fe16\\scratch\\scratch.gdb\\outraster 3000 None 100 1 100 \"NBRTYPE=StandardCircular RADIUS=331973.144106493 ANGLE=0 NBR_MAX=15 NBR_MIN=10 SECTOR_TYPE=ONE_SECTOR\" Prediction 0.5 Exceed # Power"
        },
        {
            "type": "esriJobMessageTypeInformative",
            "description": "Start Time: Friday, December 16, 2022 6:05:32 PM"
        },
        {
            "type": "esriJobMessageTypeInformative",
            "description": "Succeeded at Friday, December 16, 2022 6:05:53 PM (Elapsed Time: 21.18 seconds)"
        },
        {
            "type": "esriJobMessageTypeInformative",
            "description": "Succeeded at Friday, December 16, 2022 6:05:53 PM (Elapsed Time: 22.04 seconds)"
        }
    ]
}
```