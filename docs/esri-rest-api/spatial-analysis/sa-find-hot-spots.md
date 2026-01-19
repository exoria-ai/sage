# Find Hot Spots

> Source: [/rest/services-reference/enterprise/spatial-analysis/tasks/sa-find-hot-spots/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/tasks/sa-find-hot-spots/)

![Find Hot Spots](/rest/services-reference/enterprise/static/243bc401de0de1cf52e6737592331afd/78e79/GUID-D4A59131-AC88-4C7A-85BA-67861D5C1CF8-web.png)

The Find Hot Spots task analyzes point data (such as crime incidents, traffic accidents, or trees) or field values associated with points or area features (such as the number of people in each census tract or the total sales for retail stores). It finds statistically significant spatial clusters of high values (hot spots) and low values (cold spots). For point data when no field is specified, hot spots are locations with lots of points and cold spots are locations with very few points.

The result map layer shows hot spots in red and cold spots in blue. The darkest red features indicate the strongest clustering of high values or point densities; you can be 99 percent confident that the clustering associated with these features could not be the result of random chance. Similarly, the darkest blue features are associated with the strongest spatial clustering of low values or the lowest point densities. Features that are beige are not part of a statistically significant cluster; the spatial pattern associated with these features could very likely be the result of random processes and random chance.

## Request URL



```
http://<analysis url>/FindHotSpots/submitJob
```

## Request Parameters

| Parameter | Description |
|---|---|
| analysisLayer (Required) | The point or polygon feature layer for which hot spots will be calculated.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| analysisField (Required if the analysisLayer contains polygons) | The numeric field that will be analyzed. The field you select might represent:counts (such as the number of traffic accidents)rates (such as the number of crimes per square mile)averages (such as the mean math test score)indices (such as a customer satisfaction score)If an analysisField is not supplied, hot spot results are based on point densities only.Syntax: "analysisField": "Average_Score" |
| divideByField | The numeric field in the analysisLayer that will be used to normalize your data. For example, if your points represent crimes, dividing by total population would result in an analysis of crimes per capita rather than raw crime counts.You can use esriPopulation to geoenrich each area feature with the most recent population values, which will then be used as the attribute to divide by. This option will use credits.Syntax: "divideByField": "esriPopulation" |
| boundingPolygonLayer | When the analysis layer is points and no analysisField is specified, you can provide polygons features that define where incidents could have occurred. For example, if you are analyzing boating accidents in a harbor, the outline of the harbor might provide a good boundary for where accidents could occur. When no bounding areas are provided, only locations with at least one point will be included in the analysis.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collection |
| aggregationPolygonLayer | When the analysisLayer contains points and no analysisField is specified, you can provide polygon features into which the points will be aggregated and analyzed, such as administrative units. The number of points that fall within each polygon are counted, and the point count in each polygon is analyzed.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collection |
| shapeType | The shape of the polygon mesh the input features will be aggregated into.Fishnet—The input features will be aggregated into a grid of square (fishnet) cells.Hexagon—The input features will be aggregated into a grid of hexagonal cells.Example: "shapeType": "Hexagon" |
| cellSize | The size of the grid cells used to aggregate your features. When aggregating into a hexagon grid, this distance is used as the height to construct the hexagon polygons.Example: "cellSize": 500 |
| cellSizeUnits | The units of the cellSize value. You must provide a value if cellSize has been set.Values: Miles \| Feet \| Kilometers \| MetersExample:"cellSizeUnit": "Meters" |
| distanceBand | The spatial extent of the analysis neighborhood. This value determines which features are analyzed together in order to assess local clustering. |
| distanceBandUnits | The units of the distanceBand value. You must provide a value if distanceBand has been set.Values: Miles \| Feet \| Kilometers \| MetersExample:"distanceBandUnit": "Meters" |
| outputName | If provided, the task will create a feature service of the results. You define the name of the service. If an outputName value is not provided, the task will return a feature collection.Syntax: { "serviceProperties": { "name": "<service name>" } }In ArcGIS Enterprise 11.1 and later, you can overwrite an existing feature service by providing the itemId value of the existing feature service and setting the overwrite property to true. Including the serviceProperties parameter is optional. As described in the Feature output topic, you must either be the owner of the feature service or have administrative privileges to perform the overwrite.Syntax: { "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }or { "serviceProperties": { "name": "<existing service name>" }, "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }The processInfo parameter and pop-ups are not updated by overwriting the output feature layer if the existing output feature layer already has strings for processInfo and custom pop-ups. |
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

After the initial request is submitted you can use the `jobId` to periodically check the status of the job and messages as described in the topic [Check job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, use the `jobId` to retrieve the results. To track the status, you can make a request of the following form:



```
http://<analysis url>/FindHotSpots/jobs/<jobId>
```

## Analysis results

When the status of the job request is `esriJobSucceeded`, you can access the results of the analysis by making a request of the following form:



```
http://<analysis url>/FindHotSpots/jobs/<jobId>/results/hotSpotsResultLayer?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| hotSpotsResultLayer | The result of Find Hot Spots is a feature layer that provides information about statistically significant hot and cold features.If the input analysis layer (analysisLayer) contains points and an analysisField is specified, the result will be points. For all other scenarios (polygons or points when no analysisField is specified) the output is polygons.The result layer has the following attributes:An ID field (FID)—An Integer field with a unique value for every feature.AnalysisField or Join_Count —When an analysisField is specified, it will be copied to the result with the same name a properties. When no analysisField is specified, an Integer field is created with values reflecting the number of points in each aggregation polygon. If an aggregationPolygonLayer is specified, these polygons are used for aggregation. Otherwise, a fishnet polygon mesh is created to overlay the points, and the squares in the fishnet mesh are used as aggregation polygons.Hot/Cold Intensity—a numeric (double) field with standard deviations representing the intensity of spatial clustering.Confidence Bin—use this field for symbolizing the results. Values range from -3 to +3 and reflect statistical significance. Use blue to draw values less than zero and red to draw values greater than zero. Use the darkest blue for features equal to -3, medium blue for -2, and light blue for -1. Use the darkest red for features equal to 3, medium red for 2, and the lightest red or pink for 1. A confidence bin value of zero means no statistically significant clustering, and these features should be draw in white or beige (the color selected should be neutral and not draw attention at all).Example: {"url":"http://<analysis url>/FindHotSpots/jobs/<jobId>/results/hotSpotResultLayer"}The result has properties for parameter name, data type, and value. The contents of value depends on the outputName parameter provided in the initial request.If outputName was provided, value contains the URL to the feature service layer. { "paramName":"hotSpotResultLayer", "dataType":"GPString", "value":{"url":"<hosted featureservice layer url>"} }If outputName was not provided, value contains a feature collection. { "paramName": "hotSpotResultLayer", "dataType": "GPString", "value":{"layerDefinition": {}, "featureSet": {} } }See Feature Output for more information about how the result layer or collection is accessed. |
| processInfo | processInfo contains strings that describe the workflow used by Find Hot Spots when calculating the result. These strings are used for reporting by the Find Hot Spots tool in Map Viewer. You can create your own custom reports for your application using these strings. There are four parts in the returned JSON:messageCode—The serial number for each unique message.message—Text that may or may not contain parameters (in ${paramsName} format) that need to be replaced by values.params—Dictionary of the keys and values to be inserted into the ${paramsName} in the message.style—The style used to format the report.Example: { "messageCode" : "SS_84464", "message" : "The optimal fixed distance band is based on the average distance to ${NumNeighs} nearest neighbors: ${DistanceInfo}", "params" : { "NumNeighs" : "20" , "DistanceInfo" : "446.8956 Meters" }, "style" : "<ul><li></li></ul><br></br>", } |

## The science behind Hot Spot analysis

The Find Hot Spots task calculates the Getis-Ord Gi\* statistic (pronounced G-i-star) for each feature in a feature layer. The service works by looking at each feature within the context of neighboring features. To be a statistically significant hot spot, a feature will have a high value or incident count and will be surrounded by other features with high values or incident counts. The local sum for a feature and its neighbors is compared proportionally to the sum of all features; when the local sum is very different from the expected local sum, and when that difference is too large to be the result of random chance, a statistically significant [z-score](https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-statistics/what-is-a-z-score-what-is-a-p-value.htm) results.

### Potential applications

Applications can be found in crime analysis, epidemiology, voting pattern analysis, economic geography, retail analysis, traffic incident analysis, and demographics. Some examples include the following:

-   Where is the disease outbreak concentrated?
-   Where are kitchen fires a larger than expected proportion of all residential fires?
-   Where should the evacuation sites be located?
-   Where do peak intensities occur?
-   In which locations should we allocate more of our resources?

### Hot spot analysis considerations

There are three things to consider when undertaking any hot spot analysis:

-   What is the Analysis Field?
    
    The hot spot analysis tool assesses whether high or low values (the number of crimes, accident severity, or dollars spent on sporting goods, for example) cluster spatially. The field containing those values is your Analysis Field. When the Analysis Layer represents incident points and you are only interested in locating high and low incident densities, select NO ANALYSIS FIELD. When you select NO ANALYSIS FIELD, the Find Hot Spots service will overlay the incidents points with a fishnet and count the number of incidents within each fishnet square. The incident count values will then be used as the Analysis Field.
    
-   What is the question?
    
    This may seem obvious, but how you construct the Analysis Field determines the types of questions you can answer. Are you most interested in determining where you have lots of incidents or where high/low values for a particular attribute cluster spatially? If so, run the Find Hot Spot service on the raw values or raw incident counts. This type of analysis is particularly helpful for resource allocation types of problems. Alternatively (or in addition), you may be interested in locating areas with unexpectedly high values in relation to some other variable. If you are analyzing foreclosures, for example, you probably expect more foreclosures in locations with more homes (said another way, at some level, you expect the number of foreclosures to be a function of the number of houses). For each Analysis Layer area, divide the number of foreclosures by the number of homes, then run the Find Hot Spots service on this ratio. For this analysis, you are no longer asking Where are there lots of foreclosures?; instead, you are asking Where are there unexpectedly high numbers of foreclosures, given the number of homes? By creating a rate or ratio prior to analysis, you can control for certain expected relationships (for example, the number of crimes is a function of population; the number of foreclosures is a function of housing stock) and will then be identifying unexpected hot/cold spots.
    
-   Does the analysis layer contain at least 30 features?
    
    Results aren't reliable with less than 30 features.
    

### Calculations

![Mathematics for the Gi* statistic](/rest/services-reference/enterprise/static/7b624bbcee65fa83dfc997f77d61886f/0a47e/GUID-AEFD71B5-BE33-42AB-84FB-AEE3FD5E2114-web.png)

### Additional resources

Mitchell, Andy. \_The ESRI Guide to GIS Analysis, \_Volume 2.\_\_ ESRI Press, 2005.

Getis, A. and J.K. Ord. 1992. "The Analysis of Spatial Association by Use of Distance Statistics" in _Geographical Analysis_ 24(3).

Ord, J.K. and A. Getis. 1995. "Local Spatial Autocorrelation Statistics: Distributional Issues and an Application" in _Geographical Analysis_ 27(4).

The [spatial statistics resource page](https://blogs.esri.com/esri/arcgis/2010/07/13/spatial-statistics-resources/) has short videos, tutorials, web seminars, articles and a variety of other materials to help you get started with spatial statistics.

Scott, L. and N. Warmerdam. [Extend Crime Analysis with ArcGIS Spatial Statistics Tools](http://www.esri.com/news/arcuser/0405/ss_crimestats1of2.html) in ArcUser Online, April–June 2005.