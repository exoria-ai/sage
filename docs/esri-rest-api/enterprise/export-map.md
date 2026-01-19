# Export Map

> Source: [/rest/services-reference/enterprise/export-map/](https://developers.arcgis.com/rest/services-reference/enterprise/export-map/)

**URL:**: https://<mapservice-url>/export

**Methods:**: GET

**Required Capability:**: Map

**Version Introduced:**: 9.3

## Description

The export operation is performed on a [map service resource](/rest/services-reference/enterprise/map-service/). The result of this operation is a map image resource. This resource provides information about the exported map image such as its URL, its width and height, extent and scale.

Apart from the usual response formats of HTML and JSON, users can also request a format called `image` while performing this operation. When users perform an export with the format of `image` , the server responds by directly streaming the image bytes to the client. With this approach, you don't get any information associated with the exported map other than the actual image.

The extent displayed in the exported map image may not exactly match the extent sent in the box parameter when the aspect ratio of the image size does not match the aspect ratio of the box. The aspect ratio is the height divided by the width. In these cases, the extent is resized to prevent map images from appearing stretched. The exported map's extent is sent along with the JSON and HTML responses, and may be used in client-side calculations. It's important that the client-side code update its extent based on the response.

## New in ArcGIS Enterprise 11.4

Supports the following new parameters.

`selectionDefinitions` to highlight selected features.

## New in 10.9

Supports the following new parameters. These parameters are only supported by map services published from ArcGIS Pro.

-   `timeRelation` to control whether you want to include or exclude start and end values specified in the `time` parameter.

## New at 10.8

Supports the following new parameters. These parameters are only supported by map services published from ArcGIS Pro.

-   `clipping` to mask out layers outside of a clip polygon.
-   `spatialFilter` to draw or query only features that meet the spatial filter criteria.

## New at 10.6.1

Supports the following new parameter:

-   `historicMoment` to query from a given moment in an archive enabled layer.

## New at 10.5

Supports the following new parameters:

-   `datumTransformations` to provide a desired datum transformation to be applied while features get projected.
-   `mapRangeValues` to set values to ranges applicable to all layers with the same ranges in the map service.
-   `layerRangeValues` to set range values specific layers.
-   `layerParameterValues` to set values to parameterized filters to specific layers.

## Request parameters

| Parameter | Details |
|---|---|
| bbox(Bounding Box) | (Required) The extent (bounding box) of the exported image. Unless the bboxSR parameter has been specified, the bbox is assumed to be in the spatial reference of the map.The bbox coordinates should always use a period as the decimal separator, even in countries where traditionally a comma is used.Syntax <xmin>, <ymin>, <xmax>, <ymax>Example bbox=-104,35.6,-94.32,41 |
| bbSR(Bounding Box Spatial Reference) | The spatial reference of the bbox . The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. If the bboxSR is not specified, the bbox is assumed to be in the spatial reference of the map. |
| layers(Layers) | Determines which layers appear on the exported map. There are four ways to specify which layers are shown:show —Only the layers specified in this list will be exported.hide —All layers except those specified in this list will be exported.include —In addition to the layers exported by default, the layers specified in this list will be exported.exclude —The layers exported by default excluding those specified in this list will be exported.Syntax 2 //Where layerId1 and layerId2 are the layer ids returned by the [show \| hide \| include \| exclude]:layerId1,layerId2Example layers=show:2,4,7 |
| layerDefs(Layer Definitions) | Allows you to filter the features of individual layers in the exported map by specifying definition expressions for those layers. The definition expression for a layer that is published with the service always will be honored.Syntax 2 //Where layerId2 and layerId2 are the layer ids returned by the map service resource. {"<layerId1>": "<layerDef1>", "<layerId2>": "<layerDef2>"} |
| size(Image Size) | The size (width and height) of the exported image in pixels. If the size is not specified, an image with a default size of 400 by 400 pixels will be exported.Syntax <width>, <height>Example size=600,550 |
| imageSR(Image Spatial Reference) | The spatial reference of the exported image. The spatial reference can be specified as either a well-known ID or as a spatial reference json object. If the imageSR is not specified, the image will be exported in the spatial reference of the map. |
| historicMoment(Historic Moment) | It returns an output image with features from a specific epoch time. This parameter applies only if the layer is archiving enabled and the supportsQueryWithHistoricMoment property is set to true . This property is provided in the layer resource. If historicMoment is not specified, the current features are drawn.Syntax historicMoment=<Epoch time in milliseconds>Example historicMoment=1199145600000 |
| format(Image Format) | The format of the exported image. The default format is png .Values: png \| png8 \| png24 \| jpg \| pdf \| bmp \| gif \| svg \| svgz \| emf \| ps \| png32 |
| transparent(Background Transparent) | If true , the image will be exported with the background color of the map set as its transparent color. The default is false . Only the .png and .gif formats support transparency. Internet Explorer 6 does not display transparency correctly for png24 image formats.Values: true \| false |
| dpi(DPI) | The device resolution of the exported image (dots per inch). If the dpi is not specified, an image with a default dpi of 96 will be exported.Example dpi=200 |
| time(Time) | The time instant or time extent of the exported map image.Syntax 2 3 4 5 //Time instant syntax time=<timeInstant> //Time extent syntax time=<startTime>, <endTime>Example 2 3 4 5 6 7 8 9 //Time instant example (1 Jan 2008 00:00:00 GMT) time=1199145600000 //Time extent example (1 Jan 2008 00:00:00 GMT to 1 Jan 2009 00:00:00) time=1199145600000, 1230768000000 //A null value specified for a start time or end time will represent // infinity for start or end time, respectively time=null,1230768000000 |
| timeRelation(Time Relation) | Allows you to control whether to include or exclude features that are at the beginning or the end of a time window. The default value is esriTimeRelationOverlaps .Syntax 2 3 //Time Relation syntax timeRelation=<esriTimeRelationOverlaps \| esriTimeRelationOverlapsStartWithinEnd \| esriTimeRelationAfterStartOverlapsEnd \| esriTimeRelationWithin>Example 2 3 4 5 6 7 8 9 10 11 12 13 14 15 //Draw all features from year 2008 i.e. Jan 1st, 2008 00:00:00 GMT to // Jan 1st 2009 00:00:00 GMT including Jan 1st, 2009 00:00:00 GMT time=1199145600000,1230768000000&timeRelation=esriTimeRelationOverlaps //Draw all features from year 2008 i.e. Jan 1st, 2008 00:00:00 GMT to // Jan 1st 2009 00:00:00 GMT excluding Jan 1st, 2009 00:00:00 GMT time=1199145600000,1230768000000&timeRelation=esriTimeRelationOverlapsStartWithinEnd //Draw all features from Jan 1st, 2008 00:00:00 GMT to Jan 1st 2009 00:00:00 GMT // excluding Jan 1st, 2008 00:00:00 GMT time=1199145600000,1230768000000&timeRelation=esriTimeRelationAfterStartOverlapsEnd //Draw all features after Jan 1st, 2008 00:00:00 GMT and / before Jan 1st 2009 00:00:00 GMT time=1199145600000,1230768000000&timeRelation=esriTimeRelationWithin |
| layerTimeOptions(Layer Time Options) | The time options per layer. Users can indicate whether the layer should use the time extent specified by the time parameter, whether to draw the layer features cumulatively and the time offsets for the layer.Syntax { "<layerId1>" : { //If true, use the time extent specified by the time parameter "useTime": < true \| false >, //If true, draw all the features from the beginning of time for that data "timeDataCumulative": < true \| false >, //Time offset for this layer so that it can be overlaid on the top // of a previous or future time period "timeOffset": <timeOffset1>, "timeOffsetUnits": "<esriTimeUnitsCenturies \| esriTimeUnitsDays \| esriTimeUnitsDecades \| esriTimeUnitsHours \| esriTimeUnitsMilliseconds \| esriTimeUnitsMinutes \| esriTimeUnitsMonths \| esriTimeUnitsSeconds \| esriTimeUnitsWeeks \| esriTimeUnitsYears \| esriTimeUnitsUnknown>" }, "<layerId2>": { "useTime": < true \| false >, "timeDataCumulative": < true \| false >, "timeOffsetOffset": <timeOffset2>, "timeOffsetUnits": "<timeOffsetUnits2>" } }Example { "0": { "useTime": true, "timeDataCumulative": false, "timeOffset": 1, "timeOffsetUnits": "esriTimeUnitsYears" }, "3": { "useTime": false } } |
| dynamicLayers(Dynamic Layers) | Use this parameter to modify the layer drawing order, change layer drawing info, and change the layer data source version for this request. New layers (dataLayer ) can also be added to the dynamicLayers based on the map service registered workspaces. The order of the dynamicLayers array defines the layer drawing order. The first element of the dynamicLayers array draws on top of all other layers.Syntax: [ { "id": <layerOrTableId>, "source": <layer source>, "definitionExpression": "<definitionExpression>", "drawingInfo": { "renderer": <renderer>, "transparency": <transparency>, "scaleSymbols": <true \| false >, "showLabels": <true \| false >, "labelingInfo": <labeling info> }, "layerTimeOptions": { "useTime": <true \| false>, "timeDataCumulative": <true \| false>, "timeOffset": <timeOffset>, "timeOffsetUnits": "<esriTimeUnitsCenturies \| esriTimeUnitsDays \| esriTimeUnitsDecades \| esriTimeUnitsHours \| esriTimeUnitsMilliseconds \| esriTimeUnitsMinutes \| esriTimeUnitsMonths \| esriTimeUnitsSeconds \| esriTimeUnitsWeeks \| esriTimeUnitsYears \| esriTimeUnitsUnknown>" } }, { "id": <layerOrTableId>, "source": <layer source>, "definitionExpression": "<definitionExpression>", "drawingInfo": { "renderer": <renderer>, "transparency": <transparency>, "scaleSymbols": <true \| false >, "showLabels": <true \| false >, "labelingInfo": <labeling info> }, "layerTimeOptions": { "useTime": <true \| false>, "timeDataCumulative": <true \| false>, "timeOffset": <timeOffset>, "timeOffsetUnits": "<esriTimeUnitsCenturies \| esriTimeUnitsDays \| esriTimeUnitsDecades \| esriTimeUnitsHours \| esriTimeUnitsMilliseconds \| esriTimeUnitsMinutes \| esriTimeUnitsMonths \| esriTimeUnitsSeconds \| esriTimeUnitsWeeks \| esriTimeUnitsYears \| esriTimeUnitsUnknown>" } } ]See the Dynamic Layers codeblock examples section below for examples. |
| gdbVersion(Geodatabase Version Name) | Use this parameter to specify the geodatabase version.Syntax gdbVersion=<geodatabase version>Example gdbVersion=sde.USER1 |
| mapScale(Map Scale) | Use this parameter to export a map image at a specific scale, with the map centered around the center of the specified bounding box (bbox ). Where scale is typically represented as 1:x , this value is x .Syntax mapScale=<scale>Examples 2 3 mapScale=5000000 mapScale=5E6 |
| rotation(Rotation) | Use this parameter to export a map image rotated at a specific angle, with the map centered around the center of the specified bounding box (bbox ). It could be a positive or negative number.Syntax rotation=<degree>Exmaple 2 //returns a map image rotated 45° counter-clockwise rotation=45 |
| datumTransformations(Datum Transformations) | Use it to apply one or more datum transformations to the map when imageSR is different than the map service's spatial reference. It is an array of transformation elements. Transformations specified here are used to project features from layers within a map service to imageSR .For a list of valid datum transformation ID values (WKID) and well-known text (WKT) strings, see Using spatial references. For more information on datum transformation, see the transformation parameter in the Project operation.Syntax 2 3 4 5 6 7 8 //Syntax with WKID (Well-Known ID) datumTransformations=[<wkid1>, <wkid2>] //Syntax with datum json element with WKID datumTransformations=[{"wkid": <wkid1>}, {"wkid": <wkid2>}] //Syntax with datum json element with WKT (Well-Known Text) datumTransformations=[{"wkt": "<wkt1>"}, {"wkt": "<wkt2>"}]Example 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 //Examples with WKID datumTransformations=[1623, 4078] //Examples with WKT datumTransformations=[{"wkt": "GEOGTRAN[\"S_JTSK_To_WGS_1984_1\", GEOGCS[\"GCS_S_JTSK\", DATUM[\"D_S_JTSK\", SPHEROID[\"Bessel_1841\", 6377397.155, 299.1528128]], PRIMEM[\"Greenwich\", 0.0], UNIT[\"Degree\", 0.0174532925199433]], GEOGCS[\"GCS_WGS_1984\", DATUM[\"D_WGS_1984\", SPHEROID[\"WGS_1984\", 6378137.0, 298.257223563]], PRIMEM[\"Greenwich\", 0.0], UNIT[\"Degree\", 0.0174532925199433]], METHOD[\"Position_Vector\"], PARAMETER[\"X_Axis_Translation\", 570.8], PARAMETER[\"Y_Axis_Translation\", 85.7], PARAMETER[\"Z_Axis_Translation\", 462.8], PARAMETER[\"X_Axis_Rotation\", 4.998], PARAMETER[\"Y_Axis_Rotation\", 1.587], PARAMETER[\"Z_Axis_Rotation\", 5.261], PARAMETER[\"Scale_Difference\", 3.56], OPERATIONACCURACY[1.0]]"}] //Examples with datum to apply multiple transformations including a composite transformation datumTransformations=[{"wkid":108889}, {"geoTransforms":[{"wkid":108889,"transformForward":true}, {"wkid":1622,"transformForward":false}]}] |
| layerParameterValues(Layer Parameter Values) | It allows you to filter the features of individual layers in the exported map by specifying a value or values to an array of preauthored parameterized filters for those layers. When this value is not specified for any parameter in a request, the default value assigned during authoring is used instead. When a parameterInfo allows multiple values, you must pass them in an array.Syntax [ { "<layerId1>": { "<parameterName1>": <value>, //when the multipleValues=false in the parameterInfo "<parameterName2>": [<value1> \| <value2>] //when the multipleValues=true in the parameterInfo }, "<layerId2>": { "<parameterName3>": <value> } } ]Example [ { "0": { "floor": 10, "incidentDate": 1475877014000 //date time value needs to be passed in as epoch value }, "1": { "crimeType": ["burglary", "theft"] } } ] |
| mapRangeValues(Map Range Values) | It allows you to filter features in the exported map from all layers that are within the specified range instant or extent.Note: Check rangeInfos at the layer resources for the available ranges. Null is allowed in value-range cases, that means infinity. For example, [null, 1500] means all features with values <= 1500, and [1000, null] means all features with values >= 1000.Syntax [ { "name": "<rangeName1>", //range id "value": <value> \| [<value1>, <value2>] //single value or a value-range }, { "name": "<rangeName2>", "value": <value> \| [<value3>, <value4>] } ]Example [ { "name": "salinity", "value": 5 //a range instant (or single) value passed }, { "name": "elevation", "value": [1000, 1500] //a range extent is passed } ] |
| layerRangeValues(Layer Range Values) | It allows you to filter the features of individual layers in the exported map by specifying a value or values to an array of preauthored parameterized filters for those layers. When this value is not specified for any parameter in a request, the default value assigned during authoring is used instead. When a parameterInfo allows multiple values, you must pass them in an array.Syntax [ { "<layerId1>": { "<parameterName1>": <value>, //when the multipleValues=false in the parameterInfo "<parameterName2>": [<value1> \| <value2>] //when the multipleValues=true in the parameterInfo }, "<layerId2>": { "<parameterName3>": <value> } } ]Example [ { "0": { "floor": 10, "incidentDate": 1475877014000 //date time value needs to be passed in as epoch value }, "1": { "crimeType": ["burglary", "theft"] } } ] |
| clipping(Clipping) | This parameter was added at 10.8. It allows you to mask out layers outside of the clip polygon in the exported map. Clipping can mask out any layer type, in other words, feature layers, raster layers, TIN layers, and so on. Optionally, you can use excludedLayers to exclude layers from being clipped.Syntax { "geometryType": "<esriGeometryPolygon \| esriGeometryEnvelope>", "geometry": {<geometry>}, "excludedLayers": [<layerId>, <layerId>] //optional }Example { "geometryType": "esriGeometryPolygon", "geometry": { "spatialReference": { "wkid": 102008 }, "rings": [ [ [-816126, 216280], [-565859, 199948], [-607349, -50318], [-785229, -38842], [-816126, 216280] ] ] }, "excludedLayers": [ 1, 4 ] //optional } |
| spatialFilter(Spatial Filter) | This parameter was added at 10.8. It allows you to filter out features from all feature layers based on the input spatial filter. It is like layerDefs but instead of using an attribute filter, the map service uses a spatial filter to determine which features will be drawn.Syntax { "spatialRel": "<esriSpatialRelIntersects \| esriSpatialRelContains \| esriSpatialRelCrosses \| esriSpatialRelEnvelopeIntersects \| esriSpatialRelIndexIntersects \| esriSpatialRelOverlaps \| esriSpatialRelTouches \| esriSpatialRelWithin \| esriSpatialRelRelation>", //default = esriSpatialRelIntersects "geometryType": "<esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon \| esriGeometryEnvelope >", "geometry": {<geometry>} }Example { "spatialRel" : "esriSpatialRelIntersects", "geometryType" : "esriGeometryPolygon", "geometry": { "spatialReference": {"wkid": 102008}, "rings": [ [ [-816126, 216280], [-565859, 199948], [-607349, -50318], [-785229, -38842], [-816126, 216280] ] ] } } |
| selectionDefinitions(Spatial Filter) | This parameter was added at 11.4. It allows you to highlight selected features with default or customized selection symbol. When a layer reports uniqueIdInfo in its resources, you should pass in uniqueIds, otherwise include objectIds. Both should not be included in the same request. uniqueIdInfo takes an array of string literals when uniqueIdInfo.type is simple in layer resources, or it takes an 2-dimensional array of string literals when type is composite. Values in the 2D array must be passed in the same order their corresponding fields are specified in uniqueIdInfo.fields array.Syntax [ { "layerId": "<layerId>, "objectIds": [<oid1>, <oid2>], "uniqueIds": ["<uniqueId1>", "<uniqueId2>"], //when uniqueIdInfo.type is composite "uniqueIds": [["<id-1>", "<id-2>"], ["<id-a>", "<id-b>"]], "selectionColor": [<red>, <green>, <blue>], //when not specificed, it uses the default color "selectionFillColor": [<red>, <green>, <blue>] //optional, uses the defualt fill color when omitted } ]Example 1: using objectIds to highlight features [ { "layerId": 1, "objectIds": [188, 187] }, { "layerId": 3, "objectIds": [2796, 3036, 2702, 2632, 2920], "selectionColor": [255, 255, 0] }, { "layerId": 5, "objectIds": [3605, 3679, 3686, 4014, 4149], "selectionColor": [0, 255, 0], "selectionFillColor": [0, 0, 255] } ]Example 2: using uniqueIds to highlight features [ { "layerId": 5, "uniqueIds": ["id1", "id2", "id3"] } ]Example 3: using uniqueIds to highlight features when uniqueIdInfo.type is composite [ { "layerId": 5, "uniqueIds": [["st-code1", "st-code2"], ["cnty-code1", "cnty-code2"]] } ] |
| f(Format) | The response format. The default response format is html . If the format is image , the image bytes are directly streamed to the client.Values: html \| json \| pjson \| image \| kmz |

## Example usage

Example 1: Export a map. Include only the bounding box.



```
https://organization.example.com/<context>/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/export?bbox=-127.8,15.4,-63.5,60.5
```

Example 2: Export a map. Change `imageSR` to 102004 (USA\_Contiguous\_Lambert\_Conformal\_Conic projection):



```
https://organization.example.com/<context>/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/export?bbox=-127.8,15.4,-63.5,60.5&bboxSR=&layers=&size=&imageSR=102004&format=&transparent=false&dpi=&f=html
```

Example 3: Export a map. Change `imageSR` to 102004 (USA\_Contiguous\_Lambert\_Conformal\_Conic projection), image `size` to a width and height of 800x600, `format` to `gif` , and `transparent` to `false` .



```
https://organization.example.com/<context>/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/export?bbox=-115.8,30.4,-85.5,50.5&bboxSR=&layers=&size=800,600&imageSR=102004&format=gif&transparent=false&dpi=&f=html
```

Example 4: Export the same map as above but change the output format to pretty JSON (`pjson` ).



```
https://organization.example.com/<context>/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/export?bbox=-115.8,30.4,-85.5,50.5&bboxSR=&layers=&size=800,600&imageSR=102004&format=gif&transparent=false&dpi=&f=pjson
```

Example 5: Export a map with dynamic layers. Update an existing map layer symbology.



```
https://organization.example.com/<context>/rest/services/Census/MapServer/export?bbox=-183.78001472868405,16.300709121618663,-61.406854669684265,74.03030803096895&bboxSR=&layers=&layerDefs=&size=&imageSR=&format=png&transparent=false&dpi=&time=&layerTimeOptions=&dynamicLayers=[{"id":101,"source":{"type":"mapLayer","mapLayerId":3},"drawingInfo":{"renderer": {"type":"simple", "symbol": {"type":"esriSFS","style":"esriSFSSolid","color":[255,0,0,255],"outline":{"type":"esriSLS","style":"esriSLSSolid","color":[0,255,0,255],"width":1}}}}}]&gdbVersion=&f=html
```

## Dynamic layer request examples



```
[
  {  //disable time on existing map service layer and turn off labels
    "id": 501,
    "source":
      {
        "type": "mapLayer",
        "mapLayerId": 0
      },
      "drawingInfo": {
	       "showLabels": false
      },
      "layerTimeOptions": {
	       "useTime": false
      }
    }
  },
  {  //add a new layer from registered workspace and label features with a feature attribute value {TaxLotId]
    "id": 502,
    "source": {
      "type": "dataLayer",
      "dataSource": {
        "type": "table",
        "workspaceId": "MAP",
        "dataSourceName": "MAP.user1.Taxlots"
      }
    },
    "drawingInfo": {
      "renderer": {
        "type": "simple",
        "symbol": {
          "type": "esriSFS",
          "style": "esriSFSSolid",
          "color": [166,36,0,255],
          "outline": {
            "type": "esriSLS",
            "style": "esriSLSSolid",
            "color": [110,110,110,255],
            "width": 1.0
          }
        },
        "label": "TaxLots",
        "description": ""
      },
      "transparency": 60,
      "showLabels": true,
      "labelingInfo": [
        {
          "labelPlacement": "esriServerPolygonPlacementAlwaysHorizontal",
          "labelExpression": "[TaxLotId]",
          "useCodedValues": false,
          "symbol": {
            "type": "esriTS",
            "color": [255,255,0,255],
            "verticalAlignment": "bottom",
            "horizontalAlignment": "left",
            "font": {
              "family": "Arial",
              "size": 12,
              "style": "normal",
              "weight": "bold",
              "decoration": "none"
            }
          },
          "minScale": 15000,
          "maxScale": 30000,
          "where": ""
        }
      ]
    }
  },
  {  //change the Version of existing map service layer
    "id": 503,
    "source": {
      "type": "mapLayer",
      "mapLayerId": 1,
      "gdbVersion": "USER1"
    },
    "definitionExpression": "neighborhood = 'French Quarter'"
  },
  {  //add a raster from registered workspace
    "id": 504,
    "source": {
      "type": "dataLayer",
      "dataSource": {
        "type": "raster",
        "workspaceId": "rasterWS",
        "dataSourceName": "NewOrleans.tif"
      }
    },
    "drawingInfo": {
      "transparency": 0
    }
  }
]
```

## JSON Response syntax



```
{
  "href": "<href>",
  "width": <width>,
  "height": <height>,
  "extent": {<envelope>},
  "scale": <scale>
}
```

## JSON Response example



```
{
  "href": "https://atlantic/arcgisoutput/_ags_map42ef5eae899942a9b564138e184a55c9.png",
  "width": 400,
  "height": 400,
  "extent": {
    "xmin": -109.55,
    "ymin": 25.76,
    "xmax": -86.39,
    "ymax": 49.94,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  },
  "scale" : 2.53E7
}
```