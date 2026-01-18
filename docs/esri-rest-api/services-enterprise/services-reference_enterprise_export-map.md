# Export Map

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/export-map/

## Service Info

- **Parameter:** Details
- **bbox(Bounding Box):** (Required) The extent (bounding box) of the exported image. Unless the bboxSR  parameter has been specified, the bbox  is assumed to be in the spatial reference of the map.The bbox  coordinates should always use a period as the decimal separator, even in countries where traditionally a comma is used.SyntaxUse dark colors for code blocksCopy1
<xmin>, <ymin>, <xmax>, <ymax>ExampleUse dark colors for code blocksCopy1
bbox=-104,35.6,-94.32,41
- **bbSR(Bounding Box Spatial Reference):** The spatial reference of the bbox . The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. If the bboxSR  is not specified, the bbox  is assumed to be in the spatial reference of the map.
- **layers(Layers):** Determines which layers appear on the exported map. There are four ways to specify which layers are shown:
show —Only the layers specified in this list will be exported.
hide —All layers except those specified in this list will be exported.
include —In addition to the layers exported by default, the layers specified in this list will be exported.
exclude —The layers exported by default excluding those specified in this list will be exported.
SyntaxUse dark colors for code blocksCopy1
2
//Where layerId1 and layerId2 are the layer ids returned by the
[show | hide | include | exclude]:layerId1,layerId2ExampleUse dark colors for code blocksCopy1
layers=show:2,4,7WarningShowing or excluding group layers also shows or excludes all groups and sublayers within the group layer (assuming they draw by default). For example, if you want to show group layer 0 and layer 2 is a sublayer of this group, layer 2 will also display. The same logic applies when excluding a group layer.
- **layerDefs(Layer Definitions):** Allows you to filter the features of individual layers in the exported map by specifying definition expressions for those layers. The definition expression for a layer that is published with the service always will be honored.NoteWhen filtering the features of individual layers in a mosaic dataset, the client must explicitly specify the definition expression on the parent mosaic dataset layer. The definition expression will not be honored if it is specified on any of the child layers.When filtering the features of individual layers in catalog layer, the client must explicitly specify the definition expression on the parent catalog layer. The definition expression will not be honored if it is specified on any of the child layers including the footprints layer.Simple syntax is no longer supported starting at 10.5.SyntaxUse dark colors for code blocksCopy1
2
//Where layerId2 and layerId2 are the layer ids returned by the map service resource.
{"<layerId1>": "<layerDef1>", "<layerId2>": "<layerDef2>"}
- **size(Image Size):** The size (width and height) of the exported image in pixels. If the size  is not specified, an image with a default size of 400 by 400 pixels will be exported.SyntaxUse dark colors for code blocksCopy1
<width>, <height>ExampleUse dark colors for code blocksCopy1
size=600,550
- **imageSR(Image Spatial Reference):** The spatial reference of the exported image. The spatial reference can be specified as either a well-known ID or as a spatial reference json object. If the imageSR  is not specified, the image will be exported in the spatial reference of the map.
- **historicMoment(Historic Moment):** It returns an output image with features from a specific epoch time. This parameter applies only if the layer is archiving enabled and the supportsQueryWithHistoricMoment  property is set to true . This property is provided in the layer resource. If historicMoment  is not specified, the current features are drawn.SyntaxUse dark colors for code blocksCopy1
historicMoment=<Epoch time in milliseconds>ExampleUse dark colors for code blocksCopy1
historicMoment=1199145600000
- **format(Image Format):** The format of the exported image. The default format is png .Values: png  | png8  | png24  | jpg  | pdf  | bmp  | gif  | svg  | svgz  | emf  | ps  | png32
- **transparent(Background Transparent):** If true , the image will be exported with the background color of the map set as its transparent color. The default is false . Only the .png  and .gif  formats support transparency. Internet Explorer 6 does not display transparency correctly for png24 image formats.Values: true  | false
- **dpi(DPI):** The device resolution of the exported image (dots per inch). If the dpi is not specified, an image with a default dpi of 96 will be exported.ExampleUse dark colors for code blocksCopy1
dpi=200
- **time(Time):** The time instant or time extent of the exported map image.Note

When time  is empty and the map service has hasLiveData  set to true , export operation defaults the time  parameter value to the following:

[<current server time - defaultTimeWindow>, <current server time>]  when liveModeOffsetDirection  is past .
[<current server time>, <current server time + defaultTimeWindow>]  when liveModeOffsetDirection  is future .
[<current server time - defaultTimeWindow/2> , <current server time + defaultTimeWindow/2>]  when liveModeOffsetDirection  is pastAndFuture .


SyntaxUse dark colors for code blocksCopy1
2
3
4
5
//Time instant syntax
time=<timeInstant>

//Time extent syntax
time=<startTime>, <endTime>ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
//Time instant example (1 Jan 2008 00:00:00 GMT)
time=1199145600000

//Time extent example (1 Jan 2008 00:00:00 GMT to 1 Jan 2009 00:00:00)
time=1199145600000, 1230768000000

//A null value specified for a start time or end time will represent
// infinity for start or end time, respectively
time=null,1230768000000
- **timeRelation(Time Relation):** Allows you to control whether to include or exclude features that are at the beginning or the end of a time window. The default value is esriTimeRelationOverlaps .SyntaxUse dark colors for code blocksCopy1
2
3
//Time Relation syntax
timeRelation=<esriTimeRelationOverlaps | esriTimeRelationOverlapsStartWithinEnd
                | esriTimeRelationAfterStartOverlapsEnd | esriTimeRelationWithin>ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
//Draw all features from year 2008 i.e. Jan 1st, 2008 00:00:00 GMT to
//   Jan 1st 2009 00:00:00 GMT including Jan 1st, 2009 00:00:00 GMT
time=1199145600000,1230768000000&timeRelation=esriTimeRelationOverlaps

//Draw all features from year 2008 i.e. Jan 1st, 2008 00:00:00 GMT to
//   Jan 1st 2009 00:00:00 GMT excluding Jan 1st, 2009 00:00:00 GMT
time=1199145600000,1230768000000&timeRelation=esriTimeRelationOverlapsStartWithinEnd

//Draw all features from Jan 1st, 2008 00:00:00 GMT to Jan 1st 2009 00:00:00 GMT
//   excluding Jan 1st, 2008 00:00:00 GMT
time=1199145600000,1230768000000&timeRelation=esriTimeRelationAfterStartOverlapsEnd

//Draw all features after Jan 1st, 2008 00:00:00 GMT and
/   before Jan 1st 2009 00:00:00 GMT
time=1199145600000,1230768000000&timeRelation=esriTimeRelationWithin
- **layerTimeOptions(Layer Time Options):** The time options per layer. Users can indicate whether the layer should use the time extent specified by the time  parameter, whether to draw the layer features cumulatively and the time offsets for the layer.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
{
  "<layerId1>" : {
    //If true, use the time extent specified by the time parameter
    "useTime": < true | false >,
     //If true, draw all the features from the beginning of time for that data
    "timeDataCumulative": < true | false >,
    //Time offset for this layer so that it can be overlaid on the top
    //   of a previous or future time period
    "timeOffset": <timeOffset1>,
    "timeOffsetUnits": "<esriTimeUnitsCenturies | esriTimeUnitsDays
                          | esriTimeUnitsDecades | esriTimeUnitsHours
                          | esriTimeUnitsMilliseconds | esriTimeUnitsMinutes
                          | esriTimeUnitsMonths | esriTimeUnitsSeconds
                          | esriTimeUnitsWeeks | esriTimeUnitsYears
                          | esriTimeUnitsUnknown>"
  },
  "<layerId2>": {
    "useTime": < true | false >,
    "timeDataCumulative": < true | false >,
    "timeOffsetOffset": <timeOffset2>,
    "timeOffsetUnits": "<timeOffsetUnits2>"
  }
}ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
{
  "0": {
    "useTime": true,
    "timeDataCumulative": false,
    "timeOffset": 1,
    "timeOffsetUnits": "esriTimeUnitsYears"
  },
  "3": {
    "useTime": false
  }
}
- **dynamicLayers(Dynamic Layers):** Use this parameter to modify the layer drawing order, change layer drawing info, and change the layer data source version for this request. New layers (dataLayer ) can also be added to the dynamicLayers  based on the map service registered workspaces. The order of the dynamicLayers  array defines the layer drawing order. The first element of the dynamicLayers  array draws on top of all other layers.Note
When defining a dynamic layer, if the layer source is of type mapLayer, use the ID in layer resource as the mapLayerId  for the dynamic layer.
If the layer source is a dataLayer based on a data table (table or queryTable dataSource), set drawingInfo .
If the layer source is a workspace layer based on a Layer File (.lyrx ) generated from ArcGIS Pro, drawingInfo  is optional. When drawingInfo  is provided, map service ignores the symbology that is stored with the Layer File and instead uses the one the user provides.
transparency  is on a scale of 1-100, where 0 is opaque and 100 is 100 percent transparent.
Use scaleSymbols  to turn off scaling symbols on a layer that reports canScaleSymbols  to be true on the  layer resource.
Use showLabels  to turn on/off labeling on a layer that has labels (hasLabels  set to true on  layer resource).
To turn on labels on a layer that does not have labels defined on it, set showLabels  to true and use labelingInfo to specify labels.
Dynamic layers support both the Standard and Maplex labeling engines. The labeling engine used is dependent on the one that was set in the map document used to create the map service.
Syntax:Use dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
[
  {
    "id": <layerOrTableId>,
    "source": <layer source>,
    "definitionExpression": "<definitionExpression>",
    "drawingInfo": {
      "renderer": <renderer>,
      "transparency": <transparency>,
      "scaleSymbols": <true | false >,
      "showLabels": <true | false >,
      "labelingInfo": <labeling info>
    },
    "layerTimeOptions": {
      "useTime": <true | false>,
      "timeDataCumulative": <true | false>,
      "timeOffset": <timeOffset>,
      "timeOffsetUnits": "<esriTimeUnitsCenturies | esriTimeUnitsDays
                            | esriTimeUnitsDecades | esriTimeUnitsHours
                            | esriTimeUnitsMilliseconds | esriTimeUnitsMinutes
                            | esriTimeUnitsMonths | esriTimeUnitsSeconds
                            | esriTimeUnitsWeeks | esriTimeUnitsYears
                            | esriTimeUnitsUnknown>"
    }
  },
  {
    "id": <layerOrTableId>,
    "source": <layer source>,
    "definitionExpression": "<definitionExpression>",
    "drawingInfo": {
      "renderer": <renderer>,
      "transparency": <transparency>,
      "scaleSymbols": <true | false >,
      "showLabels": <true | false >,
      "labelingInfo": <labeling info>
    },
    "layerTimeOptions": {
      "useTime": <true | false>,
      "timeDataCumulative": <true | false>,
      "timeOffset": <timeOffset>,
      "timeOffsetUnits": "<esriTimeUnitsCenturies | esriTimeUnitsDays
                           | esriTimeUnitsDecades | esriTimeUnitsHours
                           | esriTimeUnitsMilliseconds | esriTimeUnitsMinutes
                           | esriTimeUnitsMonths | esriTimeUnitsSeconds
                           | esriTimeUnitsWeeks | esriTimeUnitsYears
                           | esriTimeUnitsUnknown>"
    }
  }
]See the Dynamic Layers codeblock examples section below for examples.
- **gdbVersion(Geodatabase Version Name):** Use this parameter to specify the geodatabase version.SyntaxUse dark colors for code blocksCopy1
gdbVersion=<geodatabase version>ExampleUse dark colors for code blocksCopy1
gdbVersion=sde.USER1
- **mapScale(Map Scale):** Use this parameter to export a map image at a specific scale, with the map centered around the center of the specified bounding box (bbox ). Where scale is typically represented as 1:x , this value is x .SyntaxUse dark colors for code blocksCopy1
mapScale=<scale>ExamplesUse dark colors for code blocksCopy1
2
3
mapScale=5000000

mapScale=5E6
- **rotation(Rotation):** Use this parameter to export a map image rotated at a specific angle, with the map centered around the center of the specified bounding box (bbox ). It could be a positive or negative number.SyntaxUse dark colors for code blocksCopy1
rotation=<degree>ExmapleUse dark colors for code blocksCopy1
2
//returns a map image rotated 45° counter-clockwise
rotation=45
- **datumTransformations(Datum Transformations):** Use it to apply one or more datum transformations to the map when imageSR  is different than the map service's spatial reference. It is an array of transformation  elements. Transformations specified here are used to project features from layers within a map service to imageSR .NoteWhile specifying transformation, you need to think about which datum transformation is most applicable to project a layer to the imageSR . The sourceSpatialReference  property for each layer resource reports which spatial reference features are stored in the source dataset.For a list of valid datum transformation ID values (WKID) and well-known text (WKT) strings, see Using spatial references. For more information on datum transformation, see the transformation  parameter in the Project operation.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
//Syntax with WKID (Well-Known ID)
datumTransformations=[<wkid1>, <wkid2>]

//Syntax with datum json element with WKID
datumTransformations=[{"wkid": <wkid1>}, {"wkid": <wkid2>}]

//Syntax with datum json element with WKT (Well-Known Text)
datumTransformations=[{"wkt": "<wkt1>"}, {"wkt": "<wkt2>"}]ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
//Examples with WKID
datumTransformations=[1623, 4078]

//Examples with WKT
datumTransformations=[{"wkt": "GEOGTRAN[\"S_JTSK_To_WGS_1984_1\", GEOGCS[\"GCS_S_JTSK\",
                               DATUM[\"D_S_JTSK\", SPHEROID[\"Bessel_1841\", 6377397.155, 299.1528128]],
                               PRIMEM[\"Greenwich\", 0.0], UNIT[\"Degree\", 0.0174532925199433]],
                               GEOGCS[\"GCS_WGS_1984\", DATUM[\"D_WGS_1984\", SPHEROID[\"WGS_1984\",
                               6378137.0, 298.257223563]], PRIMEM[\"Greenwich\", 0.0], UNIT[\"Degree\",
                               0.0174532925199433]], METHOD[\"Position_Vector\"],
                               PARAMETER[\"X_Axis_Translation\", 570.8],
                               PARAMETER[\"Y_Axis_Translation\", 85.7], PARAMETER[\"Z_Axis_Translation\",
                               462.8], PARAMETER[\"X_Axis_Rotation\", 4.998],
                               PARAMETER[\"Y_Axis_Rotation\", 1.587], PARAMETER[\"Z_Axis_Rotation\",
                               5.261], PARAMETER[\"Scale_Difference\", 3.56], OPERATIONACCURACY[1.0]]"}]

//Examples with datum to apply multiple transformations including a composite transformation
datumTransformations=[{"wkid":108889}, {"geoTransforms":[{"wkid":108889,"transformForward":true},
                                          {"wkid":1622,"transformForward":false}]}]
- **layerParameterValues(Layer Parameter Values):** It allows you to filter the features of individual layers in the exported map by specifying a value or values to an array of preauthored parameterized filters for those layers. When this value is not specified for any parameter in a request, the default value assigned during authoring is used instead. When a parameterInfo  allows multiple values, you must pass them in an array.NoteCheck parameterInfos  at the layer resources for the available parameterized filters, their default values, and expected data type.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
[
  {
    "<layerId1>": {
      "<parameterName1>": <value>,               //when the multipleValues=false in the parameterInfo
      "<parameterName2>": [<value1> | <value2>]  //when the multipleValues=true in the parameterInfo
    },
    "<layerId2>": {
      "<parameterName3>": <value>
    }
  }
]ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
[
  {
    "0": {
      "floor": 10,
      "incidentDate": 1475877014000  //date time value needs to be passed in as epoch value
    },
    "1": {
      "crimeType": ["burglary", "theft"]
    }
  }
]
- **mapRangeValues(Map Range Values):** It allows you to filter features in the exported map from all layers that are within the specified range instant or extent.Note: Check rangeInfos  at the layer resources for the available ranges. Null is allowed in value-range cases, that means infinity. For example, [null, 1500]  means all features with values <= 1500, and [1000, null]  means all features with values >= 1000.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
[
  {
    "name": "<rangeName1>", //range id
    "value": <value> | [<value1>, <value2>] //single value or a value-range
  },
  {
    "name": "<rangeName2>",
    "value": <value> | [<value3>, <value4>]
  }
]ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
[
  {
    "name": "salinity",
    "value": 5            //a range instant (or single) value passed

  },
  {
    "name": "elevation",
    "value": [1000, 1500] //a range extent is passed
  }
]
- **layerRangeValues(Layer Range Values):** It allows you to filter the features of individual layers in the exported map by specifying a value or values to an array of preauthored parameterized filters for those layers. When this value is not specified for any parameter in a request, the default value assigned during authoring is used instead. When a parameterInfo  allows multiple values, you must pass them in an array.NoteCheck parameterInfos  at the layer resources for the available parameterized filters, their default values, and expected data type.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
[
  {
    "<layerId1>": {
      "<parameterName1>": <value>,               //when the multipleValues=false in the parameterInfo
      "<parameterName2>": [<value1> | <value2>]  //when the multipleValues=true in the parameterInfo
    },
    "<layerId2>": {
      "<parameterName3>": <value>
    }
  }
]ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
[
  {
    "0": {
      "floor": 10,
      "incidentDate": 1475877014000    //date time value needs to be passed in as epoch value
    },
    "1": {
      "crimeType": ["burglary", "theft"]
    }
  }
]
- **clipping(Clipping):** This parameter was added at 10.8. It allows you to mask out layers outside of the clip polygon in the exported map. Clipping can mask out any layer type, in other words, feature layers, raster layers, TIN layers, and so on. Optionally, you can use excludedLayers  to exclude layers from being clipped.Notegeometry  must be a polygon or an envelope.Both clipping  and spatialFilter  are applied when provided together.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
{
  "geometryType": "<esriGeometryPolygon | esriGeometryEnvelope>",
  "geometry": {<geometry>},
  "excludedLayers": [<layerId>, <layerId>] //optional
}ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
{
  "geometryType": "esriGeometryPolygon",
  "geometry": {
    "spatialReference": {
      "wkid": 102008
    },
    "rings": [
      [
        [-816126, 216280],
        [-565859, 199948],
        [-607349, -50318],
        [-785229, -38842],
        [-816126, 216280]
      ]
    ]
  },
  "excludedLayers": [ 1, 4 ] //optional
}
- **spatialFilter(Spatial Filter):** This parameter was added at 10.8. It allows you to filter out features from all feature layers based on the input spatial filter. It is like layerDefs  but instead of using an attribute filter, the map service uses a spatial filter to determine which features will be drawn.NoteSpatial filters only work against feature layers. Both clipping  and spatialFilter  are applied when provided together.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
{
  "spatialRel": "<esriSpatialRelIntersects | esriSpatialRelContains | esriSpatialRelCrosses
                  | esriSpatialRelEnvelopeIntersects | esriSpatialRelIndexIntersects
                  | esriSpatialRelOverlaps | esriSpatialRelTouches | esriSpatialRelWithin
                  | esriSpatialRelRelation>", //default = esriSpatialRelIntersects
  "geometryType": "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline
                     | esriGeometryPolygon | esriGeometryEnvelope >",
  "geometry": {<geometry>}
}ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
{
  "spatialRel" : "esriSpatialRelIntersects",
  "geometryType" : "esriGeometryPolygon",
  "geometry": {
    "spatialReference": {"wkid": 102008},
    "rings": [
      [
        [-816126, 216280],
        [-565859, 199948],
        [-607349, -50318],
        [-785229, -38842],
        [-816126, 216280]
      ]
    ]
  }
}
- **selectionDefinitions(Spatial Filter):** This parameter was added at 11.4. It allows you to highlight selected features with default or customized selection symbol.
When a layer reports uniqueIdInfo in its resources, you should pass in uniqueIds, otherwise include objectIds. Both should not be included in the same request.
uniqueIdInfo takes an array of string literals when uniqueIdInfo.type is simple in layer resources, or it takes an 2-dimensional array of string literals when type is composite.
Values in the 2D array must be passed in the same order their corresponding fields are specified in uniqueIdInfo.fields array.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
[
  {
    "layerId": "<layerId>,
    "objectIds": [<oid1>, <oid2>],
    "uniqueIds": ["<uniqueId1>", "<uniqueId2>"],
    //when uniqueIdInfo.type is composite
    "uniqueIds": [["<id-1>", "<id-2>"],  ["<id-a>", "<id-b>"]],
    "selectionColor": [<red>, <green>, <blue>],  //when not specificed, it uses the default color
    "selectionFillColor": [<red>, <green>, <blue>]  //optional, uses the defualt fill color when omitted
  }
]Example 1: using objectIds to highlight featuresUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
[
  {
        "layerId": 1,
        "objectIds": [188, 187]
    },
    {
        "layerId": 3,
        "objectIds": [2796, 3036, 2702, 2632, 2920],
        "selectionColor": [255, 255, 0]
    },
    {
        "layerId": 5,
        "objectIds": [3605, 3679, 3686, 4014, 4149],
        "selectionColor": [0, 255, 0],
        "selectionFillColor": [0, 0, 255]
    }
]Example 2: using uniqueIds to highlight featuresUse dark colors for code blocksCopy1
2
3
4
5
6
[
    {
        "layerId": 5,
        "uniqueIds": ["id1", "id2", "id3"]
    }
]Example 3: using uniqueIds to highlight features when uniqueIdInfo.type is compositeUse dark colors for code blocksCopy1
2
3
4
5
6
[
    {
        "layerId": 5,
        "uniqueIds": [["st-code1", "st-code2"], ["cnty-code1", "cnty-code2"]]
    }
]
- **f(Format):** The response format. The default response format is html . If the format is image , the image bytes are directly streamed to the client.Values: html  | json  | pjson  | image  | kmz

## Description

The export operation is performed on a map service resource. The result of this operation is a map image resource. This resource provides information about the exported map image such as its URL, its width and height, extent and scale.

Apart from the usual response formats of HTML and JSON, users can also request a format called image while performing this operation. When users perform an export with the format of image , the server responds by directly streaming the image bytes to the client. With this approach, you don't get any information associated with the exported map other than the actual image.

The extent displayed in the exported map image may not exactly match the extent sent in the box parameter when the aspect ratio of the image size does not match the aspect ratio of the box. The aspect ratio is the height divided by the width. In these cases, the extent is resized to prevent map images from appearing stretched. The exported map's extent is sent along with the JSON and HTML responses, and may be used in client-side calculations. It's important that the client-side code update its extent based on the response.

## Request Parameters

## Response

## Examples

```json
1
<xmin>, <ymin>, <xmax>, <ymax>
```

```json
1
2
//Where layerId1 and layerId2 are the layer ids returned by the
[show | hide | include | exclude]:layerId1,layerId2
```

