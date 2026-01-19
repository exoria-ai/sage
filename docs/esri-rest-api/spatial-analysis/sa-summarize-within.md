# Summarize Within

> Source: [/rest/services-reference/enterprise/spatial-analysis/tasks/sa-summarize-within/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/tasks/sa-summarize-within/)

![Summarize Within](/rest/services-reference/enterprise/static/0b7993a4b22e382cba9dc8bdae0be143/78e79/GUID-9B12DB3F-AA7B-41EB-87C6-D2DEC3D52DA9-web.png)

The Summarize Within task finds the point, line, or polygon features (or portions of these features) that are within the boundaries of polygons in another layer.

For example:

-   Given a layer of watershed boundaries and a layer of land-use boundaries by land-use type, calculate total acreage of land-use type for each watershed.
-   Given a layer of parcels in a county and a layer of city boundaries, summarize the average value of vacant parcels within each city boundary.
-   Given a layer of counties and a layer of roads, summarize the total mileage of roads by road type within each county.

You can think of Summarize Within as taking two layers and stacking them on top of each other. One of the layers, the `sumWithinLayer`, must be a polygon layer, and imagine that these polygon boundaries are all colored red. The other layer, the `summaryLayer`, can be any feature type—point, line, or polygon. After stacking these layers on top of each other, you peer down through the stack and count the number of features in the `summaryLayer` that fall within the polygons with the red boundaries (the `sumWithinLayer`). Not only can you count the number of features, you can also calculate simple statistics about the attributes of the features in the `summaryLayer`, such as sum, mean, minimum, maximum, and so on.

## Request URL



```
http://<analysis url>/SummarizeWithin/submitJob
```

## Request parameters

| Parameter | Description |
|---|---|
| sumWithinLayer | The polygon features. Features, or portions of features, in the summaryLayer (below) that fall within the boundaries of these polygons will be summarized.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| summaryLayer | Point, line, or polygon features that will be summarized for each polygon in the sumWithinLayer.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| sumShape | A boolean value that instructs the task to calculate statistics based on shape type of the summaryLayer, such as the count of points, the total length of lines, or the total area of polygons of the summaryLayer within each polygon in the sumWithinLayer. If the summaryLayer is lines or polygons, the count of features within each summary polygon is returned.Values: true \| falseIf sumShape is set to false , at least one value for summaryFields must be provided. |
| shapeUnits | Values:When summaryLayer contains polygons: Acres \| Hectares \| SquareMeters \| SquareKilometers \| SquareMiles \| SquareYards \| SquareFeetWhen summaryLayer contains lines: Meters \| Kilometers \| Feet \| Yards \| MilesExample: "shapeUnits": "Hectares" |
| summaryFields(Required if sumShape is false) | A list of field names and statistical summary types that you want to calculate for all features in the summaryLayer that are within each polygon in the sumWithinLayer.Syntax: ["fieldName summaryType","fieldName summaryType", ...]fieldName is one of the numeric or date fields from the summaryLayer parameter.summaryType is one of the following:Sum—Adds the total value of all the features in each polygon. This statistic type is not supported for date fields.Mean—Calculates the average of all the features in each polygon. This statistic type is not supported for date fields.Min—Finds the smallest value of all the features in each polygon. This statistic type is supported for date fields.Max—Finds the largest value of all the features in each polygon. This statistic type is supported for date fields.Stddev—Finds the standard deviation of all the features in each polygon. This statistic type is not supported for date fields.Example: "summaryFields": ["Annual_Sales Sum", "Annual_Sales Mean"] |
| groupByField | This is a field of the summaryLayer features that you can use to calculate statistics separately for each unique attribute value. For example, suppose the sumWithinLayer contains city boundaries and the summaryLayer features are parcels. One of the fields of the parcels is Status, which contains two values: VACANT and OCCUPIED. To calculate the total area of vacant and occupied parcels within the boundaries of cities, use Status as the groupByField field.Example: "groupByField": "Status"When groupByField is provided, two results are created: the result layer and a related groupSummary table containing the statistics. |
| minorityMajority | This Boolean parameter is applicable only when a groupByField is specified. If true, the minority (least dominant) or the majority (most dominant) attribute values for each group field are calculated. Two new fields are added to the resultLayer prefixed with Majority_ and Minority_.The default is false.Values: true \| false |
| percentShape | This Boolean parameter is applicable only when a groupByField is specified. If set to true, the percentage of each unique groupByField value is calculated for each sumWithinLayer polygon. The default is false.Values: true \| false |
| outputName | If provided, the task will create a feature service of the results. You define the name of the service. If an outputName value is not provided, the task will return a feature collection.Syntax: { "serviceProperties": { "name": "<service name>" } }You can overwrite an existing feature service by providing the itemId value of the existing feature service and setting the overwrite property to true. Including the serviceProperties parameter is optional. As described in the Feature output topic, you must either be the owner of the feature service or have administrative privileges to perform the overwrite.Syntax: { "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }or { "serviceProperties": { "name": "<existing service name>" }, "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } } |
| context | The Context parameter contains the following additional settings that affect task operation:Extent (extent)—A bounding box that defines the analysis area. Only input features that intersect the bounding box will be analyzed.Output spatial reference (outSR)—The output features will be projected into the output spatial reference.Syntax: { "extent" : {extent}, "outSR" : {spatial reference} } |
| binType | The type of bin that will be generated. These bins will summarize the features, or portions of features, in the summaryLayer that fall within the boundaries of each generated bin. Bin options are the following:HexagonSquare—This is the default.Example: "binType" : "Hexagon"When generating bins, for Square, the number and units specified determine the height and width of the square. For Hexagon, the number and units specified determine the distance between parallel sides.Either binType or polygonLayer must be specified. If binType is chosen, the binSize and binSizeUnit specifying the size of the bins must be included. |
| binSize(Required if binType is used) | The distance for the bins of type binType that the SummaryLayer will be summarized into.Example: "binSize" : 100 |
| binSizeUnit(Required if binType is used) | The linear distance unit for the bins that summaryLayer will be summarized into.Values: Meters \| Kilometers \| Feet \| Miles \| NauticalMiles \| YardsThe default is Meters.Example: "binSizeUnit" : "Miles" |
| f | The response format. The default response format is html.Values: html \| json |

## Response

When you submit a request, the service assigns a unique job ID for the transaction. Syntax:



```
{
"jobId": "<unique job identifier>",
"jobStatus": "<job status>"
}
```

After the initial request is submitted, you can use the `jobId` to periodically check the status of the job and messages as described in [Check job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, you use the `jobId` to retrieve the results. To track the status, you can make a request of the following form:



```
http://<analysis url>/SummarizeWithin/jobs/<jobId>
```

## Accessing results

When the status of the job request is `esriJobSucceeded`, you can access the results of the analysis by making a request of the following form:



```
http://<analysis url>/SummarizeWithin/jobs/<jobId>/results/<output parameter name>?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| resultLayer | These are the polygon features of the sumWithinLayer with summary statistics about the features in the summaryLayer that fall within each polygon.Example: {"url":"http://<analysis url>/SummarizeWithin/jobs/<jobId>/results/resultLayer"}The result has properties for parameter name, data type, and value. The contents of value depend on the outputName parameter provided in the initial request.If outputName was provided, value contains the URL to the feature service layer. { "paramName":"resultLayer", "dataType":"GPString", "value":{"url":"<hosted featureservice layer url>"} }If outputName was not provided, value contains a feature collection. { "paramName":"resultLayer", "dataType":"GPString", "value":{"layerDefinition": {}, "featureSet": {}} }See Feature Output for more information about how the result layer or collection is accessed. |
| groupBySummary | If a groupByField field was provided as input, the result will have a groupBySummary table that contains the calculated statistics for each unique group. Tables are a subset of features; that is, they contain attributes but no geometry.Example: {"url":"http://<analysis url>/SummarizeWithin/jobs/<jobId>/results/groupBySummary"}The result has properties for parameter name, data type, and value. The contents of value depend on the outputName parameter provided in the initial request.If outputName was provided, value contains the URL to the feature service layer. { "paramName":"groupBySummary", "dataType":"GPString", "value":{"url":"<hosted featureservice layer url>"} }If outputName was not provided, value contains a feature collection. { "paramName":"groupBySummary", "dataType":"GPString", "value":{"layerDefinition": {}, "featureSet": {} } } |