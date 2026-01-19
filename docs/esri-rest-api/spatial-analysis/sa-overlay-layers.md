# Overlay Layers

> Source: [/rest/services-reference/enterprise/spatial-analysis/tasks/sa-overlay-layers/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/tasks/sa-overlay-layers/)

![Overlay Layers](/rest/services-reference/enterprise/static/3d96bb94b03117667f6b58cab2b1b7a0/78e79/GUID-CE1E0E84-F3B5-446B-9FDE-4DA057F106CC-web.png)

The Overlay Layers task combines two or more layers into a single layer. You can think of overlay as peering through a stack of maps and creating a single map containing all the information from the stack. Before the advent of GIS, cartographers would manually copy maps onto clear acetate sheets, overlay the sheets on a light table, and hand draw a new map from the overlaid data. Overlay is more than a merging of line work; all the attributes of the features in the overlay are carried through to the final product. Overlay is used to answer one of the most basic questions of geography: What is on top of what?

The following are examples:

-   What parcels are within the 100-year floodplain? (Within is another way of saying on top of.)
-   What roads are within what counties?
-   What land use is on top of what soil type?
-   What wells are within abandoned military bases?

## Request URL



```
http://<analysis url>/OverlayLayers/submitJob
```

## Request parameters

| Parameter | Description |
|---|---|
| inputLayer(Required) | The point, line, or polygon features that will be overlayed with the overlayLayer parameter.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| overlayLayer(Required) | The features that will be overlaid with the inputLayer parameter features.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| overlayType | The type of overlay to be performed.Values: Intersect \| Union \| EraseIntersect Computes a geometric intersection of the input layers. Features or portions of features that overlap in both the inputLayer and overlayLayer parameters will be written to the output layer. This is the default.Union Computes a geometric union of the input layers. All features and their attributes will be written to the output layer. This option is only valid if both the inputLayer and the overlayLayer parameter values contain polygon features.Erase Only those features or portions of features in the inputLayer parameter that do not overlap the features in the overlayLayer parameter are written to the output.Example: "overlayType": "Union" |  | Intersect | Computes a geometric intersection of the input layers. Features or portions of features that overlap in both the inputLayer and overlayLayer parameters will be written to the output layer. This is the default. | Union | Computes a geometric union of the input layers. All features and their attributes will be written to the output layer. This option is only valid if both the inputLayer and the overlayLayer parameter values contain polygon features. | Erase | Only those features or portions of features in the inputLayer parameter that do not overlap the features in the overlayLayer parameter are written to the output. |
|  |
| Intersect | Computes a geometric intersection of the input layers. Features or portions of features that overlap in both the inputLayer and overlayLayer parameters will be written to the output layer. This is the default. |
| Union | Computes a geometric union of the input layers. All features and their attributes will be written to the output layer. This option is only valid if both the inputLayer and the overlayLayer parameter values contain polygon features. |
| Erase | Only those features or portions of features in the inputLayer parameter that do not overlap the features in the overlayLayer parameter are written to the output. |
| outputType | The type of intersection to be found. This parameter is only valid when the overlayType parameter value is Intersect.Values: Input \| Line \| PointInput—The features returned will be the same geometry type as the inputLayer or overlayLayer parameter value with the lowest dimension geometry. If all inputs are polygons, the output will contain polygons. If one or more inputs are lines and no inputs are points, the output will be line. If one or more inputs are points, the output will contain points. This is the default.Line—Line intersections will be returned. This is only valid if no inputs are points.Point—Point intersections will be returned. If the inputs are line or polygon, the output will be a multipoint layer. |
| snapToInput | A Boolean value indicating whether feature vertices in the inputLayer parameter are allowed to move. The default is false and means if the distance between features is less than the tolerance value, all features from both layers can move to allow snapping to each other. When set to true, only features in overlayLayer can move to snap to the inputLayer features.Values: true \| falseExample: "snapToInput": true |
| tolerance | A double value of the minimum distance separating all feature coordinates as well as the distance a coordinate can move in the X or Y (or both) direction. The tolerance units are the same as the inputLayer units. |
| outputName | If provided, the task will create a feature service of the results. You define the name of the service. If an outputName value is not provided, the task will return a feature collection.Syntax: { "serviceProperties": { "name": "<service name>" } }You can overwrite an existing feature service by providing the itemId value of the existing feature service and setting the overwrite property to true. Including the serviceProperties parameter is optional. As described in the Feature output topic, you must either be the owner of the feature service or have administrative privileges to perform the overwrite.Syntax: { "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }or { "serviceProperties": { "name": "<existing service name>" }, "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } } |
| context | The Context parameter contains the following additional settings that affect task operation:Extent (extent)—A bounding box that defines the analysis area. Only input features that intersect the bounding box will be analyzed.Output spatial reference (outSR)—The output features will be projected into the output spatial reference.Syntax: { "extent" : {extent}, "outSR" : {spatial reference} } |
| f | The response format. The default response format is html.Values: html \| json |

## Response

When you submit a request, the service assigns a unique job ID for the transaction. Syntax:



```
{
"jobId": "<unique job identifier>",
"jobStatus": "<job status>"
}
```

After the initial request is submitted, you can use the `jobId` value to periodically check the status of the job and messages as described in [Check job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, use `jobId` to retrieve the results. To track the status, you can make a request of the following form:



```
http://<analysis url>/OverlayLayers/jobs/<jobId>
```

## Access results

When the status of the job request is `esriJobSucceeded`, you can access the results of the analysis by making a request of the following form:



```
http://<analysis url>/OverlayLayers/jobs/<jobId>/results/outputLayer?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| outputLayer | The features that are the result of the overlay. The type of feature (point, line, or polygon) depends on the input parameter settings.Example: {"url":"http://<analysis url>/OverlayLayers/jobs/<jobId>/results/outputLayer"}The result includes properties for parameter name, data type, and value. The contents of value depend on the outputName parameter provided in the initial request.If outputName was provided, value contains the URL to the feature service layer. { "paramName":"outputLayer", "dataType":"GPString", "value":{"url":"<hosted featureservice layer url>"} }If outputName was not provided, value contains a feature collection. { "paramName":"outputLayer", "dataType":"GPString", "value":{"layerDefinition": {}, "featureSet": {} } }See Feature Output for more information about how the result layer or collection is accessed. |