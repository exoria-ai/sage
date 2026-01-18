# Query (Feature Service/Layer)

**Category:** manual
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer/

## Service Info

- **Parameter:** Details
- **where:** A WHERE clause for the query filter.SQL-92 WHERE clause syntax on the fields in the layer is supported for most data sources. Some data sources have restrictions on what is supported. Hosted feature services in ArcGIS Enterprise running on a spatiotemporal data source only support a subset of SQL-92. For example, spatiotemporal-based feature services support the like operator but do not support the not like operator or field equivalency expressions such as field1 = field2. Below is a list of supported SQL-92 with spatiotemporal-based feature services:Use dark colors for code blocksCopy1
2
3
4
5
( '<=' | '>=' | '<' | '>' | '=' | '!=' | '<>' | LIKE )
(AND | OR)
(IS | IS_NOT)
(IN | NOT_IN) ( '(' ( expr ( ',' expr )* )? ')' )
COLUMN_NAME BETWEEN LITERAL_VALUE AND LITERAL_VALUEFor information on how to format time and date information, see the Date-time queries section below.ExamplesUse dark colors for code blocksCopy1
2
3
4
5
6
7
where=POP2000 > 350000

where=CITY_NAME = 'Barrington'

where=shape is null

where=shape is not null
- **objectIds:** The object IDs of this layer or table to be queried.Note
There might be a drop in performance if the layer/table data source resides in an enterprise geodatabase and more than 1,000 objectIds  are specified.
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
- **inSR:** The spatial reference of the input geometry. The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. If the inSR is not specified, the geometry is assumed to be in the spatial reference of the layer.
- **spatialRel:** The spatial relationship to be applied to the input geometry  while performing the query. The supported spatial relationships include intersects, contains, envelope intersects, within, and so on. The default spatial relationship is intersects (esriSpatialRelIntersects ).At 10.9.1, a supportedSpatialRelationships property may be provided on the layer resource that specifies which spatial relationships are supported.NoteIf the relation is specified as esriSpatialRelRelation, the relationParam parameter describes the spatial relationship and must be specified.
Values: esriSpatialRelIntersects | esriSpatialRelContains | esriSpatialRelCrosses | esriSpatialRelEnvelopeIntersects | esriSpatialRelIndexIntersects | esriSpatialRelOverlaps | esriSpatialRelTouches | esriSpatialRelWithin | esriSpatialRelRelation
- **relationParam:** The spatial relate function that can be applied while performing the query operation. An example for this spatial relate function is FFFTTT\*\*\*. For more information on this spatial relate function, see the documentation for the spatial relate function.The string describes the spatial relationship to be tested when the spatial relationship is esriSpatialRelRelation.NoteThis parameter is not supported on ArcGIS Enterprise hosted feature services.
- **time:** The time instant or the time extent to query.
Time instant
Syntax: time=<timeInstant>
Example: time=1199145600000  (1 Jan 2008 00:00:00 GMT)
Time extent
Syntax: time=<startTime>, <endTime>
Example: time=1199145600000, 1230768000000  (1 Jan 2008 00:00:00 GMT to 1 Jan 2009 00:00:00 GMT)
A null value specified for start time or end time will represent infinity for start or end time, respectively. Example: time=null, 1230768000000
- **distance:** The buffer distance for the input geometries. The distance unit is specified by units. For example, if the distance is 100, the query geometry is a point, units is set to meters, and all points within 100 meters of the point are returned. The geodesic buffer is created based on the datum of the output spatial reference if it exists. If there is no output spatial reference, the input geometry spatial reference is used. Otherwise, the native layer spatial reference is used to generate the geometry buffer used in the query. This parameter only applies if supportsQueryWithDistance is true.SyntaxUse dark colors for code blocksCopy1
distance=<distance>ExampleUse dark colors for code blocksCopy1
distance=100
- **units:** The unit for calculating the buffer distance. If unit is not specified, the default will be esriSRUnit_Foot when querying feature services in ArcGIS Enterprise, and esriSRUnit_Meter when querying feature services in ArcGIS Online. This parameter only applies if supportsQueryWithDistance is true.Values: esriSRUnit_Meter | esriSRUnit_StatuteMile | esriSRUnit_Foot | esriSRUnit_Kilometer | esriSRUnit_NauticalMile | esriSRUnit_USNauticalMile
- **outFields:** The list of fields to be included in the returned result set. This list is a comma-delimited list of field names. You can also specify the wildcard "*" as the value of this parameter. In this case, the query results include all the field values.ExampleUse dark colors for code blocksCopy1
2
3
4
5
//Standard usage
outFields=AREANAME,ST,POP2000

//Wildcard usage
outFields=*
- **returnGeometry:** If true, the result includes the geometry associated with each feature returned. The default is true.Values: true | false
- **maxAllowableOffset:** This option can be used to specify the maxAllowableOffset to be used for generalizing geometries returned by the Query operation. The maxAllowableOffset is in the units of outSR. If outSR is not specified, maxAllowableOffset is assumed to be in the unit of the spatial reference of the map.ExampleUse dark colors for code blocksCopy1
maxAllowableOffset=2
- **geometryPrecision:** This option can be used to specify the number of decimal places in the response geometries returned by the Query operation. This applies to x- and y-values only (not m- or z-values).ExampleUse dark colors for code blocksCopy1
geometryPrecision=3
- **defaultSR:** Introduced at 11.3. This parameter sets the spatial reference for all other parameters in the request. For example, you can set the defaultSR parameter instead of repeatedly setting the same spatial reference information for the outSR, quantizationParameters and inSR parameters. This results in shorter requests, which more often can be GET requests. The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. (geometry objects)NoteThe layer’s spatial reference will be used if the spatial reference is not set with the defaultSR or within the other parameters.Support for defaultSR is indicated when the layer’s supportsDefaultSR property is true, under advancedQueryCapabilities.
- **outSR:** The spatial reference of the returned geometry. The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. If outSR is not specified, the geometry is returned in the spatial reference of the map.When using outSR with pbf, the pbf format will use coordinate quantization for layer queries. When an output spatial reference is not provided for a query operation, the feature service derives coordinate quantization parameters from the layer’s spatial reference. If the precision in the layer’s spatial reference is inadequate for the client application’s use, it should pass in a spatial reference with suitable precision as the output spatial reference. If the layer’s source spatial reference has the desired precision and it is suitable for the client’s use, the client can use the source layer's spatial reference as the output spatial reference.
- **havingClause:** This option is a condition used with outStatistics that limits the query result to groups that satisfy the aggregation function used. The havingClause parameter is used with the groupBy and outStatistics parameters and allows you to filter results from outStatistics. This parameter applies only if the supportsHavingClause property of the layer is true.NoteThe havingClause parameter takes aggregate functions such as AVG(<fieldname>). It does not support the outStatisticFieldName from the outStatistics parameter. For example, the having clause can't be set to >1000; it must be set as AVG(housing_price > 1000). You can also use statistics functions in the having clause that are not necessarily in the outStatistics parameter. For example, the following returns the average housing price for neighborhoods with more than 1,000 homes:Use dark colors for code blocksCopy1
2
3
4
5
6
7
8
outStatistics=[
  {
    "statisticType":"AVG",
    "onStatisticField":"housing_price",
    "outStatisticFieldName":"avgHousePrice"
  }
],
havingClause=COUNT(houses) > 1000Values: AVG | COUNT | SUM | STDDEV | MIN | MAX | VAR
- **gdbVersion:** The geodatabase version to query. This parameter applies only if the isDataVersioned  property of the layer is true . If this is not specified, the query will apply to the published map’s version.
Syntax: gdbVersion=<version>
Example: gdbVersion=SDE.DEFAULT
- **returnDistinctValues:** If true, it returns distinct values based on the fields specified in outFields. This parameter applies only if the supportsAdvancedQueries property of the layer is true. This parameter can be used with returnCountOnly to return the count of distinct values of subfields.NoteMake sure to set returnGeometry to false when returnDistinctValues is true. Otherwise, reliable results will not be returned.Values: true | false
- **returnIdsOnly:** If true, the response only includes an array of object IDs. Otherwise, the response is a feature set. The default is false. When objectIds are specified, setting this parameter to true is invalid.While there is a limit to the number of features included in the feature set response, there is no limit to the number of object IDs returned in the ID array response. Clients can exploit this to get all the query conforming object IDs by setting returnIdsOnly as true and subsequently requesting feature sets for subsets of object IDs.Values: true | false
- **returnCountOnly:** If true, the response only includes the count (number of features/records) that would be returned by a query. Otherwise, the response is a feature set. The default is false. This option supersedes the returnIdsOnly parameter. If returnCountOnly is true, the response will return both the count and the extent. This parameter can be used with returnDistinctValues to return the count of distinct values of subfields.Values: true | false
- **returnExtentOnly:** If true, the response only includes the extent of the features that would be returned by the query. If returnExtentOnly is set as true, the response will return both the count and the extent. The default value is false. This parameter applies only if the supportsReturningQueryExtent property of the layer is true.Values: true | false
- **orderByFields:** One or more field names on which the features/records need to be ordered. Use ASC or DESC for ascending or descending, respectively, following every field to control the ordering. orderByFields defaults to ASC (ascending order) if <ORDER> is unspecified. orderByFields is supported on only those layers/tables that indicate supportsAdvancedQueries is true.NoteIf supportsOrderByOnlyOnLayerFields is true, only fields from the layer's fields array can be used with the orderByFields parameter. For example, the outStatisticfieldName from outStatistics can't be used if supportsOrderByOnlyOnLayerFields is true.SyntaxUse dark colors for code blocksCopy1
orderByFields=field1 <ORDER>, field2 <ORDER>, field3 <ORDER>ExampleUse dark colors for code blocksCopy1
orderByFields=STATE_NAME ASC, RACE DESC, GENDER
- **groupByFieldsForStatistics:** One or more field names on which the values need to be grouped for calculating the statistics. The groupByFieldsForStatistics parameters is valid only when the outStatistics parameter is present in the request.SyntaxUse dark colors for code blocksCopy1
groupByFieldsForStatistics=field1, field2ExampleUse dark colors for code blocksCopy1
groupByFieldsForStatistics=STATE_NAME, GENDER
- **outStatistics:** The definitions for one or more field-based statistics to be calculated. This parameter is supported only on layers/tables that indicate supportsStatistics is true. When using outStatistics, the only other parameters that can be used are groupByFieldsForStatistics, orderByFields, time, returnDistinctValues, and where. For information on how to use percentile statisticType, see the Percentile statistic type section below.NoteIf outStatisticFieldName is empty or missing, the map server assigns a field name to the returned statistic field. A valid field name can only contain alphanumeric characters and an underscore. If the outStatisticFieldName is a reserved keyword of the underlying DBMS, the operation can fail. Try specifying an alternative outStatisticFieldName.SyntaxUse dark colors for code blocksCopy1
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
[
  {
    "statisticType": "<count | sum | min | max | avg | stddev | var>",
    "onStatisticField": "Field1",
    "outStatisticFieldName": "Out_Field_Name1"
  },
  {
    "statisticType": "<count | sum | min | max | avg | stddev | var>",
    "onStatisticField": "Field2",
    "outStatisticFieldName": "Out_Field_Name2"
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
[
  {
    "statisticType": "sum",
    "onStatisticField": "GENDER",
    "outStatisticFieldName": "PopulationByGender"
  },
  {
    "statisticType": "avg",
    "onStatisticField": "INCOME",
    "outStatisticFieldName": "AverageIncome"
  }
]
- **returnZ:** If true, z-values are included in the results if the features have z-values. Otherwise, z-values are not returned. The default is false. This parameter only applies if returnGeometry is true, and the layer's hasZproperty is true.
- **returnM:** If true, m-values are included in the results if the features have m-values. Otherwise, m-values are not returned. The default is false. This parameter only applies if returnGeometry is true, and the layer's hasM property is true.
- **multipatchOption:** This option dictates how the geometry of a multipatch feature will be returned. This parameter only applies if the layer's geometryType property is esriGeometryMultiPatch.NoteIf returnGeometry is set to false, specifying the multipatchOption is not required.If multipatchOption is set to xyFootprint, the x,y footprint of each multipatch geometry will be returned in the result. If multipatchOption is set to stripMaterials, the multipatch geometry will be returned without materials (for instance, colors and textures). If multipatchOption is set to embedMaterials, the multipatch geometry will be returned with materials embedded in it. If multipatchOption is set to externalizeTextures, the multipatch geometry will be returned with materials, but the textures will be returned by reference.A new extent value for multipatchOption has been added at 10.9. Extent is supported when the layer's supportedmultipatchOptions property includes extent. When multipatchOption is set to extent, and returnZ is true, the service returns a five-point polygon geometry that has the same 3D extent as the original multipatch. The extent polygon will have the following points:Use dark colors for code blocksCopy1
2
3
4
5
6
7
[
  (xmin, ymin, zmin),
  (xmin, ymax, zmin),
  (xmax, ymax, zmax),
  (xmax, ymin, zmin),
  (xmin, ymin, zmin)
]The z-coordinate units will match that of the underlying datasets' vertical coordinate system. When the vertical coordinate system is defined, the feature service layer includes properties to describe the VCS. It also includes a heightModelInfo property that describes properties such as the heightUnit:Use dark colors for code blocksCopy1
2
3
4
5
6
7
...
"heightModelInfo": {
  "heightModel": "gravity_related_height",
  "vertCRS": "NGVD_1929",
  "heightUnit": "us-foot"
},
...Values: xyFootprint | stripMaterials | embedMaterials | externalizeTextures | extent
- **resultOffset:** This option can be used for fetching query results by skipping the specified number of records and starting from the next record (that is, resultOffset + 1). The default is 0. This parameter only applies if supportsPagination is true. You can use this option to fetch records that are beyond maxRecordCount.ExampleUse dark colors for code blocksCopy1
resultOffset=100
- **resultRecordCount:** This option can be used for fetching query results up to the resultRecordCount specified. When resultOffset is specified but this parameter is not, the map service defaults it to maxRecordCount. The maximum value for this parameter is the value of the layer's maxRecordCount property. The minimum value entered for this parameter cannot be below 1. This parameter only applies if supportsPagination is true.NoteWhen paginating results using a constant where clause in the ArcGIS REST API, the sort order of the results is guaranteed to remain consistent across pages. This ensures that users can reliably navigate through the dataset without encountering discrepancies in the order of returned records.ExampleUse dark colors for code blocksCopy1
resultRecordCount=10
- **quantizationParameters:** This option is supported by all feature services in ArcGIS Enterprise at 10.6.1. This is a JSON object used to project the geometry onto a virtual grid, likely representing pixels on the screen. The properties of the JSON object include extent, mode, originPosition, and tolerance. For more information, see the Quantization parameters JSON properties section below.NoteThis parameter only applies if supportsCoordinatesQuantization is true.ExamplesUse dark colors for code blocksCopy1
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
//upperLeft origin position
quantizationParameters={
  "mode":"view",
  "originPosition":"upperLeft",
  "tolerance":1.0583354500042335,
  "extent":{
    "type":"extent",
    "xmin":-18341377.47954369,
    "ymin":2979920.6113554947,
    "xmax":-7546517.393554582,
    "ymax":11203512.89298139,
    "spatialReference":{
      "wkid":102100,
      "latestWkid":3857
    }
  }
}

//lowerLeft origin position
quantizationParameters={
  "mode":"view",
  "originPosition":"lowerLeft",
  "tolerance":1.0583354500042335,
  "extent":{
    "type":"extent",
    "xmin":-18341377.47954369,
    "ymin":2979920.6113554947,
    "xmax":-7546517.393554582,
    "ymax":11203512.89298139,
    "spatialReference":{
      "wkid":102100,
      "latestWkid":3857
    }
  }
}
- **returnCentroid:** Used to return the geometry centroid associated with each feature returned. If true, the result includes the geometry centroid. The default is false. Currently, this parameter is only supported for polygon data and is ignored for count and objectID queries. This parameter is only supported on layer-level queries.NoteThe layer metadata returns supportsReturningGeometryCentroid in the advancedQueryCapabilities metadata object. The absence of the supportsReturningGeometryCentroid property means that the server does not support the returnCentroid parameter. Line and point data will return supportReturningGeometryCentroid as false.Values: true | false
- **resultType(Optional):** The resultType parameter can be used to control the number of features returned by the query operation. The tile value is used when the client is using a virtual tiling scheme when querying features, which works similarly to tiles in a tiled map service layer. The standard value is used with a nontiled query where the client will send only one query for the full extent. Support for this parameter is advertised on the layer metadata in the supportsQueryWithResultType property. For additional information on the resultType parameter and how it interacts with max record counts, see the Result type and max record count.Values: none | standard | tile
- **historicMoment:** This option works with ArcGIS Server services only. This is the historic moment to query. This parameter applies only if the layer is archiving enabled and the supportsQueryWithHistoricMoment property is set to true. This property is provided in the layer resource. If historicMoment is not specified, the query will apply to the current features.SyntaxUse dark colors for code blocksCopy1
historicMoment=<Epoch time in milliseconds>ExampleUse dark colors for code blocksCopy1
historicMoment=1199145600000
- **returnTrueCurves:** When set to true, it returns true curves in output geometries. When set to false, curves are converted to densified polylines or polygons. The default is false.NoteFor feature services published to an ArcGIS Enterprise federated server with data stored in a registered enterprise geodatabase, when requesting quantized geometry, if returnTrueCurves is true, the curves will be densified in the quantized results.Values: true | false
- **sqlFormat:** The sqlFormat parameter can be either standard SQL-92 standard or it can use the native SQL of the underlying data store native. The default is none, which means the sqlFormat depends on the useStandardizedQuery parameter. For more information on formatting, see the SQL format section below.Values: none | standard | nativeNoteSetting the SQL format as native is only supported when useStandardizedQuery is set as false.
- **returnExceededLimitFeatures:** This option is supported by most feature services, except for feature services published using a spatiotemporal data store. This parameter is true by default. When set to true, features are returned even when the results include exceededTransferLimit as true.When set to false and querying with resultType set to tile, features are not returned when the results include exceededTransferLimit as true. This allows a client to find the resolution in which the transfer limit is no longer exceeded without making multiple calls.Values: true | false
- **datumTransformation:** Introduced at 10.8. This parameter applies a datum transformation while projecting input geometries from their spatial reference to the layer's source spatial reference. When specifying transformations, you need to think about which datum transformation is best for this projection. For a list of valid datum transformation ID values and well-known text strings, see Using spatial references. For more information on datum transformations, see the transformation parameter in the Project operation.NoteThe supportsQueryWithDatumTransformation layer property in advancedQueryCapabilities will be true if this parameter is supported.SyntaxUse dark colors for code blocksCopy1
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
//Syntax to apply a simple transformation
datumTransformation=<wkid>

//Syntax to apply a simple transformation
datumTransformation={"wkt": "<WKT>"}

//Syntax to apply a composite transformation
datumTransformation={
  "geoTransforms": [
    {
      "wkid":<id>,
      "forward":<true|false>
    },
    {
      "wkt":"<WKT>",
      "forward":<true|false>
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
19
20
21
22
23
24
25
//Applies a simple transformation
datumTransformation=1623

//Applies a composite transformation
datumTransformation={
  "geoTransforms":[
    {
      "wkid":1088,
      "transformForward": true
    },
    {
      "wkid": "GEOGTRAN[\"S_JTSK_To_WGS_1984_1\",GEOGCS[\"GCS_S_JTSK\",
        DATUM[\"D_S_JTSK\",SPHEROID[\"Bessel_1841\",6377397.155,299.1528128]],
        PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],
        GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_
        1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],
        UNIT[\"Degree\",0.0174532925199433]],METHOD[\"Position_Vector\"],
        PARAMETER[\"X_Axis_Translation\",570.8],PARAMETER[\"Y_Axis_Translation\",85.7]
        ,PARAMETER[\"Z_Axis_Translation\",462.8],PARAMETER[\"X_Axis_Rotation\",4.998],
        PARAMETER[\"Y_Axis_Rotation\",1.587],PARAMETER[\"Z_Axis_Rotation\",5.261],
        PARAMETER[\"Scale_Difference\",3.56]]",
      "transformForward":false
    }
  ]
}
- **timeReferenceUnknownClient:** Setting timeReferenceUnknownClient as true indicates that the client is capable of working with data values that are not in UTC. If its not set to true, and the service layer's datesInUnknownTimeZone property is true, then an error is returned. The default is false.Its possible to define a service's time zone of date fields as unknown. Setting the time zone as unknown means that date values will be returned as-is from the database, rather than as date values in UTC. Non-hosted feature services can be set to use an unknown time zone using ArcGIS Server Manager. Setting the time zones to unknown also sets the datesInUnknownTimeZone layer property as true. Currently, hosted feature services do not support this setting. This setting does not apply to editor tracking date fields which are stored and returned in UTC even when the time zone is set to unknown.Most clients released prior to ArcGIS Enterprise 10.9 will not be able to work with feature services that have an unknown time setting. The timeReferenceUnknownClient parameter prevents these clients from working with the service in order to avoid problems.. Setting this parameter to true indicates that the client is capable of working with unknown date values that are not in UTC.NoteArcGIS Pro 2.7 or newer can work with these feature services.Value: true | false
- **returnEnvelope:** Introduced at 11.3. Specifies if the query will return the envelope of the geometry in the query results. Support for this parameter is indicated when the layer’s supportsReturningGeometryEnvelope property is true, under advancedQueryCapabilities. The supportsReturningGeometryEnvelope will be true for line and polygon layers, and will be false for point layers. The spatial reference of the envelope is same as the feature geometry.Values: true | false
- **fullText:** Introduced at 11.4. This parameter filters query results by performing a full text search on the layer's string fields. The search is performed on the full text search index, which can be created for a hosted feature service using the Add to Definition operation. A full text search processes results efficiently and is an alternative to using where clauses with the like operator. The fullText parameter can be used in combination with other filter parameters, such as where and geometry. When multiple filter parameters are used in a query, the results from each are added together to generate the the response. Support for the fullText parameter is indicated when the layer-level supportsFullTextSearch property, under advancedQueryCapabilities, is set as true.Starting at 11.5, full text searches are supported for reference feature services in ArcGIS Enterprise when fields with a full text index are present. Full text indexes are created in the underlying enterprise geodatabase using the Add Full Text Index geoprocessing tool.For more information on the fullText parameter, see the Full text searches section below.Syntax:Use dark colors for code blocksCopy1
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
fullText=[
  {
    "onFields": [<fields>],
    "searchTerm": <search word of phrase>,
    "searchType": <”simple”|”prefix”>,
    "operator": <and | or | not>,
    "searchOperator": <and | or> // Added at 11.5
  },
  {
    "sqlExpression": <sql expression> // Added at 11.5
  }
]Example:Use dark colors for code blocksCopy1
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
fullText=[
  {
    "onFields": ["notes"],
    "searchTerm": "broken pipe",
    "searchType": "simple",
    "searchOperator": "and"
  },
  {
    "sqlExpression": "pipe_length > 10"
  }
]
- **uniqueIds
(Optional):** An array of the unique IDs of the feature(s) to be deleted. OIDFieldContainsHashValue must be true when using unique IDs.AttentionUse of objectId and/or globalId is not allowed when using uniqueIds. The request will fail if objectId is included when OIDFieldContainsHashValue is true.
- **returnUniqueIdsOnly
(Optional):** Boolean value that deafults to false. If true, uniqueIdFieldNames and uniqueIds arrays are returned.Values: true | false
- **f:** The response format. The default response format is html. The supportsQueryFormats layer property describes what formats are supported. Note that the default response format, html, is always supported.ExampleUse dark colors for code blocksCopy1
"supportedQueryFormats": "JSON,geoJSON,PBF"The output format geoJSON is not supported if returnM is true. Starting at 10.8, geojson will return results that match the RFC7946 specification if no outSR is specified, or if outSR is set to 4326. Setting a different outSR value will return projected results. However, these will not match the RFC7946 specification.Values: html | json | geojson | pbf

## Description

The query operation is performed on a feature service layer resource. The result of this operation is either a feature set or an array of feature IDs (if returnIdsOnly is set to true) and/or a result extent (if returnExtentOnly is set to true).

While there is a limit to the number of features included in the feature set response, there is no limit to the number of object IDs returned in the ID array response. Clients can exploit this to get all the query conforming object IDs by specifying returnIdsOnly as true and subsequently requesting feature sets for subsets of object IDs.

In the feature set response, the layer features include their geometries. The records for tables do not.

> **Note:** NoteIf the query results include an empty feature set, the fields set is not returned.

> **Note:** NoteQuery with returnDistinctResults defaults to using spatial relation intersects irrespective of a user-selected spatial relation.

For time-aware layers, you can use the time parameter to specify the time instant or the time extent to query.

You can provide arguments to the query operation defined in the parameters table below.

## Request Parameters

## Response

The sample JSON response syntax below shows the response forma returned when returnIdsOnly is set to false and returnCountOnly is set to false:

The sample JSON response syntax below shows the response forma returned when returnCountOnly is set to true:

The sample JSON response syntax below shows the response forma returned when returnCountOnly is set to true and returnExtentOnly is set to true:

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
...
"supportedmultipatchOptions": [
  "embedMaterials",
  "xyFootprint",
  "externalizeTextures",
  "stripMaterials",
  "extent"
],
...
```

```json
1
2
3
4
5
( '<=' | '>=' | '<' | '>' | '=' | '!=' | '<>' | LIKE )
(AND | OR)
(IS | IS_NOT)
(IN | NOT_IN) ( '(' ( expr ( ',' expr )* )? ')' )
COLUMN_NAME BETWEEN LITERAL_VALUE AND LITERAL_VALUE
```

```json
1
2
3
4
5
6
7
where=POP2000 > 350000

where=CITY_NAME = 'Barrington'

where=shape is null

where=shape is not null
```

