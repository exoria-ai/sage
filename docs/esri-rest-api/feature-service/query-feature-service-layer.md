# Query (Feature Service/Layer)

> Source: [/rest/services-reference/enterprise/query-feature-service-layer/](https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer/)

**URL:**: https://<root>/<serviceName>/FeatureServer/<layerId>/query

**Methods:**: GETPOST

**Required Capability:**: Query

**Version Introduced:**: 10.0

## Description

The `query` operation is performed on a [feature service layer resource](/rest/services-reference/enterprise/layer-feature-service/). The result of this operation is either a feature set or an array of feature IDs (if `returnIdsOnly` is set to `true`) and/or a result extent (if `returnExtentOnly` is set to `true`).

While there is a limit to the number of features included in the feature set response, there is no limit to the number of object IDs returned in the ID array response. Clients can exploit this to get all the query conforming object IDs by specifying `returnIdsOnly` as `true` and subsequently requesting feature sets for subsets of object IDs.

In the feature set response, the layer features include their geometries. The records for tables do not.

For time-aware layers, you can use the `time` parameter to specify the time instant or the time extent to query.

You can provide arguments to the `query` operation defined in the parameters table below.

To use pagination with aggregated queries (queries using either `returnDistinctValues` or `outStatistics` with `groupByFieldsForStatistics`) on hosted feature services in ArcGIS Enterprise, the `supportsPaginationOnAggregatedQueries` property must be `true` on the layer. Hosted feature services using a spatiotemporal data store do not currently support pagination on aggregated queries.

## Features added throughout releases

### New at 11.5

-   The unique IDs feature has been added to support databases with string ID fields. For more information on unique IDs, see the Layer (Feature Service) page, `useUniqueIds` and `returnUniqueIdsOnly` in the Request parameters table below, and JSON Response example thirteen.
    
-   Reference feature services support full text searches for fields that have a full text index. Support is indicated on a layer-level when the `supportsFullTextSearch` is `true`, under `advancedQueryCapabilities`.
    
-   The layer resource now returns a `fullTextSearchableFields` property, under `advancedQueryCapabilities`, that lists the fields that have full text indexes.
    
-   The layer resource also now includes a `fullTextSearchCapabilities`, under `advancedQueryCapabilities`, that describes which full text search capabilities are supported. For more information, see the [Full text searches](#full-text-searches) section below.
    

### New at 11.4

-   Reference feature services have added support for the `returnEnvelope` parameter, which allows envelopes to be returned for features instead of geometries.
-   Reference feature services have added support for returning query results as pbf with control points.
-   Full text search indexes can be created for hosted feature services using the [Add to Definition](/rest/services-reference/enterprise/add-to-definition-feature-layer/) operation. These indexes can then be used to perform full text queries using the layer-level [Query](/rest/services-reference/enterprise/query-feature-service-layer/) operation. A new parameter, `fullText`, has been added to support full text searches.

### New at 11.3

-   Four new field types are now supported: `esriFieldTypeTimeOnly`, `esriFieldTypeDateOnly`, `esriFieldTypeTimestampOffset`, `esriFieldTypeBigInteger`.
-   Reference feature services will return control points in the JSON response from query results and accept features with control points when applying edits. Control points are special vertices used to apply symbol effects to line or polygon features. Geometries are persisted in the geodatabase with an identifier as to whether each vertex is a control point.
-   This operation supports a new parameter, `defaultSR`, for hosted feature services. Setting the `defaultSR` parameter allows the client to set the spatial reference information in one place rather than repeating it in several parameters when querying. This results in shorter requests which more often can be GET requests. Support for `defaultSR` is indicated when the layer’s `supportsDefaultSR` property is `true`, under `advancedQueryCapabilities`.
-   A new parameter, `returnEnvelope`, has been added. Support for this parameter is indicated when the layer’s `supportsReturningGeometryEnvelope` property is `true`, under `advancedQueryCapabilities`.
-   The `where` parameter now supports querying for either null or not null shapes using “shape is not null” or “shape is null” WHERE clause.

### New at 11.2

-   Operations that use `WHERE` clauses now support the `current_user` keyword to refer to the currently connected federated ArcGIS Enterprise user. The `current_user` keyword is supported when the `supportsCurrentUserQueries`, under `advancedQueryCapabilities`, is `true`. This enhancement requires the server to have `standardizedQueries` enabled (`standardizedQueries` is enabled on the server by default).
-   Feature services now support WKT2. Query parameters that take spatial references as input values will now accept a WKT2 value and generate an appropriate response. For WKT2 examples, see the following [JSON example](https://raw.githubusercontent.com/Esri/projection-engine-db-doc/master/json/pe_list_projcs.json). For WKT2 values, see the [Using spatial references](/rest/services-reference/enterprise/using-spatial-references/) documentation.

### New at 11.0

At this release, feature services can be published from a Google BigQuery data source using ArcGIS Pro 3.0 or later.

-   Date field values in a query response from a Google BigQuery feature service are assumed to be in UTC. Values from database fields of the `timestamp` type are accurate as they are returned from the database in UTC. Values from database fields of the `time`, `date`, and `datetime` type may not be accurate as they may not be returned from the database in UTC. To avoid potential issues, feature services can be published from ArcGIS Pro that exclude the non-UTC `time`, `date`, and `datetime` fields.
-   With Google BigQuery feature service layers, queries with `returnExtentOnly` set as `true` are supported on point layers, but not on line and polygon layers. Support for `returnExtentOnly` as `true` is indicated when the `supportsReturningQueryExtent` property, under `advancedQueryCapabilities`, is `true`.

### New at 10.9.1

A `supportedSpatialRelationships` property may be provided on the layer resource. This property describes the spatial relationships (the `spatialRel` parameter) supported when querying the layer.

### New at 10.9

-   A new parameter, `timeReferenceUnknownClient`, has been added at 10.9. Setting `timeReferenceUnknownClient` as `true` indicates that the client is capable of working with date field data values that are not in UTC. For more information on this parameter, see the parameters table below.
    
-   The `multipatchOption` parameter supports a new `extent` value. Extent is used to return the 3D extent of the multipatch features. This new value is supported when the feature layer's `supportedmultipatchOptions` property under `advancedQueryCapabilities` includes `extent`:
    
    
    
    ```
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
    
-   Hosted feature services on a relational data store support SQL expressions for the `outStatistics`, `groupBy`, and `orderBy` parameters when the `supportsSqlExpression`, under `advancedQueryCapabilities`, is `true`. Hosted feature services in ArcGIS Online and non-hosted feature services in ArcGIS Enterprise already support this feature.
    
-   Hosted feature services on a relational data store support SQL expression for the `outFields` parameter when `supportsOutFieldSqlExpression`, under `advancedQueryCapabilities`, is `true`. Hosted feature services in ArcGIS Online already support this functionality.
    

### 10.8.1

-   The layer query operation supports `percentile` as a `statisticType` when using `outStatistics` for feature services published from ArcGIS Pro that reference enterprise geodatabase data. Layers that support percentiles include the `supportsPercentileStatistics` property as `true`, found in the `advancedQueryCapabilities` layer object.
-   Multipatch data can be queried with `multipatchOption` set as `externalizeTextures` and `f` as `pbf` for feature services published from ArcGIS Pro.
-   Non-hosted feature services published from ArcGIS Pro support an optimization for getting a layer's row count. By setting `where` as `9999=9999` and `returnCountOnly` as `true`, the result is an approximate count that is returned very quickly. For accurate, but slower to return, row counts, use any other filter (e.g. `where: 1=1` ). This is only supported when a layer has both `isDataVersioned` and `isDataArchived` as `false`.

### 10.8

The layer query operation supports percentile as a `statisticType` when using `outstatistic` for hosted feature services in ArcGIS Online or ArcGIS Enterprise when run on a relational data store. Layers that support percentiles include the `advancedQueryCapabilities` object property `supportsPercentileStatistics` as `true`.

## Request parameters

| Parameter | Details |
|---|---|
| where | A WHERE clause for the query filter.SQL-92 WHERE clause syntax on the fields in the layer is supported for most data sources. Some data sources have restrictions on what is supported. Hosted feature services in ArcGIS Enterprise running on a spatiotemporal data source only support a subset of SQL-92. For example, spatiotemporal-based feature services support the like operator but do not support the not like operator or field equivalency expressions such as field1 = field2. Below is a list of supported SQL-92 with spatiotemporal-based feature services: 2 3 4 5 ( '<=' \| '>=' \| '<' \| '>' \| '=' \| '!=' \| '<>' \| LIKE ) (AND \| OR) (IS \| IS_NOT) (IN \| NOT_IN) ( '(' ( expr ( ',' expr )* )? ')' ) COLUMN_NAME BETWEEN LITERAL_VALUE AND LITERAL_VALUEFor information on how to format time and date information, see the Date-time queries section below.Examples 2 3 4 5 6 7 where=POP2000 > 350000 where=CITY_NAME = 'Barrington' where=shape is null where=shape is not null |
| objectIds | The object IDs of this layer or table to be queried. |
| geometry | The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, you can specify the geometry of envelopes and points with a simple comma-separated syntax.Syntax:JSON structures: geometryType=<geometryType>&geometry={ geometry}Envelope simple syntax: geometryType=esriGeometryEnvelope&geometry=<xmin>,<ymin>,<xmax>,<ymax>Point simple syntax: geometryType=esriGeometryPoint&geometry=<x>,<y>Examples:geometryType=esriGeometryEnvelope&geometry={xmin: -104, ymin: 35.6, xmax: -94.32, ymax: 41}geometryType=esriGeometryEnvelope&geometry=-104,35.6,-94.32,41geometryType=esriGeometryPoint&geometry=-104,35.6 |
| geometryType | The type of geometry specified by the geometry parameter. The geometry type can be an envelope, a point, a line, or a polygon. The default geometry type is an envelope.Values: esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon \| esriGeometryEnvelope |
| inSR | The spatial reference of the input geometry. The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. If the inSR is not specified, the geometry is assumed to be in the spatial reference of the layer. |
| spatialRel | The spatial relationship to be applied to the input geometry while performing the query. The supported spatial relationships include intersects, contains, envelope intersects, within, and so on. The default spatial relationship is intersects (esriSpatialRelIntersects ).At 10.9.1, a supportedSpatialRelationships property may be provided on the layer resource that specifies which spatial relationships are supported.Values: esriSpatialRelIntersects \| esriSpatialRelContains \| esriSpatialRelCrosses \| esriSpatialRelEnvelopeIntersects \| esriSpatialRelIndexIntersects \| esriSpatialRelOverlaps \| esriSpatialRelTouches \| esriSpatialRelWithin \| esriSpatialRelRelation |
| relationParam | The spatial relate function that can be applied while performing the query operation. An example for this spatial relate function is FFFTTT\*\*\*. For more information on this spatial relate function, see the documentation for the spatial relate function.The string describes the spatial relationship to be tested when the spatial relationship is esriSpatialRelRelation. |
| time | The time instant or the time extent to query.Time instantSyntax: time=<timeInstant>Example: time=1199145600000 (1 Jan 2008 00:00:00 GMT)Time extentSyntax: time=<startTime>, <endTime>Example: time=1199145600000, 1230768000000 (1 Jan 2008 00:00:00 GMT to 1 Jan 2009 00:00:00 GMT)A null value specified for start time or end time will represent infinity for start or end time, respectively. Example: time=null, 1230768000000 |
| distance | The buffer distance for the input geometries. The distance unit is specified by units. For example, if the distance is 100, the query geometry is a point, units is set to meters, and all points within 100 meters of the point are returned. The geodesic buffer is created based on the datum of the output spatial reference if it exists. If there is no output spatial reference, the input geometry spatial reference is used. Otherwise, the native layer spatial reference is used to generate the geometry buffer used in the query. This parameter only applies if supportsQueryWithDistance is true.Syntax distance=<distance>Example distance=100 |
| units | The unit for calculating the buffer distance. If unit is not specified, the default will be esriSRUnit_Foot when querying feature services in ArcGIS Enterprise, and esriSRUnit_Meter when querying feature services in ArcGIS Online. This parameter only applies if supportsQueryWithDistance is true.Values: esriSRUnit_Meter \| esriSRUnit_StatuteMile \| esriSRUnit_Foot \| esriSRUnit_Kilometer \| esriSRUnit_NauticalMile \| esriSRUnit_USNauticalMile |
| outFields | The list of fields to be included in the returned result set. This list is a comma-delimited list of field names. You can also specify the wildcard "*" as the value of this parameter. In this case, the query results include all the field values.Example 2 3 4 5 //Standard usage outFields=AREANAME,ST,POP2000 //Wildcard usage outFields=* |
| returnGeometry | If true, the result includes the geometry associated with each feature returned. The default is true.Values: true \| false |
| maxAllowableOffset | This option can be used to specify the maxAllowableOffset to be used for generalizing geometries returned by the Query operation. The maxAllowableOffset is in the units of outSR. If outSR is not specified, maxAllowableOffset is assumed to be in the unit of the spatial reference of the map.Example maxAllowableOffset=2 |
| geometryPrecision | This option can be used to specify the number of decimal places in the response geometries returned by the Query operation. This applies to x- and y-values only (not m- or z-values).Example geometryPrecision=3 |
| defaultSR | Introduced at 11.3. This parameter sets the spatial reference for all other parameters in the request. For example, you can set the defaultSR parameter instead of repeatedly setting the same spatial reference information for the outSR, quantizationParameters and inSR parameters. This results in shorter requests, which more often can be GET requests. The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. (geometry objects)Support for defaultSR is indicated when the layer’s supportsDefaultSR property is true, under advancedQueryCapabilities. |
| outSR | The spatial reference of the returned geometry. The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. If outSR is not specified, the geometry is returned in the spatial reference of the map.When using outSR with pbf, the pbf format will use coordinate quantization for layer queries. When an output spatial reference is not provided for a query operation, the feature service derives coordinate quantization parameters from the layer’s spatial reference. If the precision in the layer’s spatial reference is inadequate for the client application’s use, it should pass in a spatial reference with suitable precision as the output spatial reference. If the layer’s source spatial reference has the desired precision and it is suitable for the client’s use, the client can use the source layer's spatial reference as the output spatial reference. |
| havingClause | This option is a condition used with outStatistics that limits the query result to groups that satisfy the aggregation function used. The havingClause parameter is used with the groupBy and outStatistics parameters and allows you to filter results from outStatistics. This parameter applies only if the supportsHavingClause property of the layer is true.Values: AVG \| COUNT \| SUM \| STDDEV \| MIN \| MAX \| VAR |
| gdbVersion | The geodatabase version to query. This parameter applies only if the isDataVersioned property of the layer is true . If this is not specified, the query will apply to the published map’s version.Syntax: gdbVersion=<version>Example: gdbVersion=SDE.DEFAULT |
| returnDistinctValues | If true, it returns distinct values based on the fields specified in outFields. This parameter applies only if the supportsAdvancedQueries property of the layer is true. This parameter can be used with returnCountOnly to return the count of distinct values of subfields.Values: true \| false |
| returnIdsOnly | If true, the response only includes an array of object IDs. Otherwise, the response is a feature set. The default is false. When objectIds are specified, setting this parameter to true is invalid.While there is a limit to the number of features included in the feature set response, there is no limit to the number of object IDs returned in the ID array response. Clients can exploit this to get all the query conforming object IDs by setting returnIdsOnly as true and subsequently requesting feature sets for subsets of object IDs.Values: true \| false |
| returnCountOnly | If true, the response only includes the count (number of features/records) that would be returned by a query. Otherwise, the response is a feature set. The default is false. This option supersedes the returnIdsOnly parameter. If returnCountOnly is true, the response will return both the count and the extent. This parameter can be used with returnDistinctValues to return the count of distinct values of subfields.Values: true \| false |
| returnExtentOnly | If true, the response only includes the extent of the features that would be returned by the query. If returnExtentOnly is set as true, the response will return both the count and the extent. The default value is false. This parameter applies only if the supportsReturningQueryExtent property of the layer is true.Values: true \| false |
| orderByFields | One or more field names on which the features/records need to be ordered. Use ASC or DESC for ascending or descending, respectively, following every field to control the ordering. orderByFields defaults to ASC (ascending order) if <ORDER> is unspecified. orderByFields is supported on only those layers/tables that indicate supportsAdvancedQueries is true.Syntax orderByFields=field1 <ORDER>, field2 <ORDER>, field3 <ORDER>Example orderByFields=STATE_NAME ASC, RACE DESC, GENDER |
| groupByFieldsForStatistics | One or more field names on which the values need to be grouped for calculating the statistics. The groupByFieldsForStatistics parameters is valid only when the outStatistics parameter is present in the request.Syntax groupByFieldsForStatistics=field1, field2Example groupByFieldsForStatistics=STATE_NAME, GENDER |
| outStatistics | The definitions for one or more field-based statistics to be calculated. This parameter is supported only on layers/tables that indicate supportsStatistics is true. When using outStatistics, the only other parameters that can be used are groupByFieldsForStatistics, orderByFields, time, returnDistinctValues, and where. For information on how to use percentile statisticType, see the Percentile statistic type section below.Syntax [ { "statisticType": "<count \| sum \| min \| max \| avg \| stddev \| var>", "onStatisticField": "Field1", "outStatisticFieldName": "Out_Field_Name1" }, { "statisticType": "<count \| sum \| min \| max \| avg \| stddev \| var>", "onStatisticField": "Field2", "outStatisticFieldName": "Out_Field_Name2" } ]Example [ { "statisticType": "sum", "onStatisticField": "GENDER", "outStatisticFieldName": "PopulationByGender" }, { "statisticType": "avg", "onStatisticField": "INCOME", "outStatisticFieldName": "AverageIncome" } ] |
| returnZ | If true, z-values are included in the results if the features have z-values. Otherwise, z-values are not returned. The default is false. This parameter only applies if returnGeometry is true, and the layer's hasZproperty is true. |
| returnM | If true, m-values are included in the results if the features have m-values. Otherwise, m-values are not returned. The default is false. This parameter only applies if returnGeometry is true, and the layer's hasM property is true. |
| multipatchOption | This option dictates how the geometry of a multipatch feature will be returned. This parameter only applies if the layer's geometryType property is esriGeometryMultiPatch.If multipatchOption is set to xyFootprint, the x,y footprint of each multipatch geometry will be returned in the result. If multipatchOption is set to stripMaterials, the multipatch geometry will be returned without materials (for instance, colors and textures). If multipatchOption is set to embedMaterials, the multipatch geometry will be returned with materials embedded in it. If multipatchOption is set to externalizeTextures, the multipatch geometry will be returned with materials, but the textures will be returned by reference.A new extent value for multipatchOption has been added at 10.9. Extent is supported when the layer's supportedmultipatchOptions property includes extent. When multipatchOption is set to extent, and returnZ is true, the service returns a five-point polygon geometry that has the same 3D extent as the original multipatch. The extent polygon will have the following points: [ (xmin, ymin, zmin), (xmin, ymax, zmin), (xmax, ymax, zmax), (xmax, ymin, zmin), (xmin, ymin, zmin) ]The z-coordinate units will match that of the underlying datasets' vertical coordinate system. When the vertical coordinate system is defined, the feature service layer includes properties to describe the VCS. It also includes a heightModelInfo property that describes properties such as the heightUnit: 2 3 4 5 6 7 ... "heightModelInfo": { "heightModel": "gravity_related_height", "vertCRS": "NGVD_1929", "heightUnit": "us-foot" }, ...Values: xyFootprint \| stripMaterials \| embedMaterials \| externalizeTextures \| extent |
| resultOffset | This option can be used for fetching query results by skipping the specified number of records and starting from the next record (that is, resultOffset + 1). The default is 0. This parameter only applies if supportsPagination is true. You can use this option to fetch records that are beyond maxRecordCount.Example resultOffset=100 |
| resultRecordCount | This option can be used for fetching query results up to the resultRecordCount specified. When resultOffset is specified but this parameter is not, the map service defaults it to maxRecordCount. The maximum value for this parameter is the value of the layer's maxRecordCount property. The minimum value entered for this parameter cannot be below 1. This parameter only applies if supportsPagination is true.Example resultRecordCount=10 |
| quantizationParameters | This option is supported by all feature services in ArcGIS Enterprise at 10.6.1. This is a JSON object used to project the geometry onto a virtual grid, likely representing pixels on the screen. The properties of the JSON object include extent, mode, originPosition, and tolerance. For more information, see the Quantization parameters JSON properties section below.Examples 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 //upperLeft origin position quantizationParameters={ "mode":"view", "originPosition":"upperLeft", "tolerance":1.0583354500042335, "extent":{ "type":"extent", "xmin":-18341377.47954369, "ymin":2979920.6113554947, "xmax":-7546517.393554582, "ymax":11203512.89298139, "spatialReference":{ "wkid":102100, "latestWkid":3857 } } } //lowerLeft origin position quantizationParameters={ "mode":"view", "originPosition":"lowerLeft", "tolerance":1.0583354500042335, "extent":{ "type":"extent", "xmin":-18341377.47954369, "ymin":2979920.6113554947, "xmax":-7546517.393554582, "ymax":11203512.89298139, "spatialReference":{ "wkid":102100, "latestWkid":3857 } } } |
| returnCentroid | Used to return the geometry centroid associated with each feature returned. If true, the result includes the geometry centroid. The default is false. Currently, this parameter is only supported for polygon data and is ignored for count and objectID queries. This parameter is only supported on layer-level queries.Values: true \| false |
| resultType(Optional) | The resultType parameter can be used to control the number of features returned by the query operation. The tile value is used when the client is using a virtual tiling scheme when querying features, which works similarly to tiles in a tiled map service layer. The standard value is used with a nontiled query where the client will send only one query for the full extent. Support for this parameter is advertised on the layer metadata in the supportsQueryWithResultType property. For additional information on the resultType parameter and how it interacts with max record counts, see the Result type and max record count.Values: none \| standard \| tile |
| historicMoment | This option works with ArcGIS Server services only. This is the historic moment to query. This parameter applies only if the layer is archiving enabled and the supportsQueryWithHistoricMoment property is set to true. This property is provided in the layer resource. If historicMoment is not specified, the query will apply to the current features.Syntax historicMoment=<Epoch time in milliseconds>Example historicMoment=1199145600000 |
| returnTrueCurves | When set to true, it returns true curves in output geometries. When set to false, curves are converted to densified polylines or polygons. The default is false.Values: true \| false |
| sqlFormat | The sqlFormat parameter can be either standard SQL-92 standard or it can use the native SQL of the underlying data store native. The default is none, which means the sqlFormat depends on the useStandardizedQuery parameter. For more information on formatting, see the SQL format section below.Values: none \| standard \| native |
| returnExceededLimitFeatures | This option is supported by most feature services, except for feature services published using a spatiotemporal data store. This parameter is true by default. When set to true, features are returned even when the results include exceededTransferLimit as true.When set to false and querying with resultType set to tile, features are not returned when the results include exceededTransferLimit as true. This allows a client to find the resolution in which the transfer limit is no longer exceeded without making multiple calls.Values: true \| false |
| datumTransformation | Introduced at 10.8. This parameter applies a datum transformation while projecting input geometries from their spatial reference to the layer's source spatial reference. When specifying transformations, you need to think about which datum transformation is best for this projection. For a list of valid datum transformation ID values and well-known text strings, see Using spatial references. For more information on datum transformations, see the transformation parameter in the Project operation.Syntax 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 //Syntax to apply a simple transformation datumTransformation=<wkid> //Syntax to apply a simple transformation datumTransformation={"wkt": "<WKT>"} //Syntax to apply a composite transformation datumTransformation={ "geoTransforms": [ { "wkid":<id>, "forward":<true\|false> }, { "wkt":"<WKT>", "forward":<true\|false> } ] }Example 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 //Applies a simple transformation datumTransformation=1623 //Applies a composite transformation datumTransformation={ "geoTransforms":[ { "wkid":1088, "transformForward": true }, { "wkid": "GEOGTRAN[\"S_JTSK_To_WGS_1984_1\",GEOGCS[\"GCS_S_JTSK\", DATUM[\"D_S_JTSK\",SPHEROID[\"Bessel_1841\",6377397.155,299.1528128]], PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]], GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_ 1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0], UNIT[\"Degree\",0.0174532925199433]],METHOD[\"Position_Vector\"], PARAMETER[\"X_Axis_Translation\",570.8],PARAMETER[\"Y_Axis_Translation\",85.7] ,PARAMETER[\"Z_Axis_Translation\",462.8],PARAMETER[\"X_Axis_Rotation\",4.998], PARAMETER[\"Y_Axis_Rotation\",1.587],PARAMETER[\"Z_Axis_Rotation\",5.261], PARAMETER[\"Scale_Difference\",3.56]]", "transformForward":false } ] } |
| timeReferenceUnknownClient | Setting timeReferenceUnknownClient as true indicates that the client is capable of working with data values that are not in UTC. If its not set to true, and the service layer's datesInUnknownTimeZone property is true, then an error is returned. The default is false.Its possible to define a service's time zone of date fields as unknown. Setting the time zone as unknown means that date values will be returned as-is from the database, rather than as date values in UTC. Non-hosted feature services can be set to use an unknown time zone using ArcGIS Server Manager. Setting the time zones to unknown also sets the datesInUnknownTimeZone layer property as true. Currently, hosted feature services do not support this setting. This setting does not apply to editor tracking date fields which are stored and returned in UTC even when the time zone is set to unknown.Most clients released prior to ArcGIS Enterprise 10.9 will not be able to work with feature services that have an unknown time setting. The timeReferenceUnknownClient parameter prevents these clients from working with the service in order to avoid problems.. Setting this parameter to true indicates that the client is capable of working with unknown date values that are not in UTC.Value: true \| false |
| returnEnvelope | Introduced at 11.3. Specifies if the query will return the envelope of the geometry in the query results. Support for this parameter is indicated when the layer’s supportsReturningGeometryEnvelope property is true, under advancedQueryCapabilities. The supportsReturningGeometryEnvelope will be true for line and polygon layers, and will be false for point layers. The spatial reference of the envelope is same as the feature geometry.Values: true \| false |
| fullText | Introduced at 11.4. This parameter filters query results by performing a full text search on the layer's string fields. The search is performed on the full text search index, which can be created for a hosted feature service using the Add to Definition operation. A full text search processes results efficiently and is an alternative to using where clauses with the like operator. The fullText parameter can be used in combination with other filter parameters, such as where and geometry. When multiple filter parameters are used in a query, the results from each are added together to generate the the response. Support for the fullText parameter is indicated when the layer-level supportsFullTextSearch property, under advancedQueryCapabilities, is set as true.Starting at 11.5, full text searches are supported for reference feature services in ArcGIS Enterprise when fields with a full text index are present. Full text indexes are created in the underlying enterprise geodatabase using the Add Full Text Index geoprocessing tool.For more information on the fullText parameter, see the Full text searches section below.Syntax: 2 3 4 5 6 7 8 9 10 11 12 fullText=[ { "onFields": [<fields>], "searchTerm": <search word of phrase>, "searchType": <”simple”\|”prefix”>, "operator": <and \| or \| not>, "searchOperator": <and \| or> // Added at 11.5 }, { "sqlExpression": <sql expression> // Added at 11.5 } ]Example: 2 3 4 5 6 7 8 9 10 11 fullText=[ { "onFields": ["notes"], "searchTerm": "broken pipe", "searchType": "simple", "searchOperator": "and" }, { "sqlExpression": "pipe_length > 10" } ] |
| uniqueIds (Optional) | An array of the unique IDs of the feature(s) to be deleted. OIDFieldContainsHashValue must be true when using unique IDs. |
| returnUniqueIdsOnly (Optional) | Boolean value that deafults to false. If true, uniqueIdFieldNames and uniqueIds arrays are returned.Values: true \| false |
| f | The response format. The default response format is html. The supportsQueryFormats layer property describes what formats are supported. Note that the default response format, html, is always supported.Example "supportedQueryFormats": "JSON,geoJSON,PBF"The output format geoJSON is not supported if returnM is true. Starting at 10.8, geojson will return results that match the RFC7946 specification if no outSR is specified, or if outSR is set to 4326. Setting a different outSR value will return projected results. However, these will not match the RFC7946 specification.Values: html \| json \| geojson \| pbf |

### Date-time queries

#### Time zone properties

In general, the `dateFieldsTimeReference` property of the feature service layer identifies the time zone that all dates are stored in. The exception cases involve editor tracking date fields and time aware layer time zones.

When you are working with your data, you need to consider the time zone of the fields that you are working with. If you are querying a date type field and `dateFieldsTimeReference` is set to a specific time zone, make sure your WHERE clause issues the time in that specific time zone. For example, if you want to return all the records that match 1:00 p.m. on February 9, 2015, Pacific standard time, your WHERE clause would be as follows:

Querying records in PST



```
where = pacific_time_date_field = TIMESTAMP '2015-02-09 13:00:00'
```

However, it is possible to have up to three different time zones defined on your service. If your query includes dates from the editor tracking fields or the time aware fields, you need to make sure you submit the query in their respective time zones. The time zones for these fields can be found in the properties mentioned above. If the `dateFieldsTimeReference` is null the data is assumed to be in UTC, and if it is Unknown the time zone is assumed to be undefined. The example below demonstrates how to query three date fields that have three different times zones. When querying fields in different time zones, you need to make sure the time you use corresponds with the time zone of the date field. There is a date field in PST, one in EST, and the editor tracking field `created_date` in UTC:

Querying records in three different time zones



```
where = (DateTime_PST = TIMESTAMP '2012-01-01 15:20:00' AND (DateTime_EST = TIMESTAMP '2012-01-01 18:20:00' AND created_date = TIMESTAMP '2012-01-01 22:20:00'))
```

Although you issue local time in your WHERE clause, the query operation always returns date values in UTC. You can set the date fields time zone, which shows up in the `dateFieldsTimeReference` property of the feature service layer either during publishing or in the ArcGIS Server Manager after publishing. In the Server Manager, navigate to service you wish to edit and click on the **Parameters** tab to update the time zone information. If the `dateFieldsTimeReference` property is not set, it will show up as null and the data will be assumed to be in UTC. In this case make sure you issue your WHERE clause in UTC.

As of ArcGIS Pro 3.1 and ArcGIS Enterprise 10.9, there is a new option when defining the time zone during publishing. If you don't want to define a time zone at all (not even UTC), you can set it to Unknown. Using the Unknown time zone makes it so that there is no translation done when the query operation submits and returns date values, they are stored and returned as is. This is particularly useful if you have data which spans multiple time zones.

#### Date, time and time zone offset format

When `StandardizedQueries` is enabled, use following SQL functions and syntaxes while querying against a date-time field. When `StandardizedQueries` is turned off, you must consult to the underlying database's help references to find the correct syntax.

| Field type | Description |
|---|---|
| esriFieldTypeTimestampOffset | Values contain both date, time parts and time zone offset from UTC. The data and time represent local (or wall-clock) time. The time part supports milliseconds.Syntax <timestampoffset_field> = timestamp 'yyyy-mm-dd HH24:mm:ss.fff -TZH:TZM'Example flight_arrival = timestamp '2003-01-25 14:35:00 -08:00' |
| esriFieldTypeDate | Values contain both date and time parts. The data and time represent local (or wall-clock) time, and are assumed in dateFieldsTimeReference time zone.Syntax <date_field> = timestamp 'yyyy-mm-dd HH24:mm:ss'Example incident_datetime = timestamp '2003-01-25 14:35:00' |
| esriFieldTypeDateOnly | Values contain only date part without associated to any particular time zone. dateFieldsTimeReference property has no affects on this field type.Syntax <dateonly_field> = date 'yyyy-mm-dd'Example birth_date = date '1990-01-25' |
| esriFieldTypeTimeOnly | Values contains only time part without associated to any particular time zone. dateFieldsTimeReference property has no affects on this field type.Syntax <timeonly_field> = time 'HH24:mm:ss'Example store_close_time = time '21:00:00' |

#### Interval queries

The `INTERVAL` syntax can be used in place of the date-time queries and is standardized across all map and feature services. The [INTERVAL](https://www.esri.com/arcgis-blog/products/api-rest/data-management/querying-feature-services-date-time-queries/) syntax can be used to specify either the current date or timestamp in the query:



```
//Date
<DateField> >= CURRENT_DATE -+ INTERVAL '<IntervalValue>' <TimeStampFormat>

//Timestamp
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL '<IntervalValue>' <TimeStampFormat>
```

For the syntax demonstrated above, you can interchange the `CURRENT_DATE` and `CURRENT_TIMESTAMP` values. Both can be used with `+` or `-` of `INTERVAL` values.

The examples below outline the different ways in which the `INTERVAL` syntax can be modified for the purposes of your query:



```
//'DD' Day
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'DD' DAY

//'HH' Hour
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'HH' HOUR

//'MI' Minute
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'MI' MINUTE

//'SS(.FFF)' Second
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'SS(.FFF)' SECOND

//'DD HH' DAY TO HOUR
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'DD HH' DAY TO HOUR

//'DD HH:MI' DAY TO MINUTE
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'DD HH:MI' DTY TO MINUTE

//'DD HH:MI:SS(.FFF)' DAY TO SECOND
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'DD HH:MI:SS(.FFF)' DAY TO SECOND

//'HH:MI' HOUR TO MINUTE
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'HH:MI' HOUR TO MINUTE

//'HH:SS(.FFF)' HOUR TO SECOND
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'HH:SS(.FFF)' HOUR TO SECOND

//'MI:SS(.FFF)' MINUTE TO SECOND
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL 'MI:SS(.FFF)' MINUTE TO SECOND
```

To demonstrate the `INTERVAL` format, the example below uses the `INTERVAL` syntax to query data gathered over the 3 days, 5 hours, 32 minutes, and 28 seconds:



```
DateField >= CURRENT_TIMESTAMP - INTERVAL '3 05:32:28' DAY TO SECOND
```

### Percentile statistic type

The percentile `statisticType` is supported if the `supportsPercentileStatistics` layer property (in `advancedQueryCapabilities`) is `true`. The percentile indicates the value below or above which a given percentage of values in a group of data values falls. For example, the ninetieth percentile (value 0.9) is the value below which 90 percent of the data values may be found. For percentile statistics, there are two `statisticTypes`, `PERCENTILE_DISC` (discrete) and `PERCENTILE_CONT` (continuous). Discrete returns a data value from within that dataset while continuous is an interpolated value.

The `orderBy` statistic parameter can also be used to calculate the percentile. For example, in a set of 10 values from 1 to 10, the percentile `value` for 0.9 with `orderBy` set as ascending (`ASC`) is 9, while the percentile for `value` 0.9 with `orderBy` set as descending (`DESC`) is 2. The default is `ASC`.

Syntax



```
[
  {
    "statisticType": "<PERCENTILE_CONT | PERCENTILE_DISC>",
    "statisticParameters": {
      "value": percentile_value,
      "orderBy": "<ASC | DESC>"
    },
    "onStatisticField": "Field1",
    "outStatisticFieldName": "Out_Field_Name1"
  },
  {
    "statisticType": "<PERCENTILE_CONT | PERCENTILE_DISC>",
    "statisticParameters": {
      "value": percentile_value,
      "orderBy": "<ASC | DESC>"
    },
    "onStatisticField": "Field2",
    "outStatisticFieldName": "Out_Field_Name2"
  }
]
```

Example



```
[
  {
    "statisticType": "PERCENTILE_CONT",
    "statisticParameters": {
      "value": 0.9
    },
    "onStatisticField": "NEAR_DIST",
    "outStatisticFieldName": "pop90_cont"
  },
  {
    "statisticType": "PERCENTILE_DISC",
    "statisticParameters": {
      "value": 0.9,
      "orderBy": "DESC"
    },
    "onStatisticField": "population",
    "outStatisticFieldName": "pop90_desc"
  }
]
```

### Quantization parameters JSON properties

| Property | Description |
|---|---|
| extent | An extent defining the quantization grid bounds. Its spatialReference matches the input geometry spatial reference if one is specified for the query. Otherwise, the extent will be in the layer's spatial reference. |
| mode | Geometry coordinates are optimized for viewing and displaying of data. The view value specifies that geometry coordinates should be optimized for viewing and displaying of data. The edit value specifies that full-resolution geometries should be returned, which can support lossless editing.Value: view \| edit |
| originPosition | Integer coordinates will be returned relative to the origin position defined by this property value. The default value is upperLeft.Values: upperLeft \| lowerLeft |
| tolerance | The tolerance is the size of one pixel in the outSpatialReference units. This number is used to convert the coordinates to integers by building a grid with resolution matching the tolerance. Each coordinate is then snapped to one pixel on the grid. Consecutive coordinates snapped to the same pixel are removed to reduce the overall response size.The units of tolerance are defined by outSpatialReference. If the outSpatialReference is not specified, tolerance is assumed to be in the unit of the spatial reference of the layer. If the tolerance is not specified, the maxAllowableOffset is used.If mode is set to edit, the tolerance is always set to the full-resolution tolerance of the spatial reference regardless of what is passed in or set for the maxAllowableOffset. If mode is set to view and the tolerance and maxAllowableOffset are not specified, a default 10,000 by 10,000 grid is used. |

### Return type and max record count

The `maxTileRecordCount` and `maxStandardRecordCount` are determined by the server and display in the layer metadata. The feature service assigns the `maxRecordCount` relevant to the value from the `resultType` parameter. If `resultType` is not included in the request, the default `maxRecordCount` is always used. This can be the default server-assigned value (1000, 2000) or an overwritten value provided by the service owner or admin. The values of the max record counts might vary based on the [type of the data](/rest/services-reference/enterprise/layer-feature-service/) (polygon, point, polyline, table).

If the `resultType` is specified, but the `resultRecordCount` is not specified with the `resultOffset`, the server will determine the `maxRecordCount` relevant to the `resultType` query parameter. The client can supply the `resultRecordCount` parameter in the request. This cannot be greater than the standard/tile `maxRecordCount` value if `resultType` is used.

The layer metadata also includes [maxRecordCountFactor](/rest/services-reference/enterprise/feature-layer/) that can be configured from the admin API. The server `maxRecordCountFactor` for the `tileMaxRecordCount` and `standardMaxRecordCount` is used as a multiplier for the server base value. All `maxRecordCount` values are adjusted with the `maxRecordCountFactor`.

Pagination query also supports the `resultType` query parameter.

### SQL format

The table summarizes the `sqlFormat` parameter and what you can expect from the query API.

| sqlFormat value | useStandardizedQuery is true | useStandardizedQuery is false |
|---|---|---|
| standard (sql'92) | Yes | Yes |
| native (native DBMS sql) | Not supported | Yes |
| none | Only sql'92 (means standard) | Only DBMS native SQL (native) |

### Full text searches

A full text search can only be applied to fields with the type `esriFieldTypeString` that have already had an `indexType` of `FullText` created for them. You can determine if a field has a `FullText` index by checking the indexes on the [layer](/rest/services-reference/enterprise/layer-feature-service/) resource. At 11.5, a new layer property (`fullTextSearchableFields`) lists fields with full text indexes. An error is returned if you try to search a field that does not have a full text index.

Starting at 11.5, the layer resource includes a `fullTextSearchCapabilities` property, under `advancedQueryCapabilities`, which describes which full text search expression properties are supported. The following may be listed under the `fullTextSearchCapabilities` property:

-   `supportsOperator`: When `true`, indicates that full text search expressions can include the `operator` property. Currently, reference feature services do not support the operator property, and will have their `supportsOperator` property set as `false`.
-   `supportsSearchOperator`: When `true`, indicates that full text search expressions can include the `searchOperator` property (introduced at 11.5).
-   `supportsSqlExpressionInFullText`: When `true`, indicates that full text search expressions can use the `sqlExpression` property (introduced at 11.5). ArcGIS Enterprise hosted feature services do not support SQL expressions as search expressions. ArcGIS Enterprise hosted faeture services will not return `supportsSqlExpressionInFullText` property.

The table below outlines the syntax for the `fullText` parameter.

| Properties | Description |
|---|---|
| onFields | A required property that lists the fields in the layer on which the search is performed. The fields must have a full text index. This property can also be used to return results for all fields in the service that have a full text index by specifying * as the input. 2 3 4 "onFields":["notes"], //Return results for all fields witha full text index "onFields":["*"], |
| searchTerm | The term being searched for in the layer's fields. If searchTerm contains stop words, such as "the" or "is", those words may be ignored when processing a result. The sample code below, which includes the stop word "the" would not return any result: "searchTerm":"the", |
| searchType | The type of search being performed. The following are the accepted types of searches:simple (default): Matches the searchTerm as either keywords or quoted phrases.prefix: Matches the searchTerm as a prefix.native: Matches the searchTerm, formatted as the Sql Server DSL CONTAINS function's contains_search_condition parameter. |
| operator | The conjunctive operator used between searchTerm values. The default operator is and.The operator only applies for searches that have a searchType value of simple and is only of use when there is more than one word specified for the searchTerm property.Values: and \| or \| not |
| searchOperator | Introduced at 11.5. The searchOperator is used when the fullText parameter includes multiple expressions, describing how to combine an expression with the next expression in the array. This property supports the "or" and "and" operators, with "and" serving as the default. As this property describes how one exrespssion is combined with the next, this property is not required and is ignored if it is included in the last expression in the array. |
| sqlExpression | Introduced at 11.5. The sqlExpression property allows for SQL expressions to be used as a search expression for the fullText parameter, allowing for both full text search expressions (using the onFields, searchTerm, searchType, operator, or searchOperator properties) and SQL expressions (using SQL syntax, similar to the where parameter). Using SQL expressions allows searches to combine full text results with results from a SQL expression on fields that do not have a full text index. |

The tabs below outline a number of examples for the `fullText` parameter and describe the searches being performed:

This example demonstrates a full text search on a layer's `notes` field that is searching for the words “broken pipe”. Having a `searchType` of `simple` means that any values that have both the words "broken" and "pipe", in any order, will be a match. For example, a `note` field with the text of “the pipe is broken” would result in a match for this search.



```
fullText=[{"onFields":["notes"],"searchTerm":"broken pipe","searchType":"simple"}]
```

This example demonstrates a full text search on a layer's `notes` field, utilizing the `or` operator, that is searching for either the words “broken" or "pipe”. Using the `or` operator means that any values that have either "broken" or "pipe" will be a match. For example, a `note` field with the text of “there is a burst pipe” would result in a match for this search.



```
fullText=[{"onFields":["notes"],"searchTerm":"broken pipe","searchType":"simple","operator":"or"}]
```

This example demonstrates a full text search on a layer's `notes` field, utilizing the `not` operator, that is searching for instances of “broken" that do not include the word "pipe”. Using the `not` operator means that the search looks for matches that include just the first word of the `searchTerm` and do not include any of the additional words specified in `searchTerm`. For example, a `note` field with the text of "the fence is broken" would result in a match for this search, whereas a `note` field with the text of "the pipe is broken" would not be counted as a match.



```
fullText=[{"onFields":["notes"],"searchTerm":"broken pipe","searchType":"simple","operator":"not"}]
```

This example demonstrates a full text search on two layer fields, `notes` and `comments`, that is searching for the words “broken pipe”. Having a `searchType` of `simple` means that any values from either the `notes` or `comments` fields that include both "broken" and "pipe", in any order, will be a match.



```
fullText=[{"onFields":["notes",”comments”],"searchTerm":"broken pipe","searchType":"simple"}]
```

This example demonstrates a full text search on two layer fields, `notes` and `comments`, that is searching for the words “broken pipe”. Having a `searchType` of `prefix` means that the search looks for phrases from the `notes` and `comments` that match the beginning letters of each word included in `searchTerm`. For example, a `note` field with the text of "brok pipe" will be counted as a match, but a `note` field with the text of "broken copper pipe" would not be counted as a match, as the phrase does not match.



```
fullText=[{"onFields":["notes",”comments”],"searchTerm":"broken pipe","searchType":"prefix"}]
```

This example demonstrates multiple full text search expressions. The first search expression searches the `note` field for the word "broken". The second search expression searches the `status` field for the word "assigned". The results from both searches are combined with an `and` operator by default.



```
fullText=[{"onFields":["notes"],"searchTerm":"broken","searchType":"prefix"}, {"onFields":["status"],"searchTerm":"assigned","searchType":"simple"}]
```

This example demonstrates how the `searchOperator` property can be used in full text search expressions. The first search expression searches the `notes` field for the word "broken". The second search expression searches the `risk_assessment` field for the word "high". The `searchOperator` property combines the two expressions using the `or` operator, which means the results will include notes that have the term "broken" or instances where there is a "high" risk assessment.



```
fullText=[{"onFields": ["notes"],"searchTerm": "broken","searchType": "simple","searchOperator": "or"},{"onFields": ["risk_assessment"],"searchTerm": "high","searchType": "simple"}]
```

This example demonstrates how the `fullText` parameter can be configured to use full text search expression and SQL expressions. The first search expression is a full text search expression that searches the `notes` field for the word "broken". The second search expression is an SQL expression that searches for pipe lengths that are longer than 10 units. The `searchOperator` property combines the two expression using the `and` operator, which means the results will include results for pipes that are longer than 10 units that have in their notes the term "broken".



```
fullText=[{"onFields": ["notes"],"searchTerm": "broken","searchType": "simple","searchOperator": "and"},{"sqlExpression": "pipe_length > 10"}]
```

## Example usage

### Example one

The following is a sample request URL for the `query` operation, which demonstrates a query using a WHERE clause:



```
https://organization.example.com/<context>/rest/services/Earthquakes/EarthquakesFromLastSevenDays/FeatureServer/0/query?where=magnitude+%3E+4.5&outFields=*&returnGeometry=true&returnIdsOnly=false&f=html
```

### Example two

The following is a sample request URL for the `query` operation, which demonstrates a query using a WHERE clause and returning only `OBJECTIDs`:



```
https://organization.example.com/<context>/rest/services/SanFrancisco/311Incidents/FeatureServer/1/query?where=agree_with_incident+%3D+1&returnGeometry=true&returnIdsOnly=true&f=html
```

### Example three

The following is a sample request URL for the `query` operation, which demonstrates a query using a WHERE clause using the DAY format:



```
https://organization.example.com/<context>/rest/services/DateTimeIntervalQuery/FeatureServer/0/query?
where=date_time > CURRENT_TIMESTAMP - INTERVAL '1' DAY&returnGeometry=false&returnCountOnly=true&resultType=&f=pjson
```

### Example four

The following is a sample request URL for the `query` operation, which demonstrates a query using a WHERE clause that has the DAY TO HOUR format:



```
https://organization.example.com/<context>/rest/services/DateTimeIntervalQuery/FeatureServer/0/query?
where=date_time > CURRENT_TIMESTAMP + INTERVAL '1 04' DAY TO HOUR&returnGeometry=false&returnCountOnly=true&resultType=&f=pjson
```

### Example five

The following is a sample request URL for the `query` operation, which demonstrates how to page through a query result using the `resultOffset` and `resultRecordCount` parameters to get the next set of results. Specifically, the example below shows a request that skips the first 5 records and return the next 10 counties in California, ordered by population:



```
https://organization.example.com/<context>/rest/services/USA/MapServer/3/query?where=STATE_NAME='California'&outFields=Name,Population&returnGeometry=false&resultOffset=5&resultRecordCount=10&orderByFields=Population&f=pjson
```

### Example six

The following is a sample request URL for the `query` operation, which demonstrates a query that has `resultType` is set to `none`:



```
https://organization.example.com/<context>/rest/services/USAStatesRiversCapitals/FeatureServer/2/query?where=1=1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=html&token
```

### Example seven

The following is a sample request URL for the `query` operation, which demonstrates a query that has `resultType` is set to `standard`:



```
https://organization.example.com/<context>/rest/services/USAStatesRiversCapitals/FeatureServer/2/query?where=1=1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=html&token=
```

### Example eight

The following is a sample request URL for the `query` operation, which demonstrates a query that has `resultType` is set to `tile`:



```
https://organization.example.com/<context>/rest/services/USAStatesRiversCapitals/FeatureServer/2/query?where=1=1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=tile&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=html&token=
```

### Example nine

The following is a sample request URL for the `query` operation, which demonstrates a query using a WHERE clause to find field values equal to the currently connected federated ArcGIS Enterprise user:



```
https://organization.example.com/<context>/rest/services/DateTimeIntervalQuery/FeatureServer/0/query?where=workerfield=current_user &returnGeometry=false&returnCountOnly=true&resultType=&f=pjson
```

### Example ten

The following is a sample request URL for the `query` operation, which demonstrates a query using a WHERE clause to find field values that include the currently connected federated ArcGIS Enterprise user:



```
https://organization.example.com/<context>/rest/services/DateTimeIntervalQuery/FeatureServer/0/query?where=position(current_user in workersfield)>0 &returnGeometry=false&returnCountOnly=true&resultType=&f=pjson
```

## JSON Response syntax

### Example one

The sample JSON response syntax below shows the response forma returned when `returnIdsOnly` is set to `false` and `returnCountOnly` is set to `false`:



```
{
  "objectIdFieldName": "<objectIdFieldName>",
  "globalIdFieldName": "<globalIdFieldName>",
  "geometryType": "<geometryType>", //for feature layers only
  "spatialReference": <spatialReference>, //for feature layers only
  "hasZ": <true|false>, //added in 10.1
  "hasM": <true|false>, //added in 10.1
  "fields": [
    {"name": "<fieldName1>", "type" : "<fieldType1>", "alias" : "<fieldAlias1>", "length" : "<length1>"},
    {"name": "<fieldName2>", "type" : "<fieldType2>", "alias" : "<fieldAlias2>", "length" : "<length2>"}
  ],
  "features": [ //features will include geometry for feature layers only
    <feature1>, <feature2>
  ]
}
```

### Example two

The sample JSON response syntax below shows the response forma returned when `returnCountOnly` is set to `true`:



```
{
  "count": <count>
}
```

### Example three

The sample JSON response syntax below shows the response forma returned when `returnCountOnly` is set to `true` and `returnExtentOnly` is set to `true`:



```
{
  "count": <count>,
  "extent": <envelope>
}
```

### Example four

The sample JSON response syntax below shows the response forma returned when `returnIdsOnly` is set to `true`:



```
{
  "objectIdFieldName": "<objectIdFieldName>",
  "objectIds": [ <objectId1>, <objectId2> ]
}
```

## JSON Response example

### Example one

The following JSON response example is returned when `returnIdsOnly` is set to `false` and `returnCountOnly` is set to `false`:



```
{
  "objectIdFieldName": "objectid",
  "globalIdFieldName": "",
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 4326
  },
    "fields": [
    {
      "name": "objectid",
      "type": "esriFieldTypeOID",
      "alias": "Object ID"
    },
    {
      "name": "datetime",
      "type": "esriFieldTypeDate",
      "alias": "Earthquake Date",
      "length": 36
    },
    {
      "name": "depth",
      "type": "esriFieldTypeDouble",
      "alias": "Depth"
    },
    {
      "name": "eqid",
      "type": "esriFieldTypeString",
      "alias": "Earthquake ID",
      "length": 50
    },
    {
      "name": "latitude",
      "type": "esriFieldTypeDouble",
      "alias": "Latitude"
    },
    {
      "name": "longitude",
      "type": "esriFieldTypeDouble",
      "alias": "Longitude"
    },
    {
      "name": "magnitude",
      "type": "esriFieldTypeDouble",
      "alias": "Magnitude"
    },
    {
      "name": "numstations",
      "type": "esriFieldTypeInteger",
      "alias": "Number of Stations"
    },
    {
      "name": "region",
      "type": "esriFieldTypeString",
      "alias": "Region",
      "length": 200
    },
    {
      "name": "source",
      "type": "esriFieldTypeString",
      "alias": "Source",
      "length": 50
    },
    {
      "name": "version",
      "type": "esriFieldTypeString",
      "alias": "Version",
      "length": 50
    }
  ],
  "features": [
    {
      "geometry": {
        "x": -178.24479999999991,
        "y": 50.012500000000045
      },
      "attributes": {
        "objectid": 3745682,
        "datetime": 1272210710000,
        "depth": 31.100000000000001,
        "eqid": "2010vma5",
        "latitude": 50.012500000000003,
        "longitude": -178.2448,
        "magnitude": 4.7999999999999998,
        "numstations": 112,
        "region": "Andreanof Islands, Aleutian Islands, Alaska",
        "source": "us",
        "version": "Q"
      }
    },
    {
      "geometry": {
        "x": -72.865099999999927,
        "y": -37.486599999999953
      },
      "attributes": {
        "objectid": 3745685,
        "datetime": 1272210142999,
        "depth": 40.600000000000001,
        "eqid": "2010vma4",
        "latitude": -37.486600000000003,
        "longitude": -72.865099999999998,
        "magnitude": 4.9000000000000004,
        "numstations": 58,
        "region": "Bio-Bio, Chile",
        "source": "us",
        "version": "7"
      }
    }
  ]
}
```

### Example two

The following JSON response example is returned when `returnIdsOnly` is set to `false`, `returnCountOnly` is set to `false`, and `outFields` is not specified:



```
{
  "objectIdFieldName": "objectid",
  "globalIdFieldName": "",
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 4326
  },
  "fields": [],
  "features": [
    {
      "geometry": {
        "x": 237.17180000000008,
        "y": 38.844700000000046
      },
      "attributes": {}
    },
    {
      "geometry": {
        "x": 242.89430000000004,
        "y": 34.559200000000089
      },
      "attributes": {}
    }
  ]
}
```

### Example three

The following JSON response example is returned when `returnIdsOnly` is set to `false`, `returnCountOnly` is set to `false`, `outFields` is not specified, and `geometryPrecision` is set to `3`:



```
{
  "objectIdFieldName": "objectid",
  "globalIdFieldName": "",
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 4326
  },
  "fields": [],
  "features": [
    {
      "geometry": {
        "x": 237.172,
        "y": 38.845
      },
      "attributes": {}
    },
    {
      "geometry": {
        "x": 242.894,
        "y": 34.559
      },
      "attributes": {}
    }
  ]
}
```

### Example four

The following JSON response example is returned when `returnIdsOnly` is set to `true`:



```
{
  "objectIdFieldName": "objectid",
  "objectIds": [1, 2, 3, 4, 5, 7]
}
```

### Example five

The following JSON response example is returned when `returnCountOnly` is set to `true`:



```
{
  "count": 48
}
```

### Example six

The following JSON response example is returned when `returnGeometry` is set to `true` and `returnCentroid` is set to `true`:



```
{
  "geometryType": "esriGeometryPolygon",
  "features": [
    {
      "attributes": {"FID" : 6,},
      "geometry": {
        "rings": [
          [
            [3665984.6341781, 4199764.97834117],
            [3607400.16786144, 4129939.04834019],
            [3593238.34218707, 4176854.4199198],
            [3665984.6341781, 4199764.97834117]
          ]
        ]
      },
      "centroid": {
        "x": 3702339.9805305949,
        "y": 4174890.1188574196
      }
    }
  ]
}
```

### Example seven

The following JSON response example is returned when `returnGeometry` is set to `false` and `returnCentroid` is set to `true`:



```
{
  "geometryType": "esriGeometryPolygon",
  "features": [
    {
      "attributes" : {
        "FID" : 6,
      },
      "centroid" : {
        "x" : 3702339.9805305949,
        "y" : 4174890.1188574196
      }
    }
  ]
}
```

### Example eight

The following JSON response example is returned when `multipatchOption` is set to `extent` and `returnZ` is `true` for layers with multipatch geometries:



```
{
  "objectIdFieldName": "objectid",
  "globalIdFieldName": "globalid",
  "geometryType": "esriGeometryPolygon",
  "spatialReference": {
    "wkid": 4326,
    "latestWkid": 4326,
    "vcsWkid": 5702,
    "latestVcsWkid": 5702
  },
  "hasZ": true,
…
  "features": [
    {
      "attributes": {
        "objectid": 30,
        "region": 8,
        "globalid": "{37CA67AE-53DA-41BC-94C1-80DEC8D46C8D}"
      },
      "geometry": {
        "hasZ": true,
        "rings": [
          [
            [
              8.5387978810035712,
              47.376115083562929,
              405.07499999999709
            ],
            [
              8.5387978810035712,
              47.376514765273249,
              405.07499999999709
            ],
            [
              8.5394347730652775,
              47.376514765273249,
              432.96700000000419
            ],
            [
              8.5394347730652775,
              47.376115083562929,
              405.07499999999709
            ],
            [
              8.5387978810035712,
              47.376115083562929,
              405.07499999999709
            ]
          ]
        ]
      }
    }
  ]
}
```

### Example nine

The following JSON response example is returned when the geometry has control points. The control points are described in the `ids` array. The index of each `ids` array value matches up with the vertex at the same index in the geometry. An `ids` array value of 1 means that it is a control point vertex while a value of 0 means that it is not a control point vertex.



```
{
  "objectIdFieldName": "OBJECTID",
  "globalIdFieldName": "GlobalID",
  "geometryType": "esriGeometryPolyline",
  "spatialReference": {
    "wkid": 102100,
    "latestWkid": 3857
  },
  "hasZ": false,
  "fields": [
    {
      "name": "OBJECTID",
      "alias": "OBJECTID",
      "type": "esriFieldTypeOID"
    }
  ],
  "features": [
    {
      "attributes": {
        "OBJECTID": 2
      },
      "geometry": {
        "paths": [
          [
            [
              -13123272.572900001,
              3495029.6371000037
            ],
            [
              -12883437.2676,
              3497028.2646000013
            ],
            [
              -12744038.6544,
              3498189.9196999967
            ],
            [
              -12631303.591699999,
              3499129.3786000013
            ]
          ]
        ],
        "ids": [
          [
            0,
            1,
            1,
            0
          ]
        ]
      }
    }
  ]
}
```

### Example ten

This example shows the new date and bigInteger field types, which are supported at starting ArGIS Enterprise 11.3. Previously, these were beta features at ArGIS Enterprise 11.2. The following JSON response example is returned when `returnGeometry` is `false`, `outFields` includes the `timestampfld`, `dateonlyfld`, `timeonlyfld`,`abigint` fields and `objectIds` is `3150`:



```
{
  "objectIdFieldName": "OBJECTID",
  "globalIdFieldName": "GlobalID",
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 4267,
    "latestWkid": 4267
  },
  "fields": [
    {
      "name": "timestampfld",
      "alias": "timestampfld",
      "type": "esriFieldTypeTimestampOffset"
    },
    {
      "name": "dateonlyfld",
      "alias": "dateonlyfld",
      "type": "esriFieldTypeDateOnly",
      "length": 8
    },
    {
      "name": "timeonlyfld",
      "alias": "timeonlyfld",
      "type": "esriFieldTypeTimeOnly",
      "length": 8
    },
    {
      "name": "abigint",
      "alias": "abigint",
      "type": "esriFieldTypeBigInteger"
    }
  ],
  "features": [
    {
      "attributes": {
        "timestampfld": "2023-05-03T11:44:08-07:00",
        "dateonlyfld": "1899-12-30",
        "timeonlyfld": "15:54:36",
        "abigint": 10111222333
      }
    }
  ]
}
```

### Example eleven

This example shows WHERE clauses with the `esriFieldTypeTimestampOffset` field. For this example, the data is as follows:

| OBJECTID | timestampfld |
|---|---|
| 1 | 2003-01-25 14:00:00 -08:00 |
| 2 | 2003-01-25 14:00:00 -05:00 |
| 3 | 2003-01-25 17:00:00 -05:00 |

If the `where` parameter is set to a `timestampfld` of `2003-01-25 14:00:00 -08:00`, rows will be matched based on absolute (UTC) time. This means that rows 1 and 3 are returned, as they reflect the same absolute time when convereted to UTC. This configuraiton would be useful if, for example, you wanted to see what traffic was like across the country at a specific moment in time:



```
{
  "objectIdFieldName": "OBJECTID",
  "globalIdFieldName": "GlobalID",
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 4267,
    "latestWkid": 4267
  },
  "fields": [
    {
      "name": "OBJECTID",
      "alias": "OBJECTID",
      "type": "esriFieldTypeOID",
      "length": 8
    },
    {
      "name": "timestampfld",
      "alias": "timestampfld",
      "type": "esriFieldTypeTimestampOffset"
    }
  ],
  "features": [
    {
      "attributes": {
        "OBJECTID": 1,
        "timestampfld": "2003-01-25T14:00:00-08:00"
      }
    },
    {
      "attributes": {
        "OBJECTID": 3,
        "timestampfld": "2003-01-25T17:00:00-05:00"
      }
    }
  ]
}
```

Rows can also be matched based on their local time. If the `where` parameter was set in the following way:



```
cast(timestampfld as timestamp) = timestamp '2003-01-25 14:00:00'
```

both rows 1 and 2 would be returned, as both timestamps represent 2 pm in their local timezone. This configuraiton would be useful if, for example, you wanted to see what traffic was like just before rush hour using local time (for example, 2 pm in each timezone) across the country.



```
{
  "objectIdFieldName": "OBJECTID",
  "globalIdFieldName": "GlobalID",
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 4267,
    "latestWkid": 4267
  },
  "fields": [
    {
      "name": "OBJECTID",
      "alias": "OBJECTID",
      "type": "esriFieldTypeOID",
      "length": 8
    },
    {
      "name": "timestampfld",
      "alias": "timestampfld",
      "type": "esriFieldTypeTimestampOffset"
    }
  ],
  "features": [
    {
      "attributes": {
        "OBJECTID": 1,
        "timestampfld": "2003-01-25T14:00:00-08:00"
      }
    },
    {
      "attributes": {
        "OBJECTID": 2,
        "timestampfld": "2003-01-25T14:00:00-05:00"
      }
    }
  ]
}
```

### Example twelve

The following JSON response example is returned when `retrunExtentOnly` is `true`.



```
{
  "features": [
    {
      "envelope": {
        "xmin": -1.3885038430195604e7,
        "ymin": 5707454.569268562,
        "xmax": -1.3015269129041411e7,
        "ymax": 6274862.04128094
      },
      "centroid": {
        "x": -1.3405501208218541e7,
        "y": 6007537.146588812
      },
      "attributes": {
        "state_name": "Washington"
      },
      "geometry": {
        "rings": [
          [
            [
              -1.3625589074387547e7,
              6144434.816338301
            ],
            [
              -1.363236139509361e7,
              6144960.703618102
            ],
            ..........
            ..........
            ..........
            [
              -1.366245295452885e7,
              6153032.828067109
            ]
          ]
        ]
      }
    }
  ],
  "spatialReference": {
    "latestWkid": 3857,
    "wkid": 102100
  },
  "geometryType": "esriGeometryPolygon"
}
```

### Example thirteen

The following is an example response for a request using unique IDs and with `returnUniqueIdsOnly` set to `true`.



```
{
  "exceededTransferLimit": false,
  "uniqueIdFieldNames": "_id",
  "uniqueIds": ["98aQ45IB1qj3KCKj7aug"]
}
```

### Example thirteen

The following is an example response for a request using unique IDs, `returnUniqueIdsOnly` set to `false` and `objectId` in the `outFields` request parameter.



```
{
  "hasZ": false,
  "features": [
    {
      "attributes": {
        "country": "CANADA",
        "_id": "yeXRMZMBed_rc6KBDj6V",
        "hash_id": 20753721125092134 //server-genererated integer value based on feature's unique IDs
      },
      "geometry": {
        "x": -110.825883,
        "y": 53.090981
      }
    }
  ],
  "exceededTransferLimit": false,
  "hasM": false,
  "globalIdFieldName": "globalid",
  "objectIdFieldName": "hash_id",
  "uniqueIdFieldNames": "_id",
  "fields": [
    {
      "defaultValue": null,
      "name": "_id",
      "length": 32,
      "alias": "_id",
      "type": "esriFieldTypeString"
    },
    {
      "defaultValue": null,
      "length": 8,
      "name": "hash_id",
      "alias": "hash_id",
      "type": "esriFieldTypeOID"
    },
    {
      "defaultValue": null,
      "length": 1000000,
      "name": "country",
      "alias": "country",
      "type": "esriFieldTypeString"
    }
  ],
  "spatialReference": {
    "latestWkid": 4326,
    "wkid": 4326
  },
  "geometryType": "esriGeometryPoint"
}
```