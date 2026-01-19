# GPServer

> Source: [/rest/services-reference/enterprise/gp-service/](https://developers.arcgis.com/rest/services-reference/enterprise/gp-service/)

**URL:**: https://<catalog-url>/<serviceName>/GPServer

**Methods:**: GETPOST

**Child Resources:**: Task

**Required Capability:**: ArcGIS Enterprise Standard

**Version Introduced:**: 9.3

## Description

The `GPServer` resource provides basic information associated with the service, including the service description, the tasks provided, the operation type, maximum number of records allowed in the result, allowed operations, JSON schema for all [data types](/rest/services-reference/enterprise/gp-data-types/), and the result's map server name when applicable. Starting at ArcGIS Server 11.1, the JSON schema uses the Draft 7 version from [json-schema.org](https://json-schema.org/specification-links.html#draft-7), and will be available for all geoprocessing services.

## Child resources

The [`Info`](/rest/services-reference/enterprise/info/) child resource is always available to any geoprocessing service. If the upload capability is enabled, the [`uploads`](/rest/services-reference/enterprise/uploads/) child resource will be available. To enable the uploads capability, turn on the [**Upload**](https://pro.arcgis.com/en/pro-app/latest/help/sharing/overview/web-tool-settings.htm#GUID-9998A2C7-5C81-4390-B4EB-B33BC7B50FA1) option during publishing, or [edit the service properties in Server Manager](https://enterprise.arcgis.com/en/server/latest/publish-services/windows/editing-service-properties-in-manager.htm).

## Request parameter

| Parameter | Details |
|---|---|
| f(Optional) | The response format. Default is html.Values: html \| json \| pjson |

## Example usages

The following is a sample request URL for the 911 call hot spot analysis on `sampleserver6` with a JSON response format:



```
https://sampleserver6.arcgisonline.com/arcgis/rest/services/911CallsHotspotPro/GPServer?f=json
```

The following is a sample `POST` request for the 911 call hot spot analysis on `sampleserver6` with a JSON response format:



```
POST /arcgis/rest/services/911CallsHotspotPro/GPServer HTTP/1.1
Host: sampleserver6.arcgisonline.com
Content-Type: application/x-www-form-urlencoded
Content-Length: []

f=json
```

## JSON Response schema

The syntax will vary slightly depending on the ArcGIS Server version and where the geoprocessing service is published from. Some earlier versions of ArcGIS Server do not have `currentVersion` or `schema` available.



```
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "JSON Schema for GPServer endpoint",
    "description": "This schema describes the JSON return of a GPServer endpoint. Depending on the version of the ArcGIS Server and where the geoprocessing service is published, optional keys may not be present.",
    "type": "object",
    "required": [
        "currentVersion",
        "serviceDescription",
        "tasks",
        "executionType",
        "resultMapServerName",
        "maximumRecords",
        "capabilities"
    ],
    "properties": {
        "currentVersion": {
            "description": "The version of ArcGIS Server",
            "type": "number"
        },
        "cimVersion": {
            "description": "Corresponding ArcGIS Pro runtime version used by ArcGIS Server",
            "type": "string"
        },
        "serviceDescription": {
            "description": "Description of the geoprocessing service",
            "type": "string"
        },
        "tasks": {
            "description": "List of tasks in the geoprocessing service",
            "type": "array",
            "items": {
                "description": "Name of a task",
                "type": "string"
            },
            "uniqueItems": true
        },
        "executionType": {
            "description": "Operation type of the geoprocessing service",
            "type": "string",
            "enum": [
                "esriExecutionTypeAsynchronous",
                "esriExecutionTypeSynchronous"
            ]
        },
        "resultMapServerName": {
            "description": "Name of the result map service, if applicable",
            "type": "string"
        },
        "maximumRecords": {
            "type": "integer",
            "minimum": 1
        },
        "capabilities": {
            "type": "string",
            "enum": [
                "",
                "Uploads"
            ]
        },
        "schema": {
            "type": "object",
            "properties": {
                "json-schema": {
                    "type": "object",
                    "properties": {
                        "url": {
                            "type": "string",
                            "format": "uri"
                        }
                    },
                    "required": [
                        "url"
                    ]
                }
            },
            "required": [
                "json-schema"
            ]
        }
    }
}
```

## JSON Response examples

### Example One: Older server version response

This is a sample JSON response to the 911 Calls Hotspot tool. A request can be made using the [GET request example in the Example Usage section above](/rest/services-reference/enterprise/gp-service/#example-usage).



```
{
 "currentVersion": 10.91,
 "cimVersion": "2.9.0",
 "serviceDescription": "This geoprocessing service is based on a series of analysis including integrate, collect events, hotspot analysis (Getis-Ord Gi*), natural neighbor, and reclassify.",
 "tasks": [
  "911 Calls Hotspot"
 ],
 "executionType": "esriExecutionTypeAsynchronous",
 "resultMapServerName": "",
 "maximumRecords": 1000,
 "capabilities": ""
}
```

### Example Two: Response with JSON schema URL

This is a sample JSON response for a file processing geoprocessing service published from ArcGIS Pro 3.1 to ArcGIS Server 11.1.



```
{
 "currentVersion": 11.1,
 "cimVersion": "3.1.0",
 "serviceDescription": "This geoprocessing service allows users to upload their files containing field survey results for spatial processing.",
 "tasks": [
  "Processing for Northern Districts",
  "Batch Processing",
  "PDF Processing"
 ],
 "executionType": "esriExecutionTypeAsynchronous",
 "resultMapServerName": "",
 "maximumRecords": 1000,
 "capabilities": "Uploads",
 "schema": {
  "json-schema": {
    "url": "https://organization.example.com/<context>/rest/directories/arcgisoutput/FileProcessing_GPServer/FileProcessing/spec/json-schema.json"
    }
 }
}
```