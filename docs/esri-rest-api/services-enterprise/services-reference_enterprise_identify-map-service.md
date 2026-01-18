# Identify (Map Service)

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/identify-map-service/

## Service Info

- **Parameter:** Details
- **geometry(Required):** The geometry to identify on. The type of the geometry is specified by the geometryType  parameter. The structure of the geometries is same as the structure of the JSON geometry objects returned by ArcGIS REST API. In addition to the JSON structures, for points and envelopes, you can specify the geometries with a simpler comma-separated syntax.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
//JSON structures
geometryType=<geometryType>&geometry={}

//Point simple syntax
geometryType=esriGeometryPoint&geometry=<x>,<y>

//Envelope simple syntax
geometryType=esriGeometryEnvelope&geometry=<xmin>,<ymin>,<xmax>,<ymax>ExamplesUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
//JSON
geometryType=esriGeometryPoint&geometry={x: -104, y: 35.6}

//Point
geometryType=esriGeometryPoint&geometry=-104,35.6

//Envelope
geometryType=esriGeometryEnvelope&geometry=-104,35.6,-94.32,41NoteThe coordinates must always use a period as the decimal separator, even in countries where a comma is traditionally used.
- **geometryType:** The type of geometry specified by the geometry parameter. The geometry type could be a point, line, polygon, or envelope. The default geometry type is a point (esriGeometryPoint ).Values: esriGeometryPoint  | esriGeometryMultipoint  | esriGeometryPolyline  | esriGeometryPolygon  | esriGeometryEnvelope
- **sr:** The well-known ID of the spatial reference of the input and output geometries as well as the mapExtent . If sr  is not specified, the geometry  and the mapExtent  are assumed to be in the spatial reference of the map, and the output geometries are also in the spatial reference of the map.
- **layerDefs:** Allows you to filter the features of individual layers in the exported map by specifying definition expressions for those layers. A definition expression for a layer that is published with the service will be always honored.SyntaxUse dark colors for code blocksCopy1
2
//Where layerId1 and layerId2 are the layer IDs returned by the map service resource.
{"<layerId1>": "<layerDef1>", "<layerId2>": "<layerDef2>"}ExampleUse dark colors for code blocksCopy1
{"0":"POP2000 > 1000000","5":"AREA > 100000"}NoteSimple syntax is no longer supported starting at 10.5.
- **time:** The time instant or the time extent of the features to be identified.NoteA null value specified for start time or end time will represent infinity for start or end time, respectively.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
//Time instant syntax
time=<timeInstant>

//Time extent syntax
time=<startTime>, <endTime>ExamplesUse dark colors for code blocksCopy1
2
3
4
5
//Time instant example (1 Jan 2008 00:00:00 GMT)
time=1199145600000

//Time extent example (1 Jan 2008 00:00:00 GMT to 1 Jan 2009 00:00:00 GMT)
time=1199145600000, 1230768000000
- **timeRelation(Time Relation):** Allows you to control whether to include or exclude features that are at the beginning or the end of a time window. The default value is esriTimeRelationOverlaps .SyntaxUse dark colors for code blocksCopy1
2
//Time Relation syntax
timeRelation=<esriTimeRelationOverlaps | esriTimeRelationOverlapsStartWithinEnd | esriTimeRelationAfterStartOverlapsEnd | esriTimeRelationWithin>ExampleUse dark colors for code blocksCopy1
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
//Draw all features from year 2008 i.e. Jan 1st, 2008 00:00:00 GMT to Jan 1st 2009 00:00:00 GMT including Jan 1st, 2009 00:00:00 GMT
time=1199145600000,1230768000000&timeRelation=esriTimeRelationOverlaps

//Draw all features from year 2008 i.e. Jan 1st, 2008 00:00:00 GMT to Jan 1st 2009 00:00:00 GMT excluding Jan 1st, 2009 00:00:00 GMT
time=1199145600000,1230768000000&timeRelation=esriTimeRelationOverlapsStartWithinEnd

//Draw all features from Jan 1st, 2008 00:00:00 GMT to Jan 1st 2009 00:00:00 GMT excluding Jan 1st, 2008 00:00:00 GMT
time=1199145600000,1230768000000&timeRelation=esriTimeRelationAfterStartOverlapsEnd

//Draw all features after Jan 1st, 2008 00:00:00 GMT and before Jan 1st 2009 00:00:00 GMT
time=1199145600000,1230768000000&timeRelation=esriTimeRelationWithin
- **layerTimeOptions:** The time options per layer. Users can indicate whether the layer should use the time extent specified by the time  parameter, whether to draw the layer features cumulatively, and the time offsets for the layer.SyntaxUse dark colors for code blocksCopy1
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
{
  "<layerId1>": {
    "useTime": < true | false >,  //If true, use the time extent specified by the time parameter
    "timeDataCumulative": < true | false >,  //If true, draw all the features from the beginning of time for that data
    "timeOffset": <timeOffset1>,  //Time offset for this layer so that it can be overlaid on the top of a previous or future time period
    "timeOffsetUnits": "<esriTimeUnitsCenturies | esriTimeUnitsDays | esriTimeUnitsDecades |
                       esriTimeUnitsHours | esriTimeUnitsMilliseconds | esriTimeUnitsMinutes |
                       esriTimeUnitsMonths | esriTimeUnitsSeconds | esriTimeUnitsWeeks | esriTimeUnitsYears |
                       esriTimeUnitsUnknown>"
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
- **layers:** The layers to perform the identify  operation on. The default value is top . There are three ways to specify which layers to identify on:
top —Only the topmost layer at the specified location
visible —All visible layers at the specified location
all —All layers at the specified location
You can either specify the layer options as mentioned above by themselves or specify the layer option in conjunction with a list of layer IDs. When both the layer option and the layer IDs are specified, the server treats it as a Boolean AND operator. For example, if the parameter is specified as visible:2,5 , only layers with IDs 2 and 5, if visible, are identified.SyntaxUse dark colors for code blocksCopy1
2
//Where layerId1 and layerId2 are the layer IDs returned by the .
[top | visible | all]:layerId1,layerId2ExamplesUse dark colors for code blocksCopy1
2
3
layers=all

layers=visible:2,5NoteIn the case of dynamic layers, the layer list is ignored. It instead uses top or all (default) to identify the layers defined in the dynamicLayers  parameter.
- **tolerance(Required):** The distance in screen pixels from the specified geometry  within which the identify  operation should be performed. The value for the tolerance is an integer.ExampleUse dark colors for code blocksCopy1
tolerance=2
- **mapExtent(Required):** The extent or bounding box of the map currently being viewed. Unless the sr  parameter has been specified, the mapExtent  is assumed to be in the spatial reference of the map. The mapExtent  and the imageDisplay  parameters are used by the server to determine the layers visible in the current extent. They are also used to calculate the distance on the map to search based on the tolerance  in screen pixels.SyntaxUse dark colors for code blocksCopy1
<xmin>, <ymin>, <xmax>, <ymax>ExampleUse dark colors for code blocksCopy1
mapExtent=-104,35.6,-94.32,41
- **imageDisplay(Required):** The screen image display parameters (width, height, and DPI) of the map being currently viewed. The mapExtent  and imageDisplay  parameters are used by the server to determine the layers visible in the current extent. They are also used to calculate the distance on the map to search based on the tolerance  in screen pixels.SyntaxUse dark colors for code blocksCopy1
<width>, <height>, <dpi>ExampleUse dark colors for code blocksCopy1
imageDisplay=600,550,96
- **returnGeometry:** If true , the result set will include the geometries associated with each result. The default is true .Values: true  | false
- **maxAllowableOffset:** This option can be used to specify the maximum allowable offset to be used for generalizing geometries returned by the identify  operation. The maxAllowableOffset  is in the units of the sr . If sr  is not specified, maxAllowableOffset  is assumed to be in the unit of the spatial reference of the map.ExampleUse dark colors for code blocksCopy1
maxAllowableOffset=2
- **geometryPrecision:** This option was added at 10.1. This option can be used to specify the number of decimal places in the response geometries returned by the identify  operation. This applies to x- and y-values only (not m- or z-values).ExampleUse dark colors for code blocksCopy1
geometryPrecision=3
- **dynamicLayers:** This option was added at 10.1. Use the dynamicLayers  property to reorder layers and change the layer data source. The dynamicLayers  property can also be used to add a new layer that was not defined in the map used to create the map service. The new layer should have its source pointing to one of the registered workspaces that was defined at the time the map service was created. The order of the dynamicLayers  array defines the layer drawing order. The first element of dynamicLayers  is stacked on top of all other layers. When defining a dynamic layer, source  is required.SyntaxUse dark colors for code blocksCopy1
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
[
  {
    "id": <layerOrTableId>,
    "source": <layer source>,
    "definitionExpression": "<definitionExpression>",
    "layerTimeOptions": {
      "useTime": <true | false>,
      "timeDataCumulative": <true | false>,
      "timeOffset": <timeOffset>,
      "timeOffsetUnits": "<esriTimeUnitsCenturies | esriTimeUnitsDays | esriTimeUnitsDecades |
                         esriTimeUnitsHours | esriTimeUnitsMilliseconds | esriTimeUnitsMinutes |
                         esriTimeUnitsMonths | esriTimeUnitsSeconds | esriTimeUnitsWeeks | esriTimeUnitsYears |
                         esriTimeUnitsUnknown>"
    }
  },
  {
    "id": <layerOrTableId>,
    "source": <layer source>,
    "definitionExpression": "<definitionExpression>",
    "layerTimeOptions": {
      "useTime": <true | false>,
      "timeDataCumulative": <true | false>,
      "timeOffset": <timeOffset>,
      "timeOffsetUnits": "<esriTimeUnitsCenturies | esriTimeUnitsDays | esriTimeUnitsDecades |
                         esriTimeUnitsHours | esriTimeUnitsMilliseconds | esriTimeUnitsMinutes |
                         esriTimeUnitsMonths | esriTimeUnitsSeconds | esriTimeUnitsWeeks | esriTimeUnitsYears |
                         esriTimeUnitsUnknown>"
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
[
  {  //disable time on existing map service layer
    "id": 501,
    "source": {
      "type": "mapLayer",
      "mapLayerId": 0
    },
    "layerTimeOptions": {
      "useTime": false
    }
  },
  {  //add a new layer from registered workspace
    "id": 502,
    "source": {
      "type": "dataLayer",
      "dataSource": {
        "type": "table",
        "workspaceId": "MAP",
        "dataSourceName": "MAP.user1.Taxlots"
      }
    }
  },
  {  //change the Version of existing map service layer
    "id": 503,
    "source": {
      "type": "mapLayer",
      "mapLayerId": 1,
      "version": "USER1"
    },
    "definitionExpression": "neighborhood = 'French Quarter'"
  }
]
- **returnZ:** This option was added at 10.1. If true , z-values will be included in the results if the features have z-values. Otherwise, z-values are not returned. The default is false . This parameter only applies if returnGeometry=true .Values: true  | false
- **returnM:** This option was added at 10.1. If true , m-values will be included in the results if the features have m-values. Otherwise, m-values are not returned. The default is false . This parameter only applies if returnGeometry=true .Values: true  | false
- **gdbVersion:** This option was added at 10.1. Switch map layers to point to an alternate geodatabase version.SyntaxUse dark colors for code blocksCopy1
gdbVersion=<geodatabase version>ExampleUse dark colors for code blocksCopy1
gdbVersion=sde.USER1
- **returnUnformattedValues:** This option was added at 10.5. If true , the values in the result will not be formatted; in other words, numbers will be returned as is and dates will be returned as epoch values, and subtype and domain values are returned as numeric values instead of descriptions. The default value is false, formatting numbers and dates on the server's setting.Values: true  | false
- **returnFieldName:** This option was added at 10.5. If true , field names will be returned instead of field aliases. The default value is false. In the case of layers with joins, fully qualified field names will be returned.Values: true  | false
- **datumTransformations:** This option was added at 10.5. Use this parameter to apply one or more datum transformations to the map when sr  is different than the map service's spatial reference. It is an array of transformation  elements. Transformations specified here are used to project features from layers within a map service to sr .NoteWhile specifying transformation, you need to think about which datum transformation is best applicable to project a layer (not the map service) to the sr . The sourceSpatialReference  property in a layer resource reports which spatial reference features are stored in the source dataset.For a list of valid datum transformation ID values and well-known text strings, see Using spatial references. For more information on datum transformation, see the transformation  parameter in the Project  operation.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
//Syntax with WKID
datumTransformations=[wkid1, wkid2]

//Syntax with datum
datumTransformations=[{<dt1>}, {<dt2>}]ExamplesUse dark colors for code blocksCopy1
2
3
4
//Examples with WKID to apply multiple transformations
datumTransformations=[1623, 4078]

//Examples with datum to apply multiple transformations including a composite transformation
- **mapRangeValues:** This option was added at 10.5. It allows you to filter features in the exported map from all layers that are within the specified range instant or extent.NoteCheck rangeInfos  at the layer resources for the available ranges. Null, representing infinity, is allowed in value-ranges. For example, [null, 1500]  means all features with values less than or equal to 1500 and [1000, null]  means all features with values greater than or equal to 1000.Use dark colors for code blocksCopy1
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
    "name": "<rangeName1>",  //range id
    "value": <value> | [<value1>, <value2>]   //single value or a value-range
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
- **layerRangeValues:** This option was added at 10.5. It allows you to filter features for each individual layer that are within the specified range instant or extent.NoteCheck rangeInfos  at the layer resources for the available ranges. Null, representing infinity, is allowed in value-ranges. For example, [null, 1500]  means all features with values less than or equal to 1500 and [1000, null]  means all features with values greater than or equal to 1000.SyntaxUse dark colors for code blocksCopy1
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
  "<layerId1>": [
    {
      "name": "<rangeName1>",  //range id
      "value": <value> | [<value1>, <value2>]   //single value or a value-range
    },
    {
      "name": "<rangeName2>",
      "value": <value> | [<value3>, <value4>]
    }
  ],
  "<layerId2>": [
    {
      "name": "<rangeName1>",
      "value": <value> | [<value1>, <value2>]
    }
  ]
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
  "0": [
    {
      "name": "salinity",
      "value": 5  //a range instant (or single) value passed
    },
    {
      "name": "elevation",
      "value": [1000, 1500] //a range extent is passed
    }
  ],
  "1": [
    {
      "name": "floor",
      "value": [null, 5]   //selects features with values <= 5
    }
  ]
}
- **layerParameterValues:** This option was added at 10.5. It allows you to filter the features of individual layers by specifying values to an array of preauthored parameterized filters for those layers. When a value is not specified for any parameter in a request, the default value that is assigned during authoring time is used instead. When a parameterInfo  allows multiple values, you must pass them in an array.NoteCheck parameterInfos  at the layer resources for the available parameterized filters and their default values and expected data type.SyntaxUse dark colors for code blocksCopy1
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
- **historicMoment:** This option was added at 10.6.1. It specifies features from the historic moment to identify. This parameter applies only if the layer is archiving enabled and the supportsQueryWithHistoricMoment  property is set to true . This property is provided in the layer resource. If historicMoment  is not specified, identify  will work with the current features.SyntaxUse dark colors for code blocksCopy1
historicMoment=<Epoch time in milliseconds>ExampleUse dark colors for code blocksCopy1
historicMoment=1199145600000
- **clipping:** This parameter was added at 10.8. It allows you to mask out layers outside of the clip polygon in the exported map. Clipping can mask out any layer type, such as feature layers, raster layers, and TIN layers. Optionally, use excludedLayers  to exclude layers from being clipped.NoteThe geometry  parameter must be a polygon or an envelope.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
{
  "geometryType": "<esriGeometryPolygon | esriGeometryEnvelope>",
  "geometry": {<geometry>},
  "excludedLayers" : [<layerId>, <layerId>] //optional
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
- **spatialFilter:** This parameter was added at 10.8. It allows you to filter out features from all feature layers based on the input spatial filter. It is similar to layerDefs , but instead of using an attribute filter, the map service uses a spatial filter to determine which features can be identified.NoteSpatial filters only work against feature layers. When both clipping  and spatialFilter  are provided, clipping takes precedence and spatialFilter  is ignored.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
{
  "spatialRel": "<esriSpatialRelIntersects | esriSpatialRelContains | esriSpatialRelCrosses | esriSpatialRelEnvelopeIntersects
                | esriSpatialRelIndexIntersects | esriSpatialRelOverlaps | esriSpatialRelTouches
                | esriSpatialRelWithin | esriSpatialRelRelation>", //default = esriSpatialRelIntersects
  "geometryType": "<esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon | esriGeometryEnvelope >",
  "geometry": { <geometry> }
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
  "spatialRel": "esriSpatialRelIntersects",
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
  }
}
- **f:** The response format. The default response format is html .Values: html  | json

## Description

The identify operation is performed on a map service resource to discover features at a geographic location. The result of this operation is an identify results resource. Each identified result includes its name, layer ID, layer name, geometry and geometry type, and other attributes of that result as name-value pairs.

Supports the following new parameters. These parameters are only supported by map services published from ArcGIS Pro.

> **Note:** timeRelation —Control whether you want to include or exclude start and end values specified in the time parameter. NoteCheck for supportsTimeRelation on a map service's root resource before using timeRelation .

Supports the following new parameters. These parameters are only supported by map services published from ArcGIS Pro.

> **Note:** clipping —Mask out layers outside of a clip polygon. NoteCheck for supportsClipping , supportsSpatialFilter on a map service's root resource using clipping . spatialFilter —Draw or query only features that meet the spatial filter criteria.

The operation supports the following new parameter:

The operation was enhanced with the following Boolean flags to support returning unformatted values and field names:

## Request Parameters

## Response

## Examples

```json
1
2
3
4
5
6
7
8
//JSON structures
geometryType=<geometryType>&geometry={}

//Point simple syntax
geometryType=esriGeometryPoint&geometry=<x>,<y>

//Envelope simple syntax
geometryType=esriGeometryEnvelope&geometry=<xmin>,<ymin>,<xmax>,<ymax>
```

```json
1
2
3
4
5
6
7
8
//JSON
geometryType=esriGeometryPoint&geometry={x: -104, y: 35.6}

//Point
geometryType=esriGeometryPoint&geometry=-104,35.6

//Envelope
geometryType=esriGeometryEnvelope&geometry=-104,35.6,-94.32,41
```

```json
1
2
//Where layerId1 and layerId2 are the layer IDs returned by the map service resource.
{"<layerId1>": "<layerDef1>", "<layerId2>": "<layerDef2>"}
```

