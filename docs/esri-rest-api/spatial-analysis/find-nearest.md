# Find Nearest

> Source: [/rest/services-reference/enterprise/spatial-analysis/tasks/find-nearest/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/tasks/find-nearest/)

![Find Nearest](/rest/services-reference/enterprise/static/0250bb035c941692e1e325eb19980e42/78e79/GUID-150C2484-7459-405A-8835-B4E72CD49738-web.png)

The Find Nearest task measures the straight-line distance, driving distance, or driving time from features in the analysis layer to features in the near layer, and copies the nearest features in the near layer to a new layer. Connecting lines showing the measured path are returned as well. Find Nearest also reports the measurement and relative rank of each nearest feature. There are options to limit the number of nearest features to find or the search range in which to find them.

The results from this tool can help you answer the following kinds of questions:

-   What is the nearest park from here?
-   Which hospital can I reach in the shortest drive time? And how long would the trip take on a Tuesday at 5:30 p.m. during rush hour?
-   What are the road distances between major European cities?
-   Which of these patients reside within two miles of these chemical plants?

Find Nearest returns a layer containing the nearest features and a line layer that links the start locations to their nearest locations. The connecting line layer contains information about the start and nearest locations and the distances between.

## Licensing

As described in the [Spatial analysis service](/rest/services-reference/enterprise/spatial-analysis-tools/) topic, to use any analysis task, the administrator of the organization needs to grant you certain basic privileges. To find nearby features using a travel mode, you also need to be granted the Network Analysis privilege.

## Limits

There are limits for the number of features that can be processed.

-   `analysisLayer`—Maximum 5,000 features.
-   `nearLayer`—Maximum 5,000 features.
-   `maxCount`—Maximum 100.
-   `pointBarrierLayer` —Maximum 250 features.
    
-   `lineBarrierLayer` —An error will occur if the number of street features intersected by all the line barriers exceeds 500.
    
-   `polygonBarrierLayer` —An error will occur if the number of street features intersected by all the polygon barriers exceeds 2000.
    
-   An error will occur if the tool takes more than 60 minutes to run when using travel modes. If this error occurs, rerun the analysis with fewer input features.
    

## Request URL



```
http://<analysis url>/FindNearest/submitJob
```

## Request Parameters

| Parameter | Details |
|---|---|
| analysisLayer(Required) | The features from which the nearest locations are found. This layer can have point, line, or polygon features.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| nearLayer(Required) | The nearest features are chosen from this layer. This layer can have point, line, or polygon features.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| measurementType(Required) | The nearest locations can be determined by measuring straight-line distance, or by measuring travel time or travel distance along a street network using various modes of transportation known as travel modes.Valid values are a string, StraightLine, which indicates Euclidean distance will be used as the distance measure, or a JSON object representing settings for a travel mode.Travel modes are managed in ArcGIS Online and can be configured by the administrator of your organization to better reflect your organization's workflows. You must specify the JSON object containing the settings for a travel mode supported by your organization. To get a list of supported travel modes, run the GetTravelModes operation from the Utilities service.When using a travel mode for the measurementType parameter, use a JSON object representing travel mode settings for the value. When you use the GetTravelModes operation from the Utilities service, the result is a string representing the travel mode JSON. You must convert this string to a valid JSON object using the API and pass the JSON object as the value for the measurementType parameter.For example, the following is a string representing the Walking Time travel mode as returned by the GetTravelModes operation: 2 3 4 5 6 7 8 9 10 "{\"attributeParameterValues\": [{\"parameterName\": \"Restriction Usage\", \"attributeName\": \"Walking\", \"value\": \"PROHIBITED\"}, {\"parameterName\": \"Restriction Usage\", \"attributeName\": \"Preferred for Pedestrians\", \"value\": \"PREFER_LOW\"}, {\"parameterName\": \"Walking Speed (km/h)\", \"attributeName\": \"WalkTime\", \"value\": 5}], \"description\": \"Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel time. The walking speed is set to 5 kilometers per hour.\", \"impedanceAttributeName\": \"WalkTime\", \"simplificationToleranceUnits\": \"esriMeters\", \"uturnAtJunctions\": \"esriNFSBAllowBacktrack\", \"restrictionAttributeNames\": [\"Preferred for Pedestrians\", \"Walking\"], \"useHierarchy\": false, \"simplificationTolerance\": 2, \"timeAttributeName\": \"WalkTime\", \"distanceAttributeName\": \"Miles\", \"type\": \"WALK\", \"id\": \"caFAgoThrvUpkFBW\", \"name\": \"Walking Time\"}"Convert the value above to a valid JSON object and pass it as the value for the measurementType parameter.measurementType= { "attributeParameterValues": [ { "parameterName": "Restriction Usage", "attributeName": "Walking", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Preferred for Pedestrians", "value": "PREFER_LOW" }, { "parameterName": "Walking Speed (km\/h)", "attributeName": "WalkTime", "value": 5 } ], "description": "Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel time. The walking speed is set to 5 kilometers per hour.", "impedanceAttributeName": "WalkTime", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBAllowBacktrack", "restrictionAttributeNames": [ "Preferred for Pedestrians", "Walking" ], "useHierarchy": false, "simplificationTolerance": 2, "timeAttributeName": "WalkTime", "distanceAttributeName": "Miles", "type": "WALK", "id": "caFAgoThrvUpkFBW", "name": "Walking Time" }When using a travel mode, all features in the analysisLayer and nearLayer must be points. |
| maxCount | The maximum number of nearest locations to find for each feature in analysisLayer. The default is the maximum cutoff allowed by the service, which is 100.Note that setting a maxCount for this parameter doesn't guarantee that many features will be found. The searchCutoff and other constraints may also reduce the number of features found.Example: "maxCount": 10 |
| searchCutoff | The maximum range to search for nearest locations from each feature in the analysisLayer. The units for this parameter is always minutes when measurementType is set to a time based travel mode; otherwise the units are set in the searchCutoffUnits parameter.The default is to search without bounds.Example: "searchCutoff": 44 |
| searchCutoffUnits | The units of the searchCutoff parameter. This parameter is ignored when measurementType is set to a time based travel mode because the units for searchCutoff are always minutes in those cases. If measurementType is set to StraightLine or another distance-based travel mode, and a value for searchCutoff is specified, set the cutoff units using this parameter.The default value is null, which causes the service to choose either miles or kilometers according to the units property of the user making the request.Example: "searchCutoffUnits": "Kilometers" |
| timeOfDay | Specify whether travel times should consider traffic conditions. To use traffic in the analysis, set measurementType to a travel mode object whose impedanceAttributeName property is set to TravelTime and assign a value to timeOfDay. (A travel mode with other impedanceAttributeName values don't support traffic.) The timeOfDay value represents the time at which travel begins, or departs, from the input points. The time is specified as Unix time (milliseconds since midnight, January 1 1970).The service supports two kinds of traffic: typical and live. Typical traffic references travel speeds that are made up of historical averages for each five-minute interval spanning a week. Live traffic retrieves speeds from a traffic feed that processes phone probe records, sensors, and other data sources to record actual travel speeds and predict speeds for the near future.The Data Coverage page shows the countries Esri currently provides traffic data for.Typical Traffic:To ensure the task uses typical traffic in locations where it is available, choose a time and day of the week, and then convert the day of the week to one of the following dates from 1990:Monday—1/1/1990Tuesday—1/2/1990Wednesday—1/3/1990Thursday—1/4/1990Friday—1/5/1990Saturday—1/6/1990Sunday—1/7/1990Set the time and date as Unix time in milliseconds.For example, to solve for 1:03 p.m. on Thursdays, set the time and date to 1:03 p.m., 4 January 1990; and convert to milliseconds (631458180000).Live Traffic:To use live traffic when and where it is available, choose a time and date and convert to Unix time.Esri saves live traffic data for 4 hours and references predictive data extending 4 hours into the future. If the time and date you specify for this parameter is outside the 8-hour time window, or the travel time in the analysis continues past the predictive data window, the task falls back to typical traffic speeds.Syntax: The number of milliseconds since the Unix epoch (January 1, 1970).Examples:"timeOfDay": 631458180000 // 13:03, 4 January 1990. Typical traffic on Thursdays at 1:03 p.m."timeOfDay": 631731600000 // 17:00, 7 January 1990. Typical traffic on Sundays at 5:00 p.m."timeOfDay": 1413964800000 // 8:00, 22 October 2014. If the current time is between 8:00 p.m., 21 Oct. 2014 and 8:00 p.m., 22 Oct. 2014, live traffic speeds are referenced in the analysis; otherwise, typical traffic speeds are referenced."timeOfDay": 1426674000000 // 10:20, 18 March 2015. If the current time is between 10:20 p.m., 17 Mar. 2015 and 10:20 p.m., 18 Mar. 2015, live traffic speeds are referenced in the analysis; otherwise, typical traffic speeds are referenced. |
| timeZoneForTimeOfDay | Specify the time zone or zones of the timeOfDay parameter. There are two options: GeoLocal (default) and UTC.GeoLocal:The timeOfDay value refers to the time zone in which the analysisLayer points are located.GeoLocal example:timeOfDay set to 9:00 a.m., 4 January 1990 (631443600000 milliseconds)timeZoneForTimeOfDay set to GeoLocalSubmitting a valid request causes the drive times for points in the Eastern Time Zone to start at 9:00 a.m. (2:00 p.m. UTC).UTC:The timeOfDay value refers to Coordinated Universal Time (UTC).UTC examples:timeOfDay set to 9:00 a.m., 4 January 1990 (631443600000 milliseconds)timeZoneForTimeOfDay set to UTCThe start time for points in the Eastern Time Zone is 4:00 a.m. Eastern Time (9:00 a.m. UTC).Values: GeoLocal \| UTC |
| includeRouteLayers | When includeRouteLayers is set to true, each route from the result is also saved as a route layer item. A route layer includes all the information for a particular route, such as the stops assigned to the route as well as the travel directions. Creating route layers is useful if you want to share individual routes with other members in your organization. The route layers use the output feature service name provided in the outputName parameter as a prefix, and the route name generated as part of the analysis is added to create a unique name for each route layer. |
| pointBarrierLayer | Specify one or more point features that act as temporary restrictions (barriers) when traveling on the underlying streets.A point barrier can model a fallen tree, an accident, a downed electrical line, or anything that completely blocks traffic at a specific position along the street. Travel is permitted on the street but not through the barrier.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| lineBarrierLayer | Specify one or more line features that prohibit travel anywhere the lines intersect the streets.A line barrier prohibits travel anywhere the barrier intersects the streets. For example, a parade or protest that blocks traffic across several street segments can be modeled with a line barrier.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| polygonBarrierLayer | Specify one or more polygon features that completely restrict travel on the streets intersected by the polygons.One use of this type of barrier is to model floods covering areas of the street network and making road travel there impossible.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| outputName | If provided, the task will create a feature service of the results. You define the name of the service. If an outputName value is not provided, the task will return a feature collection.Syntax: { "serviceProperties": { "name": "<service name>" } }You can overwrite an existing feature service by providing the itemId value of the existing feature service and setting the overwrite property to true. Including the serviceProperties parameter is optional. As described in the Feature output topic, you must either be the owner of the feature service or have administrative privileges to perform the overwrite.Syntax: { "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }or { "serviceProperties": { "name": "<existing service name>" }, "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } } |
| context | Context contains additional settings that affect task execution. For Find Nearest, there are two settings.Extent (extent)—a bounding box that defines the analysis area. Only those features in the analysisLayer and nearLayer that intersect the bounding box will be analyzed.Output spatial reference (outSR)If the output is a feature service, the spatial reference will be the same as nearlayer. Setting outSR for feature services has no effect.If the output is a feature collection, the features will be in the spatial reference of the outSR value or the spatial reference of nearLayer when outSR is not specified. Syntax: { "extent" : {extent} "outSR" : {spatial reference} } |
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

After the initial request is submitted, you can use the `jobId` to periodically check the status of the job and messages as described in the topic [Check job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, you use the `jobId` to retrive the results. To track the status, you can make a request of the following form:



```
http://<analysis url>/FindNearest/jobs/<jobId>
```

## Accessing results

When the status of the job request is `esriJobSucceeded`, you can access the results of the analysis by making a request of the following form.



```
http://<analysis url>/FindNearest/jobs/<jobId>/results/nearestLayer?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| nearestLayer | The output layer containing the nearest features. Features are copied from the nearLayer to this output layer.Example: {"url": "http://<analysis url>/FindNearest/jobs/<jobId>/results/nearestLayer"The result has properties for parameter name, data type, and value. The contents of value depends on the outputName parameter provided in the initial request.If outputName was provided, value contains the url to the feature service layer. { "paramName":"nearestLayer", "dataType":"GPString", "value":{"url":"<hosted featureservice layer url>"} }If outputName was not provided, value contains a feature collection. { "paramName": "nearestLayer", "dataType": "GPString", "value":{"layerDefinition": {}, "featureSet": {}} }See Feature Output for more information about how the result layer or collection is accessed.Discussion: The result layer copies the features that are measured to be the nearest. The copied features include all the attributes from the input nearLayer. |
| connectingLinesLayer | The output layer containing the lines connecting the analysis features to the nearest features.Example: {"url":"http://<analysis url>/FindNearest/jobs/<jobId>/results/connectingLinesLayer"The result has properties for parameter name, data type, and value. The contents of value depends on the outputName parameter provided in the initial request.If outputName was provided, value contains the url to the feature service layer. { "paramName":"connectingLinesLayer", "dataType":"GPString", "value":{"url":"<hosted featureservice layer url>"} }If outputName was not provided, value contains a feature collection. { "paramName": "connectingLinesLayer", "dataType": "GPString", "value":{"layerDefinition": {}, "featureSet": {} } }See Feature Output for more information about how the result layer or collection is accessed.Discussion: The result layer has the following attributes:NearRank—The nearest feature has a rank of 1, the second-nearest has a rank of 2, and so on.Total_Minutes—This field is present only when measurementType is set to a travel mode. This is the cumulative travel time, in minutes, to the nearest feature.Total_<searchCutoffUnits>—This field contains the cumulative straight-line distance to the nearest feature when the measurementType is StraightLine or the field contains the cumulative travel distance to the nearest feature when the measurementType is a travel mode. The field values are in searchCutoffUnits.From_ID—The object ID of the feature in the analysisLayer the line was measured from.To_ID—The object ID of the feature in the nearLayer the line was measured to.From_<analysisLayer field name>—Each of the fields from the analysisLayer are transferred to the connecting lines and prefixed with "From_".To_<nearLayer field name>—Each of the fields from the nearLayer are transferred to the connecting lines and prefixed with "To_". |