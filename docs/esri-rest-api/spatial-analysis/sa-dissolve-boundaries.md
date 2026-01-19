# Dissolve Boundaries

> Source: [/rest/services-reference/enterprise/spatial-analysis/tasks/sa-dissolve-boundaries/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/tasks/sa-dissolve-boundaries/)

![Dissolve Boundaries](/rest/services-reference/enterprise/static/2e0b635d25bedfa43b42f88e15ce79ba/78e79/GUID-7B5F69B0-3625-404F-8B52-2B562766C0BB-web.png)

The Dissolve Boundaries task finds polygons that overlap or share a common boundary and merges them together to form a single polygon.

You can control which boundaries are merged by specifying a field. For example, if you have a layer of counties, and each county has a `State_Name` attribute, you can dissolve boundaries using the `State_Name` attribute. Adjacent counties will be merged together if they have the same value for `State_Name`. The end result is a layer of state boundaries.

## Request URL



```
http://<analysis url>/DissolveBoundaries/submitJob
```

## Request Parameters

| Parameter | Description |
|---|---|
| inputLayer (Required) | The layer containing polygon features that will be dissolved.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| dissolveFields | One or more fields from the inputLayer that control which polygons are merged. If you don't supply dissolveFields, or you supply an empty list of fields, polygons that share a common border (that is, they are adjacent) or polygon areas that overlap will be dissolved into one polygon. The result will always include a Count field, which represents the number of input features that share the dissolve criteria.If you do supply values for the dissolveFields parameter, polygons that share a common border and contain the same value in one or more fields will be dissolved. For example, if you have a layer of counties, and each county has a State_Name attribute, you can dissolve boundaries using the State_Name attribute. Adjacent counties will be merged together if they have the same case-sensitive value for State_Name. The end result is a layer of state boundaries. If two or more fields are specified, the values in these fields must be the same for the boundary to be dissolved.Example:"dissolveFields": ["State_Name", "District"] |
| summaryFields | A list of field names and statistical summary type that you wish to calculate from the polygons that are dissolved together. For example, if you are dissolving counties based on State_Name, and each county had a Population field, you can sum Population. The result would be a layer of state boundaries with total population.Syntax: ["fieldName summaryType","fieldName summaryType", ...]fieldName is one of the numeric or date fields from the inputLayer parameter.summaryType is one of the following:Sum—Calculates the sum for all the input polygons that are dissolved into each output feature. This statistic type is not supported for date fields.Mean—Calculates the average for all the input polygons that are dissolved into each output feature. This statistic type is not supported for date fields.Min—Finds the smallest value for all the input polygons that are dissolved into each output feature. This statistic type is supported for date fields.Max—Finds the largest value for all the input polygons that are dissolved into each output feature. This statistic type is supported for date fields.Stddev—Finds the standard deviation for all the input polygons that are dissolved into each output feature. This statistic type is not supported for date fields.Example: "summaryFields": ["Annual_Sales Sum", "Annual_Sales Min"] |
| multiPartFeatures | Specifies whether multipart features (i.e. features which share a common attribute table but are not visibly connected) are allowed in the output feature class.Type: BooleanValues:True: Specifies that multipart features are allowed.False: Specifies that multipart features are not allowed. Instead of creating multipart features, individual features will be created for each part. Any existing multipart features from the inputLayer will be returned as single part features in the result. |
| outputName | If provided, the task will create a feature service of the results. You define the name of the service. If an outputName value is not provided, the task will return a feature collection.Syntax: { "serviceProperties": { "name": "<service name>" } }In ArcGIS Enterprise 11.0 and later, you can overwrite an existing feature service by providing the itemId value of the existing feature service and setting the overwrite property to true. Including the serviceProperties parameter is optional. As described in the Feature output topic, you must either be the owner of the feature service or have administrative privileges to perform the overwrite.Syntax: { "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }or { "serviceProperties": { "name": "<existing service name>" }, "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } } |
| context | The Context parameter contains the following additional settings that affect task operation:Extent (extent)—A bounding box that defines the analysis area. Only input features that intersect the bounding box will be analyzed.Output spatial reference (outSR)—The output features will be projected into the output spatial reference.Syntax: { "extent" : {extent}, "outSR" : {spatial reference} } |
| f | The response format. The default response format is html.Values: html \| json |

## Response

When you submit a request, the service assigns a unique job ID for the transaction.

Syntax:



```
{
"jobId": "<unique job identifier>",
"jobStatus": "<job status>"
}
```

After the initial request is submitted you can use the `jobId` to periodically check the status of the job and messages as described in the topic [Check job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, you use the `jobId` to retrive the results. To track the status, you can make a request of the following form:



```
http://<analysis url>/DissolveBoundaries/jobs/<jobId>
```

## Accessing results

When the status of the job request is `esriJobSucceeded`, you can access the results of the analysis by making a request of the following form.



```
http://<analysis url>/DissolveBoundaries/jobs/<jobId>/results/dissolvedLayer?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| dissolvedLayer | The result of dissolving the input polygons.Example: {"url": "http://<analysis url>/DissolveBoundaries/jobs/<jobId>/results/dissolvedLayer"}The result has properties for parameter name, data type, and value. The contents of value depends upon the outputName parameter provided in the initial request.If outputName was provided, value contains the url to the feature service layer. { "paramName":"dissolvedLayer", "dataType":"GPString", "value":{"url":"<hosted featureservice layer url>"} }If outputName was not provided, value contains a feature collection. { "paramName":"dissolvedLayer", "dataType":"GPString", "value":{"layerDefinition": {}, "featureSet": {} } }See Feature Output for more information about how the result layer or collection is accessed. |