# ExportWebMap specification

> Source: [/rest/services-reference/enterprise/exportwebmap-specification/](https://developers.arcgis.com/rest/services-reference/enterprise/exportwebmap-specification/)

When you attempt to print a map using the `PrintingTools` geoprocessing service included with ArcGIS Server, you must provide a JavaScript Object Notation (JSON) representation of the map, including its layer and extent information. The JSON must be structured according to the Esri `ExportWebMap` specification.

When you use the ArcGIS Web APIs, you don't need to worry about constructing the JSON; the APIs take care of it for you. However, this topic is included for reference in case you ever need to construct the JSON yourself. This might happen if you need to call the `PrintingTools` service directly or run its source geoprocessing tool Export Web Map from another application.

## New at 12.0

-   A featureCollection table, containing only a single table, can be used as the source for a report template and for dynamic text elements on a layout template.

## New at ArcGIS Enterprise 11.4

The `legendOptions` provides option to turn off or on dynamic legend capability. It is available at operation-layer level allowing each layer be opted in or out of dynamic legend capability. This capability makes a legend element only to show legend patches for visible features in the current extent when true. Otherwise, it includes all legend patches from the layer's renderer.

## New at 11.3

-   A table element inside `layoutOptions` provides option to alter row order using one or more fields, or which fields to show. Or limit how many row you want to see. For this use `orderByFields` and `rowCount` respectively.
-   A featureCollection layer, containing only a single layer, can be used as the source for a report template.

## New at 11.2

-   You can have attributes printed out in two forms:
    -   Layout templates with dynamic text elements
    -   Report templates
-   Added support to work with dynamic text element, table frame element and chart frame element in a layout. You need to use `elementOverrides` inside `layoutOptions` for that. Notes: You can use a print service `Get Layout Templates Info` task to find out if a layout template has any of these types of elements.
-   A new task can be added to your print service named `Get Report Templates Info` to retrieve elements inside report templates that can be overridden at run time.
-   To support overriding report template elements, a new element `reportOptions` at the top level of Export Web Map specifications.

## New at 11.1

-   Both `Export Web Map` and `Get Layout Templates Info` tasks are enhanced with a `Layout_Item_ID` parameter. This allows you to pass in the id of a portal item of layout type. Thus eliminate the need to republish your print service when a new layout template is needed.
    -   the item must be in the same portal where the server, print service running off, is federated with.
-   Added a new property, `layerType`, for `operationalLayer`. The `layerType` property specifies the layer type.

## New at 11.0

-   Added support to turn visibility on or off for a north arrow element in a layout. You need to use `elementOverrides` inside `layoutOptions` for that. Note: You can use a print service `GetLayoutTemplateInfos` task to find out if a layout template has a north arrow.

The web map is made of five top-level objects:



```
{
  "mapOptions": {},
  "operationalLayers": [],
  "baseMap": [],
  "exportOptions": {},
  "layoutOptions": {},
  "reportOptions": {}
}
```

## mapOptions

The object `mapOptions` is required and defines map display properties.

| Syntax: | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 "mapOptions": { "extent": { "xmin": <xmin>, "ymin": <ymin>, "xmax": <xmax>, "ymax": <ymax>, "spatialReference": {<spatialReference>} }, "scale": <mapScale>, "rotation": <mapRotation>, "spatialReference": {<spatialReference>}, "time": [ <timeInstant> \| <startTime>,<endTime> ], "background": { "color": [R, G, B, A] } } |  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 "mapOptions": { "extent": { "xmin": -12933906.537, "ymin": 3993856.886, "xmax": -12933371.998, "ymax": 3994375.189, "spatialReference": { "wkid": 102100 } }, "scale": 1234.5, "rotation": -45, "spatialReference": { "wkid": 102100 }, "time": [ 1199145600000, 1230768000000 ], "background": { "color": [51, 227, 200, 255] } } |
| Description |
| extent (required): A required property that defines the extent of the map. The spatial reference of the extent object is optional; when it is not provided, it is assumed to be in the map's spatial reference. When the aspect ratio of the map extent is different than the size of the map on the output page or the exportOptions:outputSize , you might notice more features on the output map.scale (optional): The map scale at which you want your map to be exported. This property is optional but recommended for getting optimal results. The scale property is especially useful when map services in this web map have scale-dependent layers or reference scales set. Since the map that you are viewing on the web app may be smaller than the size of the output map (for example, 8.5 x 11 in. or A4 size), the scale of the output map will be different and you could see differences in features and/or symbols in the web application as compared with the output map.When scale is used, it takes precedence over the extent, but the output map is drawn at the requested scale centered on the center of the extent.rotation (optional): This represents the number of degrees by which the data frame will be rotated, measured counterclockwise from the north. To rotate clockwise, use a negative value.spatialReference (optional): The spatial reference of the map. The order of preference when spatialReference is missing is as follows:mapOptions.extent.spatialReferencebaseMap.baseMapLayers.spatialReferenceMap template's spatial referencetime (optional): If there is a time-aware layer and you want it to be drawn at a specified time, specify this property. This order list can have one or two elements. Add two elements (startTime followed by endTime ) to represent a time extent, or provide only one time element to represent a time instant. Times are always in UTC.background (optional): You can change the map's background color. When there are more than one maps in a layout, this is applied to the map associated to a map frame named WEBMAP_MAP_FRAME . |

## operationalLayers

The `operationalLayers` list contains all the operational layers to be displayed in the map. The order of the array defines the order of the layers in the map. The type of each layer is defined by the URL resource response. If the resource cannot be determined from the URL, the type property defines the type. For example, a WMS layer requires that you specify `"type": "wms"` . There are some properties common to all types of operational layers, while others are specific to each type of operational layer.

In case of secured layers, specify the token in a layer definition. A user name and password are not supported as part of the URL. Services that are secured using OAuth2 authentication is not supported.

| Syntax for operational layers |
|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 "operationalLayers": [ { "id": "<webmapOperationalLayerId>", "layerType": "<ArcGISFeatureLayer \| ArcGISImageServiceLayer \| ArcGISMapServiceLayer \| ArcGISTiledImageServiceLayer \| ArcGISTiledMapServiceLayer \| VectorTileLayer \| WebTiledLayer \| WFS \| WMS \| KML>", "url": "<url1>", "token": "<tokenString1>", "title": "<title1>", "opacity": <opacity1>, "visibility": <true \| false>, "minScale": <minScale1>, "maxScale": <maxScale1> } ] |
| Description |
| id (optional): A string uniquely identifying an operational layer. This is needed mostly for legends.layerType : The operational layer type. This can be specified as either ArcGISFeatureLayer , ArcGISImageServiceLayer , ArcGISMapServiceLayer , ArcGISTiledImageServiceLayer , ArcGISTiledMapServiceLayer , VectorTileLayer , WebTiledLayer , WMS , or KML .url : The end point of a service. It is not needed for "featureCollection" .token (optional): A token to access a secured service.title (optional): Name of an operational layer. If it shows up on the legend, the legend on the layout should support that.visibility (optional): The default value is true .opacity (optional): Value ranges from 0 to 1 (default), with 1 meaning completely opaque and 0 meaning fully transparent.minScale (optional): Layer does not draw when zoomed out beyond this scale.maxScale (optional): Layer does not draw when zoomed in beyond this scale. |

| Syntax for a map service layer | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 "operationalLayers": [ { "url": "<url1>", "title": "<title1>", "opacity": <opacity2>, "gdbVersion": "<gdbVersion>", "visibleLayers": [ <layerId1>, <layerId2> ], "layers": [ { "id": <sublayerId1>, "name": <name>, "layerDefinition": { "definitionExpression": "<definitionExpression>", "layerTimeOptions": { "useTime": <true \| false>, "timeDataCumulative": <true \| false>, "timeOffset": <timeOffset1>, "timeOffsetUnits": "<esriTimeUnits>" }, "drawingInfo": { "renderer": {<renderer>}, "transparency": <transparency>, "scaleSymbols": <true \| false>, "showLabels": <true \| false>, "labelingInfo": {<labelingInfo>}, }, "source": {<layerSource>}, "gdbVersion": "<Geodatabase version name>" } } ] } ] |  2 3 4 5 6 7 8 9 10 11 "operationalLayers": [ { "url": "https://servicesbeta.esri.com/ArcGIS/rest/services/HomelandSecurity/operations/MapServer", "title": "Homeland security operations", "opacity": 0.8, "visibleLayers": [ 0, 1 ] } ] |
| Description |
| visibleLayers (optional): Array of sublayer IDs that should be made visible within the map service layer. If this is omitted, the operational layer is drawn with the default visible states of each sublayer. You don't need to specify group layer's Id. Note that if a map service supports dynamic layers, then layers takes precedence over visibleLayers . For map services that don't use dynamicLayers , only layerDefinition in the layers property is supported.layers (optional): List of layers to be exported. In case of map services that use dynamic layers, all the layers specified in the layers array are exported, while visibleLayers are ignored. Use the name property to define a name for a layer. This is typically needed when the layer source type is dataLayer .drawingInfo (optional): Use this to override a sublayer's drawing settings, for example, the sublayer's renderer.renderer (optional): When specified, this overrides the sublayer's original renderer.source (optional): Represents the source of a layer that gets added to the map service dynamically per request. See the ArcGIS REST API for more information on how to define source.gdbVersion (optional): Specify this if you want to see features drawn from a different geodatabase version. You can define this at an operational layer level in order to switch all layers to the specified version, or define as a sublayer in a layers array to change the geodatabase version for any individual layer.credits (optional): Specify copyright attributions. |

| Syntax for a feature layer | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 "operationalLayers": [ { "url": "<url1>", "title": "<title1>", "opacity": <opacity2>, "layerDefinition": { "drawingInfo": { "renderer": {<renderer1>} }, "definitionExpression": "<definitionExpression1>", "objectIds": [ <oid1>, <oid2> ], "timeInfo": { //optional "trackIdField": "<trackIdFieldName>" }, "geometry": {<geometry>}, "geometryType": "<geometryType>", "spatialRel": "<spatialRel>", "relationParam": "<relationParam>", "gdbVersion": "<geodatabaseVersionName>", "source": {<layerSource>} }, "selectionObjectIds": [ <oid1>, <oid2> ], "selectionSymbol": {<symbol>}, "charts": [ { ... } ] //definition of charts } ] |  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 "operationalLayers": [ { "url": "https://servicesbeta.esri.com/ArcGIS/rest/services/Hydrography/Watershed173811/FeatureServer/1", "title": "Watershed", "opacity": 1, "layerDefinition": { "drawingInfo": { "renderer": {<renderer>} }, "definitionExpression": "Type = 1", "objectIds": [ 534, 434 ] }, "selectionObjectIds": [ 434 ], "selectionSymbol": {<symbol>} } ] |
| Description |
| url (required): The layer's URL. This property should end with /dynamicLayer when a feature layer is based on a layer from a map service that uses dynamic layers.drawingInfo (optional): Specifies the renderer for this layer.To render using a temporal renderer, specify the latestObservationRenderer , trackLinesRenderer , and observationAger properties apart from the renderer.observationAger (optional): The temporal renderer supports two types of observationAger : rampAger and classBreaksAger . For any given request, a layer can contain either a rampAger or a classBreaksAger , but not both.definitionExpression (optional): An SQL statement that restricts which features will be drawn.objectIds (optional): Restricts which features are drawn, based on object IDs.timeInfo (optional):trackIdField : The field that uniquely represents a given object or objects being observed. If this field is null or missing, then only the latest observation is drawn, using the latestObservationRenderer .geometry (optional): Restricts features to be drawn by a geometry.geometryType (optional): This is required when a geometry is specified.spatialRel (optional): The spatial relationship to be applied on the input geometry while performing the query.relationParam (optional): The spatial relate function that can be applied while performing the query. An example for this spatial relate function is FFFTTT*** .selectionObjectIds (optional): Highlights the features with the given object IDs with the provided symbol; selectionSymbol must be set.selectionSymbol (optional): Features are highlighted with this symbol. This is required when selectionObjectIds is specified.charts (optional): An operational layer can have no charts, or 1 or more charts. Please see web map specifications for chart element.gdbVersion (optional): Specifies a geodatabase version name if you use a version other than the one referred to by the map or feature service.source (optional): This is only required when a feature layer is based off a map service that uses dynamic layers.credits (optional): Specify copyright attributions. |

| Syntax for an image service layer | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 "operationalLayers": [ { "url": "<url1>", "title": "<title1>", "opacity": <opacity2>, "noData": <noDataValue>, "format": "<jpgpng \| png \| png8 \| png24 \| png32 \| jpg \| bmp \| gif \| tiff >", "interpolation": "<RSP_BilinearInterpolation \| RSP_CubicConvolution \| RSP_Majority \| RSP_NearestNeighbor>", "compressionQuality": <compress>, "bandIds": [ <bandId1>, <bandId2> ], "mosaicRule": "<mosaicRule>", "renderingRule": "<renderingRule>", "noDataInterpretation": "<esriNoDataMatchAny \| esriNoDataMatchAll>" } ] |  2 3 4 5 6 7 8 9 10 11 12 "operationalLayers": [ { "url": "https://ais3/ArcGIS/rest/services/QB16/ImageServer", "title": "Satellite image from 1990", "opacity": 0.8, "bandIds": [ 0, 1, 2 ] } ] |
| Description |
|  |

| Syntax for a WMS service layer |
|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 "operationalLayers": [ { "url": "<url1>", "title": "<title1>", "type": "wms", "opacity": <opacity1>, "version": "<wmsServerVersion>", "format": "<jpg \| png8 \| png24 \| png32>", "transparentBackground": <true \| false>, "layers": [ {"name": "<layerName1>"}, {"name": "<layerName2>"} ], "visibleLayers": [ "<layerName1>", "<layerName2>" ], "styles": [ "<style1>", "<style2>" ] } ] |
| Description |
| type (required): For WMS layers, this must be specified as wms .format (optional): The requested image format from the server.transparentBackground (optional): When true , the background becomes transparent provided that the requested image format supports a transparent color. (JPEG is an example of an image format that does not support a transparent color.) The default value is false .visibleLayers (optional): Array of sublayer names that should be made visible within the WMS service layer. The order is important too; the order must conform to the requirements of the WMS service. When not provided, all layers of the WMS service will be made visible.layers (optional): Array of sublayer names to add to the map. If not provided, all layers of a WMS service will be added to the map.styles (optional): Use this to override a sublayer's default drawing style. When it is specified, make sure the number and order of styles match the visibleLayers array. When it is not desired to change the style for one particular sublayer, you can pass in an empty string, for example, "styles": ["highways","","population"] .version (optional): The WMS version to which you want to connect. The default is the latest version supported by the given WMS service. |

| Syntax for a KML layer | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 "operationalLayers": [ { "type": "kml", "url": "<url1>", "title": "<title1>", "showLabels": "<true \| false>", "visibleFolders": [ <folderId1>, <folderId2> ] } ] |  2 3 4 5 6 7 8 9 10 11 12 13 14 "operationalLayers": [ { "type": "kml", "url": "https://myMachine/.../vermont.kmz", "title": "Vermont weather stations", "opacity": 0.75, "showLabels": true, "visibleFolders": [ 0, 1, 2 ] } ] |
| Description |
| type (required): For this kind of layer, the type must be kml .url (required): URL to a kmz file.showLabels (optional): By default it is false .visibleFolders : Array of numeric IDs of folders that will be made visible. |

| Syntax for a client-side image | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 "operationalLayers": [ { "type": "image", "title": "<title1>", "opacity": <opacity2>, "extent": { "xmin": <xmin>, "ymin": <ymin>, "xmax": <xmax>, "ymax": <ymax>, "spatialReference": {<spatialReference>} }, "url": "<url1>", "imageData": "<base64EncodedImageData>" } ] |  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 "operationalLayers": [ { "type": "image", "title": "heat map", "opacity": 0.75, "extent": { "xmin": -12933906.537, "ymin": 3993856.886, "xmax": -12933371.998, "ymax": 3994375.189, "spatialReference": { "wkid": 102100 } }, "url": "https://myMachine/anImage.png", "imageData": "iVBORw0KGg....", } ] |
| Description |
| type (required): For this kind of layer, the type must be image .extent (required): The minimum bounding box in which the image fits.url (optional): URL to an image that you want to draw. This is only required when imageData is not passed in.imageData (optional): The image encoded as base64. This is required when the url property is not passed in. |

| Syntax for client side graphics | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 "operationalLayers": [ { "featureCollection": { "layers": [ { "layerDefinition": { "name": "<layerName>", "type": "Feature Layer \| Table", //optionl - when omitted, the layer is assumed as 'feature layer' "geometryType": "<esriGeometryType>", //required when the 'type' is 'feature layer' "drawingInfo": {<drawingInfo>}, //required when the 'type' is 'feature layer' "objectIdField": "<objectIdFieldName>", //optional "fields": [ //optional { "name": "<fieldName>", "type": "<esriFieldType>", "alias": "<fieldAliasName>" } ] }, "featureSet": { "features": [ { "geometry": {<geometry>}, //required when the 'type' is 'feature layer' "attributes": { //optional "<fieldName>": "<value>" }, "symbol": {<symbol>} //overrides symbol defined in the renderer } ] } } ] } } ] |  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 "operationalLayers": [ { "id": "map_graphics", "featureCollection": { "layers": [ { //a feature layer "layerDefinition": { "name": "pointLayer", "type": "Feature Layer", "geometryType": "esriGeometryPoint", "drawingInfo": { "renderer": { "type": "simple", "symbol": { "type": "esriSMS", "style": "esriSMSCircle", "color": [ 76, 115, 0, 255 ], "size": 20, "outline": { "color": [ 255, 0, 0, 255 ], "width": 1 } } } } }, "featureSet": { "features": [ { "geometry": { "x": -10253568.722284, "y": 5463514.62565701, "spatialReference": { "wkid": 102100 } } }, { "geometry": { "x": -13267022.125398, "y": 5463514.62565701, "spatialReference": { "wkid": 102100 } }, "symbol": { "color": [ 255, 138, 255, 191 ], "size": 12, "type": "esriSMS", "style": "esriSMSSquare" } } ] } }, { //a table "layerDefinition": { "name": "inspection" "type": "Table", "fields": [ { "alias": "OBJECTID", "editable": false, "name": "OBJECTID", "nullable": false, "type": "esriFieldTypeOID" }, { "alias": "Name", "editable": true, "length": 255, "name": "NAME", "nullable": true, "type": "esriFieldTypeString" }, { "alias": "Description", "editable": true, "length": 255, "name": "DESC_", "nullable": true, "type": "esriFieldTypeString" } ] }, "featureSet": { "features": [ { "attributes": { "OBJECTID": 1, "NAME": "John Doe", "DESC_": "Passed" } }, { "attributes": { "OBJECTID": 1, "NAME": "Jane Doe", "DESC_": "Failed" } } ] } } ] } } ] |
| Description |
| layers (required): Collection of layers and tables. A layer or table has two properties: layerDefinition and featureSet .layerDefinition (required): Contains properties that define a layer: name, type, geometryType, drawingInfo, objectIdField, and fields.name (optional): Name of the layer or table.type (optional): Type determines if this is a layer or table. When not specified, it is assumed to be a feature layer.geometryType (optional): It must be providee for feature layer. For a text layer, the geometryType must be esriGeometryPoint.drawingInfo (optional): If drawingInfo is missing, then graphics are symbolized using symbol.objectIdField (optional): Name of the field that contains object IDs.fields (optional): Collection of fields.featureSet (required): Feature container.features (required): Collection of features.geometry (optional): Geometry that defines the feature or graphic. Only required for feature layer.attributes (optional): Collection of feature attributes.symbol (optional): If specified, this symbol overrides the one defined in the renderer. |

| Syntax for Comma-Separated Values (CSV) file by URL | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 "operationalLayers": [ { { "type": "CSV", "url": "<url>", "layerDefinition": { "drawingInfo": { "renderer": {<renderer>} } }, "locationInfo": { "latitudeFieldName": "<latitudeFieldName>", "longitudeFieldName": "<longitudeFieldName>" } } } ] |  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 "operationalLayers": [ { "type": "CSV", "url": "https://servicesbeta.esri.com/demos/exp/data/earthquakes.csv", "id": "Earthquakes", "title": "Earthquakes", "visibility": true, "opacity": 1, "layerDefinition": { "drawingInfo": { "renderer": { "symbol": { "height": 15, "type": "esriPMS", "url": "https://static.arcgis.com/images/Symbols/Basic/RedSphere.png", "width": 15 }, "type": "simple" }, "transparency": 0 } }, "locationInfo": { "latitudeFieldName": "lat", "longitudeFieldName": "lon" } } ] |
| Description |
| latitudeFieldName (required): The name of the field that contains the Y coordinate.longitudeFieldName (required): The name of the field that contains the X coordinate. |

### Other properties

| Syntax to define for a temporal renderer | Example |
|---|---|
|  2 3 4 5 6 "drawingInfo": { "observationAger": {<symbolAger>}, "latestObservationRenderer": {<renderer>}, "trackLinesRenderer": {<renderer>}, "renderer": {<renderer>} } |  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 "drawingInfo": { "observationAger": { "alphaRange": [ 0, 255 ] }, "latestObservationRenderer": { "type": "simple", "symbol": { "type": "esriPMS", "url": "https://help.arcgis.com/.../hurr_100_icon.png", "contentType": "image/png", "width": 30, "height": 30 } }, "trackLinesRenderer": { "type": "simple", "symbol": { "type": "esriSLS", "style": "esriSLSSolid", "width": 1, "color": [ 0, 0, 0, 255 ] } }, "renderer": { "type": "simple", "symbol": { "type": "esriSMS", "style": "esriSMSCircle", "size": 24, "outline": { "color": [ 255, 255, 255, 255 ], "width": 1 } } } } |
| Syntax to define a symbolAger |
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 //rampAger { "colorRange": [ {<color>}, //for oldest events {<color>} //for newest events ], "alphaRange": [ <alpha>, //for oldest events <alpha> //for newest events ], "sizeRange": [ <size>, //for oldest events <size> //for newest events ] } //classBreaksAger { "timeUnits": "<esriTimeUnits>", "agerClassBreakInfos": [{<agerClassBreakInfo>},...] } |
| Syntax to define an agerClassBreakInfo |
|  { "oldestAge": <age>, "color": {<color>}, "alpha": <alpha>, "size": <size> } |
| Description |
| The temporal renderer is only supported by feature layers, not by client-side graphics layers or dynamic map service layers.Alpha is an integer value that ranges from 0 to 255. |

## Geoprocessing result

There are two ways a geoprocessing result can be included:

1.  When a geoprocessing result comes back as a feature set and is drawn as graphics on the client side, send the result as a feature collection.
    
2.  When the result is drawn by a job's result map service, add a new map service layer in `operationalLayers` and set the URL property to point to the endpoint of the result. For example:
    
    -   Geoprocessing result from 10.1 or later version: `https://organization.example.com/<context>/rest/services/GPJobMapServiceName/MapServer/jobs/job_id`
    -   Geoprocessing result from 10.0 and previous: `https://organization.example.com/<context>/rest/services/GPServiceName/GPServer/GPTaskName/jobs/job_id/results/out_param_name`

Example: Geoprocessing result as an operational layer that is drawn by a job result map service



```
"operationalLayers": [
  {
    "url": "https://organization.example.com/<context>/rest/services/Buffer/MapServer/jobs/j9aa6c36d59f44829a0daeadb2d0ff87b",
    "title": "Geoprocessing Result"
  }
]
```

## baseMap

The map contains one baseMap, which has a title, and a `baseMapLayers` property that contains an ordered list of `baseMapLayers` . Each `baseMapLayer` must be in the same spatial reference and tiling scheme. When there is a `baseMap` , it defines the map's spatial reference.

| Syntax for baseMap | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 "baseMap": { "title": "<title>", "baseMapLayers": [ { "url": "<url1>", "opacity": <opacity1> }, { "url": "<url2>", "opacity": <opacity2> } ] } |  2 3 4 5 6 7 8 9 10 11 "baseMap": { "title": "Shared Imagery Basemap", "baseMapLayers": [ { "url": "https://services.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer", }, { "url": "https://services.arcgisonline.com/ArcGIS/rest/services/CSP_Imagery_World_2D/MapServer", } ] } |

| Syntax for Vector Tile Layer as | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 "baseMap": { "title": "<title>", "baseMapLayers": [ { "id": "<id1>", "type": "VectorTileLayer", "layerType": "VectorTileLayer", "title": "<title1>", "styleUrl": "<Url1>" "visibility": <true \| false>, "opacity": <opacity1> } ] } |  2 3 4 5 6 7 8 9 10 11 12 13 14 "baseMap": { "title": "VectorTileLayer as BaseMap", "baseMapLayers": [ { "id": "VectorTile_1933", "type": "VectorTileLayer", "layerType": "VectorTileLayer", "title": "World_Basemap", "styleUrl": "https://basemaps.arcgis.com/b2/arcgis/rest/services/World_Basemap/VectorTileServer/resources/styles/root.json", "visibility": true, "opacity": 1 } ] } |

| Syntax for Bing Maps as a | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 "baseMap": { "title": "<title>", "baseMapLayers": [ { "id": "<id1>", "type": "<BingMapsRoad \| BingMapsAerial \| BingMapsHybrid>", "culture": "<Bing Maps supported culture>", "key": "<bing_key>" //optional } ] } |  2 3 4 5 6 7 8 9 10 11 "baseMap": { "title": "Bing Maps", "baseMapLayers": [ { "id": "BingMap", "visibility": true, "type": "BingMapsRoad", "culture": "fr-ca" } ] } |

| Syntax for as a | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 "baseMap": { "title": "<title>", "baseMapLayers": [ { "type": "OpenStreetMap", "url": "<url>", //optional "credits": "<credits>" //optional } ] } |  2 3 4 5 6 7 8 9 "baseMap": { "title": "OpenCycle Map", "baseMapLayers": [ { "type": "OpenStreetMap", "url": "https://a.tile.opencyclemap.org/cycle" } ] } |
| Description |
| url (optional): When not specified, openstreetmap.org is used by default.credits (optional): An acknowledgment indicating who contributed to the layer. The value of this property is ignored when url is not specified. Instead, the credits for the default OpenStreetMap service is used. |

| Syntax for as a | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 "baseMap": { "title": "<title>", "baseMapLayers": [ { "type": "WebTiledLayer", "urlTemplate": "<urlTemplate1>", "subDomains": [ //optional <subDomain1>, <subDomain2> ], "tileInfo": {}, //optional "credits": "<credits>" //optional } ] } |  2 3 4 5 6 7 8 9 10 11 12 13 14 15 "baseMap": { "title": "MapQuest", "baseMapLayers": [ { "type": "WebTiledLayer", "urlTemplate": "https://{subDomain}.mqcdn.com/tiles/1.0.0/vx/map/{level}/{col}/{row}.jpg, "subDomains": [ "mtile01", "mtile02", "mtile03", "mtile04" ] } ] } |
| Description |
| urlTemplate (required): The URL template to retrieve the tiles. The URL template follows a pattern of https://some.example.com/{level}/{col}/{row}/ , where level corresponds to a zoom level, and col and row represent tile column and row, respectively.subDomains (optional): One of the specified subDomains will be used to replace the {subDomain} placeholder in the urlTemplate to form a tile request URL.tileInfo (optional): Defines the tile info for the layer including lods, rows, cols, origin, and spatial reference. If no tileInfo is provided, the layer is assumed to be in web Mercator with the web Mercator tiling scheme. For more information on tileInfo , see the ArcGIS REST API.credits (optional): An acknowledgment indicating who contributed to the layer. |

| Syntax for WMTS as a |
|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 "baseMap": { "title": "<title>", "baseMapLayers": [ { "type": "wmts", "url": "<url1>", "layer": "<layerName>", //optional "style": "<style>", //optional "format": "<imageFormat>", //optional "tileMatrixSet": "<tileMatrixSet>" //optional } ] } |

## exportOptions

This object specifies settings for the output map.

| Syntax | Example |
|---|---|
|  2 3 4 5 6 7 "exportOptions": { "dpi": <dpi>, "outputSize": [ <width>, <height> ] } |  2 3 4 5 6 7 "exportOptions": { "dpi": 300, "outputSize": [ 500, 500 ] } |
| Description |
| dpi (optional): The resolution in dots per inch. The default is 96 dpi.outputSize (optional): Size of the map in pixels. The size must be defined when an empty string or MAP_ONLY (without quotation marks) is passed in as a value to the layout_template parameter. If layout_template is not specified as MAP_ONLY or an empty string, layout_template takes precedence over outputSize . |

## layoutOptions

This defines settings for different available page layout elements and is only needed when an available layout template is chosen. Page layout elements include title, copyright text, scale bar, author name, custom and dynamic text element, chart frame element and table frame element.

All the properties of this object are optional. When a value of a property is specified, the value of the corresponding page layout element is replaced; otherwise, the existing element is left untouched.

| ExportWebMap custom text element | Corresponding dynamic text in |
|---|---|
| titleText | <dyn type="layout" property="metadata" attribute="title" emptyStr=""/> |
| authorText | <dyn type="layout" property="metadata" attribute="contactname" emptyStr=""/> |
| copyrightText | <dyn type="layout" property="metadata" attribute="credits" emptyStr=""/> |

| Syntax | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 "layoutOptions": { "titleText": "<title>", "authorText": "<authorName>", "copyrightText": "<copyright>", "scaleBarOptions": { "metricUnit": "<esriMeters \| esriKilometers>" , "metricLabel": "<metricUnitLabel>", "nonMetricUnit": "<esriFeet \| esriYards \| esriMiles \| esriNauticalMiles>" , "nonMetricLabel": "<nonMetricUnitLabel>" }, "customTextElements": [ {"<textElementName1>": "<value1>"}, {"<textElementName2>": "<value2>"} ], "elementOverrides": { "<elementName1>": {"visible" : true \| false}, "<elementName2>": {"visible" : true \| false}, //for dynamic text elements "<dynTxtElmName1>": { "visible": true \| false, // a text element can have multiple dynamic text elements "dynamicTextElements": [ //element's index must match their position inside a text element { "sourceLayerId": "<webmapOperationalLayerId>", //required "field": "<field-name>", "filterType": "<all \| visible \| selected>", "whereClause": "SQLWhereClause" }, { ... } ] }, //for table frame elements "<tableElmName1>": { "visible": true \| false, "sourceLayerId": "<webmapOperationalLayerId>", //required "fields": ["field1", "field2", ...], //order is honored "filterType": "<all \| visible \| selected>", "whereClause": "SQLWhereClause", "orderByFields": [ {"field": "<field1>;", "order": "ASC \| DESC"}, {...} ], "rowCount": <row-count>; //limit table to display top n rows }, //for chart frame elements "<chartElmName1>": { "visible": true \| false, "sourceLayerId": "<webmapOperationalLayerId>", //required "sourceChartId": "<chartId>", //required "filterType": "<all \| visible \| selected>" } }, "legendOptions": { "operationalLayers": [ { "id": "<webmapOperationalLayerId>", "dynamicLegend": true\|false, //for feature layer or image layer "sublayerIds": [ //array of string or number <mapServerSublayerId1>, <mapServerSublayerId2> ], "subLayerDynamicLegends": [true\|false, true\|false, ...] //for map image layer sub layers. } ] } } |  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 "layoutOptions": { "titleText": "City Land Use Map", "authorText": "Print by: XYZ", "copyrightText": "© esri", "scaleBarOptions": { "metricUnit": "esriKilometers", "metricLabel": "km", "nonMetricUnit": "esriMiles", "nonMetricLabel": "mi" } "customTextElements": [ {"townshipName": "Town ABC"} ], "elementOverrides": { "myNorthArrow": {"visible" : true} }, "legendOptions": { "operationalLayers": [ { //for dynamic mapservicelayer "id": "myMapserviceLayer", "subLayerIds": [ //array of integer 0, 1 ], "subLayerDynamicLegends": [true, false] }, { //for WMS layer "id": "myWMSLayer", "subLayerIds": [ //array of string "layer1", "layer2" ] }, { //for FeatureLayer "id": "myFeatureLayer", "dynamicLegend": true } ] } } |
| Description |
| titleText (optional): The text of the map title text element is updated if it exists on the layout.authorText (optional): The text of the author text element is updated if it exists on the layout.copyrightText (optional): The text of the copyright text element is updated if it exists on the layout.scaleBarOptions (optional): These update a scale bar if one exists.metricUnit (optional): Sets the units of the scale bar to metric units.metricLabel (optional): String indicating how units should be labeled, for example, KM, Kilometers, or kms. When this is not specified or an empty string is passed in, the text value of the unit is used.nonMetricUnit (optional): Sets the units of the scale bar to nonmetric units.nonMetricLabel (optional): String indicating how units should be labeled, for example, Miles or mi. When this is not specified or an empty string is passed in, the text value of the unit is used.customTextElements (optional): This is an array of name-value pairs. You need to use this if you want to update text of a text element (that is not dynamic text) on the page layout. Values must be strings.legendOptions (optional): Specifies properties of a legend element on the layout. Please note that when a legend element on a layout is found empty (it does not have layer in it), it gets removed by the printing service.operationalLayers (optional): Specifies the operational layers whose legends will be added to the layout.id : String representing the ID of the layer. The ID must be unique and must match the layer's ID in the operationalLayers element where the operational layer is defined.dynamicLegend (optional): enable or disable dyanamic legend option for a feature layer or an image layer.subLayerIds (optional): An array of sublayers whose element types are string or long and contextual to the operational layer type. For example, for a map service layer, it must be a number; for a WMS layer, it must be a string. It is recommended that you specify subLayerIds values for operational layers that have sublayers. Once omitted, in the case of map service and WMS layers, legends from all sublayers are added to the legend element on the layout. For feature or graphics layers, the sublayers property does not need to be set.subLayerDynamicLegends (optional): And array of booleans where the order matches the layer id order in subLayerIds to indicate if the dynamic-legends is applied to a layer or not.elementOverrides (optional): This is an element containing override properties of some elements such as north arrow, text element containing dynamic text elements, a table frame or a chart frame element on the page layout. You can use GetLayoutTemplatesInfo to find if a layout template has such elements and their definitions.visible (optional): Specify the visibility of an element. This is applicable for all types of elements.sourceLayerId : Required for table elements and chart elements.sourceChartId : Required and only applicable for chart elements. sourceChartId can be found inside an operationalLayer definition.filterType (optional): Override the filter type. Applicable for dynamic text element, table element and chart elements.whereClause (optional): Specify an attribute filter conforms to SQL standard. When filterType="Selected" , they both gets AND'ed. It gets ignored when the element is a chart element.fields (optional): specify an array of fields be used in a table element. Not applicable to a chart element. The order are honored.orderByFields (optional): specify how rows in a table element get ordered. When omitted, the table element's order by fields get used if exists.rowCount (optional): limit how may rows in a table element you want to show. When omitted, the table element's row count get used if exists.dynamicTextElements : an array of dynamic text element with overridden properties. Only applicable for text elements containing dynamic text elements.sourceLayerId (required): String representing the ID of the layer. The ID must be unique and must match the layer's ID in the operationalLayers element where the operational layer is defined.filterType (optional): Override the filter type.whereClause (optional): Specify an attribute filter conforms to SQL standard. When filterType="Selected" , they both gets AND'ed.field (optional): Specify the name of the field from where the dynamic attributes or some statistics will be retrieved or generated. |

## reportOptions

This defines settings for different available report elements and is only needed when an available report template is chosen. Report elements include source and related source ids, field list etc.

Send request to `Get Report Templates Info` task to retrieve what elements are available for each report template.

| Syntax | Example |
|---|---|
|  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 "reportOptions": { "reportSectionOverrides": { "Report Section": { "name": "<report title>", "sourceId": "<operation layer/table id>", //field mapping "fieldElements": { "<fieldElementName1>": "<fieldName1>", "<fieldElementName2>": "<fieldName2>", "<fieldElementName3>": "<fieldName3>", ... }, //group section when available "groupSections": { "<groupSectionElementName>": "<groupByFieldName1>" }, //statistic elements when available "statisticElements": { "<statElementName1>": "<fieldName1>" } }, //related report section when available "Related Report": { "sourceId": "<related operational layer/table id", //mapping between field element and field name "fieldElements": { "<fieldElementName1>": "<fieldName1>", "<fieldElementName2>": "<fieldName2>" ... }, //field headers "fieldLabelElements": { "<fieldLabelElementName1>": "<fieldHeader1>", "<fieldLabelElementName2>": "<fieldHeader2>" ... }, "groupSections": { "<groupHeaderElementName>": "<group header>" } } } } |  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 "reportOptions": { "reportSectionOverrides": { "Report Section": { "name": "Esri Theme Parks", "sourceId": "18a387780ae-layer-3", "fieldElements": { "Field 1": "Website", "Field 2": "City", "Field 3": "State", "Field 4": "OpeningDay", "Field 5": "ChildPrice", "Field 6": "AdultPrice" }, "groupSections": { "Group field: [group-field-value]": "Name" }, "statisticElements": { "Count Statistic 1": "Name" } }, "Related Report": { "sourceId": "18a387780b0-layer-4", "fieldElements": { "Related Field 1 1": "AttractionName", "Related Field 2 1": "Description" }, "fieldLabelElements": { "Related Field Label 1": "Name", "Related Field Label 2": "Description" }, "groupSections": { "[related-report-name]: Group Header: [group-field-value]": "AttractionType" } } } } |
| Description |
| reportSectionOverrides : This is the only element that a reportOptions element has. This contains definitions of some sections such as Report Section , Related Report etc. available on the report layout.Each of these child elements contains override properties of some elements such as sources, field mapping etc. within each section.You can use Get Report Templates Info to find all elements in a report template that you can override.Read about Reports in ArcGIS Pro Help for more information about reports and its components. |
|  |

## Limitations

Feature-level symbols overridden in notes layers are not supported when the renderer type is class breaks or simple.