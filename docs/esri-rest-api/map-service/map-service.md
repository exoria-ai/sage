# Map Service

> Source: [/rest/services-reference/enterprise/map-service/](https://developers.arcgis.com/rest/services-reference/enterprise/map-service/)

**URL:**: https://<catalog-url>/<serviceName>/MapServer

**Methods:**: GET

**Operations:**: Export Map, Export Tiles, Find, Generate KML, Identify, Generate Renderer, Query, Query Attachments, Query Related Records, Estimate Export Tile Size

**Child Resources:**: All Layers/Tables, Image, KML Image, Layer/Table, Legend, Map Tile, Dynamic Layer/Table, Feature, Job, WMTS, Map Service Extension

**Required Capability:**: Map

**Version Introduced:**: 9.3

## Description

Map services offer access to the contents of a map hosted on a server. Map services can expose different levels of capabilities. When a map service is hosted on ArcGIS Online or Portal for ArcGIS, it exposes a set of tiled images that are used by the client for rapid map navigation. When a map service is hosted on an ArcGIS Server site, it exposes additional functionality, such as dynamic drawing, query, and search. With ArcGIS Server, further web services may be available through the map service root URL that allow network analysis, vector feature editing, and so forth.

The REST API Map Service resource works only with the default data frame of your published map document. This resource provides basic information about the map, including the layers that it contains, whether or not the map is cached, its spatial reference, initial and full extents, map units, and copyright text. It also provides some metadata associated with the service, such as its service description, its author, and keywords. If the map is cached, additional information about its tiling scheme, such as the origin of the cached tiles, the levels of detail, and tile size, is included.

Map services do not expose editing capabilities. They provide read-only access to feature and attribute content.

## Map services hosted by ArcGIS Online and Portal for ArcGIS

Map services hosted by ArcGIS Online or Portal for ArcGIS can only return tiles from the server's cache; they cannot draw images dynamically, nor do they allow query of the individual features behind the map. You can support queries and informational pop-up windows in your applications using [feature services](/rest/services-reference/enterprise/feature-service/) in conjunction with your map services.

Accordingly, some of the resources, operations, and properties mentioned in this section of the documentation do not apply to map services hosted by ArcGIS Online or Portal for ArcGIS.

## Map services hosted by ArcGIS Server

Map services hosted by ArcGIS Server support a larger set of operations as follows:

-   [Export map](/rest/services-reference/enterprise/export-map/)—Exports a map image from a dynamic map service. The resulting map can be used for display and be in a different projection from the original data source. When generating a map image, map services cannot change feature rendering for an existing layer, add a dynamic layer, or change the layer draw order.
-   [Identify](/rest/services-reference/enterprise/identify-map-service/)—Returns information about features in one or more layers based on where a user clicks on the map.
-   [Find](/rest/services-reference/enterprise/find/)—Returns information about features in one or more fields in one or more layers based on a keyword.
-   [Generate KML](/rest/services-reference/enterprise/generate-kml/)—Generates a KML document wrapped in a KMZ file. The document contains a network link to the KML service endpoint with specified properties and parameters. This operation is valid on services that have not been restricted using a token service.
-   [Query](/rest/services-reference/enterprise/query-map-service-layer/) on a [Layer/Table](/rest/services-reference/enterprise/layer-table/)—Returns a subset of features in a layer or records in a table based on query criteria.

## New at 12.0

-   Added support for NoSQL databases. This allows share data from Elasticsearch and OpenSearch databases as map services.

## New at 11.2

-   WKT2 strings are supported.
    
-   Added support for new field types:
    
    -   `esriFieldTypeBigInteger` to support integer value in 64 bit range.
    -   `esriFieldTypeTimestampOffset` allows storing timestamp attributes from multiple time zones in a single field. Crime incidents, traffic data etc. from multiple time zones are appropriate for this data type.
    -   `esriFieldTypeDateOnly` to store only date parts for birthdays, permit approved date etc.
    -   `esriFieldTypeTimeOnly` to store only time parts when needed for example business hours, bus/train schedule etc.
-   Enhanced existing field types:
    
    -   Values in the`esriFieldTypeObjectID` field can be in 64 bit range when its length is 8.
    -   `esriFieldTypeDate` can have milliseconds. Its precision value is 1, when the field supports milliseconds.
-   A special keyword `current_user` is supported by operations that take sql statement. This is helpful when you want to view records/features that belongs to or edited/inserted by the currently logged in user. This keyword is supported when "supportsCurrentUserQueries": true in the layers "advancedQueryCapabilities" property. Note that this enhancement requires the server to have standardizedQueries enabled.
    
-   Map services can be published with Catalog Layers. Such catalog layers can only have references to local datasets. References to any services are not supported.
    

## New at 11.1

-   A new property, `storageInfo` , was added that specifies the storage format and packet size of cached map services.
    
-   A new boolean property, `datesInUnknownTimezone` , was added that lists whether the service supports having an unknown time zone, which will return date values as-is from the database rather than have them as date values in UTC.
    

## New in 10.9

-   A new property `supportsTimeRelation` is added to root resources for map service published from ArcGIS Pro. This allows client applications like ArcGIS Pro to have more control while working with time-aware layers using time sliders. You can decide whether to include or exclude start or end time.
    
-   `documentInfo.Version` indicates the version of original source map document. You will only see this for map service that are running on ArcGIS Pro based runtime. "10.1" means that the originally the service was published from ArcMap. Any other values reflects an ArcGIS Pro version.
    
-   Added new properties in layer/table resources
    
    -   `preferredTimeReference` and `datesInUnknownTimezone` .
    -   `supportsLOD` indicates that you can retrieve spatially aggregated results in feature bins.
    -   Layers off File Geodatabase support computes percentile
    -   Additional metadata are returned for attachments such as `exifInfos` , `keywords` etc..
-   The following operations are updated with `timeRelation` parameter:
    
    -   Export
    -   Identify
    -   QueryLegends
-   `Query` operation is enhanced to return spatially aggregated results in regularly shaped polygon (such as hexagon, square etc.) tessellation from point features.
    
    -   You can add layers that has `supportsLOD` true in ArcGIS Pro 2.7 higher and see aggregated results in bin polygons instead of overlapping point features

## New in 10.8.1

-   A new property `liveModeOffsetDirection` is added to root resources under `timeInfo` for map service published from ArcGIS Pro to represent its [live data mode](https://pro.arcgis.com/en/pro-app/latest/help/mapping/time/visualize-data-updating-using-live-mode.htm). It is only available when `hasLiveData` is `true` . If `hasLiveData` is `true` , export and identify operations will default the `time` parameter value to:
    
    -   When `liveModeOffsetDirection` is `past` : `[<current server time - defaultTimeWindow>, <current server time>]`
    -   When `liveModeOffsetDirection` is `future` : `[<current server time>, <current server time + defaultTimeWindow>]`
    -   When `liveModeOffsetDirection` is `pastAndFuture` : `[<current server time - defaultTimeWindow/2>, <current server time + defaultTimeWindow/2>]`

## New in 10.8

-   Supports the following new parameters in `export` , `identify` , `find` and `queryLegends` operations on map services published from ArcGIS Pro:
    
    -   `clipping` to mask out layers outside of a clip polygon.
        
    -   `spatialFilter` to draw or query only features that meet the spatial filter criteria.
        
-   `referenceScale` is added as a new property to represent the scale where the symbol and text size for participating layers is fixed at.
    

## New in 10.7.1

-   The `queryLegends` operation can be used to return information about the map service's legend filtered by layer and visibility. This operation is only available when the layer resource reports `supportsDynamicLegends` true.
    
-   `supportedQueryFormats` now includes `pbf` (protocol buffer), a compact binary encoding for geographic data.
    
-   The `minLOD` is the minimum level of detail (LOD) of the tiling scheme at which the cache tiles are available in the tile service. This does not have to be the smallest scale in your tiling scheme. You can choose to not create the cache tiles for all the LOD of your tiling scheme and only create caches from `min-maxLODs` . The resampling property will be used to display cache for the levels beyond `min-max LODs` .
    
-   The `maxLOD` is the maximum level of detail (LOD) of the tiling scheme at which the cache tiles are available in the tile service. Any requests to draw tiles outside this level would try to use the resampling setting to resample tiles from the nearest available LOD. The `maxLOD` should always be larger than the `minLOD` .
    
-   At 10.7.1, both `minScale` and `maxScale` properties have been updated. Previously for tiled services, these properties were described as the minimum and maximum map scales at which the administrator has allowed the tiles to be built. As of 10.7.1, their descriptions have been updated to the following:
    
    -   `minScale` is the minimum scale (most zoomed out) at which the service layer is visible in the map view. If the map is zoomed out beyond this scale, the service layer will not be visible. A value of 0 means the layer does not have a minimum scale. The `minScale` value should always be larger than the `maxScale` value.
    -   `maxScale` is the maximum scale (most zoomed in) at which the service layer is visible in the current map view. If the map is zoomed in beyond this scale, the service layer will not be visible. A value of 0 means the layer does not have a maximum scale. The `maxScale` value should always be smaller than the `minScale` value.
-   The `resampling` property has been updated at 10.7.1. At 10.3, this property was introduced as a Boolean value (`true` |`false` ) that indicated whether clients should resample tiles for areas where tiles are unavailable. At 10.7.1, its description has been updated to the following:
    
    -   A Boolean value (`true` | `false` ) that is used for rendering in Tile Package Clients such as ArcGIS Pro, Map Viewer Classic, and JSAPI. Enabling `resampling` redraws images up to the `maxScale` value. In areas with no data, blurred images will be displayed.

## New in 10.7

-   Ended support for Action Message Format (AMF) as an output format.

## New in 10.6.1

-   Added support for Layer File (`.lyrx` ) as a dynamic layer source: [Dynamic Workspace Layer](/rest/services-reference/enterprise/layer-source-object/#dynamic-workspace-layer) .
-   For archive enabled data, the `query` operation on the layer resources as well as the `queryRelatedRecords` operation support a `historicMoment` parameter. Layers with the `supportsQueryWithHistoricMoment` property set to `true` support the `historicMoment` parameter.
-   The `query` operation returns a number of unique values, instead of a list of unique values, in a field when values for both the `returnCountOnly` and `returnDistinctValues` parameters are true.
-   The `legend` resource introduces two new parameters to return legend patches at higher dpi and different size.
-   The `layer/table` resource introduces the `hasMetadata` flag and three new resources: `iteminfo` , `thumbnail` , and `metadata` .

## New in 10.5

-   Supports the following new parameters in the `export` , `identify` , `find` and `query` operations:
    
    -   `datumTransformation`
    -   `mapRangeValues`
    -   `layerRangeValues`
    -   `layerParameterValues`
-   Map service root resources include `activeRangeName` and `currentRangeExtent` when the map has ranges.
    
-   Layer resources include `rangeInfos` and `parameterInfos` when available.
    
-   The `identify` and `find` operations are enhanced with the following Boolean flags that support returning unformatted values and field names when desired:
    
    -   `returnUnformattedValues`
    -   `returnFieldName`
-   Supports SQL expressions in query operation's `orderBy` , `groupByFieldsForOutStatistics,` and `outStatistics` . Check `supportsSqlExpression` on resources to find out whether the layer/table allows SQL expressions.
    
-   The `returnUpdates` response includes the updated full spatial extent when the map contains one or more layers from enterprise geodatabases.
    

## New at 10.4

-   GeoJSON is supported as an output format of the map service layer [query](/rest/services-reference/enterprise/query-map-service-layer/) operation.
-   The query operation supports expressions in addition to field names for `orderByFields` and `groupByFieldsForStatistics` .

## New at 10.3

-   Map Service will return `resampling:true|false` , indicating whether clients should resample tiles for areas where tiles are unavailable. This property is not enabled by default; you can enable it using the ArcGIS Server Administrator Directory.

## New at 10.2

-   [Standardized SQL queries](https://enterprise.arcgis.com/en/server/latest/administer/windows/about-standardized-queries.htm) are the default way to specify a where clause or definition expression. The map service [Layer](/rest/services-reference/enterprise/layer-table/) and [Dynamic Layer](/rest/services-reference/enterprise/dynamic-layer-table/) resources now report the `useStandardizedQueries` property to indicate support for standardized queries.
-   Query operations on [Layer](/rest/services-reference/enterprise/layer-table/) and [Dynamic Layer](/rest/services-reference/enterprise/dynamic-layer-table/) now support specifying a `gdbVersion` parameter in conjunction with the `outStatistics` parameter.
-   The [Renderer](/rest/services-reference/enterprise/renderer-objects/) object supports two new optional properties: `rotationType` that controls the origin and direction of rotation, and `rotationExpression` , which is a constant value or an expression that derives the angle of rotation based on the feature attribute value. When an attribute name is specified in `rotationExpression` , it is enclosed in square brackets, for example, \[Rotation\].
-   The Map Service resource lists two new properties: `exportTilesAllowed` , a Boolean flag that indicates whether clients can export cache tiles, and `maxExportTilesCount` that specifies the maximum number of tiles that can be exported to a cache dataset or a tile package.
-   The Map Service resource lists a new property `supportedExtensions` , a comma-separated list of extensions supported by the map service.

## New at 10.1 SP1

-   Query operations on [Layer](/rest/services-reference/enterprise/query-map-service-layer/) and [Dynamic Layer](/rest/services-reference/enterprise/query-map-service-dynamic-layer/) support a new parameter called `returnDistinctValues` that accepts a Boolean value. When true, query results will contain distinct values based on the fields specified in the `outFields` parameter.
-   Query operations on [Layer](/rest/services-reference/enterprise/query-map-service-layer/) and [Dynamic Layer](/rest/services-reference/enterprise/query-map-service-dynamic-layer/) support the `geometry` parameter to be used in conjunction with the `outStatistics` parameter.
-   The [Legend](/rest/services-reference/enterprise/legend-map-service/) resource returns the height and width of the legend symbol.
-   The [All Layers/Table](/rest/services-reference/enterprise/all-layers-and-tables/), [Layer](/rest/services-reference/enterprise/layer-table/), and [Dynamic Layer](/rest/services-reference/enterprise/dynamic-layer-table/) resources now include an `ownershipBasedAccessControlForFeatures` flag to indicate ownership.

## New at 10.1

-   The Map Service resource supports a new parameter, `returnUpdates` , that accepts a Boolean value. Pass this parameter to retrieve updated information from the map service.
    
-   The Map Service resource has new input parameters, `option` and `outSR` , to support viewing of a map service footprint in `arcgis.com` .
    
-   Support for [dynamic layers](/rest/services-reference/enterprise/dynamic-layer-table/) has been added to map service. This allows per-request modification of renderer, joins, geodatabase version, or layer order for existing map service layers. If the map service has registered workspaces, dynamic layers also allow per-request addition of layers based on the data from the registered workspaces. Use the `supportsDynamicLayers` property on the Map Service resource to determine if the service supports dynamic layers.
    
-   The Map Service resource contains `maxRecordCount` , `maxImageHeight` , and `maxImageWidth` properties. `maxRecordCount` represents the maximum number of records that can be returned by query, find, and identify operations. `maxImageHeight` and `maxImageWidth` represent the maximum image height and width, in pixels, the map service will export.
    
-   The Map Service resource includes the `tileServers` property, which advertises multiple subdomains on a map service endpoint. This allows the tile requests to be split across the tile servers specified in this property, for example, `https://maps1.myserver.com and https://maps2.myserver.com` .
    
-   The Map Service resource includes `supportedQueryFormats` . This value indicates the supported output formats for a query operation.
    
-   The Map Service resource includes these new properties under `timeInfo` : `timeRelation` , `defaultTimeInterval` , `defaultTimeIntervalUnits` , `defaultTimeWindow` , and `hasLiveData` .
    
    -   `timeRelation` indicates how the start and end time of the time slider extent are processed: `esriTimeRelationOverlaps` when start and end time of the time slider are included, `esriTimeRelationOverlapsStartWithinEnd` when start time is included and end time is excluded, and `esriTimeRelationAfterStartOverlapsEnd` when start time is excluded and end time is included.
        
    -   `defaultTimeInterval` and `defaultTimeIntervalUnits` indicate the initial time slider step size. The allowed units include the following:
        
        -   `esriTimeUnitsCenturies`
        -   `esriTimeUnitsDays`
        -   `esriTimeUnitsDecades`
        -   `esriTimeUnitsHours`
        -   `esriTimeUnitsMilliseconds`
        -   `esriTimeUnitsMinutes`
        -   `esriTimeUnitsMonths`
        -   `esriTimeUnitsSeconds`
        -   `esriTimeUnitsWeeks`
        -   `esriTimeUnitsYears`
        -   `esriTimeUnitsUnknown`
    -   `defaultTimeWindow` indicates the time slider window size.
        
    -   `hasLiveData` returns a Boolean value. If true, export and identify operations will default the value for the `time` parameter to be \[<current server time - `defaultTimeWindow` >, <current server time>\].
        
-   The Map Service resource includes `minScale` and `maxScale` properties. For a cached map service, these values represent the minimum and maximum map scales at which the administrator has allowed the tiles to be built. In the case of a dynamic map service, these values are calculated as a union of minimum and maximum scales of all the map layers.
    
-   The Map Service resource includes `hasVersionedData` if any of the map layers data is versioned. When true, map service operations accept the `gdbVersion` parameter to switch the geodatabase version.
    

## New at 10.0 SP1

-   Support for a [Map Service Legend](/rest/services-reference/enterprise/legend-map-service/) child resource was added.
-   The Map Service resource includes scale information (`minScale` and `maxScale` ) for layers.

## New at 10.0

-   At 10 and later, in addition to layers, map services can also publish stand-alone tables. The response includes a new `tables` property that contains some basic information about tables. The child layer resource is now a [Layer/Table resource](/rest/services-reference/enterprise/layer-table/) in that it represents either a layer or a table depending on the ID that was specified.
-   Support for time-aware map services was added at 10. If the map supports querying and exporting maps based on time, the response will include a `timeInfo` property that includes information such as the map's time extent and the map's native time reference. However, the REST API always encodes time in UTC (milliseconds from epoch).

## Request parameters

| Parameter | Details |
|---|---|
| returnUpdates | If true , this resource returns the updated time extent. If the service is not time aware, the resource will return an empty response.Values: true \| false |
| option | If option is footprints , the footprint of the map service is returned as a feature collection. This feature collection can be viewed in ArcGIS Online. This option is only supported if the response format is json .Values: footprints |
| outSR | The spatial reference of the geometry returned in footprints. This parameter is supported only when option is specified as footprints . The spatial reference should be specified as a well-known ID. If outSR is not specified, the geometry is returned in GCS_WGS_1984 . |
| f | The response format. The default response format is html .Values: html \| json \| kmz \| lyr \| nmf \| jsapi \| ve \| gmaps |

## Example usage

The following is a sample request URL for the `ESRI_StateCityHighway_USA` map service:



```
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer
```

## JSON Response syntax

### Example one



```
{
  "currentVersion": <currentVersion>,
  "serviceDescription": "<serviceDescription>",
  "mapName": "<mapName>"
  "description": "<description>",
  "copyrightText": "<copyrightText>",
  "supportsDynamicLayers": <true|false>,
  "layers": [ //the spatial layers published by this service
    {
      "id": <layerId1>,
      "name": "<layerName1>",
      "defaultVisibility": <true|false>,
      "parentLayerId": <parentLayerId1>,
      "subLayerIds": [<subLayerId11>, <subLayerId12>]
      "minScale": <minScale1>,
      "maxScale": <maxScale1>
    },
    {
      "id": <layerId2>,
      "name": "<layerName2>",
      "defaultVisibility": <true|false>,
      "parentLayerId": <parentLayerId2>,
      "subLayerIds": [<subLayerId21>, <subLayerId22>]
      "minScale": <minScale1>,
      "maxScale": <maxScale1>
    }
  ],
  "tables": [ //the tables published by this service
    {
      "id": <tableId1>,
      "name": "<tableName1>"
    },
    {
      "id": <tableId2>,
      "name": "<tableName2>"
    }
  ],
  "spatialReference": {<spatialReference>},
  "singleFusedMapCache": <true | false>,
  "tileInfo": {
    "rows": <rows>,
    "cols": <cols>,
    "dpi": <dpi>,
    "format": <format>,
    "compressionQuality": <quality>,
    "origin": {<point>},
    "spatialReference": {<spatialReference>},
    "lods": [
      {
        "level": <level1>,
        "resolution": <resolution1>,
        "scale": <scale1>
      },
      {
        "level": <level2>,
        "resolution": <resolution2>,
        "scale": <scale2>
      }
    ]
  },
  "storageInfo": { //Introduced at 11.1
    "storageFormat": "<esriMapCacheStorageModeExploded | esriMapCacheStorageModeCompact | esriMapCacheStorageModeCompactV2>",
    "packetSize": 128
  },
  "initialExtent": {<envelope>},
  "fullExtent": {<envelope>},
  "datesInUnknownTimezone": <true | false>, //Added at 11.1
  "timeInfo": {  //if the map supports querying and exporting maps based on time
    "timeExtent": [<startTime>, <endTime>],
    "timeReference": {
      "timeZone": "<timeZone>",
      "respectsDaylightSaving": <true | false>
    },
    "timeRelation": "<esriTimeRelationOverlaps | esriTimeRelationOverlapsStartWithinEnd | esriTimeRelationAfterStartOverlapsEnd>",
    "defaultTimeInterval": <time interval>,
    "defaultTimeIntervalUnits": "<esriTimeUnitsCenturies | esriTimeUnitsDays | esriTimeUnitsDecades |
                             esriTimeUnitsHours | esriTimeUnitsMilliseconds | esriTimeUnitsMinutes |
                             esriTimeUnitsMonths | esriTimeUnitsSeconds | esriTimeUnitsWeeks | esriTimeUnitsYears |
                             esriTimeUnitsUnknown>",
    "defaultTimeInterval": <time interval>,
    "defaultTimeWindow": <time window>,
    "hasLiveData": <true | false>,
    "liveModeOffsetDirection": "<pastAndFuture | past | future>"
  },
  "units": "<units>",
  "supportedImageFormatTypes": "<supportedImageFormatTypes>",
  "documentInfo": {
    "<key1>": "<value1>",
    "<key2>": "<value2>"
  },
  "capabilities": "<capabilities>",  //comma separated list of supported capabilities - e.g. "Map,Query,Data"
  "maxRecordCount": <maxRecordCount>,
  "maxImageHeight": <maxImageHeight>,
  "maxImageWidth": <maxImageWidth>,
  "minScale": <minimum map scale>,
  "maxScale": <maximum map scale>,
  "tileServers": ["<tileServerUrl1>","<tileServerUrl2>","<tileServerUrl2>"],
  "supportedQueryFormats": "<query output formats>",
  "exportTilesAllowed": <true | false>,
  "maxExportTilesCount: <export tiles limit>,
  "supportedExtensions": "<FeatureServer,KmlServer,MobileServer,WCSServer,WFSServer,WMSServer,NAServer,SchematicsServer>",
  "resampling": <true | false>
}
```

### Example two

The following example demonstrates the response when requesting updated information from the service:



```
{
  "timeExtent": [
    <startTime>,
    <endTime>
  ],
  "fullExtent": {
    "xmin": <xmin>,
    "ymin": <ymin>,
    "xmax": <xmax>,
    "ymax": <ymax>,
    "spatialReference": <spatialReference>
  }
}
```

### Example three

The following example demonstrates the response when requesting footprint for a service:



```
{
  {
    "featureCollection": {
      "layers": [
        {
          "layerDefinition": {
            "type": "Feature Layer",
            "geometryType": "esriGeometryPoint",
            "extent": {
              <envelope>
            },
            "objectIdField": "id",
            "displayFieldName": "<displayFieldName>",
            "drawingInfo": {
              "renderer": {
                "type": "simple",
                "label": "<label>",
                "description": "",
                "symbol": {
                  "height": 24,
                  "xoffset": 0,
                  "yoffset": 0,
                  "width": 24,
                  "contentType": "image/png",
                  "type": "esriPMS",
                  "imageData": "<imageData>",
                  "url": "<imageUrl>"
                }
              }
            },
            "fields": [
              {
                "name": "id",
                "alias": "ID",
                "type": "esriFieldTypeOID"
              },
              {
                "name": "title",
                "alias": "Title",
                "type": "esriFieldTypeString"
              },
              {
                "name": "summary",
                "alias": "Summary",
                "type": "esriFieldTypeString"
              },
              {
                "name": "description",
                "alias": "Description",
                "type": "esriFieldTypeString"
              },
              {
                "name": "tags",
                "alias": "Tags",
                "type": "esriFieldTypeString"
              },
              {
                "name": "type",
                "alias": "Type",
                "type": "esriFieldTypeString"
              },
              {
                "name": "thumbnail",
                "alias": "Thumbnail",
                "type": "esriFieldTypeString"
              },
              {
                "name": "xmin",
                "alias": "xmin",
                "type": "esriFieldTypeDouble"
              },
              {
                "name": "ymin",
                "alias": "ymin",
                "type": "esriFieldTypeDouble"
              },
              {
                "name": "xmax",
                "alias": "xmax",
                "type": "esriFieldTypeDouble"
              },
              {
                "name": "ymax",
                "alias": "ymax",
                "type": "esriFieldTypeDouble"
              },
              {
                "name": "accessInformation",
                "alias": "Access Information",
                "type": "esriFieldTypeString"
              },
              {
                "name": "licenseInfo",
                "alias": "License Information",
                "type": "esriFieldTypeString"
              },
              {
                "name": "credits",
                "alias": "Credits",
                "type": "esriFieldTypeString"
              },
              {
                "name": "link",
                "alias": "Link",
                "type": "esriFieldTypeString"
              },
              {
                "name": "arcgisJslink",
                "alias": "ArcgisJsLink",
                "type": "esriFieldTypeString"
              }
            ]
          },
          "featureSet": {
            "geometryType": "esriGeometryPoint",
            "spatialReference": {
              "wkid": <wkid>
            },
            "features": [
              {
                "geometry": {
                  <point>
                },
                "attributes": {
                  "id": 1,
                  "title": "<title>",
                  "summary": "<summary>",
                  "description": "<description>",
                  "tags": "[\"<tag1>\,\"<tag2>\"]",
                  "type": "MapServer",
                  "thumbnail": "<thumbnailUrl>",
                  "xmin": <xmin>,
                  "ymin": <ymin>,
                  "xmax": <xmax>,
                  "ymax": <ymax>,
                  "accessInformation": "<accessInformation>",
                  "licenseInfo": "<licenseInfo>",
                  "credits": "<credits>",
                  "link": "<serviceResourceLink>",
                  "arcgisJslink": "<View in JSAPI Link>"
                }
              }
            ]
          },
          "popupInfo": {
            "title": "{title} ({type})",
            "fieldInfos": [
              {
                "fieldName": "id",
                "label": "ID",
                "visible": false
              },
              {
                "fieldName": "title",
                "label": "Title",
                "visible": true
              },
              {
                "fieldName": "summary",
                "label": "Summary",
                "visible": true
              },
              {
                "fieldName": "description",
                "label": "Description",
                "visible": true
              },
              {
                "fieldName": "tags",
                "label": "Tags",
                "visible": true
              },
              {
                "fieldName": "type",
                "label": "Type",
                "visible": true
              },
              {
                "fieldName": "thumbnail",
                "label": "Thumbnail",
                "visible": false
              },
              {
                "fieldName": "xmin",
                "label": "xmin",
                "format": {
                  "places": 2,
                  "digitSeparator": false
                },
                "visible": false
              },
              {
                "fieldName": "ymin",
                "label": "ymin",
                "format": {
                  "places": 2,
                  "digitSeparator": false
                },
                "visible": false
              },
              {
                "fieldName": "xmax",
                "label": "xmax",
                "format": {
                  "places": 2,
                  "digitSeparator": false
                },
                "visible": false
              },
              {
                "fieldName": "ymax",
                "label": "ymax",
                "format": {
                  "places": 2,
                  "digitSeparator": false
                },
                "visible": false
              },
              {
                "fieldName": "accessInformation",
                "label": "Access Information",
                "visible": true
              },
              {
                "fieldName": "licenseInfo",
                "label": "License Information",
                "visible": true
              },
              {
                "fieldName": "credits",
                "label": "Credits",
                "visible": true
              },
              {
                "fieldName": "link",
                "label": "Link",
                "visible": true
              }
            ],
            "description": null,
            "showAttachments": false,
            "mediaInfos": [
              {
                "type": "image",
                "caption": "Initial Extent: [{xmin}, {ymin}] - [{xmax}, {ymax}]",
                "value": {
                  "sourceURL": "{thumbnail}",
                  "linkURL": "{arcgisJslink}"
                }
              }
            ]
          }
        }
      ]
    }
  }
}
```

## JSON Response examples

### Example one



```
{
  "currentVersion": 11.1,
  "cimVersion": "3.1.0",
  "serviceDescription": "Test Map Service Description",
  "mapName": "Street Map Pro Data",
  "description": "Street Map USA",
  "copyrightText": "ESRI",
  "supportsDynamicLayers": false,
  "layers": [
    {
      "id": 0,
      "name": "Cities",
      "parentLayerId": -1,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPoint",
      "supportsDynamicLegends": true
    },
    {
      "id": 1,
      "name": "States",
      "parentLayerId": -1,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolygon",
      "supportsDynamicLegends": true
    },
    {
      "id": 2,
      "name": "Counties",
      "parentLayerId": -1,
      "defaultVisibility": false,
      "subLayerIds": [
        3,
        4
      ],
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolygon",
      "supportsDynamicLegends": true
    },
    {
      "id": 3,
      "name": "Large Counties",
      "parentLayerId": 2,
      "defaultVisibility": false,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolygon",
      "supportsDynamicLegends": true
    },
    {
      "id": 4,
      "name": "Small Counties",
      "parentLayerId": 2,
      "defaultVisibility": false,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolygon",
      "supportsDynamicLegends": true
    }
  ],
  "tables": [],
  "spatialReference": {
    "wkid": 4326
  },
  "singleFusedMapCache": true,
  "tileInfo": {
    "rows": 512,
    "cols": 512,
    "dpi": 96,
    "format": "JPEG",
    "compressionQuality": 75,
    "origin": {
      "x": -130,
      "y": 50
    },
    "spatialReference": {
      "wkid": 4326
    },
    "lods": [
      {
        "level": 0,
        "resolution": 8.46,
        "scale": 32000
      },
      {
        "level": 1,
        "resolution": 4.23,
        "scale": 16000
      },
      {
        "level": 2,
        "resolution": 2.11,
        "scale": 8000
      },
      {
        "level": 3,
        "resolution": 1.05,
        "scale": 4000
      },
      {
        "level": 4,
        "resolution": 0.52,
        "scale": 2000
      }
    ]
  },
  "storageInfo": {
    "storageFormat": "esriMapCacheStorageModeCompact",
    "packetSize": 128
  },
  "initialExtent": {
    "xmin": -109.55,
    "ymin": 25.76,
    "xmax": -86.39,
    "ymax": 49.94,
    "spatialReference": {
      "wkid": 4326
    }
  },
  "fullExtent": {
    "xmin": -130,
    "ymin": 24,
    "xmax": -65,
    "ymax": 50,
    "spatialReference": {
      "wkid": 4326
    }
  },
  "datesInUnknownTimezone": false,
  "minScale": 0,
  "maxScale": 0,
  "units": "esriDecimalDegrees",
  "supportedImageFormatTypes": "PNG32,PNG24,PNG,JPG,DIB,TIFF,EMF,PS,PDF,GIF,SVG,SVGZ",
  "documentInfo": {
    "Title": "StreetMap USA.mxd",
    "Author": "ESRI Data Team",
    "Comments": "ESRI Data and Maps 2004",
    "Subject": "Street level data for the US",
    "Category": "vector",
    "Version": "3.0.0",
    "AntialiasingMode": "Fast",
    "TextAntialiasingMode": "Force",
    "Keywords": "StreetMap USA"
  },
  "capabilities": "Map,Query,Data",
  "supportedQueryFormats": "JSON, geoJSON, PBF",
  "exportTilesAllowed": true,
  "tileServers": ["https://myserver/arcgis/rest/services/basemap/MapServer","https://myserver2/arcgis/rest/services/basemap/MapServer"],
  "maxExportTilesCount": 100000,
  "mapUnits": {"uwkid": 9102},
  "maxRecordCount": 1000,
  "maxImageHeight": 2048,
  "maxImageWidth": 2048,
  "supportedExtensions": "FeatureServer,KmlServer,MobileServer,WCSServer,WFSServer,WMSServer,NAServer,SchematicsServer"
}
```

### Example two

The following example demonstrates the response when requesting updated information from the service:



```
{
  "timeExtent": [
    1230768000000, 1243814400000
  ],
  "fullExtent": {
    "xmin": -178.21759836192689,
    "ymin": 18.924781799107389,
    "xmax": -66.969271035924393,
    "ymax": 71.406235352841463,
    "spatialReference": {
      "wkid": 4269,
      "latestWkid": 4269
    }
  }
}
```

### Example three

The following example demonstrates the response when requesting footprint for a service:



```
{
  "featureCollection": {
    "layers": [
      {
        "layerDefinition":{
          "type":"Feature Layer",
          "geometryType":"esriGeometryPoint",
          "extent":{"xmin":-4254455.8606807785,"ymin":-1273247.593581636,"xmax":-3967497.083911836,"ymax":-1127922.6881048125,"spatialReference":{"wkid":102100}},
          "objectIdField":"id",
          "displayFieldName":"Maps/BrazilMapServer",
          "drawingInfo": {
            "renderer": {
              "type":"simple",
              "label":"Maps/Brazil",
              "description":"",
              "symbol": {
                "height":24,
                "xoffset":0,
                "yoffset":0,
                "width":24,
                "contentType":"image/png",
                "type":"esriPMS",
                "imageData":"iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABGdBTUEAALGPC/...=",
                "url":"https://sampleserver/arcgis/rest/static/images/BlueShinyPin.png"
              }
            }
          },
          "fields": [
            {
              "name": "id",
              "alias": "ID",
              "type": "esriFieldTypeOID"
            },
            {
              "name": "title",
              "alias": "Title",
              "type": "esriFieldTypeString"
            },
            {
              "name": "summary",
              "alias": "Summary",
              "type": "esriFieldTypeString"
            },
            {
              "name": "description",
              "alias": "Description",
              "type": "esriFieldTypeString"
            },
            {
              "name": "tags",
              "alias": "Tags",
              "type": "esriFieldTypeString"
            },
            {
              "name": "type",
              "alias": "Type",
              "type": "esriFieldTypeString"
            },
            {
              "name": "thumbnail",
              "alias": "Thumbnail",
              "type": "esriFieldTypeString"
            },
            {
              "name": "xmin",
              "alias": "xmin",
              "type": "esriFieldTypeDouble"
            },
            {
              "name": "ymin",
              "alias": "ymin",
              "type": "esriFieldTypeDouble"
            },
            {
              "name": "xmax",
              "alias": "xmax",
              "type": "esriFieldTypeDouble"
            },
            {
              "name": "ymax",
              "alias": "ymax",
              "type": "esriFieldTypeDouble"
            },
            {
              "name": "accessInformation",
              "alias": "Access Information",
              "type": "esriFieldTypeString"
            },
            {
              "name": "licenseInfo",
              "alias": "License Information",
              "type": "esriFieldTypeString"
            },
            {
              "name": "credits",
              "alias": "Credits",
              "type": "esriFieldTypeString"
            },
            {
              "name": "link",
              "alias": "Link",
              "type": "esriFieldTypeString"
            },
            {
              "name": "arcgisJslink",
              "alias": "ArcgisJsLink",
              "type": "esriFieldTypeString"
            }
          ]
        },
        "featureSet": {
          "geometryType":"esriGeometryPoint",
          "spatialReference": {
            "wkid":102100
          },
          "features": [
            {
              "geometry": {
                "x": -4110976.4722963073,
                "y": -1200585.1408432242
              },
              "attributes": {
                "id": 1,
                "title": "Maps/Brazil",
                "summary": "",
                "description": "",
                "tags": "[\"Brazil\"]",
                "type": "MapServer",
                "thumbnail": "https://sampleserver/arcgis/rest/services/Maps/Brazil/MapServer/info/thumbnail",
                "xmin": -4254455.8606807785,
                "ymin": -1273247.593581636,
                "xmax": -3967497.083911836,
                "ymax": -1127922.6881048125,
                "accessInformation": "",
                "licenseInfo": "",
                "credits": "",
                "link": "https://sampleserver/arcgis/rest/services/Maps/Brazil/MapServer",
                "arcgisJslink": "https://sampleserver/arcgis/rest/services/Maps/Brazil/MapServer?f=jsapi"
              }
            }
          ]
        },
        "popupInfo": {
          "title": "{title} ({type})",
          "fieldInfos": [
            {
              "fieldName": "id",
              "label": "ID",
              "visible": false
            },
            {
              "fieldName": "title",
              "label": "Title",
              "visible": true
            },
            {
              "fieldName": "summary",
              "label": "Summary",
              "visible": true
            },
            {
              "fieldName": "description",
              "label": "Description",
              "visible": true
            },
            {
              "fieldName": "tags",
              "label": "Tags",
              "visible": true
            },
            {
              "fieldName": "type",
              "label": "Type",
              "visible": true
            },
            {
              "fieldName": "thumbnail",
              "label": "Thumbnail",
              "visible": false
            },
            {
              "fieldName": "xmin",
              "label": "xmin",
              "format": {
                "places": 2,
                "digitSeparator":  false
              },
              "visible": false
            },
            {
              "fieldName": "ymin",
              "label": "ymin",
              "format": {
                "places": 2,
                "digitSeparator":  false
              },
              "visible": false
            },
            {
              "fieldName": "xmax",
              "label": "xmax",
              "format": {
                "places": 2,
                "digitSeparator":  false
              },
              "visible": false
            },
            {
              "fieldName": "ymax",
              "label": "ymax",
              "format": {
                "places": 2,
                "digitSeparator":  false
              },
              "visible": false
            },
            {
              "fieldName": "accessInformation",
              "label": "Access Information",
              "visible": true
            },
            {
              "fieldName": "licenseInfo",
              "label": "License Information",
              "visible": true
            },
            {
              "fieldName": "credits",
              "label": "Credits",
              "visible": true
            },
            {
              "fieldName": "link",
              "label": "Link",
              "visible": true
            }
          ],
          "description": null,
          "showAttachments": false,
          "mediaInfos": [
            {
              "type": "image",
              "caption": "Initial Extent: [{xmin}, {ymin}] - [{xmax}, {ymax}]",
              "value": {
                "sourceURL": "{thumbnail}",
                "linkURL": "{arcgisJslink}"
              }
            }
          ]
        }
      }
    ]
  }
}
```