# Query (Feature Service)

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service/

## Service Info

- **Parameter:** Details
- **layerDefs:** Allows you to filter the features of individual layers in the query by specifying definition expressions (WHERE clauses) for those layers. A definition expression for a layer that is published with the service will always be honored. For more information on WHERE clauses, see the SQL 92 WHERE clause section below.SyntaxUse dark colors for code blocksCopy1
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
//Simple syntax. Layer IDs are returned by the feature service resource
layerId1:layerDef1;layerId2:layerDef2

//JSON representation for Layer Definitions. Layer IDs are returned by the feature service resource
{ "<layerId1>" : "<layerDef1>" , "<layerId2>" : "<layerDef2>" }

//JSON representation of a layer definition to specify output fields.
//Layer IDs are returned by the feature service resource
[
  {
    "layerId" : <layerId1>,
    "where": "<where clause>",
    "outfields": "<field1>,<field2>"
  },
  {
    "layerId" : <layerId2>,
    "where": "<where clause>",
    "outfields": "<field1>,<field2>"
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
//Simple example
0:POP2000 > 1000000;5:AREA > 100000

//JSON representation for Layer Definitions
{"0":"POP2000 > 1000000","5":"AREA > 100000"}

//JSON representation of a layer definition to specify output fields
[
  {
    "layerId" : 0,
    "where" : "OBJECTID<100",
    "outFields" : "*"
  },
  {
    "layerId" : 1,
    "where" : "OBJECTID<323",
    "outFields" : "OBJECTID,CREATOR"
  }
]
- **geometry:** The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the  JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, you can specify the geometry of envelopes and points with a simple comma-separated syntax.
Syntax:

JSON structures: geometryType=<geometryType>&geometry={  geometry}
Envelope simple syntax: geometryType=esriGeometryEnvelope&geometry=<xmin>,<ymin>,<xmax>,<ymax>
Point simple syntax: geometryType=esriGeometryPoint&geometry=<x>,<y>

Examples:

geometryType=esriGeometryEnvelope&geometry={xmin: -104, ymin: 35.6, xmax: -94.32, ymax: 41}
geometryType=esriGeometryEnvelope&geometry=-104,35.6,-94.32,41
geometryType=esriGeometryPoint&geometry=-104,35.6
- **geometryType:** The type of geometry specified by the geometry  parameter. The geometry type can be an envelope, a point, a line, or a polygon. The default geometry type is an envelope.
Values: esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon | esriGeometryEnvelope
- **inSR:** The spatial reference of the input geometry .
The spatial reference can be specified as either a well-known ID or a  spatial reference JSON object.
If inSR  is not specified, the geometry is assumed to be in the spatial reference of the map.
- **spatialRel:** The spatial relationship to be applied to the input geometry  while performing the query. The supported spatial relationships include intersects, contains, envelope intersects, within, and so on. The default spatial relationship is intersects (esriSpatialRelIntersects ).
Values: esriSpatialRelIntersects | esriSpatialRelContains | esriSpatialRelCrosses | esriSpatialRelEnvelopeIntersects | esriSpatialRelIndexIntersects | esriSpatialRelOverlaps | esriSpatialRelTouches | esriSpatialRelWithin | esriSpatialRelRelation
- **time:** The time instant or the time extent to query.
Time instant
Syntax: time=<timeInstant>
Example: time=1199145600000  (1 Jan 2008 00:00:00 GMT)
Time extent
Syntax: time=<startTime>, <endTime>
Example: time=1199145600000, 1230768000000  (1 Jan 2008 00:00:00 GMT to 1 Jan 2009 00:00:00 GMT)
A null value specified for start time or end time will represent infinity for start or end time, respectively. Example: time=null, 1230768000000
- **outSR:** The spatial reference of the returned geometry. The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. If outSR  is not specified, the geometry is returned in the spatial reference of the service.
- **gdbVersion:** The geodatabase version to query. This parameter applies only if the hasVersionedData  property of the service and the isDataVersioned  property of the layers queried are true .If gdbVersion  is not specified, the query will apply to the published map’s version.
Syntax: gdbVersion=<version>
Example: gdbVersion=SDE.DEFAULT
- **historicMoment:** The historic moment to query. This option was added at 10.5 and works with ArcGIS Server services only. This parameter applies only if the supportsQueryWithHistoricMoment  property of the layers being queried is set to true . This setting is provided in the layer resource. If historicMoment  is not specified, the query will apply to the current features.SyntaxUse dark colors for code blocksCopy1
historicMoment=<Epoch time in milliseconds>ExampleUse dark colors for code blocksCopy1
historicMoment=1199145600000
- **returnGeometry:** If true , the result includes the geometry associated with each feature returned. The default is true .Values: true  | false
- **maxAllowableOffset:** This option can be used to specify the maxAllowableOffset  to be used for generalizing geometries returned by the query  operation. The maxAllowableOffset  is in the units of the outSR . If outSR  is not specified, maxAllowableOffset  is assumed to be in the unit of the spatial reference of the map.ExampleUse dark colors for code blocksCopy1
maxAllowableOffset=2
- **returnIdsOnly:** If true , the response only includes an array of object IDs for each layer. Otherwise, the response is a feature set. The default is false .While there is a limit to the number of features included in the feature set response, there is no limit to the number of object IDs returned in the ID array response. Clients can exploit this to get all the query conforming object IDs by specifying returnIdsOnly  as true  and subsequently requesting feature sets for subsets of object IDs.Values: true  | false
- **returnCountOnly:** If true , the response only includes the count  (number of features/records) that would be returned by a query. Otherwise, the response is a feature set. The default is false .Values: true  | false
- **returnZ:** If true , z-values are included in the results if the features have z-values. Otherwise, z-values are not returned. The default is false . This parameter only applies if returnGeometry  is true  and at least one of the layer's hasZ  properties is true .Values: true  | false
- **returnM:** If true , m-values are included in the results if the features have m-values. Otherwise, m-values are not returned. The default is false . This parameter only applies if returnGeometry  is true  and at least one of the layer's hasM  properties is true .Values: true  | false
- **geometryPrecision:** The number of decimal places in the response geometries returned by the query  operation. This applies to x- and y-values only (not m- or z-values).Use dark colors for code blocksCopy1
geometryPrecision=3
- **multipatchOption:** How the geometry of a multipatch feature will be returned. This parameter only applies if the layers in the service have the esriGeometryMultipatch  geometry type. When set to xyFootprint , the x,y footprint of each multipatch geometry will be returned in the result. When set to stripMaterials , the multipatch geometry will be returned without materials (for example, colors and textures). When set as embedMaterials , the multipatch geometry will be returned with materials embedded in it. If set to externalizeTextures , the multipatch geometry will be returned with materials, but the textures will be returned by reference.NoteIf returnGeometry  is false , specifying the multipatchOption  is not required.Values: xyFootprint  | stripMaterials  | embedMaterials  | externalizeTextures
- **returnTrueCurves(Optional):** This option was added at 10.5. When set to true , the query returns true curves in output geometries. When set to false , curves are converted to densified polylines or polygons. The default value is false .Values: true  | false
- **sqlFormat:** The sqlFormat  parameter can be either standard SQL-92 standard  or it can use the native SQL of the underlying data store native . The default is none , which means the sqlFormat  depends on the useStandardizedQuery  parameter.NoteThe SQL format native  is supported only when useStandardizedQuery=false .Values: none  | standard  | native
- **timeReferenceUnknownClient:** Setting timeReferenceUnknownClient  as true  indicates that the client is capable of working with data values that are not in UTC. If its not set to true , and the service layer's datesInUnknownTimeZone  property is true , then an error is returned. The default is falseIts possible to define a service's time zone of date fields as unknown. Setting the time zone as unknown means that date values will be returned as-is from the database, rather than as date values in UTC. Non-hosted feature services can be set to use an unknown time zone using ArcGIS Server Manager. Setting the time zones to unknown also sets the datesInUnknownTimeZone  layer property as true . Currently, hosted feature services do not support this setting. This setting does not apply to editor tracking date fields which are stored and returned in UTC even when the time zone is set to unknown.Most clients released prior to ArcGIS Enterprise 10.9 will not be able to work with feature services that have an unknown time setting. The timeReferenceUnknownClient  parameter prevents these clients from working with the service in order to avoid problems.. Setting this parameter to true  indicates that the client is capable of working with unknown date values that are not in UTC.NoteArcGIS Pro 2.7 or newer can work with these feature services.Value: true  | false
- **returnUniqueIdsOnly
(Optional):** Boolean value that deafults to false. If true, uniqueIdFieldNames and uniqueIds arrays are returned.AttentionUse of objectId and/or globalId is not allowed when using uniqueIds. The request will fail if objectId is included when OIDFieldContainsHashValue and/or useUniqueIds is true. The request will also fail if uniqueIds are included when OIDFieldContainsHashValue is false.Values: true | false
- **f:** The response format. The default response format is html .Values: html | json  (default, when returnIdsOnly=false  and returnCountOnly=false )Values: html | json  (when returnIdsOnly=true  or returnCountOnly=true )

## Description

The query operation queries a feature service resource and returns either a feature set for each layer in the query, a count of features for each layer (if returnCountOnly is set to true ), or an array of feature IDs for each layer in the query (if returnIdsOnly is set to true ).

While there is a limit to the number of features included in the response (see the maxRecordCount property of the feature service), there is no limit to the number of object IDs returned in the ID array response. Clients can exploit this to get all the query conforming object IDs by specifying returnIdsOnly=true and subsequently requesting feature sets for subsets of object IDs.

In the feature set response, the layer features include their geometries. The records for tables do not.

> **Note:** NoteIf the query results include an empty feature set, the field set is not returned.

You can provide arguments to the query operation as query parameters defined in the parameters table below.

## Request Parameters

## Response

The syntax example below demonstrates the structure of the response returned by query when returnCountOnly is false :

The syntax example below demonstrates the structure of the response returned by query when returnCountOnly is true .

The syntax example below demonstrates the structure of the response returned by query when returnIdsOnly is true .

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
//Simple syntax. Layer IDs are returned by the feature service resource
layerId1:layerDef1;layerId2:layerDef2

//JSON representation for Layer Definitions. Layer IDs are returned by the feature service resource
{ "<layerId1>" : "<layerDef1>" , "<layerId2>" : "<layerDef2>" }

//JSON representation of a layer definition to specify output fields.
//Layer IDs are returned by the feature service resource
[
  {
    "layerId" : <layerId1>,
    "where": "<where clause>",
    "outfields": "<field1>,<field2>"
  },
  {
    "layerId" : <layerId2>,
    "where": "<where clause>",
    "outfields": "<field1>,<field2>"
  }
]
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
//Simple example
0:POP2000 > 1000000;5:AREA > 100000

//JSON representation for Layer Definitions
{"0":"POP2000 > 1000000","5":"AREA > 100000"}

//JSON representation of a layer definition to specify output fields
[
  {
    "layerId" : 0,
    "where" : "OBJECTID<100",
    "outFields" : "*"
  },
  {
    "layerId" : 1,
    "where" : "OBJECTID<323",
    "outFields" : "OBJECTID,CREATOR"
  }
]
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
```

```json
1
historicMoment=<Epoch time in milliseconds>
```

