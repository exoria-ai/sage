# Geoprocessing service data types

> Source: [/rest/services-reference/enterprise/gp-data-types/](https://developers.arcgis.com/rest/services-reference/enterprise/gp-data-types/)

The majority of the parameters that you include in a request are dependent on the input parameter types of the geoprocessing task you are submitting. The geoprocessing [`execute`](/rest/services-reference/enterprise/execute-gp-task/) and [`submitJob`](/rest/services-reference/enterprise/submit-gp-job/) operations share the same syntax for all input parameter types. For outputs, the result data syntax may be different from the inputs.

The data types listed in this topic are the data types supported on the server side. To learn more about supported data types from the publishing client, and how unsupported data types are converted during the publish process, see [Input and output parameters](https://pro.arcgis.com/en/pro-app/latest/help/sharing/overview/inputs-and-outputs.htm). There is also an identical JSON Schema page available at all the [GPServer](/rest/services-reference/enterprise/gp-service/) endpoint describing all data types.

## GPFeatureRecordSetLayer

### Input

The input parameter value for the `GPFeatureRecordSetLayer` data type can be a `featureSet` object, a layer, the URL of a map service or a feature service layer, or an uploaded server item.

#### featureSet syntax

For the syntax of `featureSet`, see [featureSet object](/rest/services-reference/enterprise/featureset-object/).

#### Layer syntax

For the syntax of a layer, see [Layer object](/rest/services-reference/enterprise/layer/).

#### Layer URL syntax

To specify a feature service layer or map service layer, provide the URL to the layer. An optional attribute filter can be added. Starting at 10.7.1, instead of querying [time-enabled map service layers](/rest/services-reference/enterprise/query-map-service-layer/#request-parameters) or [time-enabled feature service layers](/rest/services-reference/enterprise/query-feature-service-layer/#request-parameters), an optional time filter can be specified. Time can be filtered as a single integer timestamp using epoch time. Time can also be a range in a comma-delimited string, with a lower end and an upper end. Either end of the range can be `null`.

Layer URL syntax



```
{
  "url": "<url of a map service or a feature service layer>",
  "filter": <attribute expression>,
  "time": <time value>
}
```

#### Layer URL JSON schema



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Layer URL Input Schema",
  "description": "It describes the JSON Schema for an input layer URL for the GPFeatureRecordSetLayer data type.",
  "type": "object",
  "required": [
    "url"
  ],
  "properties": {
    "url": {
      "description": "The URL of a feature service or map service layer. Attribute filters can also be applied at the end of the URL as a parameter.",
      "type": "string",
      "format": "uri",
      "pattern":  "^(https?:\\/\\/)[\\w.-]+\\/arcgis\\/rest\\/services\\/.+\\/(FeatureServer|MapServer)\\/\\d+(\\?.*)?$"
    },
    "filter": {
      "description": "It filters based on the attribute value",
      "type": "string"
    },
    "time": {
      "description": "The desired time for a time-enabled service layer. Use the number to specify a timestamp, or use a comma delimited string to specify a range with a lower and an upper end, including null.",
      "type": ["string", "integer"],
      "pattern": "^(?:-?\\d+|null)(?:,(?:-?\\d+|null))?$"
    }
  }
}
```

#### itemID syntax

For a large set of geometries, you can specify an uploaded item as input for geoprocessing services that support [uploads](/rest/services-reference/enterprise/uploads/), which is one of the **Child Resources** values of the geoprocessing service. The item ID will be available once you use the [`upload` item](/rest/enterprise-administration/server/uploaditem/) operation to upload a JSON-based `.txt` file or a `.json` file. Starting at ArcGIS Enterprise 11.5, you can also upload a `.pbf` file. The `itemID` value of the portal item is not supported regardless of the type of item, even if the server is federated.



```
{
  "itemID" : "<itemID>"
}
```

#### Other URL syntax

Instead of uploading a `.txt` or a `.json` file, you can also provide an URL to the file as an input. If there is authentication required to access the file, those authentication must be provided in the URL, like an access token or a key. Starting at ArcGIS Enterprise 11.5, you can also provide an URL to a `.pbf` file.



```
{
  "url": "https://organization.example.com/file.json"
}
```

#### Example 1: featureSet input



```
{
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 4326
  },
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
  ],
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
```

#### Example 2: featureSet value without a schema

When the input `geometryType`, `spatialReference`, and `fields` values match the default values, the input `GPFeatureRecordSetLayer` value can exclude `geometryType`, `spatialReference`, and `fields` information. The `geometryType`, `spatialReference`, and `fields` values will be the default values if no other values are provided.

The `geometryType` value can be `esriGeometryPoint`, `esriGeometryPolyline`, or `esriGeometryPolygon`. If no geometry type is specified, it defaults to `esriGeometryPoint`. If no `spatialReference` value is specified, it defaults to an unknown coordinate system.



```
{
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
```

#### Example 3: hasZ or hasM property

Provide the `hasZ` or `hasM` property for feature sets that contain z- or m-values, respectively. The following example has z-values:



```
{
  "geometryType": "esriGeometryPoint",
  "hasZ": true,
  "spatialReference": {
    "wkid": 4326
  },
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
  ],
  "features": [
    {
      "geometry": {
        "x": -104.44,
        "y": 34.83,
        "z": 10.0
      },
      "attributes": {
        "Id": 43,
        "Name": "Feature 1"
      }
    },
    {
      "geometry": {
        "x": -100.65,
        "y": 33.69,
        "z": 11.0
      },
      "attributes": {
        "Id": 67,
        "Name": "Feature 2"
      }
    }
  ]
}
```

#### Example 4: URL to geometries or feature queries

For a large set of geometries, you can specify a URL to the input geometries stored in a JSON structure in a file on a public server. The URL value can also be a URL to an operation such as a `MapService` or `FeatureService` query that returns a JSON feature set.



```
{
  "url": "https://organization.example.com/folder/filename.txt"
}
```



```
{
  "url": "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0/query?where=1%3D1&f=json"
}
```

#### Example 5: itemID value of an uploaded item

Once you upload the `.json` or `.txt` file, a unique `itemID` value is generated, such as i1057fd92-669e-40c0-98c8-cf1b0500fa13.

Specify the itemID value returned using the `upload` item operation.



```
{
  "itemID":"i1057fd92-669e-40c0-98c8-cf1b0500fa13"
}
```

#### Example 6: URL of a service with an attribute filter

You can specify the URL of a map service layer or a feature service layer.

Specify the commercial damage assessment layer from a feature service on sampleserver6 with no filter.



```
{
  "url": "https://sampleserver6.arcgisonline.com/arcgis/rest/services/CommercialDamageAssessment/FeatureServer/0"
}
```

Filter the [citizen requests layer](https://sampleserver6.arcgisonline.com/arcgis/rest/services/LocalGovernment/CitizenRequests/MapServer/0) from a map service on sampleserver6 with an attribute filter selecting requests having a level 2 severity and null names.



```
{
  "url": "https://sampleserver6.arcgisonline.com/arcgis/rest/services/LocalGovernment/CitizenRequests/MapServer/0",
  "filter": "severity=2 and name is null"
}
```

#### Example 7: Time filter

Starting at 10.7.1, you can specify a time filter. Time can be filtered as a single instant or by separating the two ends of a time extent with a comma.

Specify a single timestamp.



```
{
  "url": "https://organization.example.com/<context>/rest/services/Hosted/myservicename/FeatureServer/0",
  "time": 967855732000
}
```

Specify a time extent with a known lower end and a null upper end.



```
{
  "url": "https://organization.example.com/<context>/rest/services/Hosted/myservicename/FeatureServer/0",
  "time": "967855732000,null"
}
```

#### Example 8: Use a 64-bit object ID

Starting at ArcGIS Enterprise 11.2, a geoprocessing service can support an input `GPFeatureRecordSetLayer` value with a 64-bit object ID. If the object ID will exceed the 32-bit range, ensure that the field length in the schema is set to 8 bytes. You cannot use a `featureSet` value with an object ID exceeding the 32-bit range without a schema. Otherwise, the object ID will result in a parsing error if any of the object ID values exceed the 32-bit range.

For a 64-bit object ID field, specify a field length of 8.



```
{
  "displayFieldName": "",
  "fieldAliases": {
    "OBJECTID": "OBJECTID",
    "AREA": "AREA",
    "SHAPE_Length": "SHAPE_Length",
    "SHAPE_Area": "SHAPE_Area"
  },
  "geometryType": "esriGeometryPolygon",
  "spatialReference": {
    "wkid": 4267,
    "latestWkid": 4267
  },
  "fields": [
    {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID",
      "length": 8
    },
    {
      "name": "AREA",
      "type": "esriFieldTypeDouble",
      "alias": "AREA"
    },
    {
      "name": "SHAPE_Length",
      "type": "esriFieldTypeDouble",
      "alias": "SHAPE_Length"
    },
    {
      "name": "SHAPE_Area",
      "type": "esriFieldTypeDouble",
      "alias": "SHAPE_Area"
    }
  ],
  "features": [
    {
      "attributes": {
        "OBJECTID": 10000000001,
        "AREA": 110667.29300000001,
        "SHAPE_Length": 23.608489581822141,
        "SHAPE_Area": 29.969228222488425
      },
      "geometry": {
        "rings": [
          [
            [
              -119.15146541595459,
              38.411884784698486
            ],
            [
              -119.9942774772644,
              39.311637878417969
            ],
            [
              -114.66767859458923,
              35.656409978866577
            ],
            [
              -117.15952253341675,
              36.959656000137329
            ],
            [
              -119.15146541595459,
              38.411884784698486
            ]
          ]
        ]
      }
    }
  ]
}
```

#### Example 9: Date only, time only, and timestamp offset fields

Starting at ArcGIS Enterprise 11.2, a geoprocessing service can support an input with date only, time only, and timestamp offset fields. No special syntax is necessary to use these new field types if the features have them.

An input `featureSet` value containing `esriFieldTypeDateOnly`, `esriFieldTypeTimeOnly`, and `esriFieldTypeTimestampOffset` fields.



```
{
  "geometryType": "esriGeometryPoint",
  "hasZ": true,
  "spatialReference": {
    "wkid": 4326
  },
  "fields": [
    {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID",
      "length": 8
    },
    {
      "name": "sampletime",
      "type": "esriFieldTypeTimeOnly",
      "alias": "sampletime"
    },
    {
      "name": "sampledate",
      "type": "esriFieldTypeDateOnly",
      "alias": "sampledate"
    },
    {
      "name": "sampleoffset",
      "type": "esriFieldTypeTimestampOffset",
      "alias": "sampleoffset"
    }
  ],
  "features": [
    {
      "geometry": {
        "x": -104.44,
        "y": 34.83,
        "z": 10.0
      },
      "attributes": {
        "OBJECTID": 1,
        "sampletime": "10:00:00 AM",
        "sampledate": "8/2/2020",
        "sampleoffset": "8/2/2020 10:00:00.0000 AM -07:00"
      }
    }
  ]
}
```

### Output

#### featureSet output

If the geoprocessing service is not associated with a result map service or if the `returnType` parameter is set to `data`, the parameter value for `GPFeatureRecordSetLayer` is a JSON structure that is almost identical to [`featureSet` input](/rest/services-reference/enterprise/gp-data-types/#GUID-E9EC586F-6E6F-4860-929B-BDBE2B74487C) for `GPFeatureRecordSetLayer` other than the additional `exceededTransferLimit` property.

The `exceededTransferLimit` property is `true` only if the number of records exceeds the maximum number configured by the server administrator. Otherwise, the property is set to `false`. This additional property is unique to a `featureSet` value generated by a geoprocessing service. To adjust the transfer limit, see [Max Domain Count](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/web-tool-settings.htm). There is no transfer limit if you use the output feature service.

If the geoprocessing service is associated with a result map service, the default output for the `GPFeatureRecordSetLayer` parameter is a map image. However, you can explicitly request the feature data using the `returnType` parameter in the URL and set its value to `data`.

Starting at ArcGIS Enterprise 11.2, a geoprocessing service can support an output `featureSet` value with a 64-bit object ID and `esriFieldTypeDateOnly`, `esriFieldTypeTimeOnly`, and `esriFieldTypeTimestampOffset` field types, in addition to all other field types previously supported.



```
{
  "paramName": "<paramName>",
  "dataType": "GPFeatureRecordSetLayer",
  "value": <featureSet object>
}
```



```
{
  "paramName": "Output_Features",
  "dataType": "GPFeatureRecordSetLayer",
  "value": {
    "geometryType": "esriGeometryPoint",
    "hasZ": true,
    "spatialReference": {
      "wkid": 4326
    },
    "fields": [
      {
        "name": "OBJECTID",
        "type": "esriFieldTypeOID",
        "alias": "OBJECTID"
      },
      {
        "name": "TextField",
        "type": "esriFieldTypeString",
        "alias": "TextField"
      },
      {
        "name": "IntField",
        "type": "esriFieldTypeInteger",
        "alias": "IntegerField"
      },
      {
        "name": "DoubleField",
        "type": "esriFieldTypeDouble",
        "alias": "DoubleField"
      },
      {
        "name": "DateField",
        "type": "esriFieldTypeDate",
        "alias": "DateField"
      }
    ],
    "features": [
      {
        "geometry": {
          "x": -104.36,
          "y": 34.657,
          "z": 10.0
        },
        "attributes": {
          "OBJECTID": 1,
          "TextField": "a",
          "IntField": 1234,
          "DoubleField": 1234.56,
          "DateField": 229564800000
        }
      },
      {
        "geometry": {
          "x": -114.749,
          "y": 31.439,
          "z": 11.0
        },
        "attributes": {
          "OBJECTID": 2,
          "TextField": "b",
          "IntField": 5678,
          "DoubleField": 5678.91,
          "DateField": 239564800000
        }
      }
    ],
    "exceededTransferLimit": false
  }
}
```

An example when the number of result features exceeds the transfer limit. The `features` section will become an empty list.



```
{
  "paramName": "outputBuffer",
  "dataType": "GPFeatureRecordSetLayer",
  "value": {
    "displayFieldName": "",
    "geometryType": "esriGeometryPolygon",
    "spatialReference": {
      "wkid": 102100,
      "latestWkid": 3857
    },
    "fields": [
      {
        "name": "OBJECTID",
        "type": "esriFieldTypeOID",
        "alias": "OID"
      },
      {
        "name": "BUFF_DIST",
        "type": "esriFieldTypeDouble",
        "alias": "BUFF_DIST"
      },
      {
        "name": "ORIG_FID",
        "type": "esriFieldTypeInteger",
        "alias": "ORIG_FID"
      },
      {
        "name": "shape_Length",
        "type": "esriFieldTypeDouble",
        "alias": "shape_Length"
      },
      {
        "name": "shape_Area",
        "type": "esriFieldTypeDouble",
        "alias": "shape_Area"
      }
    ],
    "features": [],
    "exceededTransferLimit": true
  }
}
```

#### FeatureCollection output

If the geoprocessing service is not associated with a result map service, and `returnFeatureCollection` is set to `true`, the parameter value for `GPFeatureRecordSetLayer` is a JSON structure similar to the input [`layer`](/rest/services-reference/enterprise/gp-data-types/#layer-syntax) object.

Similar to the `featureSet` output, the only additional property the `exceededTransferLimit`.



```
{
  "paramName": "<paramName>",
  "dataType": "GPFeatureRecordSetLayer",
  "value": <LayerObject>
}
```



```
{
  "paramName": "Output_Feature_Class",
  "dataType": "GPFeatureRecordSetLayer",
  "value": {
    "layerDefinition": {
      "name": "Output Feature Class",
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolygon",
      "objectIdField": "OBJECTID",
      "fields": [
        {
          "name": "OBJECTID",
          "type": "esriFieldTypeOID",
          "alias": "OBJECTID"
        },
        {
          "name": "Shape",
          "type": "esriFieldTypeGeometry",
          "alias": "Shape"
        },
        {
          "name": "X",
          "type": "esriFieldTypeInteger",
          "alias": "X"
        },
        {
          "name": "Y",
          "type": "esriFieldTypeInteger",
          "alias": "Y"
        },
        {
          "name": "UserName",
          "type": "esriFieldTypeString",
          "alias": "UserName",
          "length": 50
        },
        {
          "name": "BUFF_DIST",
          "type": "esriFieldTypeDouble",
          "alias": "BUFF_DIST"
        },
        {
          "name": "ORIG_FID",
          "type": "esriFieldTypeInteger",
          "alias": "ORIG_FID"
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
      "drawingInfo": {
        "renderer": {
          "type": "simple",
          "symbol": {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [
              252,
              193,
              184,
              255
            ],
            "outline": {
              "type": "esriSLS",
              "style": "esriSLSSolid",
              "color": [
                110,
                110,
                110,
                255
              ],
              "width": 0.7
            }
          }
        }
      },
      "templates": []
    },
    "featureSet": {
      "displayFieldName": "",
      "geometryType": "esriGeometryPolygon",
      "spatialReference": {
        "wkid": 26944,
        "latestWkid": 26944
      },
      "features": [
        {
          "attributes": {
            "OBJECTID": 1,
            "X": 1959000,
            "Y": 642000,
            "UserName": null,
            "BUFF_DIST": 152.40030480060963,
            "ORIG_FID": 1,
            "Shape_Length": 957.5593559328076,
            "Shape_Area": 72966.16885441207
          },
          "geometry": {
            "curveRings": [
              [
                [
                  1959000,
                  642152.4002999999
                ],
                {
                  "a": [
                    [
                      1959000,
                      642152.4002999999
                    ],
                    [
                      1959000,
                      641999.9999951993
                    ],
                    0,
                    1
                  ]
                }
              ]
            ]
          }
        },
        {
          "attributes": {
            "OBJECTID": 2,
            "X": 1959000,
            "Y": 641000,
            "UserName": null,
            "BUFF_DIST": 152.40030480060963,
            "ORIG_FID": 2,
            "Shape_Length": 957.5593559328076,
            "Shape_Area": 72966.16885441207
          },
          "geometry": {
            "curveRings": [
              [
                [
                  1959000,
                  641152.4002999999
                ],
                {
                  "a": [
                    [
                      1959000,
                      641152.4002999999
                    ],
                    [
                      1959000,
                      640999.9999951993
                    ],
                    0,
                    1
                  ]
                }
              ]
            ]
          }
        }
      ],
      "exceededTransferLimit": false
    }
  }
}
```

#### Feature service output

If the asynchronous geoprocessing service is not associated with a result map service, and the [output feature service](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/use-web-tools-with-output-feature-class.htm) name is provided during the service consumption, the parameter value for the `GPFeatureRecordSetLayer` or `GPRecordSetLayer` data type is a JSON structure with only one property: the URL of the result output feature service. There is no limit to the number of features allowed in a feature service output. The Output Feature Service Name parameter has a parameter name `esri_out_feature_service_name`, it cannot be changed but can be omitted during the publishing process.



```
{
  "paramName": "<paramName>",
  "dataType": "GPFeatureRecordSetLayer" | "GPRecordSet",
  "value": {
    "url": "<URL to a result feature service layer>"
  }
}
```



```
{
  "paramName": "ResultPolygons",
  "dataType": "GPFeatureRecordSetLayer",
    "value": {
    "url": "https://organization.example.com/<context>/rest/services/Hosted/outputFeatureServiceName/FeatureServer/0"
  }
}
```

## GPRecordSet

### Input

The input parameter value for a `GPRecordSet` data type is a JSON structure containing the `features` and `fields` fields, the `url` field, or the `itemID` field.

The `features` field is an array of features. Each feature contains an `attributes` field in which the key is a field name in the list of fields of the record set, and the value is the value for the corresponding field.

Starting at ArcGIS Enterprise 11.2, a geoprocessing service can support an input with a 64-bit object ID, and `esriFieldTypeDateOnly`, `esriFieldTypeTimeOnly`, and `esriFieldTypeTimestampOffset` field types, in addition to all previously supported field types.

#### GPRecordSet syntax



```
{
  "fields": [
    {
      "name": "<field1>",
      "type": "<field1Type>",
      "alias": "<field1Alias>"
    },
    {
      "name": "<field2>",
      "type": "<field2Type>",
      "alias": "<field2Alias>"
    }
  ],
  "features": [
    {
      "attributes": {
        "<field1>": <value11>,
        "<field2>": <value12>
      }
    },
    {
      "attributes": {
        "<field1>": <value21>,
        "<field2>": <value22>
      }
    }
  ]
}
```

#### Layer URL syntax

The `GPRecordSet` input can be the URL of a table layer.



```
{
  "url": "<url of a table layer>"
}
```

#### itemID syntax

For a large set of records, you can specify an uploaded item as input for geoprocessing services that support [uploads](/rest/services-reference/enterprise/uploads/), which is one of the **Child Resources** values of the geoprocessing service. The item ID will be available once you use the [`upload` item](/rest/enterprise-administration/server/uploaditem/) operation to upload a JSON-based `.txt` file or a `.json` file. Starting at ArcGIS Enterprise 11.5, you can also upload a `.pbf` file. The `itemID` value of the portal item is not supported regardless of the type of item, even if the server is federated.



```
{
  "itemID" : "<itemID>"
}
```

#### Other URL syntax

Instead of uploading a `.txt` or a `.json` file, you can also provide an URL to the file as an input. If there is authentication required to access the file, those authentication must be provided in the URL, like an access token or a key. Starting at ArcGIS Enterprise 11.5, you can also provide an URL to a `.pbf` file.



```
{
  "url": "https://organization.example.com/file.json"
}
```

#### Example 1: Use a 64-bit object ID

Starting at ArcGIS Enterprise 11.2, a geoprocessing service can support a `GPRecordSet` input with a 64-bit object ID. If the object ID will exceed the 32-bit range, ensure that the field length in the schema is set to 8 bytes. You cannot use a `featureSet` value with an object ID exceeding the 32-bit range without a schema. Otherwise, the object ID will result in a parsing error if any of the object ID values exceed the 32-bit range.

For a 64-bit object ID field, specify a field length of 8.



```
{
  "displayFieldName": "",
  "fields": [
    {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID",
      "length": 8
    },
    {
      "name": "sampletext",
      "type": "esriFieldTypeString",
      "alias": "sampletext",
      "length": 255
    }
  ],
  "features": [
    {
      "attributes": {
        "OBJECTID": 10000000001,
        "sampletext": "sample"
      }
    }
  ]
}
```

#### Example 2: Date only, time only, and timestamp offset fields

Starting at ArcGIS Enterprise 11.2, a geoprocessing service can support an input with date only, time only, and timestamp offset fields. No special syntax is necessary to use these new field types if the features have them.

An input `GPRecordSet` value containing `esriFieldTypeDateOnly`, `esriFieldTypeTimeOnly`, and `esriFieldTypeTimestampOffset` fields.



```
{
  "displayFieldName": "",
  "fields": [
    {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID",
      "length": 8
    },
    {
      "name": "sampletext",
      "type": "esriFieldTypeString",
      "alias": "sampletext",
      "length": 255
    },
    {
      "name": "sampletimeonly",
      "type": "esriFieldTypeTimeOnly",
      "alias": "sampletimeonly"
    },
    {
      "name": "sampledateonly",
      "type": "esriFieldTypeDateOnly",
      "alias": "sampledateonly"
    },
    {
      "name": "sampleoffset",
      "type": "esriFieldTypeTimestampOffset",
      "alias": "sampleoffset"
    }
  ],
  "features": [
    {
      "attributes": {
        "OBJECTID": 10000000001,
        "sampletext": "sample",
        "sampledateonly":"8/2/2020",
        "sampletimeonly":"10:00:00 AM",
        "sampleoffset": "8/2/2020 10:00:00.0000 AM -07:00"
      }
    }
  ]
}
```

### Output

The output parameter value for a `GPRecordSet` data type is a JSON structure with the `features` field.

The `features` field is an array of features. Each feature contains an `attributes` field. The `attributes` field consists of key-value pairs in which the key is a field name in the list of fields of the record set, and the value is the value of the corresponding field.

Starting at ArcGIS Enterprise 11.2, a geoprocessing service can support an output with a 64-bit object ID and `esriFieldTypeDateOnly`, `esriFieldTypeTimeOnly`, and `esriFieldTypeTimestampOffset` field types, in addition to all previously supported field types.

The `exceededTransferLimit` property is `true` only if the number of records exceeds the maximum number configured by the server administrator. Otherwise, it is `false`.

#### JSON Response syntax



```
{
  "paramName": "<paramName>",
  "dataType": "GPRecordSet",
  "value": {
    "fields": [
      {
        "name": "<field1>",
        "type": "<field1Type>",
        "alias": "<field1Alias>"
      },
      {
        "name": "<field2>",
        "type": "<field2Type>",
        "alias": "<field2Alias>"
      }
    ],
    "features": [
      {
        "attributes": {
          "<field1>": <value11>,
          "<field2>": <value12>
        }
      },
      {
        "attributes": {
          "<field1>": <value21>,
          "<field2>": <value22>
        }
      }
    ],
    "exceededTransferLimit": false | true
  }
}
```

#### JSON Response example



```
{
  "paramName": "Output_Record_Set",
  "dataType": "GPRecordSet",
  "value": {
    "fields": [
      {
        "name": "OBJECTID",
        "type": "esriFieldTypeOID",
        "alias": "OBJECTID"
      },
      {
        "name": "TextField",
        "type": "esriFieldTypeString",
        "alias": "TextField"
      },
      {
        "name": "IntField",
        "type": "esriFieldTypeInteger",
        "alias": "IntegerField"
      },
      {
        "name": "DoubleField",
        "type": "esriFieldTypeDouble",
        "alias": "DoubleField"
      },
      {
        "name": "DateField",
        "type": "esriFieldTypeDate",
        "alias": "DateField"
      }
    ],
    "features": [
      {
        "attributes": {
          "TextField": "a",
          "IntField": 1234,
          "DoubleField": 1234.56,
          "DateField": 229564800000
        }
      },
      {
        "attributes": {
          "TextField": "b",
          "IntField": 5678,
          "DoubleField": 5678.91,
          "DateField": 239564800000
        }
      }
    ],
    "exceededTransferLimit": false
  }
}
```

#### Output feature service

The output can be a feature service. See the [Feature service output](/rest/services-reference/enterprise/gp-data-types/#feature-service-output) section above.

## GPRasterDataLayer

### Input

The input parameter value for a `GPRasterDataLayer` data type is a JSON structure with the `url` field, which is the URL to the location of the input raster data file.



```
{
  "url": "https://myserver/lake.tif"
}
```

For geoprocessing services that support [`uploads`](/rest/services-reference/enterprise/uploads/), you can specify an uploaded item as input to `GPRasterDataLayer` as follows:



```
{
  "itemID": "<itemID>"
}
```

At 10.8, a URL to an image service is supported as an input, provided the tool supports an image service as input.



```
{
  "url": "<url to your image service>"
}
```

#### Example

Use the NDFD wind data from sampleserver 6.



```
{
  "url": "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ScientificData/NDFD_wind/ImageServer"
}
```

### Output

The output parameter value for a `GPRasterDataLayer` data type is a JSON structure with the following fields:

-   `url`—A URL to the location of the raw raster data
-   `format`—A string representing the format of the raster

If the file it is from a synchronous geoprocessing service, the file will be in the output directory of the service. The file may include the `_ags_` prefix. If running a task multiple times, or different tasks of the same service generate a file with the same file name with an existing file in the output directory, a numbered suffix will also be added, incrementing from 1.

If the file is from an asynchronous job, the file will be in the scratch folder of that job in the jobs directory. To learn more about these directories, see [Server directories](https://enterprise.arcgis.com/en/server/latest/administer/windows/about-server-directories.htm).

#### JSON Response syntax



```
{
  "paramName": "<paramName>",
  "dataType": "GPRasterDataLayer",
  "value": {
    "url": "<url>",
    "format": "<format>"
  }
}
```

#### JSON Response example

A TIF output from a synchronous geoprocessing service.



```
{
  "paramName": "Output_Raster_Layer",
  "dataType": "GPRasterDataLayer",
  "value": {
    "url": "https://organization.example.com/<context>/rest/directories/arcgisoutput/RastersProcessing_Sync_GPServer/_ags_africa_150m_earthsat_Cl_Clip.tif",
    "format": "tif"
  }
}
```

A TIF output from an asynchronous geoprocessing service.



```
{
  "paramName": "Output_Raster_Dataset",
  "dataType": "GPRasterDataLayer",
  "value": {
    "url": "https://organization.example.com/<context>/rest/directories/arcgisjobs/rasters_async_gpserver/jca44ef50c99840e7b38f4e0b00b45a83/scratch/rgb22_Resample.tif",
    "format": "tif"
  }
}
```

### Output Image Service

If an asynchronous geoprocessing service is not associated with a result map service, and the [Output Image Service](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/use-web-tools-with-output-image-service.htm) parameter has a valid value when using the service, the parameter value for the `GPRasterDataLayer` is a JSON structure with the `url` property, and the `type` set to `ImageService`. The Output Image Service parameter has a pre-defined parameter name `esri_out_image_service` which cannot be changed, but can be omitted during the publishing process.

#### JSON Response syntax



```
{
  "paramName": "<paramName>",
  "dataType": "GPRasterDataLayer",
  "value": {
    "url": "<url>",
    "type": "ImageService"
  }
}
```

#### JSON Response example

An Output Image Service for the `Output_Raster_Layer` output parameter when providing a prefix as `prefix` while using the geoprocessing service.



```
{
  "paramName": "Output_Raster_Layer",
  "dataType": "GPRasterDataLayer",
  "value": {
    "url": "https://organization.example.com/<context>/rest/services/prefix_Output_Raster_Layer/ImageServer",
    "type": "ImageService"
  }
}
```

## Field

`Field` is supported starting at 10.7. For information about specific requirements to publish a web tool with a `Field` input, see [Input and output parameters](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/inputs-and-outputs.htm). Starting at ArcGIS Enterprise 11.2, a geoprocessing service can support `esriFieldTypeDateOnly`, `esriFieldTypeTimeOnly`, and `esriFieldTypeTimestampOffset` field types.

### Input

The `name` and `type` fields are required. The `alias`, `editable`, `nullable`, and `length` fields are optional.

#### Field syntax

The syntax for a field parameter is below.



```
{
  "name": "<Field name>",
  "type": "<Field type>",
  "alias": "<Field alias>",
  "editable": false | true,
  "nullable": false | true,
  "length": <Field length>
}
```

#### Example

An example of a field parameter named distance having an integer type.



```
{
  "name": "distance",
  "type": "esriFieldTypeInteger",
  "alias": "int",
  "editable": true,
  "nullable": true,
  "length": 4
}
```

### Output

#### JSON Response syntax



```
{
  "paramName": "<paramName>",
  "dataType": "Field",
  "value": {
    "name": "<FieldName>",
    "type": "<FieldType>",
    "alias": "<Field alias>",
    "editable": false | true,
    "nullable": false | true,
    "length": <Field length>
  }
}
```

#### JSON Response example



```
{
  "paramName": "Probability_Field",
  "dataType": "Field",
  "value": {
    "name": "GiPValue",
    "type": "esriFieldTypeInteger",
    "alias": "GiPValue",
    "editable": true,
    "nullable": true,
    "length": 0
  }
}
```

## GPDataFile

### Input

The input of a GPDataFile parameter can be an URL to a file, an itemID of an ArcGIS Server item, or an itemID of a Portal for ArcGIS Enterprise item.

#### URL syntax

The input parameter value for `GPDataFile` is a JSON structure with a `url` field. The value of the `url` field is a URL to the location of the input file.



```
{
  "url": "https://organization.example.com/myfile.extension"
}
```

#### ArcGIS Server item ID syntax

For geoprocessing services that support [`uploads`](/rest/services-reference/enterprise/uploads/), you can specify an [uploaded](/rest/services-reference/enterprise/upload/) item as input to `GPDataFile` as follows. The `uploads` operation will upload an item into ArcGIS Server resulting an `itemID`. However, your service can use other ArcGIS Server items as long as you provide a correct `itemID`.



```
{
  "itemID": "<itemID>"
}
```

#### Portal for ArcGIS item ID syntax

Starting at ArcGIS Enterprise 10.8, you can specify a portal [itemID](/rest/users-groups-and-items/item/) as an input when you publish geoprocessing services to a federated server. You can not use a portal item ID if your geoprocessing service is not in the same portal as that item.



```
{
  "portalItemID": "<portalItemID>"
}
```

### Output

The output parameter value for a `GPDataFile` data type is a JSON structure with a `url` field. The value of the `url` field is a URL to the location of the output file.

If the file is from a synchronous geoprocessing service, the file will be in the output directory of the service. The file name may include the `_ags_` prefix. If you run a task multiple times, or different tasks of the same service generate a file with the same file name with an existing file in the output directory, a numbered suffix will also be added, incrementing from 1.

If the file is from an asynchronous job, the file will be in the scratch folder of that job in the jobs directory.

By default, these files will no longer be available when the directories get cleaned up periodically. To learn more about these directories, and configure the frequency of the cleanup, see [Server directories](https://enterprise.arcgis.com/en/server/latest/administer/windows/about-server-directories.htm).

#### JSON Response syntax



```
{
  "paramName": "<paramName>",
  "dataType": "GPDataFile",
  "value": {
    "url": "<url>"
  }
}
```

#### JSON Response example

A sample file output for a synchronous job.



```
{
  "paramName": "Output_File",
  "dataType": "GPDataFile",
  "value": {
    "url": "https://organization.example.com/<context>/rest/directories/arcgisoutput/SampleFileOutputSync_GPServer/_ags_output_samplefile.txt"
  }
}
```

A sample file output for an asynchronous job with an ID of `jea1c9dad477a444fa48a24418152b83d`.



```
{
  "paramName": "Output_File",
  "dataType": "GPDataFile",
  "value": {
    "url": "https://organization.example.com/<context>/rest/directories/arcgisjobs/samplefile_output_async_gpServer/jea1c9dad477a444fa48a24418152b83d/scratch/output_samplefile.txt"
  }
}
```

## GPBoolean, GPDouble, GPLong, and GPString

### Input

For simple data types and the `GPBoolean`, `GPDouble`, `GPLong`, and `GPString` parameter values, use their literal values in the request.

A sample GET request with four input parameters, `InputBoolean`, `InputDouble`, `InputLong`, and `InputString` with a type the name indicates for a service.



```
https://organization.example.com/<context>/rest/services/SimpleTypesService/GPServer/SimpleTypesTask/submitJob?InputBoolean=true&InputDouble=345.678&InputLong=345&InputString=MyString&f=json
```

Starting at ArcGIS Enterprise 11.2, the `GPLong` data type supports a 64-bit value range of -4503599627370495 to 4503599627370495.

### Output

These simple data types have parameter values that are their literal values.

#### JSON Response syntax



```
{
  "paramName": "<paramName>",
  "dataType": "<GPBoolean | GPDouble | GPLong | GPString>",
  "value": <valueLiteral>
}
```

#### JSON Response example



```
{
  "paramName": "Output_Double",
  "dataType": "GPDouble",
  "value": 1234.56
}
```

Starting at ArcGIS Enterprise 11.2, the `GPLong` data type supports a 64-bit value range of -4503599627370495 to 4503599627370495.

## GPLinearUnit

### Input

The input parameter value for a `GPLinearUnit` data type is a JSON structure with the following fields:

-   `distance` — A positive number.
-   `units` — A string with unit values such as `esriMeters` or `esriMiles`.

#### JSON Schema for the Object Syntax



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for GPLinearUnit",
  "description": "The JSON schema for a GPLinearUnit as an input.",
  "type": "object",
  "properties": {
    "distance": {
      "description": "The distance in a numeric format.",
      "type": "number"
    },
    "units": {
      "description": "The unit of the distance.",
      "type": "string",
      "enum": [
        "esriUnknownUnits",
        "esriInches",
        "esriPoints",
        "esriFeet",
        "esriYards",
        "esriMiles",
        "esriNauticalMiles",
        "esriMillimeters",
        "esriCentimeters",
        "esriMeters",
        "esriKilometers",
        "esriDecimalDegrees",
        "esriDecimeters",
        "esriIntInches",
        "esriIntFeet",
        "esriIntYards",
        "esriIntMiles",
        "esriIntNauticalMiles"
      ]
    }
  },
  "required": ["distance", "units"],
  "additionalProperties": false
}
```

#### Sample JSON input



```
{
  "distance": 345.678,
  "units": "esriMiles"
}
```

If you provide an invalid or unsupported unit type, you will have an error message indicating you provided a wrong unit time. If you don't provide a unit type, `esriMeters` will be used.

### Output

Although rare, you can have a `GPLinearUnit` value as an output. The output parameter value will be in the same format as the JSON input.

## GPArealUnit

Starting at ArcGIS Enterprise 11.3, `GPArealUnit` is available if you publish your geoprocessing service from ArcGIS Pro 3.3 or later.

### Input

For an input GPArealUnit, you can provide either a string or JSON object format.

For a string format, it will be the area with a unit. For example, `3 SquareKilometers` or `1 SquareFoot`. The allowed units for the string representation are

The allowed units for the string representation are:

-   `Unknown`
-   `SquareInches`
-   `SquareInchesUS`
-   `SquareFeet`
-   `SquareFeetUS`
-   `SquareYards`
-   `SquareYardsUS`
-   `Acres`
-   `AcresUS`
-   `SquareMiles`
-   `SquareMilesUS`
-   `SquareMillimeters`
-   `SquareCentimeters`
-   `SquareDecimeters`
-   `SquareMeters`
-   `Ares`
-   `Hectares`
-   `SquareKilometers`

Their singular form like `SquareFoot` and `SquareYardUS` are also allowed.

For a JSON object syntax, it needs to have both the `area` and `units` fields as the JSON schema below.

#### JSON Schema for the JSON Object Syntax



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for GPArealUnit",
  "description": "The JSON schema for a GPArealUnit as an input.",
  "type": "object",
  "required": [
    "area",
    "units"
  ],
  "properties": {
    "area": {
      "description": "The area in a numeric format.",
      "type": "number"
    },
    "units": {
      "description": "The unit of the area.",
      "type": "string",
      "enum": [
        "esriUnknownAreaUnits",
        "esriSquareInches",
        "esriSquareFeet",
        "esriSquareYards",
        "esriAcres",
        "esriSquareMiles",
        "esriSquareMillimeters",
        "esriSquareCentimeters",
        "esriSquareDecimeters",
        "esriSquareMeters",
        "esriAres",
        "esriHectares",
        "esriSquareKilometers",
        "esriSquareInchesUS",
        "esriSquareFeetUS",
        "esriSquareYardsUS",
        "esriAcresUS",
        "esriSquareMilesUS"
      ]
    }
  }
}
```

#### Sample JSON object inputs



```
{
  "area": 50,
  "units": "esriSquareMiles"
}
```

### Output

Although rare, you can have a `GPArealUnit` as an output. The value will be in the JSON object format like the input.

## GPDate

### Input

#### Epoch time syntax

The parameter value for a `GPDate` data type is a number that represents the number of milliseconds since epoch (January 1, 1970) in UTC.

#### ISO syntax

You can also provide a timestamp following the ISO standard yyyy-MM-ddTHH:mm:ss or yyyy-MM-ddTHH:mm:ss.sss, where the `yyyy` represents the full four digit year, `MM` represents the full two digit month, `dd` represents the full two digit day of the month, followed by `T`, and two digit hour in the 24-hour format as `HH`, two digit minute as `mm`, and two digit seconds as `ss`. You can also add three digits of seconds to represent a more accurate timestamp with `.sss`.

#### Object syntax

You can provide the time in the following format, where you can specify a date with a format you need. See more at [date format](https://pro.arcgis.com/en/pro-app/latest/help/mapping/time/convert-string-or-numeric-time-values-into-data-format.htm). Note that the AM/PM designator, time zone designator (`z`), and fractional second precision (`.s`) are not supported.



```
{
  "date": "",
  "format": ""
}
```

A sample GET request with an input date that corresponds to `1 Jan 2008 00:00:00 GMT`.



```
https://organization.example.com/<context>/rest/services/DateService/GPServer/DateTask/submitJob?InputDate=1199145600000
```

A sample GET request with an input date of January 1st, 2025, 2pm sharp in the afternoon.



```
https://organization.example.com/<context>/rest/services/DateService/GPServer/DateTask/submitJob?InputDate=2025-01-01T14:00:00:000
```

### Output

Only the time corresponding to number of milliseconds since epoch (January 1, 1970) in UTC is supported for date as an output.

#### JSON Response syntax



```
{
  "paramName": "<paramName>",
  "dataType": "GPDate",
  "value": <millisecondsSinceEpoch>
}
```

#### JSON Response example

The value corresponds to 1 Jan 2008 00:00:00 GMT.



```
{
  "paramName": "Output_Date",
  "dataType": "GPDate",
  "value": 1199145600000
}
```

## GPMultiValue

### Input

The fully qualified data type for the `GPMultiValue` parameter is `GPMultiValue:<memberDataType>` in which `<memberDataType>` is one of the data types defined above, for example, `GPMultiValue:GPString`, `GPMultiValue:GPLong`, and so on. All geoprocessing data types other than `GPValueTable` are supported by `GPMultiValue`. There can be only one `<memberDataType>` value for the `GPMultiValue` parameter. This restriction also applies to `GPMultiValue:GPComposite` when the parameter has a filter.

The input parameter value for a `GPMultiValue` data type is a JSON array. Each element in this array is of the data type defined by the `<memberDataType>` suffix of the fully qualified `GPMultiValue` data type name.

#### Example 1: Use GPFeatureRecordSetLayer

`GPMultiValue:GPFeatureRecordSetLayer` data type using three government feature service layers.



```
[
  {
    "url": "https://organization.example.com/<context>/rest/services/LocalGovernment/CatchbasinInspections/FeatureServer/0"
  },
  {
    "url": "https://organization.example.com/<context>/rest/services/FederalGovernment/CitizenRequests/FeatureServer/0"
  },
  {
    "url": "https://organization.example.com/<context>/rest/services/StateGovernment/Events/FeatureServer/0"
  }
]
```

#### Example 2: Use GPString

`GPMultiValue:GPString` data type:



```
["Parcels", "Street Lights"]
```

#### Example 3: Use GPLinearUnit

`GPMultiValue:GPLinearUnit` data type:



```
[
  {
    "distance": 345.67,
    "units": "esriMiles"
  },
  {
    "distance": 36,
    "units": "esriMiles"
  }
]
```

### Output

All geoprocessing data types other than `GPValueTable` are supported in the `GPMultiValue` parameter.

The fully qualified data type for the `GPMultiValue` parameter is `GPMultiValue:<memberDataType>` in which `memberDataType` is one of the data types defined above, for example, `GPMultiValue:GPString`, `GPMultiValue:GPLong`, and so on.

The output parameter value for a `GPMultiValue` data type is a JSON array.

#### JSON Response example 1

`GPMultiValue:GPString` data type



```
{
  "paramName": "Output_Strings",
  "dataType": "GPMultiValue:GPString",
  "value": ["Davis", "Irvine"]
}
```

#### JSON Response example 2

`GPMultiValue:GPLinearUnit` data type



```
{
  "paramName": "Output_Distances",
  "dataType": "GPMultiValue:GPLinearUnit",
  "value": [
    {
      "distance": 345.67,
      "units": "esriMiles"
    },
    {
      "distance": 36,
      "units": "esriMiles"
    }
  ]
}
```

## GPValueTable

A value table is a flexible table-like object consisting of rows and columns containing various values. To learn more about value tables, see [ValueTable](https://pro.arcgis.com/en/pro-app/latest/arcpy/classes/valuetable.htm). All data types described in this topic, other than `GPMultiValue` and `GPComposite`, can be a value in `GPValueTable`. A `GPValueTable` value cannot nest within another `GPValueTable` value. This data type is available starting at ArcGIS Enterprise 11.0 when publishing a web tool or geoprocessing service from ArcGIS Pro 3.0 or later.

### Input

You can create a `GPValueTable` input using an array of arrays or JSON with column names. If all of the columns have unique names that are not empty, you can use both syntaxes described below. Otherwise, you must use the array of arrays syntax.

#### Array of arrays syntax

For the array of arrays syntax, the outer array contains all JSON arrays representing each row of a value table. For the JSON array representing values of each column in a row, the sequence of those values must match the value table columns in the tool. For example, if each row of a value table requires a string, a number, and a Boolean as the three columns, you must pass the values in that order. In the case of an empty string, use `""` as the placeholder. For all other types, use `null` as a placeholder for an empty value.

#### Array of arrays example 1

This example shows a `GPValueTable` input with three columns and three rows. The first column is a `GPLong` data type, the second is a `GPString` data type, and the third is a `GPFeatureRecordSetLayer` data type.



```
[
  [
    0,
    "first row second column string",
    {
      "url": "https://myserver.com/server/rest/services/Hosted/myfs/FeatureServer/0"
    }
  ],
  [
    1,
    "second row second column string",
    {
      "spatialReference": {
        "wkid": 102100
      },
      "features": [
        {
          "attributes": {
            "ID": 0
          },
          "geometry": {
            "x": -84.2868721699999,
            "y": 41.593834992
          }
        },
        {
          "attributes": {
            "ID": 1
          },
          "geometry": {
            "x": -80.8615858519999,
            "y": 38.955970817
          }
        }
      ]
    }
  ],
  [
    2,
    "third row second column string",
    {
      "url": "https://myserver.com/server/rest/services/mymapservice/MapServer/3"
    }
  ]
]
```

#### Array of arrays example 2

This example shows a `GPValueTable` input with four columns and two rows. The first column is GPString, the second column is GPLinearUnit, the third column is GPBoolean, and the last column is GPRasterDataLayer. Some of them do not have values, so a null or an empty string is a placeholder for the value.



```
[
  [
  "",
    {
      "distance": 10,
      "units": "esriKilometers"
    },
    true,
    null
  ],
  [
    "first column second row string",
    null,
    null,
    {
      "url": "https://myserver.com/server/rest/services/myImageService/ImageServer"
    }
  ]
]
```

#### Column name syntax

The column name syntax requires all columns of a value table to have a unique column name that is not empty. This syntax allows the flexibility to provide values in any order, because the unique column names allow the values to match the value table correctly. In the case of an empty value, that column name and key-value pair can be absent or you can provide an empty string or `null` as the value.

#### Column name example 1

This example shows a `GPValueTable` input with two columns and two rows. The first column is GPLong and the second column is GPRecordSet. For empty values, this example shows a null value.



```
[
  {
    "myGPLongColumn": 0,
    "myTableColumn": null,
  },
  {
    "myGPLongColumn": null,
    "myTableColumn": {
      "features": [
        {
          "attributes": {
            "ObjectId": 1,
            "TextFld": "SampleText",
            "DateFld": 282096000000
          }
        }
      ]
    }
  }
]
```

#### Column name example 2

This is the same `GPValueTable` input as in the example directly above, except instead of showing columns with null values, this example omits those columns in corresponding rows.



```
[
  {
    "myGPLongColumn": 0
  },
  {
    "myTableColumn": {
      "features": [
        {
          "attributes": {
            "ObjectId": 1,
            "TextFld": "SampleText",
            "DateFld": 282096000000
          }
        }
      ]
    }
  }
]
```

### Output

By default, the array of arrays syntax will be the output for `GPValueTable`. To retrieve the column names along with all values, use `returnColumnName=True` for operations related to [`execute`](/rest/services-reference/enterprise/execute-gp-task/) or [`GPResult`](/rest/services-reference/enterprise/gp-result/).

#### Array of arrays syntax

The value of each column in a row will be based on the order of the columns in a value table parameter. If there is an empty value, an empty string in the case of `GPString` and `null` for all other data types will be placeholders for that value.

#### Array of arrays example

This sample output shows a value table with three columns and two rows. The first column is GPBoolean, the second column is GPString, and the third column is GPLinearUnit.



```
[
  [
    true,
    "first row second column",
    null
  ],
  [
    null,
    "",
    {
      "distance": 5,
      "units": "esriMiles"
    }
  ]
]
```

#### Column name syntax

The column name syntax will show all column names, along with corresponding values, for all rows in a value table. Even if there are columns with null values, the value of that column will still show `null`, along with the column name, in the JSON response. There is no option to hide those column names with null values, unlike the input. If there are duplicate column names, or if a column does not have a name, an error occurs when using `returnColumnName=True`. The order of columns will follow the order of the columns defined in the value table parameter. To use this column name syntax for synchronous jobs, see [Execute a task](/rest/services-reference/enterprise/execute-gp-task/). To use this column name syntax for asynchronous jobs, see [Result parameters](/rest/services-reference/enterprise/gp-result/).

#### Column name example

This sample shows the same output as the array of arrays example above. For columns with null values, the column name still shows.



```
[
  {
    "myBooleanColumn": true,
    "myStringColumn": "first row second column",
    "myLinearUnitColumn": null
  },
  {
    "myBooleanColumn": null,
    "myStringColumn": "",
    "myLinearUnitColumn": {
      "distance": 5,
      "units": "esriMiles"
    }
  }
]
```

## GPComposite

A composite data type allows a parameter to accept multiple data types. A `GPValueTable`, another `GPComposite`, or a `GPMultiValue` data type cannot be one of the data types for `GPComposite`. However, a `GPMultiValue` data type of a `GPComposite` data type is possible. The `GPComposite` data type is available starting at ArcGIS Enterprise 11.2 when publishing a web tool or geoprocessing service from ArcGIS Pro 3.2 or later.

### Input

The syntax for the input composite parameter will be the same as that of the data type in use. Although not required, providing the data type and its value for `GPComposite` is recommended.

#### Data type declaration syntax

To declare the data type you pass in for an input parameter, use the data type name, along with its value.



```
{
  "dataType": "<data Type you declare>",
  "value": "The value here"
}
```

Declare the `GPFeatureRecordSetLayer` type for an input parameter allowing it as part of the composite.



```
{
  "dataType": "GPFeatureRecordSetLayer",
  "value": {
    "url": "https://organization.example.com/<context>/rest/services/Hosted/myservicename/FeatureServer/0"
  }
}
```

Provide inputs for `GPMultivalue:GPComposite` data type with `GPString` as one of the allowing types in the composite.



```
[
  {
    "dataType": "GPString",
    "value": "first value"
  },
  {
    "dataType": "GPString",
    "value": "second value"
  }
]
```

#### Regular syntax

If the data type is not known when providing the input, provide the JSON of the data type without declaring its type. In this case, the geoprocessing service will check the value using each type in `GPComposite` in the order it was defined. This also applies to `GPMultiValue:GPComposite`, with the exception that if there is a filter for the parameter, only the data type matching the filter can be a valid value for the `GPMultiValue:GPComposite` parameter. The value of each value in a `GPMultiValue:GPComposite` does not need to be the same, as long as the value is one of the allowed data types in the `GPComposite`.

The sample below provides a value for each parameter without declaring a type. This `GPMultiValue:GPComposite` input allows `GPFeatureRecordSetLayer` and `GPRasterDataLayer`.



```
[
  {"url":"https://organization.example.com/<context>/rest/services/Hosted/myservicename/FeatureServer/0"},
  {"url":"https://organization.example.com/folder/raster.tif"}
]
```

A `GPComposite` input allows a `Field` input type. You must pass the value of a field in the same way as a `Field` input parameter.



```
{
        "name": "bufferDistance",
        "type": "esriFieldTypeLong",
        "alias": "bufferDistance",
        "editable": true,
        "nullable": true,
        "length": 0
      }
```

### Output

The syntax for the output parameter will be the same syntax for the actual data type, as long as the tool generates a result matching one of the data types in the composite. For example, you may have an output parameter of `GPComposite` with types of `GPFeatureRecordSetLayer` and `GPLong`. The result will follow the syntax for either type, as if the output is either `GPFeatureRecordSetLayer` or `GPLong`. You will never see an output parameter with a data type of `GPComposite` and a value with it.

## GPSpatialReference and GPCoordinateSystem

Supported at ArcGIS Enterprise 11.4 or later, if you publish your tool containing the [spatial reference](https://pro.arcgis.com/en/pro-app/latest/help/data/geodatabases/overview/an-overview-of-spatial-references.htm) or [coordinate system](https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/coordinate-systems-and-projections.htm) data type from ArcGIS Pro 3.4 or later, you will see these data types will become `GPSpatialReference` and `GPCoordinateSystem` by default in a geoprocessing service.

### Input

The most common way to specify the input of either the `GPSpatialReference` and `GPCoordinateSystem` is to provide the wkid or the latest wkid of the coordinate system, this also includes the vertical coordinate system id if applicable. In addition, you can provide the WKT or WKT2 of a spatial reference or a coordinate system, a projection file with a `prj` file extension, or upload a prj file and providing the uploaded item id of that prj file.

You should not provide contradictory spatial reference or coordinate system in the same input. In the case of a confliction, the first valid input based on the syntax listed below will apply. Vertical coordinate system is always optional. Image spatial reference is not supported.

#### ID syntax and examples

To provide a spatial reference or coordinate system based on its wkid, latest wkid, vertical coordinate system id, use the following syntax.



```
{
  "wkid": 102100,
  "vcsWkid": 5621
}
```



```
{
  "latestWkid": 3857,
  "latestVcsWkid": 5621
}
```

#### WKT Syntax and examples

You can also provide a WKT or WKT2 for a spatial reference or a coordinate system as the following examples.



```
{
  "wkt": "PROJCS[\"WGS_1984_Web_Mercator_Auxiliary_Sphere\",GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Mercator_Auxiliary_Sphere\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",0.0],PARAMETER[\"Standard_Parallel_1\",0.0],PARAMETER[\"Auxiliary_Sphere_Type\",0.0],UNIT[\"Meter\",1.0]]"
}
```



```
{
    "wkt2": "PROJCRS[\"WGS_1984_Web_Mercator_Auxiliary_Sphere\",BASEGEOGCRS[\"GCS_WGS_1984\",DYNAMIC[FRAMEEPOCH[1990.5],MODEL[\"AM0-2\"]],DATUM[\"D_WGS_1984\", ELLIPSOID[\"WGS_1984\",6378137.0,298.257223563,LENGTHUNIT[\"Meter\",1.0]]],PRIMEM[\"Greenwich\",0.0,ANGLEUNIT[\"Degree\",0.0174532925199433]],CS[ellipsoidal,2],AXIS[\"Latitude (lat)\",north,ORDER[1]],AXIS[\"Longitude (lon)\",east,ORDER[2]],ANGLEUNIT[\"Degree\",0.0174532925199433]],CONVERSION[\"Mercator_Auxiliary_Sphere\",METHOD[\"Mercator_Auxiliary_Sphere\"],PARAMETER[\"False_Easting\",0.0,LENGTHUNIT[\"Meter\",1.0]],PARAMETER[\"False_Northing\",0.0,LENGTHUNIT[\"Meter\",1.0]],PARAMETER[\"Central_Meridian\",0.0,ANGLEUNIT[\"Degree\",0.0174532925199433]],PARAMETER[\"Standard_Parallel_1\",0.0,ANGLEUNIT[\"Degree\",0.0174532925199433]],PARAMETER[\"Auxiliary_Sphere_Type\",0.0]],CS[Cartesian,2],AXIS[\"Easting (X)\",east,ORDER[1]],AXIS[\"Northing (Y)\",north,ORDER[2]],LENGTHUNIT[\"Meter\",1.0]]"
}
```

#### Name syntax and examples

If you know the name of a coordinate system, you can provide name like the following example.



```
{
    "name": "World_Sinusoidal"
}
```

The plain English name is also accepted like the following.



```
{
    "name": "Sinusoidal (World)",
    "vcsName": "MSL Height"
}
```

#### Projection file syntax

If you have a projection file with a prj file extension, you can use the file directly, or use the [upload](/rest/services-reference/enterprise/upload/) operation of a geoprocessing service to upload that file.



```
{
    "projectionFile": "https://organization.example.com/myprojection.prj"
}
```



```
{
    "projectionFileItemID": "ia2160f3a-5fd2-451b-8166-e8d13c66c3ec"
}
```

### Output

Although using either a `GPSpatialReference` and `GPCoordinateSystem` as an output is rare, they are supported just like an input parameter. However, the value will be the `wkid` and `vcsWkid` if applicable. In the case of a customized spatial reference or a coordinate system, the `WKT` will be available.

## GPExtent and GPEnvelope

Supported at ArcGIS Enterprise 11.4 or later, if you publish your tool containing the [`extent`](https://pro.arcgis.com/en/pro-app/latest/arcpy/classes/extent.htm) or `envelope` data type from ArcGIS Pro 3.4 or later, you will see these data types will become `GPExtent` and `GPEnvelope` by default in a geoprocessing service. Usage of extent is recommended over envelope.

### Input

Both data types will require you to provide the `xmin`, `ymin`, `xmax`, `ymax` values. If you want to optionally provide `zmin`, `zmax`, `mmin`, `mmax`, they are supported as well. Spatail reference is required for `GPExtent`, although the only accepted format of the spatial reference is by providing any of the `wkid`, `latestWkid`, `vcsWkid`, `latestVcsWkid`, `wkt`, and `wkt2`. You cannot use the name of a spatial reference, nor a spatial reference projection file to specify the spatial reference of an extent. If you don't specify the spatial reference of `GPExtent`, the default spatial reference will apply.



```
{
    "xmin": 2846004.0675147,
    "ymin": 40848.2690136577,
    "xmax": 2865402.84209619,
    "ymax": 50822.6389337801,
    "zmin": -123,
    "zmax": 123,
    "mmin": -9999.8998,
    "mmax": 9999.8999,
    "spatial_reference": {
        "wkid": 102100
    }
}
```

### Output

Although using either the GPExtent or GPEnvelope is rare as an output, they are still available, and the syntax is the same as the input.

## GPStringHidden

Supported at ArcGIS Enterprise 11.4 or later, if you publish your tool containing the `string hidden` data type from ArcGIS Pro 3.4 or later, you will see these data types will become `GPStringHidden` by default in a geoprocessing service. It is only used by client applications to render the display of this data type differently than a regular `GPString`. Most commonly, a client application will render the string as `*` characters. It is not possible to have a default value for this data type.

The string is not encrypted. The actual value will be visible through other REST resources, like the [input](/rest/services-reference/enterprise/gp-input/) and [inputs](/rest/services-reference/enterprise/inputs/) resources at ArcGIS Enterprise 11.4, if applicable. The query of `GPStringHidden` at the [input](/rest/services-reference/enterprise/gp-input/) and [inputs](/rest/services-reference/enterprise/inputs/) resources will return an empty string starting at ArcGIS Enterprise 11.5, including if your `GPStringHidden` is part of a multivalue input or a valuetable input.

### Input syntax and example

The input syntax is the same as `GPString`, which is to provide the actual string.

If you provide any masked symbols, like `*****`, as the value of a `GPStringHidden` input, the value will become those exact symbols. Although the symbols are valid strings, the actual string values a user provides will get lost.



```
Sample: The actual string as the value.
```

### Output

The output syntax is the same as the input. The value of the actual strings will be returned, just like a regular GPString output.

## GPSQLExpression

Supported at ArcGIS Enterprise 11.4 or later, if you publish your tool containing the [`SQL expression`](https://pro.arcgis.com/en/pro-app/latest/help/mapping/navigation/sql-reference-for-elements-used-in-query-expressions.htm) data type from ArcGIS Pro 3.4 or later, you will see these data types will become `GPSQLExpression` by default in a geoprocessing service.

### Input syntax and example

The input syntax will be the full SQL query string. For the supported syntax of a SQL query string, see [`SQL expression`](https://pro.arcgis.com/en/pro-app/latest/help/mapping/navigation/sql-reference-for-elements-used-in-query-expressions.htm).



```
FC1.date = date '01/12/2001' and Table1.OBJECTID > 0
```

### Output

Although using GPSQLExpression is rare as an output, it is still availalbe, and the syntax is the same as the input.

## GPTimeUnit

Introduced at ArcGIS Enterprise 12.0. If you publish your tool containing the `Time Unit` data type from ArcGIS Pro 3.6 or later, it will become `GPTimeUnit` by default in a geoprocessing service.

### Input

The input for a GPTimeUnit should be a JSON with the following fields:

-   `time` — A positive number.
-   `units` — A string with unit values such as `esriTimeUnitsYears` or `esriTimeUnitsSeconds`.

You can also provide a string format of the time unit, like `1 Week`, or `3 Months`. If you provide a string format, ensure that there is a space between the time and the unit. The following lists the allowed units for the string representation:

-   `Centuries`
-   `Days`
-   `Decades`
-   `Hours`
-   `Milliseconds`
-   `Minutes`
-   `Months`
-   `Seconds`
-   `Weeks`
-   `Years`
-   `Unknown`

These values can also be used in their singular form (for example, `Century` rather than `Centuries`, and `Day`, rather than `Days`).

#### JSON Schema



```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JSON Schema for GPTimeUnit",
  "description": "The JSON schema for a GPTimeUnit as an input.",
  "type": "object",
  "required": [
    "time",
    "units"
  ],
  "properties": {
    "time": {
      "description": "The time in a numeric format.",
      "type": "number"
    },
    "units": {
      "description": "The unit of the time.",
      "type": "string",
      "enum": [
        "esriTimeUnitsCenturies",
        "esriTimeUnitsDays",
        "esriTimeUnitsDecades",
        "esriTimeUnitsHours",
        "esriTimeUnitsMilliseconds",
        "esriTimeUnitsMinutes",
        "esriTimeUnitsMonths",
        "esriTimeUnitsSeconds",
        "esriTimeUnitsWeeks",
        "esriTimeUnitsYears",
        "esriTimeUnitsUnknown"
      ]
    }
  }
}
```

#### Sample JSON Input



```
{
  "time": 3,
  "units": "esriTimeUnitsYears"
}
```

If you provided an invalid unit type, you will receive an error indicating the invalid unit type. If you don't provide a unit, `esriTimeUnitsUnknown` will be used. If your tool accepts limited time unit options, ensure you provide a time unit that is supported by your tool.

### Output

Although rare, you can have a `GPTimeUnit` value as an output. The output parameter value will be in the same format as the JSON input.