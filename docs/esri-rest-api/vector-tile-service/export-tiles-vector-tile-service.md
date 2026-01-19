# Export Tiles

> Source: [/rest/services-reference/enterprise/export-tiles-vector-tile-service/](https://developers.arcgis.com/rest/services-reference/enterprise/export-tiles-vector-tile-service/)

**URL:**: https://<root>/<serviceName>/VectorTileServer/exportTiles

**Methods:**: GET

**Version Introduced:**: 10.6.1

## Description

The `exportTiles` operation, an asynchronous task, allows client applications to download vector tiles from a vector tile layer for offline use. The result of this operation is a [vector tile service job](/rest/services-reference/enterprise/export-tiles-vector-tile-service/#export-tiles-job-status). The job response contains a reference to the vector tile service's Result resource, which returns a URL to the resulting vector tile package (`.vtpk` file).

The vector tile service must be enabled to allow clients to export cache tiles before this operation can be performed. The enable operation can be [run in ArcGIS Pro](https://pro.arcgis.com/en/pro-app/latest/help/sharing/overview/vector-tile-layer.htm#GUID-5FD6F54F-4DE5-4B9C-A1AF-D0325B39BBCB), the ArcGIS Enterprise portal, or the ArcGIS Online home app.

You can specify the maximum number of tiles clients can download from your vector tile layer. The default limit is 100,000 tiles.

[Learn how to enable vector tile layer export](https://enterprise.arcgis.com/en/portal/latest/use/manage-hosted-tile-layers.htm)

## Request parameters

| Parameter | Details |
|---|---|
| exportExtent | The extent (bounding box) of the vector tile package to be exported. The extent should be within the specified spatial reference. The default value is the full extent of the tiled map service.Example: { "xmin": -109.55, "ymin" : 25.76, "xmax": -86.39, "ymax" : 49.94, "spatialReference": {"wkid": 4326} } |
| polygon | Introduced at 10.7. A JSON representation of a polygon, containing an array of rings and a spatialReference .Example: { "rings": [ [[6453,16815],[10653,16423],[14549,5204],[-7003,6939],[6453,16815]], [[914,7992],[3140,11429],[1510,10525],[914,7992]] ], "spatialReference": {"wkid": 54004} } |
| levels | Specifies the tiled service levels to export. The values should correspond to Level IDs. The values can be comma-separated values or a range of values. Ensure that the tiles are present at each specified level.Examples 2 3 4 5 //Comma-separated values levels=1,2,3,4,5,6,7,8,9 //Ranged values levels=1-4, 7-9 |
| token | A token to pass when performing the export operation. |
| f | The response format. The only valid response format is json . |

## Example usage

The following code blocks are sample URL requests for the `exportTiles` operation.

### Example usage in ArcGIS Enterprise

#### Using the default extent



```
https://organization.example.com/<context>/rest/services/Hosted/nZ_test/VectorTileServer/exportTiles?&exportExtent=DEFAULT&exportBy=levelId&levels=0-6&polygon=&f=json&token= <token>
```

#### Specifying a custom extent



```
https://organization.example.com/<context>/rest/services/Hosted/nZ_test/VectorTileServer/exportTiles?&exportExtent={"spatialReference":{"wkid":102100,"latestWkid":3857},"xmax":1.936330167439007E7,"xmin":1.8878385166948937E7,"ymax":-5133377.883934237,"ymin":-5466031.831031308}&exportBy=levelId&levels=0-6&polygon=&f=json&token=<token>
```

#### Specifying a polygon



```
https://organization.example.com/<context>/rest/services/Hosted/nZ_test/VectorTileServer/exportTiles?storageFormatType=Compact&tilePackage=false&exportExtent=DEFAULT&optimizeTilesForSize=false&compressionQuality=&exportBy=levelId&levels=0-6&polygon=%7B%22rings%22%3A%5B%5B%5B19517708.645199999%2C-4945542.1442000009%5D%2C%5B19566499.381099999%2C-4992211.5439000018%5D%2C%5B19588419.856799997%2C-5068579.6524999999%5D%2C%5B19503566.402800001%2C-5117370.3885000013%5D%2C%5B19439926.312299997%2C-5074943.6614999995%5D%2C%5B19451240.106200002%2C-4992918.6559999995%5D%2C%5B19517708.645199999%2C-4945542.1442000009%5D%5D%5D%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&areaOfInterest=&f=json&token=<token>
```

### Example usage in ArcGIS Online

#### Using the default extent



```
https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_Export_v2/VectorTileServer/exportTiles?levels=0-6&token=<token>
```

#### Specifying a custom extent



```
https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_Export_v2/VectorTileServer/exportTiles?extent={"spatialReference":{"wkid":102100,"latestWkid":3857},"xmax":1.936330167439007E7,"xmin":1.8878385166948937E7,"ymax":-5133377.883934237,"ymin":-5466031.831031308}&polygon=&levels=0-6&f=json&token=<token>
```

#### Specifying a polygon



```
https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_Export_v2/VectorTileServer/exportTiles?extent=&polygon={"rings":[[[19517708.645199999,-4945542.1442000009],[19566499.381099999,-4992211.5439000018],[19588419.856799997,-5068579.6524999999],[19503566.402800001,-5117370.3885000013],[19439926.312299997,-5074943.6614999995],[19451240.106200002,-4992918.6559999995],[19517708.645199999,-4945542.1442000009]]],"spatialReference":{"wkid":102100}}&levels=0-6&f=json&token=<token>
```

## JSON Response syntax

The syntax is identical for ArcGIS Enterprise and ArcGIS Online:



```
{"jobId" : "<job ID>","jobStatus" : "<job status>"}
```

## JSON responses

The server's initial response to your Export Tiles operation request will provide information about the job that has been started. The following code blocks give the syntax and examples of JSON responses for the operation. Note the job ID value; you will specify this each time you check the status of the running job.

### ArcGIS Enterprise example



```
{"jobId":"j5ed98befb0f64c3db7cdf713d3157c2b_et","jobStatus":"esriJobSubmitted"}
```

### ArcGIS Online example



```
{"id":"a5eec7b652777712","name":"World_Basemap_Export_v2","url":null,"status":"success","itemId":"f42ec2699c7d4819bbbe60eca31b6b3e","type":"Vector Tile Service","jobId":"b79884b278a0e325","message":"success"}
```

## Export Tiles job status

You can check the status of a current job running the Export Tiles operation using the job ID provided in the initial JSON response to your request. The following code blocks give the syntax of request URLs and samples of JSON responses. Within the response, there is information about the job status and the vector tile package that will be created by the job.

### Job status request syntax

In ArcGIS Enterprise:



```
https://organization.example.com/<context>/rest/services/Hosted/<servicename>/VectorTileServer/jobs/<jobID_et>?f=json&token=<token>
```

In ArcGIS Online:



```
https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_Export_v2/VectorTileServer/jobs/<jobid>?f=json&token=<token>
```

### Job status response examples

In ArcGIS Enterprise:



```
{
  "jobId": "jbc8c374b92e743fdb725b73a182e2c80_et",
  "jobStatus": "esriJobSucceeded",
  "results": {
    "out_service_url": {
      "paramUrl": "results/out_service_url"
    }
  },
  "inputs": {
    "service_url": {
      "paramUrl": "inputs/service_url"
    },
    "target_cache": {
      "paramUrl": "inputs/target_cache"
    },
    "storage_format_type": {
      "paramUrl": "inputs/storage_format_type"
    },
    "copy_data_from_server": {
      "paramUrl": "inputs/copy_data_from_server"
    },
    "thread_count": {
      "paramUrl":" inputs/thread_count"
    },
    "tile_package": {
      "paramUrl": "inputs/tile_package"
    },
    "export_extent": {
      "paramUrl": "inputs/export_extent"
    },
    "levels": {
      "paramUrl": "inputs/levels"
    },
    "replace_existing_tiles": {
      "paramUrl": "inputs/replace_existing_tiles"
    },
    "area_of_interest": {
      "paramUrl": "inputs/area_of_interest"
    },
    "temp_output_path": {
      "paramUrl": "inputs/temp_output_path"
    },
    "export_options": {
      "paramUrl": "inputs/export_options"
    }
  },
  "messages":[
    {
      "type": "esriJobMessageTypeInformative",
      "description": "Start Time: Tuesday, February 19, 2019 2:23:39 PM"
    },
    {
      "type": "esriJobMessageTypeInformative",
      "description": "C:\\107\\arcgisserver\\directories\\arcgiscache"
    },
    {
      "type": "esriJobMessageTypeInformative",
      "description": "C:\\107\\arcgisserver\\directories\\arcgissystem\\arcgisindex"
    },
    {
      "type": "esriJobMessageTypeInformative",
      "description": "C:\\107\\arcgisserver\\directories\\arcgissystem\\arcgisinput"
    },
    {
      "type": "esriJobMessageTypeInformative",
      "description": "C:\\107\\arcgisserver\\directories\\arcgissystem\\arcgisjobregistry"
    },
    {
      "type": "esriJobMessageTypeInformative",
      "description": "C:\\107\\arcgisserver\\directories\\arcgisjobs"
    },
    {
      "type": "esriJobMessageTypeInformative",
      "description": "C:\\107\\arcgisserver\\directories\\arcgisoutput"
    },
    {
      "type": "esriJobMessageTypeInformative",
      "description": "Succeeded at Tuesday, February 19, 2019 2:23:44 PM (Elapsed Time: 5.40 seconds)"
    }
  ]
}
```

In ArcGIS Online:



```
{
  "jobId": "b79884b278a0e325",
  "type": "EXPORTTILES",
  "jobStatus": "esriJobSucceeded",
  "message": null,
  "extent": {
    "xmin": -8956266.52750818,
    "ymin": 3090042.12173989,
    "xmax": -8900296.1607205,
    "ymax": 3129973.64293072,
    "spatialReference": null
  },
  "startTime": 1550614055143,
  "lastTime": 1550614105907,
  "estimatedNumTiles": 28,
  "numTiles": 0,
  "estimatedTilesSize": 0,
  "tilesSize": 0,
  "numTasks": 1,
  "numSubmittedTasks": 0,
  "numProcessingTasks": 0,
  "numDoneTasks": 1,
  "numErrorTasks": 0,
  "numCanceledTasks": 0,
  "output": {
    "outputUrl": ["https://lws-job-results-prd0.s3.amazonaws.com/export/8d73d367df5ecc9d.vtpk?response-content-disposition=Content-Disposition%3A%20attachment%3B%20filename%3D8d73d367df5ecc9d.vtpk&X-Amz-Security-Token=<TOKEN>"],
    "itemId":null
  },
  "levelStats": [
    {
      "level": 0
    },
    {
      "level": 1
    },
    {
      "level": 2
    },
    {
      "level": 3
    },
    {
      "level": 4
    },
    {
      "level": 5
    },
    {
      "level": 6
    },
    {
      "level": 7
    },
    {
      "level": 8
    },
    {
      "level": 9
    },
    {
      "level": 10
    },
    {
      "level": 11
    }
  ]
}
```

## Obtain the exported tile package

When the job status resource indicates that the `exportTiles` operation is complete, you can download the vector tile package by accessing its output URL. The format of this URL is different between ArcGIS Enterprise and ArcGIS Online.

-   In ArcGIS Enterprise: Append `/results/out_service_url` to the URL of the export job. The URL format will be as follows:
    
    
    
    ```
    https://organization.example.com/<context>/rest/services/Hosted/<servicename>/VectorTileServer/jobs/<jobID_et>/results/out_service_url
    ```
    
-   In ArcGIS Online: The URL is given as the `outputUrl` in the job status response. For example, the `outputUrl` in the response sample above is as follows:
    
    
    
    ```
    https://lws-job-results-prd0.s3.amazonaws.com/export/8d73d367df5ecc9d.vtpk?response-content-disposition=Content-Disposition%3A%20attachment%3B%20filename%3D8d73d367df5ecc9d.vtpk&X-Amz-Security-Token=<TOKEN>
    ```