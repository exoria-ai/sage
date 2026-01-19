# Result parameters

> Source: [/rest/services-reference/enterprise/gp-result/](https://developers.arcgis.com/rest/services-reference/enterprise/gp-result/)

**URL:**: https://<job-url>/results/<param-name>

**Methods:**: GETPOST

**Version Introduced:**: 9.3

## Description

The `results` resource represents a result parameter for an asynchronous geoprocessing job at the [`jobs`](/rest/services-reference/enterprise/gp-job/) resource. It provides information about the result parameter name, data type, and value. The syntax will vary based on the [data type](/rest/services-reference/enterprise/gp-data-types/) of the parameter. Some parameters support limited types of output, as mentioned in the Details column in the table below.

## Request parameters

| Parameter | Details |
|---|---|
| f(Optional) | Description: The response format. The default response format is html. Support for f=amf was added at 10.0 and removed at 10.7. Support for f=pbf was added at 10.8 and is only available for geoprocessing services published from ArcGIS Pro with GPFeatureRecordSetLayer results.Values: html\| json\| image\| kmz\| geojson\| pbfDefault: html |
| outSR(Optional) | Description: The spatial reference of the output geometries.The spatial reference can be specified as either a well-known ID or a spatial reference JSON object.This parameter is applicable for result parameters that contain geometries. This parameter can be used to return the geometries in a spatial reference that is different than the spatial reference in which the outputs were created. |
| returnType(Optional) | Description: If the geoprocessing service is associated with a result map service, the default output for the GPRasterDataLayer and GPFeatureSetLayer parameters is a map image. However, you can explicitly request the raw raster data using returnType and setting its value to data.Values: data |
| returnZ(Optional) | Description: This parameter applies to a result returning GPFeatureRecordSetLayer. If true, z-values are included in the results when the features have z-values. Otherwise, no z-values are returned.Values: true \| falseDefault: false. |
| returnM(Optional) | Description: This parameter applies to results returning GPFeatureRecordSetLayer. If true, m-values are included in the results when the features have m-values. Otherwise, no m-values are returned.Values: true \| falseDefault:false. |
| returnFeatureCollection(Optional) | This parameter was added at 10.6.Description: This parameter applies to results returning GPFeatureRecordSetLayer. If true, the feature collection of the results will be returned.Values: true \| falseDefault: false |
| returnColumnName(Optional) | This parameter was added at 11.0.Description: This parameter applies to results returning GPValueTable. If true, the column names of all columns will be returned when all column names are unique and not empty.Values: true \| falseDefault: false |

## Example usage

For a `911 Calls Hotspot` task job, you can query a result parameter for the job with an ID of `jbcb377968f0d46b980bcbfc75a8e05ef`.

Access the `Output_Features` result parameter.



```
https://organization.example.com/<context>/rest/services/911CallsHotspot/GPServer/911%20Calls%20Hotspot/jobs/jbcb377968f0d46b980bcbfc75a8e05ef/results/Output_Features
```

For a `displayOutputTask` task job, you can query a result parameter for the job with an ID of `jbcb345678f0d46b980bcbfc75a8e05ef`.

Access the `OutputValueTable` result parameter in the JSON format with column names.



```
https://organization.example.com/<context>/rest/services/mySampleValueTableService/GPServer/displayOutputTask/jobs/jbcb345678f0d46b980bcbfc75a8e05ef/results/OutputValueTable?f=json&returnColumnName=true
```

## JSON Response syntax

The JSON Response includes the name of the parameter, the data type, and its value. The syntax of the `value` field can vary based on the [data type](/rest/services-reference/enterprise/gp-input/) of the parameter.

The response always has three keys: `paramName`, `dataType`, and `value`.



```
{
    "paramName": "<paramName>",
    "dataType": "<dataType>",
    "value": <valueLiteralOrObject>
}
```

## JSON Response example

The output parameter `Output_String` with the `GPString` data type, and the value of `TestString`. The request uses `f=json` to get a JSON response.



```
{
    "paramName": "Output_String",
    "dataType": "GPString",
    "value": "TestString"
}
```

An output parameter `OutputValueTable` showing the column names along with values of the result `GPValueTable`. The request uses `f=json&returnColumnName=true` to get a JSON response with column names for the result.



```
{
    "paramName":"OutputValueTable",
    "dataType":"GPValueTable",
    "value":[{
        "output long column":563,
        "output double column":-657.56700000000001
    },
    {
        "output long column":-87,
        "output double column":567.45640000000003
    }]
}
```