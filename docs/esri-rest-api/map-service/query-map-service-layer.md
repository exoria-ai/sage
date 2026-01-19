# Query (Map Service/Layer)

> Source: [/rest/services-reference/enterprise/query-map-service-layer/](https://developers.arcgis.com/rest/services-reference/enterprise/query-map-service-layer/)

**URL:**: https://<layer-url>/query

**Methods:**: GET

**Required Capability:**: Data

**Version Introduced:**: 9.3

## Description

Note that all parameters related to geometry will be ignored when querying tables.

The result of this operation is a feature set. This feature set contains [feature objects](/rest/services-reference/enterprise/feature-object/) including the values for the fields requested by the user. For layers, if you request geometry information, the geometry of each feature is also returned in the feature set. For tables, the feature set does not include geometries.

## New in 11.4

-   Two new parameters are introduced to work with unique-ids i.e. non-integer based unique identifiers.
    -   `returnUniqueIdsOnly` to return non-integer unique identifiers.
    -   `uniqueIds` to pass in non-integer unique identifiers in a query operation.

## New in 11.2

-   `esriFieldTypeObjectID` supports 64-bit integer values.
    
-   When `esriFieldTypeDate` 's precision is 1, query response includes milliseconds. When precision value is 0, last 3 digits of epoch values are always 0s.
    
-   Support for four new field types are added. They are:`esriFieldTypeBigInt` ,`esriFieldTypeTimestampOffset` ,`esriFieldTypeDateOnly` , `esriFieldTypeTimeOnly` . Please see Date-time queries section below.
    
    -   Values returned for `esriFieldTypeTimestampOffset` field types are string literals conforming to ISO 8601 standard i.e. `YYYY-MM-DDThh:mm:ss.sss+/-HH:MM` . These values represent absolute time comprised of wall-clock time and an offset from UTC.
        
        -   This field type allows storing date/time values from multiple time zones in a single field.
    -   Values returned for `esriFieldTypeDateOnly` field types are string literals conforming to ISO 8601 standard and contains only date parts without any time parts i.e. `YYYY-MM-DD`
        
    -   Values returned for `esriFieldTypeTimeOnly` field types are string literals conforming to ISO 8601 standard and contains only time parts without any date parts i.e. `hh:mm:ss` . There is no milliseconds support in this field type.
        
-   A special keyword `current_user` is supported in the `where clause` . This is helpful when you want to view records/features that belongs to or edited/inserted by the currently logged in user. This keyword is supported when "supportsCurrentUserQueries": true in the layers "advancedQueryCapabilities" property. Note that this enhancement requires the server to have standardizedQueries enabled
    

## New in 10.9

-   The `Query` operation is enhanced to return spatially aggregated results in regularly shaped polygon (such as hexagon, square, and so on) tessellation from point features.
    
    -   You need to check the value for `SupportsLOD` property in the layer resources before making requests with `lod` , `lodType` or `lodSR` optionally combined with `outStatistics` and other query parameters.
-   Percentile in an `outStatistics` query is supported for layers and tables in a file geodatabase.
    

## 10.8.1

The layer query operation supports `percentile` as a `statisticType` when using `outStatistics` for map services published from ArcGIS Pro that reference enterprise geodatabase data. Layers that support percentiles include the `supportsPercentileStatistics` property as `true` , found in the `advancedQueryCapabilities` layer object.

## New in 10.7.1

-   Map Services now support the protocol buffer (`pbf` ) format. This format is supported on map services from ArcGIS Pro. The `supportedQueryFormats` layer property will list `pbf` if it is available on the layer.

## New in 10.7

-   Support for `amf` output format was removed.

## New in 10.6.1

-   Supports the following new parameters.
    
    -   `historicMoment` to query from a given moment in an archive enabled layer.
-   Supports returning 'number of unique values', instead of a list of unique value, off a field when values for both `returnCountOnly` and `returnDistinctValues` are true.
    
-   Map services now support `quantizationParameters` .
    

## New in 10.5

-   Supports the following new parameters.
    
    -   `datumTransformations` to provide a desired datum transformation to be applied while features get projected.
    -   `rangeValues` to set values to ranges.
    -   `parameterValues` to set value to parameterized filters.
-   Supports passing in SQL expressions in `outStatistics` . Check `supportsSqlExpression` on resources to find out whether the layer/table allows SQL expressions.
    

## New at 10.4

-   Supports GeoJSON as a response format.
-   Supports passing in expressions in `orderByFields` and `groupByFieldsForStatistics` . When `useStandardizedQueries` is `true` , you can pass in expressions that conform to `StandardizedQueries` specifications. Otherwise, any expressions that are supported by the underlying database can be passed in.

## New at 10.3.1

-   The `exceededTransferLimit` property is now included in the JSON response when paging through a query result with the `resultOffset` and `resultRecordCount` parameters. When `exceededTransferLimit` is `true` , it indicates there are more query results and you can continue to page through the results. When `exceededTransferLimit` is `false` , or this property is absent in a query result, it indicates that you have reached the end of the query results.

## New at 10.3

-   Supports pagination in a query layer. Use`resultOffset` and `resultRecordCount` parameters to page through a query result.
-   Note that when you pass in one of these two parameters and `orderByFields` is left empty, the map service uses the object-id field to sort the result. For a query layer with a pseudocolumn as the object-id field (for example, FID), you must provide `orderByFields` or else the query will fail.
-   `query` now supports true curves in an input `geometry` parameter.
-   `query` now returns true curves in output geometries when the `returnTrueCurves` parameter is set to true.
-   Learn more about JSON Curve Objects in [Geometry Objects](/rest/services-reference/enterprise/geometry-objects/).

## New at 10.2

-   The `where` parameter value must conform to the standardized queries, if the [layer/table](/rest/services-reference/enterprise/layer-table/) resource advertises `useStandardizedQueries` is true. Learn more about [standardized queries](https://enterprise.arcgis.com/en/server/latest/administer/windows/about-standardized-queries.htm).
-   `outStatistics` now supports the `gdbVersion` parameter.

## New at 10.1 SP1

-   Support for a new parameter named `returnDistinctValues` that accepts a Boolean value was added. When true, the query result would contain distinct values based on the fields specified in the `outFields` parameter.
-   `outStatistics` now supports the `geometry` parameter.

## New at 10.1

-   Support for `orderByFields` , `outStatistics` , and `groupByFieldsForStatistics` was added for both layers and tables.
-   Support for `returnZ` and `returnM` was added for layers. Default value for `returnZ` and `returnM` is false.
-   When output format `f` is kmz, the result would always contain a z-value irrespective of the `returnZ` property value. If the feature geometry does not support z, a default value of 0 would be returned for z.
-   Support for the `gdbVersion` parameter was added. Use this parameter to specify the geodatabase version to query.
-   The `geometryPrecision` parameter was introduced. This option can be used to specify the number of decimal places in the response geometries returned by the query operation.
-   JSON response contains an optional property `exceededTransferLimit` . This property will be true only if the number of records exceeds the maximum number configured by the server administrator.

## New at 10.0 SP1

-   At 10.0 SP1, support for returning the count (number of features/records) that would be returned by a query was added for both layers and tables.

## New at 10.0

-   Support for querying layers and tables based on time was added at 10.0. For time-aware layers, users can use the time parameter to specify the time instant or the time extent to query.
    
-   A new `returnIdsOnly` parameter was introduced. If set to `false` (default), the response will be a feature set. If `true` , the response will be an array of object IDs.
    
-   Note that while there is a limit on the number of features included in the feature set response, there is no limit on the number of object IDs returned in the ID array response. Clients can exploit this to get all the query conforming object IDs by specifying `returnIdsOnly=true` and subsequently requesting feature sets for subsets of object IDs.
    
-   Support for query based on `objectIds` was added.
    
-   Support for `f=amf` was added.
    
-   Support for `generalizing` geometries returned by the query operation was added.
    
-   The `query` operation returns an additional `fields` array (JSON and AMF only) that contains array of field information for returned values. This array contains only fields specified in the `outFields` parameter. See [Layer/Table](/rest/services-reference/enterprise/layer-table/) for details on fields.
    
-   The `fieldAliases` member is deprecated.
    

You can provide arguments to the query operation as query parameters defined in the parameters table below.

## Request parameters

| Parameter | Details |
|---|---|
| text | A literal search text. If the layer has a display field associated with it, the server searches for this text in this field. This parameter is shorthand for a WHERE clause of where <displayField> like '%<text>%' . The text is case sensitive. This parameter is ignored if the WHERE parameter is specified.Example text=Los |
| geometry | The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.Syntax 2 3 4 5 6 7 8 //Syntax for Envelope geometryType geometry={xmin: -104, ymin: 35.6, xmax: -94.32, ymax: 41} //Syntax for Envelope geometryType geometry=-104,35.6,-94.32,41 //Syntax for Point geometryType geometry=-104,35.6 |
| geometryType | The type of geometry specified by the geometry parameter. The geometry type can be an envelope, point, line, or polygon. The default geometry type is an envelope.Values: esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon \| esriGeometryEnvelope |
| inSR | The spatial reference of the input geometry . The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. If the inSR is not specified, the geometry is assumed to be in the spatial reference of the map. |
| spatialRel | The spatial relationship to be applied on the input geometry while performing the query. The supported spatial relationships include intersects, contains, envelope intersects, within, and so on. The default spatial relationship is intersects (esriSpatialRelIntersects) .Values: esriSpatialRelIntersects \| esriSpatialRelContains \| esriSpatialRelCrosses \| esriSpatialRelEnvelopeIntersects \| esriSpatialRelIndexIntersects \| esriSpatialRelOverlaps \| esriSpatialRelTouches \| esriSpatialRelWithin \| esriSpatialRelRelation |
| relationParam | The spatial relate function that can be applied while performing the query operation. An example for this spatial relate function is "FFFTTT***." For more information on this spatial relate function, refer to the documentation for the spatial relate function. |
| where | A WHERE clause for the query filter. Any legal SQL WHERE clause operating on the fields in the layer is allowed.Example 2 3 4 where=POP2000 > 350000 //When standardized queries are enabled where = CHAR_LENGTH(cntry_name) > 18 |
| objectIds | The object IDs of this layer or table to be queried.Syntax objectIds=<objectId1>, <objectId2> objectIds=37, 462 |
| time | The time instant or the time extent to query. A null value specified for start time or end time will represent infinity for start or end time, respectively.Syntax 2 3 4 5 //Time instant time=<timeInstant> //Time extent time=<startTime>, <endTime>Syntax 2 3 4 5 //Time instant for 1 Jan 2008 00:00:00 GMT time=1199145600000 //Time extent for 1 Jan 2008 00:00:00 GMT to 1 Jan 2009 00:00:00 GMT time=1199145600000, 1230768000000 |
| distance | This parameter only applies if supportsQueryWithDistance is true .The buffer distance for the input geometries. The distance unit is specified by units . For example, if the distance is 100, the query geometry is a point, units is set to esriSRUnit_Meter , and all points within 100 meters of the point are returned.The geodesic buffer is created based on the datum of the output spatial reference if it exists. If there is no output spatial reference, the input geometry spatial reference is used. Otherwise, the native layer spatial reference is used to generate the geometry buffer used in the query.Syntax distance=<distance>Example distance=100 |
| units | This parameter only applies if supportsQueryWithDistance is true . The unit for calculating the buffer distance.Values: esriSRUnit_Meter \| esriSRUnit_StatuteMile \| esriSRUnit_Foot \| esriSRUnit_Kilometer \| esriSRUnit_NauticalMile \| esriSRUnit_USNauticalMile |
| outFields | The list of fields to be included in the returned result set. This list is a comma-delimited list of field names. If you specify the shape field in the list of return fields, it is ignored. To request geometry, set returnGeometry to true . You can also specify the wildcard "* " as the value of this parameter. In this case, the query results include all the field values.Example 2 3 4 outFields=AREANAME,ST,POP2000 //Wildcard usage outFields=* |
| returnGeometry | If true , the result set includes the geometry associated with each result. The default is true .Values: true \| false |
| maxAllowableOffset | This option was added at 10.0. This option can be used to specify the maxAllowableOffset to be used for generalizing geometries returned by the query operation. The maxAllowableOffset is in the units of the outSR . If outSR is not specified, maxAllowableOffset is assumed to be in the unit of the spatial reference of the map.Example maxAllowableOffset=2 |
| geometryPrecision | This option was added at 10.1. This option can be used to specify the number of decimal places in the response geometries returned by the query operation. This applies to x- and y-values only (not m- or z-values).Example geometryPrecision=3 |
| outSR | The spatial reference of the returned geometry. The spatial reference can be specified as either a well-known ID or as a spatial reference JSON object. If outSR is not specified, the geometry is returned in the spatial reference of the map.When using outSR with pbf , the pbf format will use coordinate quantization for layer queries. When an output spatial reference is not provided for a query operation, the Map Service derives coordinate quantization parameters from the layer's spatial reference. If the precision in the layer's spatial references is inadequate for the client application's use, it should pass in a spatial reference with suitable precision as the output spatial reference. If the layer's source spatial reference has the desired precision and it is suitable for the client's use, the client can use the source layer's spatial reference as the output spatial reference. |
| returnIdsOnly | If true , the response only includes an array of object IDs. Otherwise the response is a feature set. The default is false . Note that while there is a limit on the number of features included in the feature set response, there is no limit on the number of object IDs returned in the ID array response. Clients can exploit this to get all the query conforming object IDs by specifying returnIdsOnly is true and subsequently requesting feature sets for subsets of object IDs.Values: true \| false |
| returnCountOnly | If true , the response only includes the count (number of features/records) that would be returned by a query. Otherwise the response is a feature set. The default is false . This option supersedes the returnIdsOnly parameter.Values: true \| false |
| returnExtentOnly | If true , the response only includes the extent of the features that would be returned by the query. If returnCountOnly is true, the response will return both the count and the extent. The default is false . This parameter applies only if the supportsReturningQueryExtent property of the layer is true .Values: true \| false |
| orderByFields | This parameter specifies one or more field names or expressions that the features or records need to be ordered by. Use ASC or DESC for ascending or descending order, respectively. This parameter is supported on only those layers and tables that have the supportsAdvancedQueries property set to true . When used with outStatistics , only field names specified in outStatisticFieldName or groupByFieldsForStatistics are allowed. orderByFields defaults to ASC (ascending order) if <ORDER> is unspecified.Syntax 2 orderByFields=expression1 <ORDER>, expression2 <ORDER>, expression3 <ORDER>Example 2 3 orderByFields=STATE_NAME ASC, RACE DESC, GENDER orderByFields=POPULATION / SHAPE_AREA |
| outStatistics | This parameter provides definitions for one or more field-based statistics to be calculated. This parameter is only supported on layers and tables that have the supportsStatistics property set to true . When using outStatistics , the following parameters are supported:groupByFieldsForStatisticstextorderByFieldstexttimewheregeometry (Support added at 10.1 SP1)gdbVersion (Support added at 10.2)percentile (Support added at 10.8.1)statisticType (Support added at 10.8.1)Values: An array of statistic definitions. A statistic definition specifies the type of statistic, the field on which it is to be calculated, and the resulting output field name.Syntax [ { "statisticType": "<count \| sum \| min \| max \| avg \| stddev \| var \| percentile_cont \| percentile_desc>", "onStatisticField": "Field1", "statisticParameters": { //only needed for percentile statistic type "value": value }, "outStatisticFieldName": "Out_Field_Name1" }, { "statisticType": "<count \| sum \| min \| max \| avg \| stddev \| var \| percentile_cont \| percentile_desc>", "onStatisticField": "Field2", "statisticParameters": { //only needed for percentile statistic type "value": value }, "outStatisticFieldName": "Out_Field_Name2" } ]Example [ { "statisticType": "sum", "onStatisticField": "GENDER", "outStatisticFieldName": "PopulationByGender" }, { "statisticType": "avg", "onStatisticField": "INCOME", "outStatisticFieldName": "AverageIncome" } ] |
| groupByFieldsForStatistics | This parameter specifies one or more field names using the values that need to be grouped for calculating the statistics. Expressions are allowed in addition to field name. When StandardizedQueries is enabled, only expressions that conform to the specifications are allowed. When StandardizedQueries is disabled, you can pass in any expression that the underlying database allows.Syntax groupByFieldsForStatistics=expression1, expression2Example 2 3 4 groupByFieldsForStatistics=STATE_NAME, GENDER //Group by month when StandardizedQueries is enabled groupByFieldsForStatistics=extract(month from incident_date) |
| returnZ | If true , the z-values will be included in the results if the features have z-values. Otherwise z-values are not returned. The default is false . |
| returnM | If true , m-values will be included in the results if the features have m-values. Otherwise, m-values are not returned. The default is false . |
| gdbVersion | GeoDatabase version to query. This parameter applies only if the hasVersionedData property of the service and the isDataVersioned property of the layers queried are true . If this is not specified, the query will apply to the published map's version.Syntax gdbVersion=<geodatabase version>Example gdbVersion=sde.USER1 |
| returnDistinctValues | If true , returns distinct values based on the fields specified in outFields . This parameter applies only if the supportsAdvancedQueries property of the layer is true .Syntax returnDistinctValues=<true \| false>Example returnDistinctValues=true |
| returnTrueCurves | If true , returns true curves in output geometries; otherwise, curves are converted to densified polylines or polygons.Values: true \| false |
| resultOffset | This option can be used for fetching query results by skipping the specified number of records and starts from the next record (for example, resultOffset + 1th). The Default is 0. This parameter only applies if supportsPagination is true . You can use this option to fetch records that are beyond maxRecordCount . For example, if maxRecordCount is 1,000, you can get the next 100 records by setting resultOffset=1000 and resultRecordCount = 100 ; query results can return the results in the range of 1,001 to 1,100. |
| resultRecordCount | This option can be used for fetching query results up to the resultRecordCount specified. When resultOffset is specified but this parameter is not, the map service defaults it to maxRecordCount . The maximum value for this parameter is the value of the layer's maxRecordCount property. This parameter only applies if supportsPagination is true .Example 2 //fetches up to 10 records resultRecordCount=10 |
| sqlFormat | The sqlFormat parameter can be either standard SQL-92 standard or it can use the native SQL of the underlying data store native . The default is none , which means the sqlFormat depends on the useStandardizedQuery parameter. The native format is supported when useStandardizedQuery is false . For more information on formatting, see the SQL format section below.Values: none \| standard \| native |
| datumTransformation | Use this parameter to apply a datum transformation while projecting geometries in the results when outSR is different than the layer's spatial reference.For a list of valid datum transformation ID values (WKID) and well-known text (WKT) strings, see Using spatial references. For more information on datum transformations, see the transformation parameter in the Project operation.Syntax 2 3 4 5 6 //Syntax to apply a transformation datumTransformation=wkid1 //Syntax to apply a composite transformation datumTransformation={"wkid": <wkid1>} datumTransformation={"wkt": "<wkt1>"}Examples 2 3 4 5 6 7 8 //Apply a transformation datumTransformation=1623 datumTransformations={"wkt": "GEOGTRAN[\"S_JTSK_To_WGS_1984_1\", GEOGCS[\"GCS_S_JTSK\", DATUM[\"D_S_JTSK\", SPHEROID[\"Bessel_1841\", 6377397.155, 299.1528128]], PRIMEM[\"Greenwich\", 0.0], UNIT[\"Degree\", 0.0174532925199433]], GEOGCS[\"GCS_WGS_1984\", DATUM[\"D_WGS_1984\", SPHEROID[\"WGS_1984\", 6378137.0, 298.257223563]], PRIMEM[\"Greenwich\", 0.0], UNIT[\"Degree\", 0.0174532925199433]], METHOD[\"Position_Vector\"], PARAMETER[\"X_Axis_Translation\", 570.8], PARAMETER[\"Y_Axis_Translation\", 85.7], PARAMETER[\"Z_Axis_Translation\", 462.8], PARAMETER[\"X_Axis_Rotation\", 4.998], PARAMETER[\"Y_Axis_Rotation\", 1.587], PARAMETER[\"Z_Axis_Rotation\", 5.261], PARAMETER[\"Scale_Difference\", 3.56], OPERATIONACCURACY[1.0]]"} //Apply a composite transformation datumTransformation={"geoTransforms":[{"wkid":108889,"transformForward":true},{"wkid":1622,"transformForward":false}]} |
| rangeValues | It allows you to filter features from the layer that are within the specified range instant or extent.Syntax [ { "name": "<rangeName1>", //range id "value": <value> \| [ <value1>, <value2> ] //single value or a value-range // null is allowed in value-range case -- that means infinity // e.g. [null, 1500] means all features with values <= 1500 // [1000, null] means all features with values >= 1000 }, { "name": "<rangeName2>", "value": <value> \| [ <value3>, <value4> ] } } ]Example [ { "name": "salinity", "value": 5 //a range instant (or single) value passed }, { "name": "elevation", "value": [1000, 1500] //a range extent is passed } ] |
| quantizationParameters | This is used to project the geometry onto a virtual grid, likely representing pixels on the screen. For JSON property descriptions and examples, see the Quantization parameters JSON properties section below. |
| parameterValues | It allows you to filter the features layers by specifying values to an array of preauthored parameterized filters for those layers. When a value is not specified for any parameter in a request, the default value, which is assigned during authoring time, is used instead.When a parameterInfo allows multiple values, you must pass them in an array.Syntax { "<parameterName1>": <value>, //when the multipleValues=false in the parameterInfo "<parameterName2>": [<value1> \| <value2>] //when the multipleValues=true in the parameterInfo }Example { "floor": 10, "incidentDate": 1475877014000 //date time value needs to be passed in as epoch value } |
| historicMoment | This specifies the historic moment to query. This parameter applies only if the layer is archiving enabled and the supportsQueryWithHistoricMoment property is set to true . This property is provided in the layer resource.If historicMoment is not specified, the query will apply to the current features.Syntax historicMoment=<Epoch time in milliseconds>Example historicMoment=1199145600000 |
| lodType(Binning LOD Type ) | Added at 10.9. This specifies the lodType . Check layer resources to find the lodType supported by a layer.Values: esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon \| esriGeometryEnvelope |
| lod(Binning LOD Level) | Added at 10.9. This specifies the lod level. Check layer resources for available levels. |
| lodSR(Binning LOD Spatial Reference) | Added at 10.9. This specifies the lod level. Check layer resources for available LOD spatial reference. |
| uniqueIds | The unique identifiers of this layer or table to be queried.Syntax 2 uniqueIds=[<uniqueId1>, <uniqueId2>] //when `uniqueIdInfo.type`= `simple` uniqueIds=[[<id-1>, <id-2>], [<id-a>, <id-b>]] //when `uniqueIdInfo.type`= `composite` 2 uniqueIds=["xyz", "abc"] //when `uniqueIdInfo.type`= `simple` uniqueIds=[["xy", "ab"], ["z", "c"]] //when `uniqueIdInfo.type`= `composite` |
| returnUniqueIdsOnly | If true , the response only includes an array of unique Ids. Otherwise the response is a feature set. The default is false . The maximum unique ids that are returned in a response is limited by maxUniqueIDCount. When a response include exceededTransferLimit=true, you can use resultOffset and resultRecordCount parameters to fetch more ids. When uniqueIdInfo.type is composite, it returns a 2-dimensional array.Values: true \| false |
| f | The response format. The default response format is html . Protocol buffer (pbf ) format is only supported when the supportedQueryFormat property on the layer includes pbf .Values: html \| json \| geojson \| kmz \| pbf (default, when returnIdsOnly=false and returnCountOnly=false )Values: html \| json (when outStatistics is specified)Values: html \| json \| geojson \| pbf (when either returnIdsOnly=true or returnCountOnly=true is specified) |

### Quantization parameters JSON properties

The following table outlines the JSON properties for the `quantizationParameters` parameter:

| Property | Details |
|---|---|
| extent | An extent defining the quantization grid bounds. Its SpatialReference matches the input geometry spatial reference if one is specified for the query. Otherwise, the extent will be in the layer's spatial reference. |
| mode | Geometry coordinates are optimized for viewing and displaying of data.Value: view |
| originPosition | Integer coordinates will be returned relative to the origin position defined by this property value.Values: upperLeft \| lowerLeft |
| tolerance | The tolerance is the size of one pixel in the outSpatialReference units. This number is used to convert the coordinates to integers by building a grid with resolution matching the tolerance. Each coordinate is then snapped to one pixel on the grid. Consecutive coordinates snapped to the same pixel are removed to reduce the overall response size.The units of tolerance are defined by outSpatialReference . If the outSpatialReference is not specified, tolerance is assumed to be in the unit of the spatial reference of the layer.If the tolerance is not specified, the maxAllowableOffset is used. |

#### Example one

The following example demonstrates possible values for the `quantizationParameters` parameter:



```
quantizationParameters={"mode":"view","originPosition":"upperLeft","tolerance":1.0583354500042335,"extent":{"type":"extent","xmin":-18341377.47954369,"ymin":2979920.6113554947,"xmax":-7546517.393554582,"ymax":11203512.89298139,"spatialReference":{"wkid":102100,"latestWkid":3857}}}
```

The following is a sample URL that reflects the JSON object above:



```
https://organization.example.com/<context>/rest/services/USAShapeFoldersDec5/FeatureServer/2/query?f=html&where=1=1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=102100&resultOffset=0&resultRecordCount=2000&quantizationParameters={"mode":"view","originPosition":"upperLeft","tolerance":1.0583354500042335,"extent":{"type":"extent","xmin":-19838806.04126036,"ymin":2146082.189218864,"xmax":-7455049.448307296,"ymax":11542768.51809405,"spatialReference":{"wkid":102100,"latestWkid":3857}}}
```

#### Example two

The following example demonstrates possible values for the `quantizationParameters` parameter:



```
{"mode":"view","originPosition":"lowerLeft","tolerance":1.0583354500042335,"extent":{"type":"extent","xmin":-18341377.47954369,"ymin":2979920.6113554947,"xmax":-7546517.393554582,"ymax":11203512.89298139,"spatialReference":{"wkid":102100,"latestWkid":3857}}}
```

The following is a sample URL that reflects the JSON object above:



```
https://organization.example.com/<context>/rest/services/USAShapeFoldersDec5/FeatureServer/1/query?where=1=1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&maxAllowableOffset=1.0583354500042335&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=0&resultRecordCount=2000&returnZ=false&returnM=false&quantizationParameters={"mode":"view","originPosition":"lowerLeft","tolerance":1.0583354500042335,"extent":{"type":"extent","xmin":-18341377.47954369,"ymin":2979920.6113554947,"xmax":-7546517.393554582,"ymax":11203512.89298139,"spatialReference":{"wkid":102100,"latestWkid":3857}}}&f=html&token=
```

### Date-time queries

#### Time zone properties

In general, the `dateFieldsTimeReference` property of the feature service layer identifies the time zone that all dates are stored in. The exception cases involve editor tracking date fields and time aware layer time zones.

When you are working with your data, you need to consider the time zone of the fields that you are working with. If you are querying a date type field and `dateFieldsTimeReference` is set to a specific time zone, make sure your WHERE clause issues the time in that specific time zone. For example, if you want to return all the records that match 1:00 p.m. on February 9, 2015, Pacific standard time, your WHERE clause would be as follows:

Querying records in PST



```
where=pacific_time_date_field = TIMESTAMP '2015-02-09 13:00:00'
```

However, it is possible to have up to three different time zones defined on your service. If your query includes dates from the editor tracking fields or the time aware fields, you need to make sure you submit the query in their respective time zones. The time zones for these fields can be found in the properties mentioned above. If the `dateFieldsTimeReference` is null the data is assumed to be in UTC, and if it is Unknown the time zone is assumed to be undefined. The example below demonstrates how to query three date fields that have three different times zones. When querying fields in different time zones, you need to make sure the time you use corresponds with the time zone of the date field. There is a date field in PST, one in EST, and the editor tracking field `created_date` in UTC:

Querying records in three different time zones



```
where=(DateTime_PST=TIMESTAMP '2012-01-01 15:20:00' AND (DateTime_EST=TIMESTAMP '2012-01-01 18:20:00' AND created_date=TIMESTAMP '2012-01-01 22:20:00')
```

Although you issue local time in your WHERE clause, the query operation always returns date values in UTC. You can set the date fields time zone, which shows up in the `dateFieldsTimeReference` property of the feature service layer either during publishing or in the ArcGIS Server Manager after publishing. In the Server Manager, navigate to service you wish to edit and click on the **Parameters** tab to update the time zone information. If the `dateFieldsTimeReference` property is not set, it will show up as null and the data will be assumed to be in UTC. In this case make sure you issue your WHERE clause in UTC.

As of ArcGIS Pro 3.1 and ArcGIS Enterprise 10.9, there is a new option when defining the time zone during publishing. If you don't want to define a time zone at all (not even UTC), you can set it to Unknown. Using the Unknown time zone makes it so that there is no translation done when the query operation submits and returns date values, they are stored and returned as is. This is particularly useful if you have data which spans multiple time zones.

#### Date, time and time zone offset format

When `StandardizedQueries` is enabled, use following SQL functions and syntaxes while querying against a date-time field. When StandardizedQueries is turned off, you must consult to the underlying database's help references to find the correct syntax.

Note: At 11.2 release, both map and feature services added support for 3 new field types in addition to the existing `esriFieldTypeDate` .

| Field type | Description |
|---|---|
| esriFieldTypeTimestampOffset | Values contains both date, time parts and time zone offset from UTC. The data and time represent local (or wall-clock) time. The time part supports milliseconds.SQL Syntax <timestampoffset_field> = timestamp 'yyyy-mm-dd HH24:mm:ss.fff -TZH:TZM'Example flight_arrival = timestamp '2003-01-25 14:35:00 -08:00' |
| esriFieldTypeDate | Values contains both date and time parts. The data and time represent local (or wall-clock) time, and are assumed in dateFieldsTimeReference time zone.SQL Syntax <date_field> = timestamp 'yyyy-mm-dd HH24:mm:ss'Example incident_datetime = timestamp '2003-01-25 14:35:00' |
| esriFieldTypeDateOnly | Values contains only date part without associated to any particular time zone. dateFieldsTimeReference property has no affects on this field type.SQL Syntax <dateonly_field> = date 'yyyy-mm-dd'Example birth_date = date '1990-01-25 14:35:00 -08:00' |
| esriFieldTypeTimeOnly | Values contains only time part without associated to any particular time zone. dateFieldsTimeReference property has no affects on this field type.SQL Syntax <timeonly_field> = time 'HH24:mm:ss'Example store_close_time = time '21:00:00' |

#### Interval queries

the `INTERVAL` syntax can be used in place of the date-time queries and is standardized across all map and feature services. The [INTERVAL](https://www.esri.com/arcgis-blog/products/api-rest/data-management/querying-feature-services-date-time-queries/) syntax can be used to specify either the current date or timestamp in the query when StandardizedQueries is enabled:



```
//Date
<DateField> >= CURRENT_DATE -+ INTERVAL '<IntervalValue>' <TimeStampFormat>

//Timestamp
<DateField> >= CURRENT_TIMESTAMP -+ INTERVAL '<IntervalValue>' <TimeStampFormat>
```

For the syntax demonstrated above, you can interchange the `CURRENT_DATE` and `CURRENT_TIMESTAMP` values. Both can be used with `+` or `-` of `INTERVAL` values.

The examples below outline the different ways in which the INTERVAL syntax can be modified for the purposes of your query:



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

To demonstrate the `INTERVAL` format, the example below uses the INTERVAL syntax to query data gathered over the 3 days, 5 hours, 32 minutes, and 28 seconds:



```
DateField >= CURRENT_TIMESTAMP - INTERVAL '3 05:32:28' DAY TO SECOND
```

### Percentile statistic type

The percentile `statisticType` is supported if the `supportsPercentileStatistics` layer property (in `advancedQueryCapabilities` ) is `true` . The percentile indicates the value below or above which a given percentage of values in a group of data values falls. For example, the ninetieth percentile (value 0.9) is the value below which 90 percent of the data values may be found. For percentile statistics, there are two `statisticTypes` , `PERCENTILE_DISC` (discrete) and `PERCENTILE_CONT` (continuous). Discrete returns a data value from within that dataset, while continuous is an interpolated value.

The `orderBy` statistic parameter can also be used to calculate the percentile. For example, in a set of 10 values from 1 to 10, the percentile `value` for 0.9 with `orderBy` set as ascending (`ASC` ) is 9, while the percentile for `value` 0.9 with `orderBy` set as descending (`DESC` ) is 2. The default is `ASC` .

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

## Example usage

The following examples demonstrate various ways to create a sample `query` request URL for different use cases:

-   [Example one](/rest/services-reference/enterprise/query-map-service-layer/#example-one-1)—Query using the `text` parameter on the states layer of ESRI\_StateCityHighway\_USA.
-   [Example two](/rest/services-reference/enterprise/query-map-service-layer/#example-two-1)—Query using a WHERE statement on the same layer.
-   [Example three](/rest/services-reference/enterprise/query-map-service-layer/#example-three)—Query strings are case sensitive. In this example, UPPER is used to make the query case insensitive.
-   [Example four](/rest/services-reference/enterprise/query-map-service-layer/#example-four)—Query the same states layer using geometry (envelope).
-   [Example five](/rest/services-reference/enterprise/query-map-service-layer/#example-five)—Query the states layer by both geometry (envelope) and a WHERE statement.
-   [Example six](/rest/services-reference/enterprise/query-map-service-layer/#example-six)—Query the states layer by a WHERE statement, specifying a list of fields to return, and requesting no geometry in the results.
-   [Example seven](/rest/services-reference/enterprise/query-map-service-layer/#example-seven)—Query the states layer by text parameter and requesting the geometry with the well-known ID of 102113 (Web Mercator).
-   [Example eight](/rest/services-reference/enterprise/query-map-service-layer/#example-eight)—Query a table using a WHERE clause and return object IDs only.
-   [Example nine](/rest/services-reference/enterprise/query-map-service-layer/#example-nine)—Use `groupByFieldsForStatistics` and `outStatistics` .
-   [Example ten](/rest/services-reference/enterprise/query-map-service-layer/#example-ten)—Page through a query result using `resultOffset` and `resultRecordCount` .

### Example one

The following example demonstrates a query using the `text` parameter on the states layer of ESRI\_StateCityHighway\_USA:



```
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query?text=Texas&f=pjson
```

### Example two

The following example demonstrates a query using a WHERE statement on the same layer. The output is JSON format.



```
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query?where=STATE_NAME='Florida'&f=json
```

### Example three

The following example demonstrates a query with strings that are case sensitive. In this example, `UPPER` is used to make the query case insensitive.



```
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query?where=UPPER(STATE_NAME)=UPPER('colorado')&f=pjson
```

### Example four

The following example demonstrates querying the same states layer using geometry (envelope):



```
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query?geometry=-125.4,35.2,-118.7,43.8&geometryType=esriGeometryEnvelope&f=pjson
```

### Example five

The following example demonstrates querying the states layer by both geometry (envelope) and a WHERE statement:



```
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query?geometry=-125.4,35.2,-118.7,43.8&geometryType=esriGeometryEnvelope&where=POP1999>5000000&f=pjson
```

### Example six

The following example demonstrates querying the states layer by a WHERE statement, specifying a list of fields to return, and requesting no geometry in the results:



```
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query?where=POP1999>15000000&returnGeometry=false&outFields=STATE_NAME,MALES,FEMALES,POP1999&f=pjson
```

### Example seven

The following example demonstrates querying the states layer by text parameter and requesting the geometry with the well-known ID of 102113 (Web Mercator):



```
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query?text=New+York&outSR=102113&f=pjson
```

### Example eight

The following example demonstrates querying a table using a WHERE clause and return object IDs only:



```
https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/MapServer/1/query?objectIds=&where=agree_with_incident+%3D+1&returnGeometry=true&returnIdsOnly=true&f=html
```

### Example nine

The following example demonstrates using `groupByFieldsForStatistics` and `outStatistics` :



```
https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3/query?where=&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=sub_region&outStatistics=[{"statisticType":"sum","onStatisticField":"pop2007","outStatisticFieldName":"Population_2007"},{"statisticType":"avg","onStatisticField":"AVE_FAM_SZ","outStatisticFieldName":"Average_Family_Size"}]&returnZ=false&returnM=false&gdbVersion=&f=pjson
```

### Example ten

The following example demonstrates paging through a query result using `resultOffset` and `resultRecordCount` , and requesting to skip the first 5 records and return the next 10 counties in California in order by population:



```
https://organization.example.com/<context>/rest/services/USA/MapServer/3/query?where=STATE_NAME='California'&outFields=Name,Population&returnGeometry=false&resultOffset=5&resultRecordCount=10&orderByFields=Population&f=pjson
```

## JSON Response syntax

The examples below demonstrate various JSON response syntax that can be returned for the `query` operation.

### Example one

The following example syntax is returned when `returnIdsOnly` and `returnCountOnly` are `false` :



```
{
  "displayFieldName": "<displayFieldName>",
  "fieldAliases": {  //fieldAliases deprecated at 10
    "<fieldName1>": "<fieldAlias1>",
    "<fieldName2>": "<fieldAlias2>"
  },
  "fields": [
    {
      "name": "<fieldName1>",
      "type": "<fieldType1>",
      "alias": "<fieldAlias1>",
      "length": "<length1>"
    },
    {
      "name": "<fieldName2>",
      "type": "<fieldType2>",
      "alias": "<fieldAlias2>",
      "length": "<length2>"
    }
  ],
  "geometryType": "<geometryType>", //for layers only
  "spatialReference": <spatialReference>, //for layers only
  "hasZ": <true|false>, //added in 10.1
  "hasM": <true|false>, //added in 10.1
  "features": [ //features may include geometry for layers only
    <feature1>,
    <feature2>
  ]
}
```

### Example two

The following example syntax is returned when `returnIdsOnly` is `false` :



```
{
  "objectIdFieldName": "<objectIdFieldName>",
  "objectIds": [
    <objectId1>,
    <objectId2>
  ]
}
```

### Example three

The following example syntax is returned when `returnCountOnly` is `true` :



```
{
  "count": <count>
}
```

### Example four

The following example syntax is returned when `groupByFieldsForStatistics` and `outStatistics` are specified:



```
{
  "displayFieldName": "",
  "fieldAliases": {
    "alias1": "fieldAlias1",
    "alias2": "fieldAlias2"
  },
  "fields": [
    {
      "name": "fieldName1",
      "type": "fieldType1",
      "alias": "fieldAlias1",
      "length": fieldLength1
    },
    {
      "name": "fieldName2",
      "type": "fieldType2",
      "alias": "fieldAlias2",
      "length": fieldLength2
    }
  ],
  "features": [<feature1>, <feature2>] //Feature object without geometry
}
```

## JSON Response examples

The examples below demonstrate various JSON responses that can be returned for the `query` operation.

### Example one

The following example response is returned when `returnIdsOnly` and `returnCountOnly` are `false` :



```
{
  "displayFieldName": "AREANAME",
  "fieldAliases": {
    "ST": "ST",
    "POP2000": "Population - 2000",
    "AREANAME": "City Name"
  },
  "fields": [
    {
      "name": "ST",
      "alias": "ST",
      "type": "esriFieldTypeString",
      "length": 2
    },
    {
      "name": "POP2000",
      "alias": "Population - 2000",
      "type": "esriFieldTypeInteger"
    },
    {
      "name": "AREANAME",
      "alias": "City Name",
      "type": "esriFieldTypeString",
      "length": 255
    }
  ],
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 4326
  },
  "features": [
    {
      "attributes": {
        "ST": "CA",
        "POP2000": 3694820,
        "AREANAME": "Los Angeles"
      },
      "geometry": {
        "x": -118.37,
        "y": 34.086
      }
    },
    {
      "attributes": {
        "ST": "CA",
        "POP2000": 461522,
        "AREANAME": "Long Beach"
      },
      "geometry": {
        "x": -118.15,
        "y" : 33.80
      }
    }
  ]
}
```

### Example two

The following example response is returned when `returnIdsOnly` is `true` :



```
{
  "objectIdFieldName": "objectid",
  "objectIds": [
    1,
    2,
    3,
    4,
    5,
    7
  ]
}
```

### Example three

The following example response is returned when `returnCountOnly` is `true` :



```
{
  "count":48
}
```

### Example four

The following example response is returned when `groupByFieldsForStatistics` and `outStatistics` are specified:



```
{
  "displayFieldName": "",
  "fieldAliases": {
    "sub_region": "SUB_REGION",
    "Population_2007": "Population_2007",
    "Average_Family_Size": "Average_Family_Size"
  },
  "fields": [
    {
      "name": "sub_region",
      "type": "esriFieldTypeString",
      "alias": "SUB_REGION",
      "length": 20
    },
    {
      "name": "Population_2007",
      "type": "esriFieldTypeDouble",
      "alias": "Population_2007"
    },
    {
      "name": "Average_Family_Size",
      "type": "esriFieldTypeDouble",
      "alias": "Average_Family_Size"
    }
  ],
  "features": [
    {
      "attributes": {
        "sub_region": "Pacific",
        "Population_2007": 49731702,
        "Average_Family_Size": 3.2439999999999998
      }
    },
    {
      "attributes": {
        "sub_region": "Mountain",
        "Population_2007": 21492235,
        "Average_Family_Size": 3.165
      }
    },
    {
      "attributes": {
        "sub_region": "New England",
        "Population_2007": 14515009,
        "Average_Family_Size": 3.0249999999999999
      }
    },
    {
      "attributes": {
        "sub_region": "West North Central",
        "Population_2007": 20384497,
        "Average_Family_Size": 3.044285714285714
      }
    },
    {
      "attributes": {
        "sub_region": "East North Central",
        "Population_2007": 47176974,
        "Average_Family_Size": 3.0940000000000003
      }
    },
    {
      "attributes": {
        "sub_region": "Middle Atlantic",
        "Population_2007": 41116339,
        "Average_Family_Size": 3.1566666666666663
      }
    },
    {
      "attributes": {
        "sub_region": "South Atlantic",
        "Population_2007": 58943344,
        "Average_Family_Size": 3.0333333333333332
      }
    },
    {
      "attributes": {
        "sub_region": "East South Central",
        "Population_2007": 18077309,
        "Average_Family_Size": 3.0275000000000003
      }
    },
    {
      "attributes": {
        "sub_region": "West South Central",
        "Population_2007": 34910821,
        "Average_Family_Size": 3.1124999999999998
      }
    }
  ]
}
```