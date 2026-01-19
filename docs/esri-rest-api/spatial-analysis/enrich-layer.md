# Enrich Layer

> Source: [/rest/services-reference/enterprise/spatial-analysis/tasks/enrich-layer/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/tasks/enrich-layer/)

![Enrich Layer](/rest/services-reference/enterprise/static/68603b9692b9418591788e1a98d4b890/78e79/GUID-5B2D9742-AFD2-4054-8D05-ED6A80EDAF4D-web.png)

The Enrich Layer task enriches your data by getting facts about the people, places, and businesses that surround your data locations.

For example: What kind of people live here? What do people like to do in this area? What are their habits and lifestyles? What kind of businesses are there in this area?

The result will be a new layer containing all demographic and geographic information from given data collections. This new information is added as fields in the table.

## Licensing

As described in the [Spatial analysis service](/rest/services-reference/enterprise/spatial-analysis-tools/) topic, to use any analysis task, the administrator of the organization needs to grant you certain basic privileges. To use the Enrich Layer task, you need to be granted the GeoEnrichment privilege. In addition, to enrich features based on one of the available travel modes, you need to be granted the Network Analysis privilege.

## Request URL



```
http://<analysis url>/EnrichLayer/submitJob
```

## Limits

There are limits to number of features and distance when `bufferType` is set to a travel mode other than `"StraightLine"`.

-   `inputLayer`—Maximum 1,000 features
-   `distance`—Maximum 300 minutes or 482.80 kilometers (300 miles)

## Request Parameters

| Parameter | Description |
|---|---|
| inputLayer (Required) | The features to enrich with new data.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| dataCollections | This optional parameter defines the collections of data you want to use to enrich your features. Its value is a list of strings. If you don't provide this parameter, you must provide the analysisVariables parameter.For more information about data collections and the values for this parameter, visit the Data Collection finder.Example: "dataCollections": ["KeyGlobalFacts", "KeyUSFacts"] |
| analysisVariables | The parameter defines the specific variables within a data collection you want to use to enrich your features. Its value is a list of strings in the form of "dataCollection.VariableName". If you don't provide this parameter, you must provide the dataCollections parameter. You can provide both parameters. For example, if you want all variables in the KeyGlobalFacts data collection, specify it in the dataCollections parameter and use this parameter for specific variables in other collections.Example: "analysisVariables": ["KeyGlobalFacts.AVGHHSIZE", "KeyUSFacts.TOTPOP10", "KeyUSFacts.HINC100_CY_P"]`For more information about variables in data collections, visit the Analysis Variable Finder. |
| country | This optional parameter further defines what is returned from data collection. For example, your input features may be countries in Western Europe, and you want to enrich them with the KeyWEFacts data collection. However, you only want data for France, not every country in your input layer. The value is the two-character country code.Example: "country": "FR"For more information about data collections and the values for this parameter, visit the GeoEnrichment coverage. |
| bufferType (Required if inputLayer contains point or line features) | If your input features are points or lines, you must define an area around your features that you want to enrich. Features that are within (or equal to) the distances you enter will be enriched. You can specify either straight-line distance or a travel mode.Valid values are a string, StraightLine, which indicates Euclidean distance will be used as the distance measure, or a JSON object representing settings for a travel mode.Travel modes are managed in ArcGIS Online and can be configured by the administrator of your organization to better reflect your organization's workflows. You must specify the JSON object containing the settings for a travel mode supported by your organization. To get a list of supported travel modes, run the GetTravelModes operation from the Utilities service.When using a travel mode for the bufferType parameter, use a JSON object representing travel mode settings for the value. When you use the GetTravelModes operation from the Utilities service, the result is a string representing the travel mode JSON object. You must convert this string to a valid JSON object using the API and pass the JSON object as the value for the bufferType parameter.For example, the following is a string representing the Walking Time travel mode as returned by the GetTravelModes operation: 2 3 4 5 6 7 8 9 10 "{\"attributeParameterValues\": [{\"parameterName\": \"Restriction Usage\", \"attributeName\": \"Walking\", \"value\": \"PROHIBITED\"}, {\"parameterName\": \"Restriction Usage\", \"attributeName\": \"Preferred for Pedestrians\", \"value\": \"PREFER_LOW\"}, {\"parameterName\": \"Walking Speed (km/h)\", \"attributeName\": \"WalkTime\", \"value\": 5}], \"description\": \"Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel time. The walking speed is set to 5 kilometers per hour.\", \"impedanceAttributeName\": \"WalkTime\", \"simplificationToleranceUnits\": \"esriMeters\", \"uturnAtJunctions\": \"esriNFSBAllowBacktrack\", \"restrictionAttributeNames\": [\"Preferred for Pedestrians\", \"Walking\"], \"useHierarchy\": false, \"simplificationTolerance\": 2, \"timeAttributeName\": \"WalkTime\", \"distanceAttributeName\": \"Miles\", \"type\": \"WALK\", \"id\": \"caFAgoThrvUpkFBW\", \"name\": \"Walking Time\"}"Convert the value above to a valid JSON object and pass it as the value for the bufferType parameter.bufferType= { "attributeParameterValues": [ { "parameterName": "Restriction Usage", "attributeName": "Walking", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Preferred for Pedestrians", "value": "PREFER_LOW" }, { "parameterName": "Walking Speed (km\/h)", "attributeName": "WalkTime", "value": 5 } ], "description": "Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel time. The walking speed is set to 5 kilometers per hour.", "impedanceAttributeName": "WalkTime", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBAllowBacktrack", "restrictionAttributeNames": [ "Preferred for Pedestrians", "Walking" ], "useHierarchy": false, "simplificationTolerance": 2, "timeAttributeName": "WalkTime", "distanceAttributeName": "Miles", "type": "WALK", "id": "caFAgoThrvUpkFBW", "name": "Walking Time" }Example: "bufferType": "StraightLine" |
| distance (Required if inputLayer contains point or line features) | A double value that defines the search distance or time. The units of the distance value is supplied by the units parameter.Example: "distance": 4.0 |
| units (Required if distance parameter used) | The linear unit to be used with the distance value(s) specified in the distance parameter.If bufferType is StraightLine or a distance based travel mode, the following values can be used as units: Meters \| Kilometers \| Feet \| Yards \| MilesIf bufferType is a time based travel mode, the following values can be used as units: Seconds \| Minutes \| HoursExample: "units": "Miles" |
| returnBoundaries | Applies only for point and line input features. If True, a result layer of areas is returned. The returned areas are defined by the specified bufferType. For example, if using a bufferType of StraightLine with a distance of 5 miles, your result will contain areas with a 5 mile radius around the input features and requested analysisVariables variables. If False, the resulting layer will return the same features as the input layer with analysisVariables variables.The default is FalseValues: True \| False |
| outputName | If provided, the task will create a feature service of the results. You define the name of the service. If an outputName value is not provided, the task will return a feature collection.Syntax: { "serviceProperties": { "name": "<service name>" } }In ArcGIS Enterprise 11.0 and later, you can overwrite an existing feature service by providing the itemId value of the existing feature service and setting the overwrite property to true. Including the serviceProperties parameter is optional. As described in the Feature output topic, you must either be the owner of the feature service or have administrative privileges to perform the overwrite.Syntax: { "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }or { "serviceProperties": { "name": "<existing service name>" }, "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } } |
| hierarchy | This optional parameter indicate which data source to query in the case of multiple vintages being available.Examples: "hierarchy":"landscape", "hierarchy":"esri2024" |
| context | Context contains additional settings that affect task execution. For Enrich Layers, there are two settings.Extent (extent)—a bounding box that defines the analysis area. Only those features in the input layer that intersect the bounding box will be enriched.Output Spatial Reference (outSR)—the output features will be projected into the output spatial reference. Syntax: { "extent" : {extent} "outSR" : {spatial reference} } |
| f | The response format. The default response format is html.Values: html \| json |

## Response

When you submit a request, the service assigns a unique job ID for the transaction. Syntax:



```
{
"jobId": "<unique job identifier>",
"jobStatus": "<job status>"
}
```

After the initial request is submitted you can use the jobId to periodically check the status of the job and messages as described in the topic [Check job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, you use the jobId to retrieve the results. To track the status, you can make a request of the following form:



```
http://<analysis url>/EnrichLayer/jobs/<jobId>
```

## Accessing results

When the status of the job request is `esriJobSucceeded`, you can access the results of the analysis by making a request of the following form.



```
http://<analysis url>/EnrichLayer/jobs/<jobId>/results/enrichedLayer?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| enrichedLayer | If the inputLayer contained polygons, enrichedLayer will be the input polygons with new fields added from the data collection. If the inputLayer was points or lines, the output will be the input points or lines with fields added from the data collection. Note, however, that the field values returned are for the buffered area defined by the bufferType and distance parameters.Example: {"url":"http://<analysis url>/EnrichLayer/jobs/<jobId>/results/enrichedLayer"}The result has properties for parameter name, data type, and value. The contents of value depends upon the outputName parameter provided in the initial request.If outputName was provided, value contains the url to the feature service layer. { "paramName":"enrichedLayer", "dataType":"GPString", "value":{"url":"<hosted featureservice layer url>"} }If outputName was not provided, value contains a feature collection. { "paramName":"enrichedLayer", "dataType":"GPString", "value":{"layerDefinition": {}, "featureSet": {} } }See Feature Output for more information about how the result layer or collection is accessed. |