# Create Buffers

> Source: [/rest/services-reference/enterprise/spatial-analysis/tasks/sa-create-buffers/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/tasks/sa-create-buffers/)

![Create Buffers](/rest/services-reference/enterprise/static/09327060922018b089f6e44ced616c64/78e79/GUID-7F4A8E4D-42E3-41C1-9238-16619CE65079-web.png)

The Create Buffers task creates polygons that cover a given distance from a point, line, or polygon feature. Buffers are typically used to create areas that can be further analyzed using a tool such as Overlay Layers.

For example, if the question is "What buildings are within one mile of the school?", the answer can be determined by creating a one-mile buffer around the school and overlaying the buffer with the layer containing building footprints. The result is a layer of those buildings within one mile of the school.

## Request URL



```
http://<analysis url>CreateBuffers/submitJob
```

## Request parameters

| Parameter | Description |
|---|---|
| inputLayer(Required) | The point, line, or polygon features to be buffered.Syntax: As described in detail in the Feature input topic, this parameter can be one of the following:A URL to a feature service layer with an optional filter to select specific featuresA feature collectionExamples:{"url": <feature service layer url>, "filter": <where clause>}{"layerDefinition": {}, "featureSet": {}, "filter": <where clause>} |
| distances(Required if Field is not provided) | An array of double values to buffer the input features. You must supply values for either the Distances or Field parameter. You can enter a single distance value or multiple values, separating each value with a space. The units of the distance values is supplied by the Units parameter.Examples:"distances": [4.0]"distances": [4.0, 5.0, 6.0] |
| field(Required if distances is not provided) | A field on the inputLayer containing a buffer distance. Unlike the distances parameter, multiple distances are not supported on field input.Example: "field": "Setback" |
| units | The linear unit to be used with the distance values specified in distances or contained in the field value.Values: Meters \| Kilometers \| Feet \| Miles \| NauticalMiles \| YardsThe default is MetersExample: "units": "Miles" |
| dissolveType | Specifies how overlapping buffers are processed.Values: None \| DissolveNone—Overlapping areas are kept. This is the default.Dissolve—Overlapping areas are combined.Example: "dissolveType": "Dissolve" |  |  | None—Overlapping areas are kept. This is the default. |  | Dissolve—Overlapping areas are combined. |
|  |
|  | None—Overlapping areas are kept. This is the default. |
|  | Dissolve—Overlapping areas are combined. |
| ringType | Specifies how multiple-distance buffers are processed.Values: Disks \| RingsDisks—Buffers are concentric and will overlap. For example, if the distances are 10 and 14, the result will be two buffers, one from 0 to 10 and one from 0 to 14. This is the default.Rings—Buffers will not overlap. For example, if the distances are 10 and 14, the result will be two buffers, one from 0 to 10 and one from 10 to 14.Example:"ringType": "Disks" |  |  | Disks—Buffers are concentric and will overlap. For example, if the distances are 10 and 14, the result will be two buffers, one from 0 to 10 and one from 0 to 14. This is the default. |  | Rings—Buffers will not overlap. For example, if the distances are 10 and 14, the result will be two buffers, one from 0 to 10 and one from 10 to 14. |
|  |
|  | Disks—Buffers are concentric and will overlap. For example, if the distances are 10 and 14, the result will be two buffers, one from 0 to 10 and one from 0 to 14. This is the default. |
|  | Rings—Buffers will not overlap. For example, if the distances are 10 and 14, the result will be two buffers, one from 0 to 10 and one from 10 to 14. |
| sideType | Specifies the side of the line that will be buffered when buffering line features. Typically, this is both sides (Full, which is the default). Left and right are determined as if you were walking from the first x,y coordinate of the line (the start coordinate) to the last x,y coordinate of the line (the end coordinate). Specifying left or right usually means you know that the line features were created and stored in a particular direction (for example, upstream or downstream in a river network).When buffering polygon features, you can specify whether the buffer includes or excludes the polygon being buffered.Values: Full \| Right \| Left \| OutsideFull—Both sides of the line will be buffered. This is the default for line features.Right—Only the right side of the line will be buffered.Left—Only the left side of the line will be buffered.Outside—When buffering a polygon, the polygon being buffered is excluded in the result buffer.If a sideType value is not specified, the polygon being buffered is included in the result buffer. This is the default for polygon features.sideType is enabled only for single distance buffers.Example: "sideType": "Outside" |  |  | Full—Both sides of the line will be buffered. This is the default for line features. |  | Right—Only the right side of the line will be buffered. |  | Left—Only the left side of the line will be buffered. |  | Outside—When buffering a polygon, the polygon being buffered is excluded in the result buffer. |  | If a sideType value is not specified, the polygon being buffered is included in the result buffer. This is the default for polygon features. |
|  |
|  | Full—Both sides of the line will be buffered. This is the default for line features. |
|  | Right—Only the right side of the line will be buffered. |
|  | Left—Only the left side of the line will be buffered. |
|  | Outside—When buffering a polygon, the polygon being buffered is excluded in the result buffer. |
|  | If a sideType value is not specified, the polygon being buffered is included in the result buffer. This is the default for polygon features. |
| endType | The shape of the buffer at the end of line input features. This parameter is not valid for polygon input features. At the ends of lines, the buffer can be rounded (Round) or be straight across (Flat).Values: Round \| FlatRound—Buffers will be rounded at the ends of lines. This is the default.Flat—Buffers will be flat at the ends of lines.Example: "endType": "Flat" |  |  | Round—Buffers will be rounded at the ends of lines. This is the default. |  | Flat—Buffers will be flat at the ends of lines. |
|  |
|  | Round—Buffers will be rounded at the ends of lines. This is the default. |
|  | Flat—Buffers will be flat at the ends of lines. |
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

After the initial request is submitted you can use `jobId` to periodically check the status of the job and messages as described in [Check job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, use `jobId` to retrieve the results. To track the status, you can make a request of the following form:



```
http://<analysis url>/CreateBuffers/jobs/<jobId>
```

## Access the results

When the status of the job request is `esriJobSucceeded`, you can access the results of the analysis by making a request of the following form.



```
http://<analysis url>/CreateBuffers/jobs/<jobId>/results/bufferLayer?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| bufferLayer | The buffer polygons.Example: {"url":"http://<analysis url>/CreateBuffers/jobs/<jobId>/results/bufferLayer"}The result has properties for paramName, dataType, and value. The contents of the value property depend on the outputName parameter value provided in the initial request.If an outputName parameter value was provided, the value property contains the URL to the feature service layer. { "paramName":"bufferLayer", "dataType":"GPString", "value":{"url":"<hosted featureservice layer url>"} }If an outputName parameter value was not provided, the value property contains a feature collection. { "paramName":"bufferLayer", "dataType":"GPString", "value":{"layerDefinition": {}, "featureSet": {} } }See Feature output for more information about how the result layer or collection is accessed. |