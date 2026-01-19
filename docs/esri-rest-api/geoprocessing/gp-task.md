# Task

> Source: [/rest/services-reference/enterprise/gp-task/](https://developers.arcgis.com/rest/services-reference/enterprise/gp-task/)

**URL:**: https://<gpservice-url>/<taskName>

**Methods:**: GETPOST

**Operations:**: Execute Task, Submit Job

**Child Resources:**: Job

**Version Introduced:**: 9.3

## Description

A geoprocessing `task` resource represents a single task in a geoprocessing service published to ArcGIS Server. It provides the task name, display name, and detailed information about various input and output parameters.

A geoprocessing `task` resource supports the following operations:

-   [`submitJob`](/rest/services-reference/enterprise/submit-gp-job/)—For tasks with an asynchronous operation type. An asynchronous type means that the application does not wait for the task to complete, and the end user can continue using the application. A client must actively check the status of the job to learn its progress and results when finished.
-   [`execute`](/rest/services-reference/enterprise/execute-gp-task/)—For tasks with a synchronous operation type. A synchronous type means that the application waits while the tool runs on the server. Because the end user must wait, determine whether the wait time is acceptable for the type of application. Fast running analysis is a common use case for synchronous type. However, an output feature service is not available.
-   [`validate`](/rest/services-reference/enterprise/validate-gp-task/)—For tasks with validate capability, introduced at ArcGIS Enterprise 12.0. Validate operation acts like a synchronous geoprocessing service to response with updated task information based on provided input.

## Child resources

At 10.9.1, the new `metadata` child resource is available. It shows the metadata for a geoprocessing `task` resource in XML format only. No request parameter is needed. An example usage is to access the metadata using the following URL:

Getting the metadata for the `MyTaskName` task.



```
https://organization.example.com/<context>/rest/services/myServiceName/GPServer/MyTaskName/metadata
```

.

## Request parameter

| Parameter | Details |
|---|---|
| f(Optional) | The response format. The default response format is html.Values: html \| json \|pjson |

### Example usage

Example 1: Request URL for the `CreateDriveTimePolygons` task for `ESRI_DriveTime_US`.

This request will return the HTML page of the GPTask.



```
https://organization.example.com/<context>/rest/services/Network/ESRI_DriveTime_US/GPServer/CreateDriveTimePolygons
```

Example 2: Request URL for the 911 call hot spot analysis with a JSON return format:

This request will return the GPTask with JSON.



```
https://organization.example.com/<context>/rest/services/911CallsHotspot/GPServer/911%20Calls%20Hotspot?f=json
```

## JSON Response schema

The JSON schema shown below is for a geoprocessing `task` response when queried with JSON. The `filter` property is available starting at ArcGIS Server 10.7. The `parameterInfos` property is available starting at ArcGIS Server 11.0. The [GPValueTable](/rest/services-reference/enterprise/gp-data-types/#gpvaluetable), [GPMultiValue](/rest/services-reference/enterprise/gp-data-types/#gpmultivalue), and [GPComposite](/rest/services-reference/enterprise/gp-data-types/#gpcomposite) data types are subject to the availability of that data type in your ArcGIS Server version.

JSON Schema for a GPTask



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for GP Task endpoint",
  "description": "This schema describes the JSON return of a GP Task endpoint. Depending on the version of ArcGIS Server and the original tool, optional keys may not be present.",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "displayName": { "type": "string" },
    "description": { "type": "string" },
    "category": { "type": "string" },
    "helpUrl": { "type": "string", "format": "uri" },
    "executionType": { "type": "string" },
    "parameters": {
      "type": "array",
      "description": "List of parameters for the GP Task",
      "items": {
        "description": "Individual parameter",
        "type": "object",
        "required": [
          "name",
          "dataType",
          "displayName",
          "description",
          "direction",
          "defaultValue",
          "parameterType",
          "category"
        ],
        "properties": {
          "name": {
            "description": "The name of the parameter",
            "type": "string"
          },
          "dataType": {
            "description": "The data type of the parameter",
            "type": "string"
          },
          "displayName": {
            "description": "The display name of the parameter",
            "type": "string"
          },
          "description": {
            "description": "The description of the parameter",
            "type": "string"
          },
          "direction": {
            "description": "Whether it is an input or an output parameter",
            "type": "string",
            "enum": [
              "esriGPParameterDirectionInput",
              "esriGPParameterDirectionOutput"
            ]
          },
          "dependency": {
            "description": "The parameter this one depends on",
            "type": "string"
          },
          "defaultValue": {
            "description": "The default value of the parameter. The type depends on the possible values of the parameter. It can be null."
          },
          "parameterType": {
            "description": "Whether it is a required or an optional parameter",
            "type": "string",
            "enum": [
              "esriGPParameterTypeRequired",
              "esriGPParameterTypeOptional",
              "esriGPParameterTypeDerived"
            ]
          },
          "category": {
            "description": "The category of the parameter",
            "type": "string"
          },
          "choiceList": {
            "$ref": "#/$defs/choiceList"
          },
          "filter": {
            "$ref": "#/$defs/filter"
          },
          "parameterInfos": {
            "description": "Information for GPMultiValue, GPValueTable, and GPComposite",
            "type": "array",
            "items": {
                "description": "An individual element of the data type",
                "type": "object",
                "required": ["dataType"],
                "properties": {
                    "name": {
                        "description": "The name of a column for GPValueTable, empty value for GPMultivalue and GPComposite",
                        "type": "string"
                    },
                    "dataType": {
                        "description": "The data type of the element",
                        "type": "string"
                    },
                    "parameterInfos": {
                        "description": "This parameter info is only possible for a GPMultiValue:GPComposite",
                        "type": "array",
                        "items": {
                            "description": "Possible types for a GPComposite",
                            "type": "object",
                            "required": ["dataType"],
                            "properties": {
                                "name": {
                                    "description": "This will be an empty string",
                                    "type": "string"
                                },
                                "dataType": {
                                    "description": "The data type of an allowed value",
                                    "type": "string"
                                },
                                "displayName": {
                                    "description": "This will be an empty string.",
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "displayName": {
                        "description": "The name of a column for GPValueTable, empty value for GPMultivalue and GPComposite",
                        "type": "string"
                    },
                    "filter": {
                        "$ref": "#/$defs/filter"
                    },
                    "choiceList": {
                        "$ref": "#/$defs/choiceList"
                    }
                }
            }
        }
    }
}
}
},
    "$defs": {
        "filter": {
            "description": "For an input with a filter, available starting ArcGIS Enterprise 10.7. For better readability, see individual filter type schema at the end of this page.",
            "type": "object",
            "required": ["type"],
            "properties": {
                "type": {
                    "description": "The type of filter",
                    "type": "string",
                    "enum": [
                    "range",
                    "featureClass",
                    "file",
                    "field",
                    "codedValue",
                    "composite"
                    ]
                },
                "minimum": {
                    "description": "The lower end of a range filter",
                    "type": "number"
                },
                "maximum": {
                    "description": "The upper end of a range filter",
                    "type": "number"
                },
                "list": {
                    "description": "Allowed types of feature classes for a feature class filter, file extension for a file, or field type of a field.",
                    "type": "array",
                    "items": {
                        "description": "Type of a feature class, a file extension, or a field type",
                        "type": "string"
                    }
                }
            }
        },
        "choiceList": {
            "description": "For input with a choice list, or a ValueList filter",
            "type": "array",
            "items": {
                "description": "Individual choice on the list",
                "type": "string"
            },
            "uniqueItems": true
        }
    },
    "required": [
        "name",
        "displayName",
        "description",
        "category",
        "helpUrl",
        "executionType",
        "parameters"
    ],
    "additionalProperties": false
    }
```

### JSON Response example 1

A sample asynchronous geoprocessing task with an input feature parameter with a filter, an output feature parameter, and an automatically added optional input parameter.



```
{
 "name": "FeatureFiltersLinePolygon",
 "displayName": "Feature filters with line and polygon",
 "description": "This is a feature analysis with input polyline and polygon only. Points are not supported.",
 "category": "",
 "helpUrl": "https://organization.example.com/<context>/rest/directories/arcgisoutput/Level2_Features_Async_GPServer/Level2_Features_Async/FeatureFiltersLinePolygon.htm",
 "executionType": "esriExecutionTypeAsynchronous",
 "parameters": [
  {
   "name": "Input_Features",
   "dataType": "GPFeatureRecordSetLayer",
   "displayName": "Input Features",
   "description": "line and polygon only",
   "direction": "esriGPParameterDirectionInput",
   "filter": {
    "type": "featureClass",
    "list": [
     "esriGeometryPolygon",
     "esriGeometryPolyline"
    ]
   },
   "defaultValue": {
    "displayFieldName": "",
    "hasZ": true,
    "geometryType": "esriGeometryPolygon",
    "spatialReference": {
     "wkid": 102100,
     "latestWkid": 3857
    },
    "fields": [
     {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID"
     },
     {
      "name": "countshort",
      "type": "esriFieldTypeSmallInteger",
      "alias": "countshort"
     },
     {
      "name": "geom",
      "type": "esriFieldTypeSingle",
      "alias": "geom"
     },
     {
      "name": "Shape_Length",
      "type": "esriFieldTypeDouble",
      "alias": "Shape_Length"
     },
     {
      "name": "Shape_Area",
      "type": "esriFieldTypeDouble",
      "alias": "Shape_Area"
     }
    ],
    "features": [],
    "exceededTransferLimit": false
   },
   "parameterType": "esriGPParameterTypeRequired",
   "category": ""
  },
  {
   "name": "Output_Feature_Class",
   "dataType": "GPFeatureRecordSetLayer",
   "displayName": "Output Feature Class",
   "description": "ofc",
   "direction": "esriGPParameterDirectionOutput",
   "defaultValue": {
    "displayFieldName": "",
    "hasZ": true,
    "geometryType": "esriGeometryPoint",
    "spatialReference": {
     "wkid": 102100,
     "latestWkid": 3857
    },
    "fields": [
     {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID"
     },
     {
      "name": "countshort",
      "type": "esriFieldTypeSmallInteger",
      "alias": "countshort"
     },
     {
      "name": "geom",
      "type": "esriFieldTypeSingle",
      "alias": "geom"
     },
     {
      "name": "ORIG_FID",
      "type": "esriFieldTypeInteger",
      "alias": "ORIG_FID"
     }
    ],
    "features": [],
    "exceededTransferLimit": false
   },
   "parameterType": "esriGPParameterTypeRequired",
   "category": ""
  },
  {
   "name": "esri_out_feature_service_name",
   "dataType": "GPString",
   "displayName": "Output Feature Service Name",
   "description": "The name of the optional feature service to create on the federated server containing the result of this tool. If no name is specified, an output feature service will not be created.",
   "direction": "esriGPParameterDirectionInput",
   "defaultValue": "",
   "parameterType": "esriGPParameterTypeOptional",
   "category": ""
  }
 ]
}
```

### JSON Response example 2

A sample synchronous geoprocessing task with the `GPValueTable` parameter, including columns with filters and a GPMultiValue:GPRasterDataLayer output parameter.



```
{
    "name": "filters",
    "displayName": "Input value table with range filters",
    "description": "This analysis will take a GPValueTable with two columns as an input and generate a multivalue of raster layers as an output",
    "category": "",
    "helpUrl": "https://organization.example.com/<context>/rest/directories/arcgisoutput/Level2_ValueTable_Sync_GPServer/Level2_ValueTable_Sync/filters.htm",
    "executionType": "esriExecutionTypeSynchronous",
    "parameters": [
        {
            "name": "Input_range_filters",
            "dataType": "GPValueTable",
            "displayName": "Input range filters",
            "description": "long and double are the columns. first column long has a range of -99,999 to 99,999 second column double has a range of -12345678.9 to 98765.4321",
            "direction": "esriGPParameterDirectionInput",
            "defaultValue": [
                [
                    567,
                    -56756.567
                ],
                [
                    -6567,
                    67886.678
                ]
            ],
            "parameterType": "esriGPParameterTypeRequired",
            "category": "",
            "parameterInfos": [
                {
                    "name": "input long column",
                    "dataType": "GPLong",
                    "displayName": "input long column",
                    "filter": {
                        "type": "range",
                        "minimum": -99999,
                        "maximum": 99999
                    }
                },
                {
                    "name": "input double column",
                    "dataType": "GPDouble",
                    "displayName": "input double column",
                    "filter": {
                        "type": "range",
                        "minimum": -1.23456789E7,
                        "maximum": 98765.4321
                    }
                }
            ]
        },
        {
            "name": "Output_raster_layers",
            "dataType": "GPMultiValue:GPRasterDataLayer",
            "displayName": "Output raster layers",
            "description": "",
            "direction": "esriGPParameterDirectionOutput",
            "defaultValue": [],
            "parameterType": "esriGPParameterTypeDerived",
            "category": "",
            "parameterInfos": [
                {
                    "name": "",
                    "dataType": "GPRasterDataLayer",
                    "displayName": ""
                }
            ]
        }
    ]
}
```

## Filters

A filter can effectively enforce any rules a tool author wants to impose on an input parameter to ensure only supported values by the tool can be provided when a user is using a geoprocessing service. Many existing analysis tools have built-in filters defined. If you want to design your own filters, use the [Filter](https://pro.arcgis.com/en/pro-app/latest/arcpy/classes/filter.htm) class in `arcpy`.

The `codedValue` and `composite` filters were introduced at ArcGIS enterprise 12.0.

### Feature Class

The feature class filter is available for [GPFeatureRecordSetLayer](/rest/services-reference/enterprise/gp-data-types/#GPFeatureRecordSetLayer). This filter allows you to restrict the types of features your geoprocessing service user can provide.

#### JSON Schema

The schema shows a shortened version of the parameter of your `GPTask` to highlight the `filter` with a `featureClass` type.



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for Feature Class Filter",
  "description": "Schema defining a filter for ArcPy parameters that accept only certain feature class geometry types.",
  "type": "object",
  "properties": {
    "filter": {
      "description": "Filter definition object.",
      "type": "object",
      "properties": {
        "type": {
          "description": "The type of filter.",
          "type": "string",
          "enum": ["featureClass"]
        },
        "list": {
          "description": "List of allowed feature class geometry types.",
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "esriGeometryPoint",
              "esriGeometryMultipoint",
              "esriGeometryPolyline",
              "esriGeometryPolygon",
              "esriGeometryMultiPatch",
              "esriGeometryEnvelope"
            ]
          },
          "minItems": 1,
          "uniqueItems": true
        }
      },
      "required": ["type", "list"],
      "additionalProperties": false
    }
  },
  "required": ["filter"],
  "additionalProperties": false
}
```

#### JSON Example

In this code snippet example, only polygons and polylines are allowed.



```
{
    "filter": {
        "type": "featureClass",
        "list": ["esriGeometryPolyline","esriGeometryPolygon"]

   }
}
```

### Range

The range filter is available for [GPLong and GPDouble](/rest/services-reference/enterprise/gp-data-types/#GPBoolean,-GPDouble,-GPLong,-and-GPString) where you can specify the range for your input.

#### JSON Schema

The schema shows a shortened version of the parameter of your `GPTask` to highlight the `filter` with a `range` type.



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for ArcGIS Range Filter",
  "description": "Schema defining a filter object with type 'range' and numeric minimum/maximum values.",
  "type": "object",
  "properties": {
    "filter": {
      "description": "Filter definition object.",
      "type": "object",
      "properties": {
        "type": {
          "description": "The type of filter.",
          "type": "string",
          "enum": ["range"]
        },
        "minimum": {
          "description": "The lower end of a range filter.",
          "type": "number"
        },
        "maximum": {
          "description": "The upper end of a range filter.",
          "type": "number"
        }
      },
      "required": ["type", "minimum", "maximum"],
      "additionalProperties": false
    }
  },
  "required": ["filter"],
  "additionalProperties": false
}
```

#### JSON Example



```
{
  "filter": {
    "type": "range",
    "minimum": -9999,
    "maximum": 9999
  }
}
```

### Field

The field filter allows you to restrict the field types allowed for that input parameter.

#### JSON Schema

The schema shows a shortened version of the parameter of your `GPTask` to highlight the `filter` with a `range` type.



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for Field Type Filter",
  "description": "Schema defining a filter for ArcPy parameters that accept only certain field types.",
  "type": "object",
  "properties": {
    "filter": {
      "description": "Filter definition object.",
      "type": "object",
      "properties": {
        "type": {
          "description": "The type of filter.",
          "type": "string",
          "enum": ["field"]
        },
        "list": {
          "description": "List of allowed field types.",
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "esriFieldTypeSmallInteger",
              "esriFieldTypeInteger",
              "esriFieldTypeSingle",
              "esriFieldTypeDouble",
              "esriFieldTypeString",
              "esriFieldTypeDate",
              "esriFieldTypeOID",
              "esriFieldTypeGeometry",
              "esriFieldTypeBlob",
              "esriFieldTypeRaster",
              "esriFieldTypeGUID",
              "esriFieldTypeGlobalID",
              "esriFieldTypeXML",
              "esriFieldTypeBigInteger",
              "esriFieldTypeDateOnly",
              "esriFieldTypeTimeOnly",
              "esriFieldTypeTimestampOffset"
            ]
          },
          "minItems": 1,
          "uniqueItems": true
        }
      },
      "required": ["type", "list"],
      "additionalProperties": false
    }
  },
  "required": ["filter"],
  "additionalProperties": false
}
```

#### JSON Example



```
{
  "filter": {
    "type": "field",
    "list": ["esriFieldTypeSmallInteger"]
  }
}
```

### File

The file filter can restrict the file extension allowed. Note that you may not upload a file without an extension whether you are using filter or not.

#### JSON Schema

The schema shows a shortened version of the parameter of your `GPTask` to highlight the `filter` with a `file` type.



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for File Type Filter",
  "description": "Schema defining a filter for parameters that accept only certain file extensions.",
  "type": "object",
  "properties": {
    "filter": {
      "description": "Filter definition object.",
      "type": "object",
      "properties": {
        "type": {
          "description": "The type of filter.",
          "type": "string",
          "enum": ["file"]
        },
        "list": {
          "description": "List of allowed file extensions (without dot).",
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9]+$"
          },
          "minItems": 1,
          "uniqueItems": true
        }
      },
      "required": ["type", "list"],
      "additionalProperties": false
    }
  },
  "required": ["filter"],
  "additionalProperties": false
}
```

### Coded Value Domain

The coded value domain can provide a mapping between the reference of a value and the value itself. It is available for localized strings and a choice list of layers.

Having this information can allow client applications to understand what values are actually being used, rather than the reference of the values themselves in the `choiceList` property.

While client application can continue to use `choiceList`, `codedValue` domain provides more information and is recommended for use over `choiceList` even in instances where you may not need to know the reference of the values.

#### Coded Value Domain for Localized Strings

Some tools have localized strings as a representation of the actual value being used when the tool is run. Starting at ArcGIS Enterprise 12.0, `codedValue` domain can provide the mapping between the localized string in the property `name` and the actual value being used in the property `value`.

Currently, you can only use existing localized strings from existing analysis tools. It is not possible to create a tool with a parameter with customized localized strings.

#### JSON Schema

This is the JSON schema for a parameter's `filter` object at the [GP Task](/rest/services-reference/enterprise/gp-task/) resource when that parameter has a `codedValue` domain.



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "filter": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "codedValue"
        },
        "list": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "dataType": {
                "type": "string",
                "const": "GPString"
              },
              "name": {
                "type": "string",
                "description": "The localized string."
              },
              "value": {
                "type": "string",
                "description": "The actual value used by the tool."
              }
            },
            "required": ["dataType", "name", "value"],
            "additionalProperties": false
          }
        }
      },
      "required": ["type", "list"],
      "additionalProperties": false
    }
  },
  "required": ["filter"],
  "additionalProperties": false
}
```

#### JSON Example

For example, the [Pairwise Buffer (Analysis)](https://pro.arcgis.com/en/pro-app/latest/tool-reference/analysis/pairwise-buffer.htm) tool has the `Dissolve Type` parameter, which accepts 3 values: **No Dissolve**, **Dissolve all output features into a single feature**, and **Dissolve features using the listed fields' unique values or combination of values**. However, when the tool actual runs, these three string corresponds to `NONE`, `ALL`, `LIST`, respectively, and are the actual values used by the tool.



```
{
    "filter": {
    "type": "codedValue",
    "list": [
        {
        "dataType": "GPString",
        "name": "No Dissolve",
        "value": "NONE"
        },
        {
        "dataType": "GPString",
        "name": "Dissolve all output features into a single feature",
        "value": "ALL"
        },
        {
        "dataType": "GPString",
        "name": "Dissolve features using the listed fields' unique values or combination of values",
        "value": "LIST"
        }
    ]
    }
}
```

#### Coded Value Domain for Regular Strings

For actual strings, `codedValue` domains are still available. However, the `name` and `value` property will share the same value.

#### Coded Value Domain for a choice list of layers

Parameters containing a choice list of predefined layers are frequently used by many customized tools. The legacy `choiceList` property can only provide the name of the layers, but the schema for each layer is not available. With `codedValue` domain, the schema and applicable geometry type information are available.

When sending a validate request, if you have the `returnFeatureCollection` set to `true`, you will get the FeatureCollection back as updated coded value domain, which contains geometry type and drawing information in addition to the schema.

#### JSON Schema

This is the JSON schema for a parameter's `filter` object at the [GP Task](/rest/services-reference/enterprise/gp-task/) resource when that parameter has a `codedValue` domain for feature, tables and rasters.



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for codedValue Filter",
  "description": "Schema defining a filter for codedValue type with a list of coded entries.",
  "type": "object",
  "properties": {
    "filter": {
      "description": "Filter definition object.",
      "type": "object",
      "properties": {
        "type": {
          "description": "The type of filter.",
          "type": "string",
          "enum": ["codedValue"]
        },
        "list": {
          "description": "List of coded value entries.",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "dataType": {
                "description": "The data type of the coded value in this example.",
                "type": "string",
                "enum": [
                  "GPFeatureRecordSetLayer",
                  "GPRecordSet",
                  "GPRasterDataLayer"
                ]
              },
              "name": {
                "description": "The layer or table name of the coded value entry.",
                "type": "string"
              },
              "value": {
                "description": "The schema of the layer or table. Geometry type and drawingInfo can be available too. Schema is skipped for allowed data types here."
                "type": "object"
              }
            },
            "required": ["dataType", "name", "value"],
            "additionalProperties": false
          },
          "minItems": 1,
          "uniqueItems": true
        }
      },
      "required": ["type", "list"],
      "additionalProperties": false
    }
  },
  "required": ["filter"],
  "additionalProperties": false
}
```

#### JSON Example

The following JSON shows the coded value domain for an input feature parameter with a choice list of two layers.



```
{
    "filter": {
    "type": "codedValue",
    "list": [
     {
      "dataType": "GPFeatureRecordSetLayer",
      "name": "polygonZ_FeatureToPoint1",
      "value": {
       "hasZ": true,
       "features": [],
       "exceededTransferLimit": false,
       "displayFieldName": "",
       "spatialReference": {
        "latestWkid": 3857,
        "wkid": 102100
       },
       "fields": [
        {
         "name": "OBJECTID",
         "alias": "OBJECTID",
         "type": "esriFieldTypeOID"
        },
        {
         "name": "countshort",
         "alias": "countshort",
         "type": "esriFieldTypeSmallInteger"
        },
        {
         "name": "geom",
         "alias": "geom",
         "type": "esriFieldTypeSingle"
        },
        {
         "name": "ORIG_FID",
         "alias": "ORIG_FID",
         "type": "esriFieldTypeInteger"
        }
       ],
       "geometryType": "esriGeometryPoint"
      }
     },
     {
      "dataType": "GPFeatureRecordSetLayer",
      "name": "polylinesZM1",
      "value": {
       "hasZ": true,
       "features": [],
       "hasM": true,
       "exceededTransferLimit": false,
       "displayFieldName": "",
       "spatialReference": {
        "latestWkid": 3857,
        "wkid": 102100
       },
       "fields": [
        {
         "name": "OBJECTID",
         "alias": "OBJECTID",
         "type": "esriFieldTypeOID"
        },
        {
         "name": "numberofver",
         "alias": "num",
         "type": "esriFieldTypeDouble"
        },
        {
         "name": "record",
         "length": 8,
         "alias": "record",
         "type": "esriFieldTypeDate"
        },
        {
         "name": "Shape_Length",
         "alias": "Shape_Length",
         "type": "esriFieldTypeDouble"
        }
       ],
       "geometryType": "esriGeometryPolyline"
      }
     }
    ]
   }
}
```

### Composite Domains

For the [GPCompoiste](/rest/services-reference/enterprise/gp-data-types/#GPComposite) and [GPValueTable](/rest/services-reference/enterprise/gp-data-type/#GPValueTable) parameter, each data type in the composite, or each column in the value table, can have an individual filter.

Although such information is currently available with the `parameterInfos` property, its recommended to use `codedValue` over `parameterInfos`.

#### JSON Schema

The schema is the same for either the `GPComposite` or `GPValueTable` parameter. For the schema for individual filter types, refer to the sections above. If any data type in your composite, or any column in your value table, does not have a filter set, you will see `null` as a place holder for the composite domain.



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for composite Filter",
  "description": "Schema defining a composite filter with a list of filter components.",
  "type": "object",
  "properties": {
    "filter": {
      "description": "Filter definition object.",
      "type": "object",
      "properties": {
        "type": {
          "description": "The type of filter which will be composite.",
          "type": "string",
          "enum": ["composite"]
        },
        "list": {
          "description": "List of filter components.",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "description": "The type of the filter component.",
                "type": "string",
                "enum": ["range", "field", "featureClass", "file", "codedValue"]
              }
            },
            "required": ["type"],
            "additionalProperties": true
          },
          "minItems": 1
        }
      },
      "required": ["type", "list"],
      "additionalProperties": false
    }
  },
  "required": ["filter"],
  "additionalProperties": false
}
```

#### JSON Example

In this example, it can be used for both `GPComposite` and `GPValuetable`.

In the case of `GPComposite`, this example shows a composite of a `GPString`, `GPFeatureRecordSetLayer`, `GPDataFile`, `GPRasterDataLayer` that doesn't have a supported filter, and `GPLong` that has no filter set.

In the case of `GPValueTable`, this example shows a value table with five columns. They are `GPString`, `GPFeatureRecordSetLayer`, `GPDataFile`, `GPRasterDataLayer` that doesn't have a supported filter, and `GPLong` that has no filter set.



```
{
     "filter": {
        "type": "composite",
        "list": [
          {
            "type": "codedValue",
            "list": [
              {
                "dataType": "GPString",
                "name": "abc",
                "value": "abc"
              },
              {
                "dataType": "GPString",
                "name": "def",
                "value": "def"
              },
              {
                "dataType": "GPString",
                "name": "ghu",
                "value": "ghu"
              }
            ]
          },
          {
            "type": "featureClass",
            "list": [
              "esriGeometryPoint",
              "esriGeometryPolyline"
            ]
          },
          {
            "type": "file",
            "list": [
              "pdf",
              "txt"
            ]
          },
          null,
          null
        ]
    }
}
```

## Choice list

If your tool has a `ValueList` filter on a input string parameter, you will see the allowed strings in your `ValueList` filter become values in the `ChoiceList` of the geoprocessing service task JSON. When you run the tool, only the values in the choice list are valid values. Providing other values will result an error indicating the value provided is not part of the choice list.

You may still see a `codedValue` domain as a filter while your parameter have an equivalent `choiceList` property.

### JSON Schema

The schema shows a shortened version of the parameter of your `GPTask` to highlight the `choiceList`.



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for Choice List",
  "description": "Schema defining a choice list for inputs with a ValueList filter.",
  "type": "object",
  "properties": {
    "choiceList": {
      "description": "For input with a choice list, or a ValueList filter.",
      "type": "array",
      "items": {
        "description": "Individual choice on the list.",
        "type": "string"
      },
      "uniqueItems": true
    }
  },
  "required": ["choiceList"]
}
```

### Sample ChoiceList



```
{
    "choiceList": ["A3", "A4", "Letter", "Legal"]
}
```