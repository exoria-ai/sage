# Layer (Feature Service)

> Source: [/rest/services-reference/enterprise/layer-feature-service/](https://developers.arcgis.com/rest/services-reference/enterprise/layer-feature-service/)

**URL:**: https://<root>/<serviceName>/FeatureServer/<layerId>

**Methods:**: GET

**Operations:**: Add Features, Append, Apply Edits, Calculate, Cleanup Assets, Convert 3D, Has Assets, Delete Features, Get Estimates, Generate Renderer, Query, Query 3D, Query Assets, Query Attachments, Query Bins, Query Date Bins, Query Top Features, Query Related Records, Update Features, Update Metadata, Upload Assets, Validate SQL

**Child Resources:**: Assets, Contingent Values, Field Groups, Image, Relationships for 3D, Feature, Query Data Elements, Replicas, Shared Templates

**Version Introduced:**: 10.0

## Description

The `layer` resource represents a single feature layer or a nonspatial table in a feature service. A feature layer is a table or view with at least one spatial column.

For tables, it provides basic information about the table such as its ID, name, fields, types, and templates. For feature layers, in addition to the table information, it provides information such as its geometry type, min and max scales, and spatial reference. Each type includes information about the type, such as the type ID, name, and definition expression. Types also include a default symbol and a list of feature templates. Each feature template includes a template name, description, and prototypical feature.

The property capabilities return Query, Create, Delete, Update, Editing, Sync, Uploads and Extract capabilities. The Editing capability will be included if Create, Delete, or Update is enabled for a feature service.

The `geometryType` property returns the geometry type of the layer. Five geometry types are supported: point (`esriGeometryPoint` ), multipoint (`esriGeometryMultipoint` ), polyline (`esriGeometryPolyline` ), polygon (`esriGeometryPolygon` ), and envelope (`esriGeometryEnvelope` ). To learn more about these supported geometry types, see [Geometry objects](/rest/services-reference/enterprise/geometry-objects/).

The `maxRecordCount` property returns the maximum number of records that will be returned at once for a query.

The Layer resource returns `relatedTableId` , `cardinality` , `role` , `keyField` , and `composite` for all relationships. In addition, the `relationshiptableId` and `keyFieldInRelationshipTable` properties are returned for attributed relationships only.

The `effectiveMinScale` and `effectiveMaxScale` properties represent the effective minimum and maximum scales at which the layer is visible. Effective minimum and maximum scale are calculated based on the `minScale` and `maxScale` values of the current layer and its ancestors.

The Layer resource supports an input parameter `returnUpdates` that accepts a Boolean value. Pass this parameter to retrieve updated `timeExtent` for the layer.

The field property `nullable` indicates whether the field can accept null values.

If a layer has attachments, its `hasAttachments` property will be `true` .

If the layer `objectIdField` does not have a length property or the length property is set to 4, the `objectIdField` is 32-bit. If the `objectIdField` has a length of 8, the `objectIdField` is 64-bit.

The `geometryField` property describes settings of the geometry field itself and includes the `name` , `nullable` , and `editable` sub-properties. Other sub-properties such as `modelName` may or may not be provided. It is possible to have a geometry field that is not editable. For features in layers where `editable = false` , the geometry values are system maintained and cannot be edited directly even by the data owner or administrator (for example, utility network dirty area layers). This is different from the `allowGeometryUpdates` property, which allows the service owner or administrator to control whether or not nonowner/nonadministrator users can make geometry updates. Owners or administrators can make geometry updates even when `allowGeometryUpdates` is `false` as long as the geometry field is editable.

The `supportsSQLExpression` property is `true` when a layer supports the ability to use SQL expressions within `outStatistics` , `groupBy` , or `orderBy` . When using SQL expressions on a feature layer, you can configure your `outStatistics` parameter like this: `[{"statisticType":"AVG","onStatisticField":"str_angle*100","outStatisticFieldName":"avg"}]` . The `supportsOutFieldSqlExpression` property is `true` when a layer supports SQL expressions in the `outFields` . An example of using SQL expressions in `outFields` can be casting aliases: `outFields = County as CountyAlias, Elevation as ElevationAlias` .

The `SupportsLOD` property indicates if the ability to do lod queries can be turned on for a feature service layer. Lod queries have been turned on and can be queried when the layer includes an `lodInfos` property.

## New at 12.0

-   The layer-level `supportedExportFormats` property has been expanded to include `kml` as a supported value.
-   The `supportsQueryBins` property has been added to indicate support for the Query Bins operation. Releases prior to 12.0 will use the `queryBinsCapabilities` property to indicate support.
-   The `supportedAppendCapabilities` property had been added to indicate supports for `append` with the listed data types. For example, `supportedAppendCapabilities: "Features,Attachments"` indicates support for appending features and attachments.
-   A new property, `supportsApplyEditsWithUniqueIds`, has been added to indicate support for `applyEdits` operations on a unique ID service layer.
-   The `supportsQueryAttachmentOrderByFields` property has been added to indicate support for sorting attachments in the [Query Attachments](/rest/services-reference/enterprise/query-attachments-feature-service-layer/) operation.

The following information is relevant to spatiotemporal-based hosted feature services:

-   Support for two new LOD types (`lodType`), has been added: `h3`, `geotile`
-   The new parameter, `lodGeometryAggregationType`, indicates support for the following LOD geometry aggregation types: `centroid`, `shape`. The value will default to `centroid` if the parameter is not set.
    -   To view an example for adding a feature service layer to a spatiotemporal hosted feature service that includes both `centroid` and `shape` `lodGeometryAggregationType`, see the [Add to Definition page](/rest/services-reference/enterprise/add-to-definition-feature-service/#adding-a-layer-to-a-hosted-feature-service-running-on-a-spatiotemporal-data-store).
        

## New at 11.5

-   Unique IDs have been introduced as an alternate for object IDs for databases that support string ID fields. Support is indicated by the presence of the `uniqueIdInfo` json object at the root of a layer's definition. Note that the use of unique IDs in conjunction with object IDs and/or global IDs is not supported. A layer definition that omits `uniqueIdInfo` will use `objectIdField` for feature identification instead. For more information, see the unique IDs section below.
    
-   The [layer-level Append](/rest/services-reference/enterprise/append-feature-service-layer/) operation on hosted feature services has been enhanced to allow appending points with attachments from a .zip file of images. Support is indicated when the `supportedAppendFormats` property includes `imageCollection`.
    
-   The maximum field name length limit has been extended to 63 characters for hosted feature service layers on a relational data store.
    
-   Reference feature services now support the layer-level Append operation. Support for the Append operation is indicated on a layer-level when the `supportsAppend` property set as `true`. The service resource will also advertise supported formats with the `supportedAppendFormats` property.
    
-   Reference feature services now support the [layer-level Query operation's](/rest/services-reference/enterprise/query-feature-service-layer/) `fullText` parameter for fields that have a full text index. Support for this parameter is indicated when the layer resource includes the `supportsFullTextSearch` property as `true`, under `advancedQueryCapabilities`.
    
-   Additional properties have been added to the layer resource:
    
    -   `spatialReference`: Describes the layers spatial reference. The layer's spatial reference is defined by the map that was used to publish the service. The layer's `spatialReference` property will match the `extent` property's `spatialReference` value, when present.
    -   `supportedCurveTypes`: Lists the types of true curves that the service supports
    -   `hasContingentValuesDefinition`: Indicates when the layer has contingent values.
    -   `fullTextSearchableFields`: Lists the fields in the layer on which full text queries can be run.
    -   `fullTextSearchCapabilities`: Describes which full text search expression properties are supported. The following may be listed under the `fullTextSearchCapabilities` property:
        -   `supportsOperator`: When `true`, indicates that full text search expressions can include the `operator` property. Currently, reference feature services do not support the operator property, and will have their `supportsOperator` property set as `false`.
        -   `supportsSearchOperator`: When `true`, indicates that full text search expressions can include the `searchOperator` property (introduced at 11.5).
        -   `supportsSqlExpressionInFullText`: When `true`, indicates that full text search expressions can use the `sqlExpression` property (introduced at 11.5). ArcGIS Enterprise hosted feature services do not support SQL expressions as search expressions. ArcGIS Enterprise hosted feature services will not return `supportsSqlExpressionInFullText` property.

## New at 11.4

-   The layer-level [Apply Edits](/rest/services-reference/enterprise/apply-edits-feature-service-layer/) operation now supports `pbf` as an upload format.
-   The layer's `extent` property, as well as the `extent` property returned from the layer-level [Get Estimates](/rest/services-reference/enterprise/get-estimates-feature-servicelayer/) operation, will include z and m values (when applicable).
-   The layer-level [Query](/rest/services-reference/enterprise/query-feature-service-layer/) operation's `returnEnvelope` parameter is now supported with reference feature services. This parameter allows envelopes to be returned for features instead of geometries. The parameter was first introduced and supported by hosted feature service in ArcGIS Enterprise 11.3.
-   In addition to the existing windows based time zone properties, IANA time zone properties have been added at 11.4. Whenever the layer advertises a `timeZone` property, a `timeZoneIANA` property is also provided, which describes the time using the IANA standard.
-   Reference feature services have added support for applying edits and returning query results as pbf with control points.
-   Full text search indexes can be created for hosted feature services using the [Add to Definition](/rest/services-reference/enterprise/add-to-definition-feature-layer/) operation. These indexes can then be used to perform full text queries using the layer-level [Query](/rest/services-reference/enterprise/query-feature-service-layer/) operation.

## New at 11.3

-   Reference feature services will return control points in the JSON response from query results and accept features with control points when applying edits. Control points are special vertices used to apply symbol effects to line or polygon features. Geometries are persisted in the geodatabase with an identifier as to whether each vertex is a control point.
    
-   [Query Analytic](/rest/services-reference/enterprise/query-analytic/) can now be performed asynchronously for reference feature services. Support for the `async` parameter is indicated when the layer’s `supportsAsync` property is `true`, under `advancedQueryAnalyticCapabilities`.
    
-   Reference feature services now support user defined relationship IDs for relationship classes published from ArcGIS Pro 3.3. Each relationship ID is still a unique integer value across the relationship classes in the feature service, but now it can be user defined rather than generated by the system.
    
-   The layer-level [Query](/rest/services-reference/enterprise/query-feature-service-layer/) operation supports a `defaultSR` parameter for hosted feature services. Setting the `defaultSR` parameter allows the client to set the spatial reference in one place rather than repeating it in several parameters when querying. This results in shorter requests which more often can be GET requests. Support for `defaultSR` is indicated when the layer’s `supportsDefaultSR` property is `true`, under `advancedQueryCapabilities`.
    
-   The `esriFieldTypeTimeOnly`, `esriFieldTypeDateOnly`, `esriFieldTypeTimestampOffset`, and `esriFieldTypeBigInteger` field types have exited beta and are now supported at ArcGIS Enterprise 11.3.
    

### New at 11.2

The following updates have been made for feature services at ArcGIS Enterprise 11.2:

-   Feature service layers now include a new property, `supportsCurrentUserQueries` under `advancedQueryCapabilities` . When set as `true` , operations that user `WHERE` clauses can now use the `current_user` keyword to refer to the currently connected federated ArcGIS Enterprise user or ArcGIS Online user. This keyword can also be used in layer definition queries, which are part of the layer when its published. The use of this keyword allows data to be dynamically available based on the current user. This enhancement requires the server to have `standardizedQueries` enabled (`standardizedQueries` is enabled on the server by default).
    
-   Support has been added for 64 bit `esriFieldTypeOID` fields, which includes hosted feature services as well as non-hosted feature services referencing geodatabase datasets with 64 bit `objectids` . Support for this is indicated when the `esriFieldTypeOID` field has their `length` property set as `8` .
    
-   Support has been added for `esriFieldTypeDate` fields that contain high precision values. These fields can contain up to millisecond precision, although some clients may not use the full precision for querying or editing. Both hosted feature services and non-hosted feature services referencing geodatabase datasets that include high precision date fields support these new field types. Support is indicated when a `esriFieldTypeDate` field has a `precision` property set as 1.
    
-   Hosted feature services on a relational data store now support subtypes. When subtypes are present, the default subtype code is indicated with the `defaultSubtypeCode` property, and the subtype property array describes the subtype information. The `subtypeField` property is also set to the name of the subtype field. When subtypes are not present, the `subtypeField` property is left empty.
    
-   Oriented imagery can now be published as feature service layers. Oriented imagery layers will have a layer type of Oriented Imagery Layer and will return oriented imagery information under the `orientedImageryInfo` layer property. For more information, see the [Oriented Imagery](https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/oriented-imagery-overview.htm) documentation.
    
-   Feature services now support a new `required` field property. When this property is set as `true` , users can add and update content but the field can't be deleted. This property is typically applied to fields that are needed to support the data model but are not system fields like `ObjectID` and `GlobalID` .
    
-   Feature services now support WKT2. Layer-level operations that accept spatial references as input for specific parameters will now also accept WKT2 values and generate an appropriate response. To see WKT2 examples, reference this [JSON example](https://raw.githubusercontent.com/Esri/projection-engine-db-doc/master/json/pe_list_projcs.json). For WKT2 values, see the [Using spatial references](/rest/services-reference/enterprise/using-spatial-references/) documentation.
    
-   Four new field types have been added as [beta features](https://enterprise.arcgis.com/en/get-started/latest/windows/what-s-new-in-arcgis-enterprise.htm#ESRI_SECTION2_5EC774A55D0B449684563858A00CA0AA): `esriFieldTypeTimeOnly` , `esriFieldTypeDateOnly` , `esriFieldTypeTimestampOffset` and `esriFieldTypeBigInteger` . The beta only applies to feature services that include these fields. The `Sync` capability is not supported when these new fields are present. The `esriFieldTypeTimeOnly` , `esriFieldTypeDateOnly` and `esriFieldTypeTimestampOffset` fields return ISO8601 values and require values in ISO8601 when applying edits.
    
-   Fields of type `esriFieldTypeBigInteger` or `esriFieldTypeOID` with a length of 8 (64-bit) may be limited to 53-bit in some data sources. When this is the case, the layer resource will have the `bigIntegerRestrictedTo53Bits` property set as `true` .
    
-   A layer's support of the [Calculate](/rest/services-reference/enterprise/calculate-feature-service-layer/) operation is indicated by the `supportsCalculate` property. If `supportsCalculate` is `true` , the layer supports the operation. If `supportsCalculate` is `false` , or the property is not present, the layer does not support the operation. If [Calculate](/rest/services-reference/enterprise/calculate-feature-service-layer/) is supported, a client can use the operation as long as the feature service has the `Update` capability set or the current user is the service owner, the view owner, or an organization administrator.
    

### New at 11.1

The following updates have been made for non-hosted feature services (referencing enterprise geodatabases) published from ArcGIS Pro:

-   The `catalogID` property has been added to the relationships array returned by the [Relationships](/rest/services-reference/enterprise/relationships-feature-service/) resource. The `catalogID` property is a universal identifier from the back-end data store. The `catalogID` property can be used, for example, as a moniker with arcade scripts that use `FeatureSetByRelationshipName` .
-   Improvements have been made to boost performance when accessing a layer resource with the `returnAdvancedSymbols` parameter set as `true` in the request.
-   Controller layer types (such as Parcel Fabric, Topology, Utility Network, and Trace Network layers) can now include Sync in their list of capabilities.

The update below has been added to hosted feature services running on a relational data store:

-   Starting at ArcGIS Enterprise 11.1, catalog layers can be published as hosted feature services.

### New at 11.0

-   The layer-level `supportedExportFormats` property has been expanded to include `shapefile` as a supported value.
    
-   At this release, feature services can be published from a Google BigQuery data source using ArcGIS Pro 3.0 or later.
    
-   Hosted feature services now support the async parameter for `queryAnalytic` . Support for this parameter is indicated when the layer-level `supportsAsync` property, under `advancedQueryAnalyticCapabilities` , is `true` . For more information on this new parameter, see the [Query Analytic](/rest/services-reference/enterprise/query-analytic/) topic.
    
-   At ArcGIS Enterprise 10.9.1, the ability to configure a hosted feature service to provide server-side caching was temporarily removed. Response caching is once again supported with the release of ArcGIS Enterprise 11.0. Organizations using ArcGIS Enterprise version 10.9, 11.0, or higher can cache queries made by services with response caching enabled. Organizations using a 10.9.1 deployment can still use services that support response caching, though queries will not be cached. For more information on enabling response caching on hosted feature service layers, see the [Feature Layer](/rest/services-reference/enterprise/feature-layer/#response-caching-for-hosted-feature-service-layers-in-arcgis-enterprise) topic.
    
-   The layer-level `applyEdits` operation on hosted feature services has a new parameter, `returnEditResults` . Support for this parameter is indicated when a feature service layer has the `supportsReturnEditResults` layer-level property, under `advancedEditingCapabilities` , as `true` . To learn more about the new parameter, see the layer-level [Apply Edits](/rest/services-reference/enterprise/apply-edits-feature-service-layer/) topic.
    
-   The layer-level `applyEdits` operation now supports an async parameter. Supports for this parameter is indicated when the layer-level `supportsAsyncApplyEdits` property, under `advancedEditingCapabilities` , is `true` . For more information on this new parameter, see the [Apply Edits](/rest/services-reference/enterprise/apply-edits-feature-service-layer/) topic.
    
-   Hosted feature services now support setting capabilities on a per-layer basis using `upateDefinition` administrative operation. Feature layers support this new functionality when their layer-level property, `supportsLayerOverrides` , is `true` .
    

### New at 10.9.1

-   Response caching, introduced with ArcGIS Enterprise 10.9, is no longer supported with 10.9.1. Services with response caching enabled will continue to function after upgrading to 10.9.1, though queries will no longer be cached.
    
-   The layer resource includes a `supportedExportFormats` property that describes the formats supported when exporting data. Data can be exported when the extract or sync capability is enabled and the `createReplica` operation is called with the `syncModel` parameter set as `none` .
    
-   A `supportedSpatialRelationships` property may be provided on the layer resource. This property describes the spatial relationships supported when querying a layer.
    
-   Non-spatial table templates can be authored in ArcGIS Pro and published to a feature service layer. Note that table templates have the `drawingTool` property as `esriFeatureEditToolNone` .
    
-   A `getEstimates` operation has been added for feature service layers. The operation returns up to date approximations for feature extent and row count. `getEstimates` is supported if the layer contains an `infoInEstimates` array property.
    
-   Layers from a location tracking service have the `isLocationTrackingLayer` property set as `true` .
    
-   Hosted feature service attachment resources support the `w` parameter, which returns attachments resized to a pixel width matching the `w` parameter's value. The `supportsAttachmentResizing` layer property will be set as `true` when the `w` parameter is supported.
    
-   The `queryAnalytic` operation is supported by non-hosted feature services that reference an enterprise geodatabase data and are published from ArcGIS Pro. This includes support for linear regression. Services that support `queryAnalytic` have the `supportsQueryAnalytic` property as `true` , under `advancedQueryCapabilities` .
    
-   The following is a list of advanced `queryAnalytic` capabilities included with 10.9.1. To see which advanced capabilities are supported for a service, check the `advancedQueryAnalyticCapabilities` layer property. If an advanced capability is not listed, it may not be supported.
    
    -   `supportsLinearRegression` : Is `true` if `queryAnalytic` supports linear regression (`"analyticType": "LinRegR2"` )
    -   `supportsAsync` : Is `true` if `queryAnalytic` supports asynchronous processing (the `async` parameter).
    -   `supportsPercentileAnalytic` : Is `true` if the `queryAnalytic` operation supports percentiles (`analyticType="PERCENTILE_CONT"` or `analyticType="PERCENTILE_DISC"` ).
-   The layer level `applyEdits` operation for hosted feature services in ArcGIS Online, and non-hosted feature services in ArcGIS Enterprise, includes an option to process requests asynchronously. This option is ideal for longer running edit operations that may timeout otherwise. The `async` parameter can be used if the layer resource has `supportsAsyncApplyEdits` at `true` under `advancedEditingCapabilities` .
    
-   The `queryAttachments` operation for hosted feature services supports a `returnCountOnly` parameter for getting the count of attachments per feature. The `returnCountOnly` parameter is supported when the `supportsQueryAttachmentsCountOnly` property is `true` under `advancedQueryCapabilities` .
    

### New at 10.9

The following items are new or updated at 10.9:

-   Response caching can be enabled for hosted feature service layers running on the relational data store. Response caching improves performance and scalability for certain types of queries. Enabling response caching requires first configuring an [object store](https://enterprise.arcgis.com/en/portal/latest/administer/windows/create-data-store.htm#ESRI_SECTION1_B93F1F95EBD54F6C9E1122AB3500EAB0). See the [`updateDefinition`](/rest/services-reference/enterprise/update-definition-feature-layer/) operation for details on response caching and how to enable it. The following layer property is set when response caching is enabled:
    
    -   `"supportsQueryWithCacheHint": true` : indicates that layer queries support the `cacheHint` parameter.
    
    When the object store is configured, hosted feature layers on the relational data store include the following property, regardless of whether response caching is enabled:
    
    -   `"editingInfo": ("lastEditDate": <dateValue>)` : indicates the date of the last time edits were made on the layer. For example, `"editingInfo": ("lastEditDate": 1609896851105)` . The `<dateValue>` is an epoch date in milliseconds.
-   At 10.9, Bidirectional syncing with another service in ArcGIS Enterprise is supported. For bidirectional syncing, replica tracking must be enabled on the data. Replica tracking is enabled on a layer when the `isDataReplicaTracked` property is `true` . To enable replica tracking on ArcGIS Enterprise geodatabase data, see [Enable Replica Tracking](https://pro.arcgis.com/en/pro-app/latest/tool-reference/data-management/enable-replica-tracking.htm).
    
-   Preferred time zones can now be set to allow service authors to define the time zones intended for clients to use when working with a service's date field values. Preferred time zones are used by more recent clients, such as ArcGIS Pro 2.7 (and above). Newer clients may default to working with date values in the preferred time reference. The preferred time zone is exposed through the `preferredTimeReference` layer property. Its value can be set on the service with [ArcGIS Server Manager](https://enterprise.arcgis.com/en/server/latest/publish-services/windows/edit-map-service-settings.htm#LI_A5825E4A9A3A42E991C662CD7B76A860) for non-hosted feature services. For hosted feature services, `preferredTimeReference` can be set using the [`updateDefinition`](/rest/services-reference/enterprise/update-definition-feature-layer/) operation.
    
    -   It's possible to define a service's time zone of date fields as unknown. Setting the time zone as unknown means that date values will be returned as-is from the database, rather than as date values in UTC. Non-hosted feature services can be set to use an unknown time zone using ArcGIS Server Manager. Setting the time zones to unknown also sets the `datesInUnknownTimezone` layer property as true. Currently, hosted feature services do not support this setting. Unknown time zones do not apply to editor tracking date fields. Editor tracking date fields are in UTC even when the service's time is set to unknown..
        
        Most clients released previously to ArcGIS Enterprise 10.9 will not be able to work with feature services that have the unknown time zone setting. ArcGIS Pro 2.7 or newer can work with these feature services, In order for clients to perform query, edit and or other operations, the `timeReferenceUnknownClient` parameter must be set to true on these operations. Setting `timeReferenceUnknownClient=true` indicates that the client is capable of working with unknown date values that are not in UTC. Layer operations that include the `timeReferenceUnknownClient` parameter include: [`query`](/rest/services-reference/enterprise/query-feature-service-layer/) , [`applyEdits`](/rest/services-reference/enterprise/apply-edits-feature-service-layer/) , [`addFeatures`](/rest/services-reference/enterprise/add-features/) , [`updateFeatures`](/rest/services-reference/enterprise/update-features/) , [`queryRelatedRecords`](/rest/services-reference/enterprise/query-related-records-feature-service-layer/) , [`calculate`](/rest/services-reference/enterprise/calculate-feature-service-layer/) , and feature resources. Service operations that include the `timeReferenceUnknownClient` parameter include: [`query`](/rest/services-reference/enterprise/query-feature-service/) , [`applyEdits`](/rest/services-reference/enterprise/apply-edits-feature-service/) , [`createReplica`](/rest/services-reference/enterprise/create-replica/) , [`synchronizeReplica`](/rest/services-reference/enterprise/synchronize-replica/) , and [`extractChanges`](/rest/services-reference/enterprise/extract-changes-feature-service/) .
        
        .
        
-   A new layer type, `Trace Network Layer` , is created when Trace Networks are published as feature services. These layers can be consumed directly in ArcGIS Pro starting at version 2.7, but are not currently supported in other ArcGIS clients. Trace Network layers are composite layers that reference `subLayers` and describe `systemLayers` that are used to support diagrams and other trace network-specific behavior. are. For an example, see the [Trace Network layer](/rest/services-reference/enterprise/layer-feature-service/#example-14-trace-network-layer) response below.
    
-   The layer query [`multipatchOption`](/rest/services-reference/enterprise/query-feature-service-layer/#GUID-0EF796B6-E518-483F-80B0-F20BD134FDF2) parameter supports a new `extent` value. Extent is used to return the 3D extent of multipatch features. This parameter is supported when `extent` is listed under `supportedMultipatchOptions` property in `advancedQueryCapabilities` :
    
    
    
    ```
    ...
    "supportedMultipatchOptions": [
      "embedMaterials",
      "xyFootprint",
      "externalizeTextures",
      "stripMaterials",
      "extent"
    ],
    ...
    ```
    
-   Non-hosted feature services published from ArcGIS Pro support edit mode for quantization when the layer's `supportsQuantizationEditMode` property is set as `true` .
    
-   Non-hosted feature services published from ArcGIS Pro support LOD queries if the underlying feature classes have had [feature binning enabled](https://pro.arcgis.com/en/pro-app/latest/tool-reference/data-management/enable-feature-binning.htm). The layers include a `supportsLod` property, set as `true` , under `advancedQueryCapabilities` as well as an `lodInfos` property to describe the bins.
    
-   ArcGIS Enterprise feature services may now include `keywords` and `exifInfo` attachment properties. These properties are included with non-hosted feature services published from ArcGIS Pro where the [upgrade attachments GP tool](https://pro.arcgis.com/en/pro-app/latest/tool-reference/data-management/upgrade-attachments.htm) (ArcGIS Pro 2.7 or higher) has been run on layer attachments. Non-hosted feature services support `keywords` (`isEnabled` is `true` ) but not `exifInfo` (`isEnabled` is `false` ).
    
-   Non-hosted feature services published from ArcGIS Pro will now return the content of fields with `"type": "esriFieldTypeBlob"` as base64. These fields can also be edited using base64 encoding. Hosted feature services on a relational data store already support querying and editing blob columns.
    
-   Hosted feature services on a relational data store support SQL expressions for the `outStatistics` , `groupBy` , and `orderBy` layer query parameters when the feature layer's `supportsSqlExpression` property, under `advancedQueryCapabilities` , is `true` . Hosted feature services in ArcGIS Online, and non-hosted feature services in ArcGIS Enterprise, already support this functionality.
    
-   Hosted feature services on a relational data store support the `queryAnalytic` operation when the `supportsQueryAnalytic` property, under `advancedQueryCapabilities` , is `true` . Percentile analytics are not currently supported (`"supportsPercentileAnalytic": false` ). Hosted feature services in ArcGIS Online also support this functionality.
    
-   Hosted feature services running on a relational data store support SQL expressions on the layer query `outFields` parameter when the `supportsOutFieldSqlExpression` property, under `advancedQueryCapabilities` , is `true` . Hosted feature services in ArcGIS Online also support this functionality.
    
-   Hosted feature services on a spatiotemporal data store support the calculate operation when the `supportsCalculate` property is `true` .
    
-   A new layer based operation called `queryDateBins` has been added for hosted feature services on a spatiotemporal data store. When run, the result of the operation is a set of values representing a histogram of features divided into bins based upon a date field. The response can include statistical aggregations for each bin such as count or sum, and may include the aggregated geometries (i.e., centroid) for point layers. This operation is supported if the service property `supportsQueryDateBins` is `true` .
    

### New at 10.8.1

The following items are new or updated at 10.8.1:

-   Hosted feature services on a relational data store supports configuring a layer to allow LOD queries when the `supportsLOD` property, under `advancedQueryCapabilities` , is `true` . To allow LOD queries, the [`updateDefinition`](/rest/services-reference/enterprise/update-definition-feature-layer/) administrator operation must be run to set the `lodInfos` property that describes the bins.
-   The layer resource now returns the `isDataReplicaTracked` property. This property, when `true` , indicates that replica tracking has been enabled for the feature service layer. This property is required for sync with named branch versioning. For more information, see [Enable Replica Tracking](https://pro.arcgis.com/en/pro-app/latest/tool-reference/data-management/enable-replica-tracking.htm).
-   The layer query operation supports `percentile` as a `statisticType` when using `outStatistics` for feature services published from ArcGIS Pro that reference enterprise geodatabase data. Layers that support percentiles will have the `advancedQueryCapabilities` object's `supportsPercentileStatistics` property as `true` .
-   Multipatch data can be queried with `externalizeTextures` and `f` as `pbf` for feature services published from ArcGIS Pro.
-   Hosted and non-hosted feature services running on a federated server include a `serviceItemId` property. This describes the id of the associated feature layer item in the home app. ArcGIS Enterprise hosted feature services have supported this property since 10.7.
-   Hosted feature services on relational and spatiotemporal data stores in ArcGIS Enterprise support edit mode for quantization. This is indicated with the layer property `supportsQuantizationEditMode` set as `true`
-   Prior to 10.7.1, when publishing data that was archive enabled, traditional versioned, branch versioned, or participated in a controller dataset (geometric network, topology, utility network, etc) the calculate operation was not supported. As of 10.7.1, the calculate operation is supported with all of the above for feature services that allow updates.

Layers that have `hasAttachments` and `supportsQueryAttachments` both as `true` have the following features at 10.8.1:

-   The `attachmentProperties` object is included for ArcGIS Enterprise feature services. This was already a feature for ArcGIS Online hosted feature services.
-   A new fieldname property that can be used with the `queryAttachments` operation's `attachmentsDefinitionExpression` parameter to limit results based on values in the attachment table.
-   ArcGIS Enterprise hosted feature services support both `keywords` and `exifInfo` (`isEnabled` as `true` ). These columns are added automatically when publishing a new feature services with attachments, or enabling attachments on an existing layer. If upgrading from an earlier release, the `keywords` and `exifInfo` columns will not be available. However, they can be added using the [`updateDefinition`](/rest/services-reference/enterprise/update-definition-feature-layer/) operation. Hosted feature services in ArcGIS Online already support attachment columns.
-   New attachment properties, `id` and `globalid` , have been added for all feature service layers that support attachments, including ArcGIS Online hosted feature services.
-   A new `attachmentFields` object lists information about the attachment fields, such as the type and length. The `attachmentFields` `name` property can be matched to the `attachmentProperties` `fieldName` property. This information can be used to properly format queries and understand limits in the field length response. Only fields that match properties with `isEnabled` as `true` will be listed in `attachmentFields` .
-   Field names are now returned in addition to the field properties in the `queryAttachments` operation response. If the field name and property name match, including case, only one value is returned in the response to represent both field and property. As best practice, it is best to go by the fieldname rather than the property when consuming this in an application.

Feature services now support topology layers, introduced at 10.8.1. Topology layers are composite layers that reference `subLayers` and do not have any `capabilities` . The `subLayer` references describe the layer's error features and dirty areas. These same are layers as are also listed in the topology layer's `systemLayers` object. The `systemLayers` are always read only (i.e., they never have editing capabilities) and are `subLayers` of the topology layer. The topology systems layer resources also include a reference to the topology layer as follows.



```
"parentLayer": {
  "id": 0,
  "name": "topo_1081.GDB.topo_2"
},
...
```

In clients like ArcGIS Pro 2.6, topology layers are used in conjunction with the validation service to support topology validation and error feature correction.

### New at 10.8

The following is new at 10.8:

-   The feature layer resource now returns a `supportsDatumTransformation` property. This property is `true` if the feature service layer supports the addition of datum transformations. If `true` , the layer-level [Query](/rest/services-reference/enterprise/query-feature-service-layer/), [Query Related](/rest/services-reference/enterprise/query-related-records-feature-service/), and [layer-level](/rest/services-reference/enterprise/apply-edits-feature-service-layer/) Apply Edits operations will allow datum transformations. In addition, the `supportsQueryWithDatumTransformation` layer property in `advancedQueryCapabilities` will be `true` if the layer-level [Query](/rest/services-reference/enterprise/query-feature-service-layer/) operation supports the `datumTransformation` parameter.
    
-   The layer property `standardMaxRecordCountNoGeometry` defines the max record count when querying a layer with `returnGeometry` as `false` and `resultType` as `standard` .
    
-   The `supportsFieldDescriptionProperty` layer property is `true` if the field description property is supported. The field description property allows for storing value types and descriptions with fields in a layer. Hosted feature layers' [Update Definition](/rest/services-reference/enterprise/update-definition-feature-layer/) operation can be used to add or set a field description. For more information on setting field descriptions and field type values through the home app UI, see [Describe attribute fields](https://enterprise.arcgis.com/en/portal/latest/use/describe-fields.htm).
    
-   System maintained area and length columns named `SHAPE_Area` and `SHAPE_Length` are now supported on hosted feature services (relational data store) in ArcGIS Enterprise. The `geometryProperties` `shapeAreaFieldName` , `shapeLengthFieldName` , and `units` have been added to describe the `SHAPE_Area` and `SHAPE_Length` fields. These fields names are reserved. If data is published that already has fields with these names, the original fields may be dropped or renamed.
    
-   The `supportsQueryAttachments` and `supportsQueryAttachmentsWithReturnUrl` properties are now supported on hosted feature services (relational data store) in ArcGIS Enterprise. These indicate that, if the layer's `hasAttachments` property is `true` , the [Query Attachments](/rest/services-reference/enterprise/query-attachments-feature-service-layer/) operation can be used and, optionally, return attachments via reference URL.
    
-   The `supportedSqlFormatsInCalculate` includes the formats supported with calculate.
    
-   The `userTypeExtension` property indicates if the layer is part of a `parcelFabric` or `utilityNetwork` .
    
-   The layer query option supports `percentile` as a `statisticType` when using `outStatistics` for hosted feature services in ArcGIS Online or ArcGIS Enterprise when run on a relational data store. Layers that support percentiles include the `supportsPercentileStatistics` as `true` in the `advancedQueryCapabilities` layer object.
    
-   The `referenceScale` property represents the scale at which a participating layer's symbol size and text is fixed at. This property is only available if `canScaleSymbols` is `true` .
    

### New at 10.7.1

The following is new in 10.7.1:

-   New layer properties exposed on a feature service layer:
    
    -   The feature layer now supports the [query attachments](/rest/services-reference/enterprise/query-attachments-feature-service-layer/) operation if `supportsQueryAttachments` is `true` and `hasAttachments` is `true` on the layer.
        
        -   The `url` of the attachment can now be returned within the query attachments response if`supportsQueryAttachmentsWithReturnUrl` is `true` and `supportsQueryAttachments` is `true` on the layer.
-   Prior to 10.7.1, the calculate operation was not supported when publishing data that had archived enabled, was traditionally versioned, branch versioned, or participated in a controller dataset (geometric network, topology, utility network, etc). As of 10.7.1, the calculate operation is supported for all of the above for feature services that allow updates.
    

## Request parameters

| Parameter | Details |
|---|---|
| returnUpdates | If value is true , an updated time extent is returned. If the layer is not time-aware, an empty response is returned.Values: true \| false |
| returnDomainNames | If value is true , domain information provided in the layer includes only the domain name. To get the full domain information, use the queryDomains operation in the service resource. This domains included in the layer can be used to linked to the full domain information via the domain name. If the value is false or not set, full domain information is included in the layer as it was in past releases.Values: true \| false |
| f | The response format. The default response format is html .Values: html \| json \| pjson |

### Unique IDs

`uniqueIdInfo` is a JSON object added to a layer's definition at the root level that contains any information regarding `uniqueIds`. The following is a sample `uniqueIdInfo` object when using `uniqueIds`:



```
"uniqueIdInfo": {
    "type": "simple",
    "fields": ["_id"],
    "OIDFieldContainsHashValue": true
}
```

Attributes inside `uniqueIdInfo` are:

| Attribute | Details |
|---|---|
| type | Declares the structure type of uniqueId fields. Any REST requests and responses that combine uniqueId features into a single parameter will be formatted depending on the type.simple: One unique ID field is used to identify layer featuresSupported by read/write and read-only feature services"uniqueIds": [“r7e”, “2xw”, “d35”]composite: More than one unique id field is used to identify layer featuresSupported by read-only feature services"uniqueIds": [[“37a”, “26b”], [“9zy”, “n29”]]Values: simple \| composite |
| fields | The fields that store string-based unique IDs or integer object IDs that identify service features. |
| OIDFieldContainsHashValue | If true, the service will generate an integer object ID value for the objectIdField based on the feature’s uniqueIds any time a client requests it. Must be true if any unique IDs are defined.If false, the service will use the objectIdField in the database. Defaults to false.Values: true \| false |

## Example usage

The following is a sample request URL used to access the feature layer resource:



```
https://organization.example.com/<context>/rest/services/USA/FeatureServer/0?f=json
```

## JSON Response syntax



```
{
  "currentVersion": <currentVersion>,
  //properties applicable to both feature layers and tables
  "id": <layerOrTableId>,
  "name": "<layerOrTableName>",
  "type": "<layerOrTableType>", //"Feature Layer" or "Table"
  "parentLayer": <parentLayerID>,
  "displayField": "<field name>"
  "description": "<description>",
  "copyrightText": "<copyrightText>",
  "subtypeField": "<subtypeField>",
  "defaultSubtypeCode": <defaultSubtypeCode>,
  "defaultVisibility": <true | false>,
  "editFieldsInfo": {
    "creationDateField": "<creationDateField>",
    "creatorField": "<creatorField>",
    "editDateField": "<editDateField>",
    "editorField": "<editorField>",
    "realm":"<realm>",
    "dateFieldsTimeReference": {
      "timeZone": "<timeZone>",
      "timeZoneIANA": "<timeZoneIANA>", // Added in 11.4
      "respectsDaylightSaving": <true | false>
    }
  },
  "ownershipBasedAccessControlForFeatures": {
    "allowOthersToUpdate": <true | false>,
    "allowOthersToDelete": <true | false>,
    "allowOthersToQuery": <true | false>
  },
  "syncCanReturnChanges": <true | false>,
  "relationships": [
    {
      "id": <relationshipId1>,
      "name": "<relationshipName1>",
      "relatedTableId": <relatedTableId1>,
      "cardinality": "<esriRelCardinalityOneToOne>|<esriRelCardinalityOneToMany>|<esriRelCardinalityManyToMany>",
      "role": "<esriRelRoleOrigin>|<esriRelRoleDestination>",
      "keyField": "<keyFieldName2>",
      "composite": <true>|<false>,
      "catalogID": "<identifier>",
      "relationshipTableId": <attributedRelationshipClassTableId>,  //Returned only for attributed relationships
      "keyFieldInRelationshipTable": "<key field in AttributedRelationshipClass table that matches keyField>" //Returned only for attributed relationships
    },
    {
      "id": <relationshipId2>,
      "name": "<relationshipName2>",
      "relatedTableId": <relatedTableId2>,
      "cardinality": "<esriRelCardinalityOneToOne>|<esriRelCardinalityOneToMany>|<esriRelCardinalityManyToMany>",
      "role": "<esriRelRoleOrigin>|<esriRelRoleDestination>",
      "keyField": "<keyFieldName2>",
      "composite": <true>|<false>,
      "catalogID": "<identifier>",
      "relationshipTableId": <attributedRelationshipClassTableId>,  //Returned only for attributed relationships
      "keyFieldInRelationshipTable": "<key field in AttributedRelationshipClass table that matches keyField>" //Returned only for attributed relationships
    }
  ],
  "isDataVersioned": <true | false>,
  "isDataArchived": <true | false>,
  "isDataBranchVersioned": <true | false>,
  "isDataReplicaTracked": <true | false>, //Added at 10.8.1
  "isCoGoEnabled": <true | false>,
  "supportsRollbackOnFailureParameter": <true | false>,
  "dateFieldsTimeReference": {
    "timeZone": <Time Zone>,
    "timeZoneIANA": "<timeZoneIANA>", // Added in 11.4
    "respectsDaylightSaving": <true | false>
  },
  "preferredTimeReference": { //Added at 10.9
    "timeZone": <Time Zone>,
    "timeZoneIANA": "<timeZoneIANA>", // Added in 11.4
    "respectsDaylightSaving": <true | false>
  },
  "datesInUnknownTimezone": <true | false> //Added at 10.9
  "archivingInfo": {
    "supportsQueryWithHistoricMoment": <true | false>,
    "startArchivingMoment": <startArchivingMoment>
  }, //Added at 10.5
  "supportsStatistics": <true | false>,
  "supportsAdvancedQueries": <true | false>,
  "supportsCoordinatesQuantization": <true | false>,
  "supportsDatumTransformation": <true | false>, //Added at 10.8
  //properties applicable to feature layers only
  "geometryType" : "<geometryType>",
  "geometryProperties": {
    "shapeAreaFieldName": "<shapeAreaFieldName>",
    "shapeLengthFieldName": "<shapeLengthFieldName>",
    "units": "<units>"
  },
  "minScale": <minScale>,
  "maxScale": <maxScale>,
  "effectiveMinScale": <effectiveMinScale>,
  "effectiveMaxScale": <effectiveMaxScale>,
  "supportsQuantizationEditMode": <true | false>,
  "supportsAppend":  <true | false>,
  "supportedAppendFormats": "<supportedAppendFormats>",
  "hasContingentValuesDefinition": <true | false>,
  "spatialReference": { //Added at 11.5
    "wkid": <wkid>,
    "latestWkid": <latestWkid>, //Returned when map is published with a vertical coordinate system
    "vcsWkid": <vcsWkid>,
    "latestVcsWkid": <latestVcsWkid>,
    "xyTolerance": <xyTolerance>,
    "zTolerance": <zTolerance>,
    "mTolerance": <mTolerance>,
    "falseX": <falseX>,
    "falseY": <falseY>,
    "xyUnits": <xyUnits>,
    "falseZ": <falseZ>,
    "zUnits": <zUnits>,
    "falseM": <falseM>,
    "mUnits": <mUnits>
  },
	"advancedQueryCapabilities": {
    "supportsPagination": <true | false>,
    "supportsTrueCurve": <true | false>,
    "supportsQueryWithDistance": <true | false>,
    "supportsLod": <true | false>,
    "supportsReturningQueryExtent": <true | false>,
    "supportsStatistics": <true | false>,
    "supportsHavingClause": <true | false>,
    "supportsOrderBy": <true | false>,
    "supportsDistinct": <true | false>,
    "supportsCountDistinct": <true | false>,
    "supportsPaginationOnAggregatedQueries": <true | false>,
    "supportsQueryWithResultType": <true | false>,
    "supportsReturningGeometryCentroid": <true | false>,
    "supportsSqlExpression": <true | false>,
    "supportsOutFieldsSqlExpression": <true | false>,
    "supportsTopFeaturesQuery": <true | false>,
    "supportsOrderByOnlyOnLayerFields": <true | false>,
    "supportsQueryWithDatumTransformation": <true | false>, //Added at 10.8
    "supportsPercentileStatistics": <true | false>, //Added at 10.8
    "supportsQueryAttachments": <true | false>,
    "supportsQueryAttachmentsWithReturnUrl": <true | false>, //Added at 10.7.1
    "supportsQueryAnalytic": <true | false> //Added to online and hosted feature services at 10.9
    "supportedMultipatchOptions": [ //Added at 10.9
      "embedMaterials",
      "xyFootprint",
      "externalizeTextures",
      "stripMaterials",
      "extent"
    ],
    "supportsCurrentUserQueries": <true | false> //Added at 11.2,
    "supportsFullTextSearch":  <true | false>,
    "fullTextSearchCapabilities": {<capabilities>}, //Added at 11.5
    "fullTextSearchableFields": [<Field Names>], //Added at 11.5
    "supportsTrueCurve": <true | false>,
    "supportedCurveTypes": [<Curve Types>], //Added at 11.5
  },
  "standardMaxRecordCountNoGeometry": <maxRecordCount>, //Added at 10.8
  "supportsAsyncCalculate": <true | false>, //Added at 10.8
  "supportsFieldDescriptionProperty": <true | false>,
  "advancedEditingCapabilities": {
    "supportedSqlFormatesInCalculate": [
      <formats>
    ]
  },
  "advancedQueryAnalyticCapabilities": { //Added at online and hosted feature services at 10.9
    "supportsPercentileAnalytic": <true | false>
  },
  "userTypeExtensions": [ //Added at 10.8
    <Extension Types>
  ],
  "extent":  {
    "xmin": <xmin>,
    "ymin": <ymin>,
    "xmax": <xmax>,
    "ymax": <ymax>,
    "zmin": <zmin>,
    "zmax": <zmax>,
    "mmin": <mmin>,
    "mmax": <mmax>,
    "spatialReference": {
      "wkid": <wkid>,
      "latestWkid": <latestWkid>,
      //Returned when map is published with a vertical coordinate system
      "vcsWkid": <vcsWkid>,
      "latestVcsWkid": <latestVcsWkid>,
      "xyTolerance": <xyTolerance>,
      "zTolerance": <zTolerance>,
      "mTolerance": <mTolerance>,
      "falseX": <falseX>,
      "falseY": <falseY>,
      "xyUnits": <xyUnits>,
      "falseZ": <falseZ>,
      "zUnits": <zUnits>,
      "falseM": <falseM>,
      "mUnits": <mUnits>
    }
  },
  //Only returned when a map is published with a vertical coordinate system
  "heightModelInfo": {
    "heightModel": "<heightModel>",
    "vertCRS": "<vertCRS>",
    "heightUnit": "<heightUnit>"
  },
  //Only returned when source data has a defined vertical coordinate system
  "sourceHeightModelInfo": {
    "heightModel": "<heightModel>",
    "vertCRS": "<vertCRS>",
    "heightUnit": "<heightUnit>"
  },
  "sourceSpatialReference": {
    "wkid": <wkid>,
    "latestWkid": <latestWkid>,
    //Returns when source data is published with a vertical coordinate system
    "vcsWkid": <vcsWkid>,
    "latestVcsWkid": <latestVcsWkid>,
    "xyTolerance": <xyTolerance>,
    "zTolerance": <zTolerance>,
    "mTolerance": <mTolerance>,
    "falseX": <falseX>,
    "falseY": <falseY>,
    "xyUnits": <xyUnits>,
    "falseZ": <falseZ>,
    "zUnits": <zUnits>,
    "falseM": <falseM>,
    "mUnits": <mUnits>
  },
  //for feature layers only
  "drawingInfo": {
    "renderer": <renderer>,
    "transparency": <transparency>,
    "labelingInfo": <labelingInfo>
  },
  "hasM":  <true | false>, //if the features in the layer have M values, the hasM property will be true
  "hasZ":  <true | false>, //if the features in the layer have Z values, the hasZ property will be true
  //if the layer / table supports querying based on time
  "enableZDefaults": <true | false>,
  "zDefault": <zDefaultValue>,
  "allowGeometryUpdates": <true | false>,
  "timeInfo": {
    "startTimeField": "<startTimeFieldName>",
    "endTimeField": "<endTimeFieldName>",
    "trackIdField": "<trackIdFieldName>",
    "timeExtent": [<startTime>, <endTime>],
    "timeReference": {
      "timeZone": "<timeZone>",
      "timeZoneIANA": "<timeZoneIANA>", // Added in 11.4
      "respectsDaylightSaving" : <true | false>
    },
    "timeInterval": <timeInterval>,
    "timeIntervalUnits": "<timeIntervalUnits>"
  },
  //if the layer / table has attachments, the hasAttachments property will be true
  "hasAttachments": <true | false>,
  //from 10 onward - indicates whether the layer / table has htmlPopups
  "htmlPopupType": "<esriServerHTMLPopupTypeNone | esriServerHTMLPopupTypeAsURL | esriServerHTMLPopupTypeAsHTMLText>",
  //layer / table fields
  "objectIdField": "<objectIdFieldName>",
  "globalIdField": "<globalIdFieldName>",
  "typeIdField": "<typeIdFieldName>",
  "fields": [
    {
      "name": "<fieldName1>",
      "type": "<fieldType1>",
      "alias": "<fieldAlias1>",
      "domain": <domain1>,
      "editable": "<true | false>",
      "nullable": "<true | false>",
      "length": "<length1>",
      "defaultValue": "<defaultValue1>",
      "modelName": "<modelName1>"
    },
    {
      "name": "<fieldName2>",
      "type": "<fieldType2>",
      "alias": "<fieldAlias1>",
      "domain": <domain1>,
      "editable": "<true | false>",
      "nullable": "<true | false>",
      "length": "<length2>",
      "defaultValue": <defaultValue2>,
      "modelName": "<modelName2>"
    }
  ],
  "geometryField": {
    "name": "<fieldName>",
    "type": "<fieldType>",
    "alias": "<fieldAlias>",
    "domain": <domain>,
    "editable": "<true | false>",
    "nullable": "<true | false>",
    "defaultValue": "<defaultValue>",
    "modelName": "<modelName>"
  },
  //layer / table sub-types
  "types": [
    {
      "id": <typeId1>,
      "name": "<typeName1>",
      "domains": {
        "<domainField11>": <domain11>,
        "<domainField12>": <domain12>,
        "description": "<domainDescription>"
      },
      "templates": [
        {
          "name": "<templateName11>",
          "description": "<templateDescription11>",
          "prototype": <prototypicalFeature11>
        },
        {
          "name": "<templateName12>",
          "description": "<templateDescription12>",
          "prototype": <prototypicalFeature12>
        }
      ]
    },
    {
      "id": <typeId2>,
      "name": "<typeName2>",
      "domains": {
        "<domainField11>": <domain21>,
        "<domainField12>": <domain22>,
        "description": "<domainDescription>"
      },
      "templates": [
        {
          "name": "<templateName21>",
          "description": "<templateDescription21>",
          "prototype": <prototypicalFeature21>,
          "drawingTool": "esriFeatureEditToolNone | esriFeatureEditToolPoint | esriFeatureEditToolLine | esriFeatureEditToolPolygon |
             esriFeatureEditToolAutoCompletePolygon | esriFeatureEditToolCircle | esriFeatureEditToolEllipse |
             esriFeatureEditToolRectangle |esriFeatureEditToolFreehand"
        },
        {
          "name": "<templateName22>",
          "description": "<templateDescription22>",
          "prototype": <prototypicalFeature22>,
          "drawingTool": "esriFeatureEditToolNone | esriFeatureEditToolPoint | esriFeatureEditToolLine | esriFeatureEditToolPolygon |
             esriFeatureEditToolAutoCompletePolygon | esriFeatureEditToolCircle | esriFeatureEditToolEllipse |
             esriFeatureEditToolRectangle | esriFeatureEditToolFreehand"
        }
      ]
    }
  ],
  //layer / table templates - usually present when the layer / table has no types
  "templates": [
    {
      "name": "<templateName1>",
      "description": "<templateDescription1>",
      "prototype": <prototypicalFeature1>,
      "drawingTool": "esriFeatureEditToolNone | esriFeatureEditToolPoint | esriFeatureEditToolLine | esriFeatureEditToolPolygon |
             esriFeatureEditToolAutoCompletePolygon | esriFeatureEditToolCircle | esriFeatureEditToolEllipse |
             esriFeatureEditToolRectangle | esriFeatureEditToolFreehand"
    },
    {
      "name": "<templateName2>",
      "description": "<templateDescription2>",
      "prototype": <prototypicalFeature2>,
      "drawingTool": "esriFeatureEditToolNone | esriFeatureEditToolPoint | esriFeatureEditToolLine | esriFeatureEditToolPolygon |
             esriFeatureEditToolAutoCompletePolygon | esriFeatureEditToolCircle | esriFeatureEditToolEllipse |
             esriFeatureEditToolRectangle | esriFeatureEditToolFreehand"

    },
  ],
  "subtypes": [
    {
      "code": <SubtypeCode1>,
      "name": "<SubtypeDescription1>",
      "defaultValues": {
        "<fieldName1>": <default1>,
        "<fieldName2>": "<default2>"
      },
      "domains": {
        "<fieldName1>": <domain11>,
        "<fieldName2>": <domain12>
      }
    },
    {
      "code": <SubtypeCode2>,
      "name": "<SubtypeDescription2>",
      "defaultValues": {
        "<fieldName1>": <default3>,
        "<fieldName2>": "<default4>"
      },
      "domains": {
        "<fieldName1>": <domain21>,
        "<fieldName2>": <domain22>
      }
    }
  ],
  //Maximum number of records returned in a query result
  "maxRecordCount": <maxRecordCount>,
  "standardMaxRecordCount ": <standardMaxRecordCount>,
  "tileMaxRecordCount": <tileMaxRecordCount>,
  "maxRecordCountFactor": <maxRecordCountFactor>,
  "supportedQueryFormats": "<supportedQueryFormats>",
  "supportedExportFormats": "<supported formats>", //Added at 10.9.1
  "supportedSpatialRelationships": [<supported spatial relationships>] //Added at 10.9.1
  "hasMetadata": <true | false>,
  "hasStaticData": <true | false>,
  "sqlParserVersion": "<sqlParserVersion>",
  "isUpdatableView": <true | false>,
  //comma separated list of supported capabilities - e.g. "Create,Delete,Query,Update,Editing"
  "capabilities": "<capabilities>"
}
```

## JSON Response examples

-   [Example one: feature service layer](/rest/services-reference/enterprise/layer-feature-service/#example-one-feature-service-layer)
-   [Example two: layer subtypes | `returnDomainNames=false`](/rest/services-reference/enterprise/layer-feature-service/#example-two-layer-subtypes-returndomainnames--is-false-)
-   [Example three: Layer subtypes | `returnDomainNames=true`](/rest/services-reference/enterprise/layer-feature-service/#example-three-layer-subtypes-returndomainnames--is-true-)
-   [Example four: Template and thumbnail](/rest/services-reference/enterprise/layer-feature-service/#example-four-template-and-thumbnail)
-   [Example five: `maxRecordCount` point data](/rest/services-reference/enterprise/layer-feature-service/#example-five-maxrecordcount--point-data)
-   [Example six: `maxRecordCount` polyline data](/rest/services-reference/enterprise/layer-feature-service/#example-six-maxrecordcount--polyline-data)
-   [Example seven: `maxRecordCount` polygon data](/rest/services-reference/enterprise/layer-feature-service/#example-seven-maxrecordcount--polygon-data)
-   [Example eight: `maxRecordCount` table](/rest/services-reference/enterprise/layer-feature-service/#example-eight-maxrecordcount--table)
-   [Example nine: `timeInfo`](/rest/services-reference/enterprise/layer-feature-service/#example-nine-timeinfo-)
-   [Example 10: Utility Network layer](/rest/services-reference/enterprise/layer-feature-service/#example-10-utility-network-layer)
-   [Example 11: Spatial references](/rest/services-reference/enterprise/layer-feature-service/#example-11-spatial-references)
-   [Example 12: Topology layers](/rest/services-reference/enterprise/layer-feature-service/#example-12-topology-layers)
-   [Example 13: `attachmentProperties` and `attachmentFields`](/rest/services-reference/enterprise/layer-feature-service/#example-13-attachmentproperties--and-attachmentfields-)
-   [Example 14: Trace Network layer](/rest/services-reference/enterprise/layer-feature-service/#example-14-trace-network-layer)
-   [Example 15: 3D Object Feature Layer](/rest/services-reference/enterprise/layer-feature-service/#example-15-3d-object-feature-layer)
-   [Example 16: 64 bit objectid and high precision date fields](/rest/services-reference/enterprise/layer-feature-service/#example-16-64-bit-objectid-and-high-precision-date-fields)
-   [Example 17: IANA time zones](#example-17-iana-time-zones)
-   [Example 18: Full text indexes](#example-18-full-text-indexes)
-   [Example 19: Full text search and true curve properties](#example-19-full-text-search-and-true-curve-properties)

### Example one: feature service layer

The following is a sample feature service layer JSON response:



```
{
  "id": 0,
  "name": "Incidents",
  "type": "Feature Layer",
  "parentLayer": null,
  "displayField": "req_id",
  "description": "",
  "copyrightText": "",
  "subtypeField": "",
  "defaultSubtypeCode": 0,
  "defaultVisibility": True,
  "editFieldsInfo": {
    "creationDateField": "created_date",
    "creatorField": "created_user",
    "editDateField": "last_edited_date",
    "editorField": "last_edited_user",
    "dateFieldsTimeReference": {
      "timeZone": "UTC",
      "respectsDaylightSaving": false
    },
    "preferredTimeReference": {
      "timeZone": "Eastern Standard Time",
      "respectsDaylightSaving": true
    },
    "datesInUnknownTimezone": false,
  },
  "isDataArchived": false,
  "isDataBranchVersioned": false,
  "isDataReplicaTracker": false,
  "isCoGoEnabled": false,
  "parentLayer": null,
  "minScale": 0,
  "maxScale": 0,
  "geometryType": "esriGeometryPoint",
  "geometryProperties": {
    "shapeAreaFieldName": "Shape__Area",
    "shapeLengthFieldName": "Shape__Length",
    "units": "esriMeters"
  },
  "supportsCoordinatesQuantization": true,
  "supportsDatumTransformation": true,
  "supportsRollbackOnFailureParameter": true,
  "supportsQuantizationEditMode": true,
  "advancedQueryCapabilities": {
    "supportsPagination": true,
    "supportsTrueCurve": true,
    "supportsQueryWithDistance": true,
    "supportsLod": false,
    "supportsPaginationOnAggregatedQueries": true,
    "supportsReturningQueryExtent": true,
    "supportsStatistics": true,
    "supportsHavingClause": true,
    "supportsOrderBy": true,
    "supportsDistinct": true,
    "supportsCountDistinct": true,
    "supportsQueryWithResultType": true,
    "supportsReturningGeometryCentroid": false,
    "supportsSqlExpression": true,
    "supportsOutFieldSqlExpression": false,
    "supportsTopFeaturesQuery": true,
    "supportsOrderByOnlyOnLayerFields": true,
    "supportsQueryWithDatumTransformation": true,
    "supportsPercentileStatistics": true,
    "supportsQueryAttachments": true,
    "supportsQueryAttachmentsWithReturnUrl": true,
    "supportsQueryAnalytic": true,
    "supportedMultipatchOptions": [
      "embedMaterials",
      "xyFootprint",
      "externalizeTextures",
      "stripMaterials",
      "extent"
    ],
    "supportsCurrentUserQueries": true
  },
  "standardMaxRecordCountNoGeometry": 3200,
  "supportsAsyncCalculate": true,
  "supportsFieldDescriptionProperty": true,
  "advancedEditingCapabilities": {
    "supportedSqlFormatsInCalculate": [
      "standard"
    ]
  },
  "advancedQueryAnalyticCapabilities": {
    "supportsPercentileAnalytic": false
  },
  "userTypeExtensions": [
    "utilityNetwork"
  ],
  "extent": {
    "xmin": -122.514435102,
    "ymin": 5.6843418860808E-14,
    "xmax": 138.625776397,
    "ymax": 67.1577965990001,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 3857,
      "vcsWkid": 5702,
      "latestVcsWkid": 5702,
      "xyTolerance": 0.001,
      "zTolerance": 0.001,
      "mTolerance": 0.001,
      "falseX": -20037700,
      "falseY": -30241100,
      "xyUnits": 10000,
      "falseZ": -100000,
      "zUnits": 10000,
      "falseM": -100000,
      "mUnits": 10000
    }
  },
  "heightModelInfo": {
    "heightModel": "gravity_related_height",
    "vertCRS": "NGVD_1929",
    "heightUnit": "us-foot"
  },
  "sourceSpatialReference": {
    "wkid": 102100,
    "latestWkid": 3857,
    "xyTolerance": 0.001,
    "zTolerance": 0.001,
    "mTolerance": 0.001,
    "falseX": -20037700,
    "falseY": -30241100,
    "xyUnits": 10000,
    "falseZ": -100000,
    "zUnits": 10000,
    "falseM": -100000,
    "mUnits": 10000
  },
  "sourceHeightModelInfo": {
    "heightModel": "ellipsoidal",
    "vertCRS": "ITRF_2000",
    "heightUnit": "meter"
  },
  "drawingInfo": {
    "renderer": {
      "type": "uniqueValue",
      "field1": "req_type",
      "field2": null,
      "field3": null,
      "defaultSymbol": null,
      "defaultLabel": "\u003call other values\u003e",
      "uniqueValueInfos": [
        {
          "value": "Blocked Street or Sidewalk",
          "label": "Blocked Street or Sidewalk",
          "description": "",
          "symbol": {
            "type": "esriPMS",
            "url": "1DD4FC53",
            "imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAII=",
            "contentType": "image/png",
            "color": null,
            "width": 19,
            "height": 19,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
          }
        },
        {
          "value": "Damaged Property",
          "label": "Damaged Property",
          "description": "",
          "symbol": {
            "type": "esriPMS",
            "url": "DF3100A6",
            "imageData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAII=",
            "contentType": "image/png",
            "color": null,
            "width": 15,
            "height": 9,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
          }
        },
        {
          "value": "Graffiti Complaint - Public Property",
          "label": "Graffiti Complaint",
          "description": "",
          "symbol": {
            "type": "esriPMS",
            "url": "B2E6E7A0",
            "imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAg==",
            "contentType": "image/png",
            "color": null,
            "width": 19,
            "height": 19,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
          }
        },
        {
          "value": "Graffiti Complaint � Private Property",
          "label": "Graffiti Complaint",
          "description": "",
          "symbol": {
            "type": "esriPMS",
            "url": "B2E6E7A0",
            "imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAAg==",
            "contentType": "image/png",
            "color": null,
            "width": 19,
            "height": 19,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
          }
        },
        {
          "value": "Sewer Issues",
          "label": "Sewer Issues",
          "description": "",
          "symbol": {
            "type": "esriPMS",
            "url": "80DC11A7",
            "imageData": "iVBORw0KGgoAAAANSUhEUgAAABYAAAAaCAYAAACzdqxAAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAAg==",
            "contentType": "image/png",
            "color": null,
            "width": 16,
            "height": 19,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
          }
        },
        {
          "value": "Sidewalk and Curb Issues",
          "label": "Sidewalk and Curb Issues",
          "description": "",
          "symbol": {
            "type": "esriPMS",
            "url": "19213DC2",
            "imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAAII=",
            "contentType": "image/png",
            "color": null,
            "width": 19,
            "height": 19,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
          }
        },
        {
          "value": "Tree Maintenance or Damage",
          "label": "Tree Maintenance or Damage",
          "description": "",
          "symbol": {
            "type": "esriPMS",
            "url": "37B62A6C",
            "imageData": "iVBORw0KGgoAAAANSUhEUgAAABcAAAAaCAYAAABctMd+AAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAACC",
            "contentType": "image/png",
            "color": null,
            "width": 17,
            "height": 19,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
          }
        }
      ]
    },
    "transparency": 0,
    "labelingInfo": null
  },
  "hasAttachments": false,
  "htmlPopupType": "esriServerHTMLPopupTypeAsHTMLText",
  "objectIdField": "objectid",
  "globalIdField": "",
  "typeIdField": "req_type",
  "fields": [
    {
      "name": "objectid",
      "type": "esriFieldTypeOID",
      "alias": "Object ID",
      "editable": false,
      "nullable": true,
      "domain": null,
      "defaultValue": null,
      "modelName": "OBJECTID"
    },
    {
      "name": "req_id",
      "type": "esriFieldTypeString",
      "alias": "Request ID",
      "editable": true,
      "length": 20,
      "nullable": true,
      "domain": null,
      "defaultValue": null,
      "modelName": "REQ_ID"
    },
    {
      "name": "req_type",
      "type": "esriFieldTypeString",
      "alias": "Request Type",
      "editable": true,
      "length": 40,
      "nullable": true,
      "domain": null,
      "defaultValue": null,
      "modelName": "REQ_TYPE"
    },
    {
      "name": "req_date",
      "type": "esriFieldTypeString",
      "alias": "Request Date",
      "editable": true,
      "length": 30,
      "nullable": true,
      "domain": null,
      "defaultValue": null,
      "modelName": "REQ_DATE"
    },
    {
      "name": "req_time",
      "type": "esriFieldTypeString",
      "alias": "Request Time",
      "editable": true,
      "length": 20,
      "nullable": true,
      "domain": null,
      "defaultValue": null,
      "modelName": "REQ_TIME"
    },
    {
      "name": "address",
      "type": "esriFieldTypeString",
      "alias": "Address",
      "editable": true,
      "length": 60,
      "nullable": true,
      "domain": null,
      "defaultValue": null,
      "modelName": "ADDRESS"
    },
    {
      "name": "x_coord",
      "type": "esriFieldTypeString",
      "alias": "X Coordinate",
      "editable": true,
      "length": 20,
      "nullable": true,
      "domain": null,
      "defaultValue": null,
      "modelName": "X_COORD"
    },
    {
      "name": "y_coord",
      "type": "esriFieldTypeString",
      "alias": "Y Coordinate",
      "editable": true,
      "length": 20,
      "nullable": true,
      "domain": null,
      "defaultValue": null,
      "modelName": "Y_COORD"
    },
    {
      "name": "district",
      "type": "esriFieldTypeString",
      "alias": "District",
      "editable": true,
      "length": 20,
      "nullable": true,
      "domain": null,
      "defaultValue": null,
      "modelName": "DISTRICT"
    },
    {
      "name": "status",
      "type": "esriFieldTypeSmallInteger",
      "alias": "Status",
      "editable": true,
      "nullable": true,
      "domain": {
        "type": "codedValue",
        "name": "StatusCodes",
        "codedValues": [
          {
            "name": "New",
            "code": 1
          },
          {
            "name": "Open",
            "code": 2
          },
          {
            "name": "Closed",
            "code": 3
          }
        ]
      }
    }
  ],
  "geometryField": {
    "name": "Shape",
    "type": "esriFieldTypeGeometry",
    "alias": "Shape",
    "domain": null,
    "editable": true,
    "nullable": true,
    "defaultValue": null,
    "modelName": "Shape"
 },
  "types": [
    {
      "id": "Graffiti Complaint - Private Property",
      "name": "Graffiti Complaint",
      "domains": {
        "description": null
      },
      "templates": [
        {
          "name": "Graffiti Complaint",
          "description": "",
          "drawingTool": "esriFeatureEditToolPoint",
          "prototype": {
            "attributes": {
              "status": 1,
              "req_id": null,
              "req_type": "Graffiti Complaint - Private Property",
              "req_date": null,
              "req_time": null,
              "address": null,
              "x_coord": null,
              "y_coord": null,
              "district": null
            }
          }
        }
      ]
    },
    {
      "id": "Blocked Street or Sidewalk",
      "name": "Blocked Street or Sidewalk",
      "domains": {
        "description": null
      },
      "templates": [
        {
          "name": "Blocked Street or Sidewalk",
          "description": "",
          "drawingTool": "esriFeatureEditToolPoint",
          "prototype": {
            "attributes": {
              "status": 1,
              "req_id": null,
              "req_type": "Blocked Street or Sidewalk",
              "req_date": null,
              "req_time": null,
              "address": null,
              "x_coord": null,
              "y_coord": null,
              "district": null
            }
          }
        }
      ]
    },
    {
      "id": "Damaged Property",
      "name": "Damaged Property",
      "domains": {
        "description": null
      },
      "templates": [
        {
          "name": "Damaged Property",
          "description": "",
          "drawingTool": "esriFeatureEditToolPoint",
          "prototype": {
            "attributes": {
              "status": 1,
              "req_id": null,
              "req_type": "Damaged Property",
              "req_date": null,
              "req_time": null,
              "address": null,
              "x_coord": null,
              "y_coord": null,
              "district": null
            }
          }
        }
      ]
    },
    {
      "id": "Graffiti Complaint - Public Property",
      "name": "Graffiti Complaint",
      "domains": {
        "description": null
      },
      "templates": [
        {
          "name": "Graffiti Complaint",
          "description": "",
          "drawingTool": "esriFeatureEditToolPoint",
          "prototype": {
            "attributes": {
              "status": 1,
              "req_id": null,
              "req_type": "Graffiti Complaint - Public Property",
              "req_date": null,
              "req_time": null,
              "address": null,
              "x_coord": null,
              "y_coord": null,
              "district": null
            }
          }
        }
      ]
    },
    {
      "id": "Sewer Issues",
      "name": "Sewer Issues",
      "domains": {
        "description": null
      },
      "templates": [
        {
          "name": "Sewer Issues",
          "description": "",
          "drawingTool": "esriFeatureEditToolPoint",
          "prototype": {
            "attributes": {
              "status": 1,
              "req_id": null,
              "req_type": "Sewer Issues",
              "req_date": null,
              "req_time": null,
              "address": null,
              "x_coord": null,
              "y_coord": null,
              "district": null
            }
          }
        }
      ]
    },
    {
      "id": "Tree Maintenance or Damage",
      "name": "Tree Maintenance or Damage",
      "domains": {
        "description": null
      },
      "templates": [
        {
          "name": "Tree Maintenance or Damage",
          "description": "",
          "drawingTool": "esriFeatureEditToolPoint",
          "prototype": {
            "attributes": {
              "status": 1,
              "req_id": null,
              "req_type": "Tree Maintenance or Damage",
              "req_date": null,
              "req_time": null,
              "address": null,
              "x_coord": null,
              "y_coord": null,
              "district": null
            }
          }
        }
      ]
    },
    {
      "id": "Sidewalk and Curb Issues",
      "name": "Sidewalk and Curb Issues",
      "domains": {
        "description": null
      },
      "templates": [
        {
          "name": "Sidewalk and Curb Issues",
          "description": "",
          "drawingTool": "esriFeatureEditToolPoint",
          "prototype": {
            "attributes": {
              "status": 1,
              "req_id": null,
              "req_type": "Sidewalk and Curb Issues",
              "req_date": null,
              "req_time": null,
              "address": null,
              "x_coord": null,
              "y_coord": null,
              "district": null
            }
          }
        }
      ]
    }
  ],
  "templates": [

  ],
  "maxRecordCount" : 2000,
  "standardMaxRecordCount" : 4000,
  "tileMaxRecordCount" : 4000,
  "maxRecordCountFactor" : 1,
  "hasMetadata": false,
  "supportedQueryFormats": "JSON, geoJSON, PBF",
  "supportedExportFormats": "sqlite,filegdb,shapefile",
  "supportedSpatialRelationships": [
    "esriSpatialRelIntersects",
    "esriSpatialRelContains",
    "esriSpatialRelCrosses",
    "esriSpatialRelEnvelopeIntersects",
    "esriSpatialRelOverlaps",
    "esriSpatialRelTouches",
    "esriSpatialRelWithin"
  ],
  "capabilities": "Create,Delete,Query,Update,Editing",
  "sqlParserVersion": "PG_10.6.1",
  "isUpdatableView": true
}
```

### Example two: layer subtypes, `returnDomainNames` is `false`

The following example is a sample layer JSON response returning layer subtypes and the `returnDomainNames` is `false` :



```
{
  "currentVersion": 10.8,
  "cimVersion": "1.3.0",
  "id": 1,
  "name": "FC1",
  "parentLayerId": -1,
  "type": "Feature Layer",
  "description": "sync.GDB.FC1_1",
  "copyrightText": "",
  "defaultVisibility": true,
  "editFieldsInfo": null,
  "ownershipBasedAccessControlForFeatures": null,
  "syncCanReturnChanges": false,
  "relationships": [],
  "isDataVersioned": false,
  "supportsRollbackOnFailureParameter": true,
  "archivingInfo": {
    "supportsQueryWithHistoricMoment": false,
    "startArchivingMoment": -1
  },
  "supportsStatistics": true,
  "supportsAdvancedQueries": true,
  "supportsValidateSQL": true,
  "supportsCalculate": true,
  "advancedQueryCapabilities": {
    "supportsPagination": true,
    "supportsTrueCurve": true,
    "supportsQueryWithDistance": true,
    "supportsReturningQueryExtent": true,
    "supportsStatistics": true,
    "supportsOrderBy": true,
    "supportsDistinct": true
  },
  "geometryType": "esriGeometryPolygon",
  "minScale": 0,
  "maxScale": 0,
  "extent": {
    "xmin": -1.11478990548E7,
    "ymin": 5784886.1743,
    "xmax": -1.08927509324E7,
    "ymax": 5970448.445100002,
    "spatialReference": {
      "wkid": 102100,
      "latestWkid": 3857
    }
  },
  "drawingInfo": {
    "renderer": {
      "type": "uniqueValue",
      "field1": "FLD0_SUBT_FC2",
      "field2": null,
      "fieldDelimiter": ", ",
      "defaultSymbol": {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [
          130,
          130,
          130,
          255
        ],
        "outline": {
          "type": "esriSLS",
          "style": "esriSLSSolid",
          "color": [
            225,
            225,
            225,
            255
          ],
          "width": 0.75
        }
      },
      "defaultLabel": "<all other values>",
      "uniqueValueInfos": [
        {
          "symbol": {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [
              207,
              246,
              252,
              255
            ],
            "outline": {
              "type": "esriSLS",
              "style": "esriSLSSolid",
              "color": [
                110,
                110,
                110,
                255
              ],
              "width": 0.7
            }
          },
          "value": "1",
          "label": "subtype1",
          "description": ""
        }
      ]
    },
    "transparency": 0,
    "labelingInfo": null
  },
  "hasM": false,
  "hasZ": false,
  "allowGeometryUpdates": true,
  "hasAttachments": false,
  "supportsApplyEditsWithGlobalIds": false,
  "htmlPopupType": "esriServerHTMLPopupTypeAsHTMLText",
  "objectIdField": "OBJECTID",
  "globalIdField": "",
  "displayField": "FLD0_SUBT_FC2",
  "typeIdField": "FLD0_SUBT_FC2",
  "subtypeField": "FLD0_SUBT_FC2",
  "defaultSubtypeCode": 1,
  "fields": [
    {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID",
      "domain": null,
      "editable": false,
      "nullable": false
    },
    {
      "name" : "Shape__Area",
      "type" : "esriFieldTypeDouble",
      "alias" : "Shape__Area",
      "sqlType" : "sqlTypeDouble",
      "nullable" : true,
      "editable" : false,
      "domain" : null,
      "defaultValue" : null
    },
   {
      "name" : "Shape__Length",
      "type" : "esriFieldTypeDouble",
      "alias" : "Shape__Length",
      "sqlType" : "sqlTypeDouble",
      "nullable" : true,
      "editable" : false,
      "domain" : null,
      "defaultValue" : null
    },
    {
      "name": "FLD0_SUBT_FC2",
      "type": "esriFieldTypeInteger",
      "alias": "FLD0_SUBT_FC2",
      "domain": null,
      "editable": true,
      "nullable": true
    },
    {
      "name": "FLD1_LONG_FC2",
      "type": "esriFieldTypeInteger",
      "alias": "FLD1_LONG_FC1",
      "domain": {
        "type": "range",
        "name": "RDOM_1",
        "range": [
          1,
          50
        ],
        "mergePolicy": "esriMPTDefaultValue",
        "splitPolicy": "esriSPTDefaultValue"
      },
      "editable": true,
      "nullable": true
    },
    {
      "name": "FLD2_DBL_FC2",
      "type": "esriFieldTypeDouble",
      "alias": "FLD2_DBL_FC2",
      "domain": {
        "type": "range",
        "name": "RDOM_3",
        "range": [
          100,
          150.5
        ],
        "mergePolicy": "esriMPTDefaultValue",
        "splitPolicy": "esriSPTDefaultValue"
      },
      "editable": true,
      "nullable": true
    },
    {
      "name": "FLD3_DBL_FC2",
      "type": "esriFieldTypeDouble",
      "alias": "FLD3_LONG_FC1",
      "domain": {
        "type": "codedValue",
        "name": "CDOM_1",
        "codedValues": [
          {
            "name": "code 1 description",
            "code": 1
          },
          {
            "name": "code 1.5 description",
            "code": 1.5
          },
          {
            "name": "code 2 description",
            "code": 2
          },
          {
            "name": "code 2.5 description",
            "code": 2.5
          }
        ],
        "mergePolicy": "esriMPTDefaultValue",
        "splitPolicy": "esriSPTDefaultValue"
      },
      "editable": true,
      "nullable": true
    },
    {
      "name": "FLD4_TEXT_FC2",
      "type": "esriFieldTypeString",
      "alias": "FLD4_LONG_FC1",
      "domain": {
        "type": "codedValue",
        "name": "CDOM_3",
        "codedValues": [
          {
            "name": "code 100 description",
            "code": "code 100"
          },
          {
            "name": "code 200 description",
            "code": "code 200"
          },
          {
            "name": "code 300 description",
            "code": "code 300"
          }
        ],
        "mergePolicy": "esriMPTDefaultValue",
        "splitPolicy": "esriSPTDefaultValue"
      },
      "editable": true,
      "nullable": true,
      "length": 50
    }
  ],
  "indexes": [
    {
      "name": "R1390_pk",
      "fields": "OBJECTID",
      "isAscending": true,
      "isUnique": true,
      "description": ""
    },
    {
      "name" : "Shape__Area_Index",
      "fields" : "Shape__Area",
      "isAscending" : true,
      "isUnique" : false,
      "description" : ""
    },
    {
      "name" : "Shape__Length_Index",
      "fields" : "Shape__Length",
      "isAscending" : true,
      "isUnique" : false,
      "description" : ""
    },
    {
      "name": "S1047_idx",
      "fields": "SHAPE",
      "isAscending": true,
      "isUnique": true,
      "description": ""
    }
  ],
  "dateFieldsTimeReference": {
    "timeZone": "UTC",
    "respectsDaylightSaving": false
  },
  "types": [
    {
      "id": 1,
      "name": "subtype1",
      "domains": {
        "FLD1_LONG_FC2": {"type": "inherited"},
        "FLD3_DBL_FC2": {
          "type": "codedValue",
          "name": "CDOM_4",
          "codedValues": [
            {
              "name": "coded 1000.1 desc",
              "code": 1000.1
            },
            {
              "name": "coded 2000.1 desc",
              "code": 2000.2
            },
            {
              "name": "coded 3000.1 desc",
              "code": 3000.3
            }
          ],
          "mergePolicy": "esriMPTDefaultValue",
          "splitPolicy": "esriSPTDefaultValue"
        },
        "FLD4_TEXT_FC2": {"type": "inherited"}
      },
      "templates": [
        {
          "name": "subtype1",
          "description": "",
          "prototype": {
            "attributes": {
              "FLD3_DBL_FC2": 1000.1,
              "FLD4_TEXT_FC2": "code 200",
              "FLD0_SUBT_FC2": 1,
              "FLD1_LONG_FC2": 25,
              "FLD2_DBL_FC2": null
            }
          },
          "drawingTool": "esriFeatureEditToolPolygon"
        }
      ]
    }
  ],
  "templates": [],
  "subtypes": [
    {
      "code": 1,
      "name": "subtype1",
      "defaultValues": {
        "FLD0_SUBT_FC2": 1,
        "FLD1_LONG_FC2": 25,
        "FLD2_DBL_FC2": null,
        "FLD3_DBL_FC2": 1000.1,
        "FLD4_TEXT_FC2": "code 200"
      },
      "domains": {
        "FLD1_LONG_FC2": {"type": "inherited"},
        "FLD3_DBL_FC2": {
          "type": "codedValue",
          "name": "CDOM_4",
          "codedValues": [
            {
               "name": "coded 1000.1 desc",
               "code": 1000.1
            },
            {
               "name": "coded 2000.1 desc",
               "code": 2000.2
            },
            {
               "name": "coded 3000.1 desc",
               "code": 3000.3
            }
          ],
          "mergePolicy": "esriMPTDefaultValue",
          "splitPolicy": "esriSPTDefaultValue"
        },
        "FLD4_TEXT_FC2": {"type": "inherited"}
      }
    }
  ],
  "maxRecordCount" : 2000,
  "standardMaxRecordCount" : 4000,
  "tileMaxRecordCount" : 4000,
  "maxRecordCountFactor" : 1,
  "supportedQueryFormats": "JSON, geoJSON, PBF",
  "capabilities": "Create,Query,Update,Delete,Extract,Uploads,Editing",
  "useStandardizedQueries": true
}
```

### Example three: layer subtypes, `returnDomainNames` is `true`

The following example is a sample layer JSON response returning layer subtypes and the `returnDomainNames` as `true` :



```
{
  "currentVersion": 10.8,
  "cimVersion": "1.3.0",
  "id": 1,
  "name": "FC1",
  "parentLayerId": -1,
  "type": "Feature Layer",
  "description": "sync.GDB.FC1_1",
  "copyrightText": "",
  "defaultVisibility": true,
  "editFieldsInfo": null,
  "ownershipBasedAccessControlForFeatures": null,
  "syncCanReturnChanges": false,
  "relationships": [],
  "isDataVersioned": false,
  "supportsRollbackOnFailureParameter": true,
  "archivingInfo": {
    "supportsQueryWithHistoricMoment": false,
    "startArchivingMoment": -1
  },
  "supportsStatistics": true,
  "supportsAdvancedQueries": true,
  "supportsValidateSQL": true,
  "supportsCalculate": true,
  "advancedQueryCapabilities": {
    "supportsPagination": true,
    "supportsTrueCurve": true,
    "supportsQueryWithDistance": true,
    "supportsReturningQueryExtent": true,
    "supportsStatistics": true,
    "supportsOrderBy": true,
    "supportsDistinct": true
  },
  "geometryType": "esriGeometryPolygon",
  "minScale": 0,
  "maxScale": 0,
  "extent": {
    "xmin": -1.11478990548E7,
    "ymin": 5784886.1743,
    "xmax": -1.08927509324E7,
    "ymax": 5970448.445100002,
    "spatialReference": {
      "wkid": 102100,
      "latestWkid": 3857
    }
  },
  "drawingInfo": {
    "renderer": {
      "type": "uniqueValue",
      "field1": "FLD0_SUBT_FC2",
      "field2": null,
      "fieldDelimiter": ", ",
      "defaultSymbol": {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [
          130,
          130,
          130,
          255
        ],
        "outline": {
          "type": "esriSLS",
          "style": "esriSLSSolid",
          "color": [
            225,
            225,
            225,
            255
          ],
          "width": 0.75
        }
      },
      "defaultLabel": "<all other values>",
      "uniqueValueInfos": [
        {
          "symbol": {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [
              207,
              246,
              252,
              255
            ],
            "outline": {
              "type": "esriSLS",
              "style": "esriSLSSolid",
              "color": [
                110,
                110,
                110,
                255
              ],
              "width": 0.7
            }
          },
          "value": "1",
          "label": "subtype1",
          "description": ""
        }
      ]
    },
    "transparency": 0,
    "labelingInfo": null
  },
  "hasM": false,
  "hasZ": false,
  "allowGeometryUpdates": true,
  "hasAttachments": false,
  "supportsApplyEditsWithGlobalIds": false,
  "htmlPopupType": "esriServerHTMLPopupTypeAsHTMLText",
  "objectIdField": "OBJECTID",
  "globalIdField": "",
  "displayField": "FLD0_SUBT_FC2",
  "typeIdField": "FLD0_SUBT_FC2",
  "subtypeField": "FLD0_SUBT_FC2",
  "defaultSubtypeCode": 1,
  "fields": [
    {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID",
      "domain": null,
      "editable": false,
      "nullable": false
    },
    {
      "name": "FLD0_SUBT_FC2",
      "type": "esriFieldTypeInteger",
      "alias": "FLD0_SUBT_FC2",
      "domain": null,
      "editable": true,
      "nullable": true
    },
    {
      "name": "FLD1_LONG_FC2",
      "type": "esriFieldTypeInteger",
      "alias": "FLD1_LONG_FC1",
      "domain": {"name": "RDOM_1"},
      "editable": true,
      "nullable": true
    },
    {
      "name": "FLD2_DBL_FC2",
      "type": "esriFieldTypeDouble",
      "alias": "FLD2_DBL_FC2",
      "domain": {"name": "RDOM_3"},
      "editable": true,
      "nullable": true
    },
    {
      "name": "FLD3_DBL_FC2",
      "type": "esriFieldTypeDouble",
      "alias": "FLD3_LONG_FC1",
      "domain": {"name": "CDOM_1"},
      "editable": true,
      "nullable": true
    },
    {
      "name": "FLD4_TEXT_FC2",
      "type": "esriFieldTypeString",
      "alias": "FLD4_LONG_FC1",
      "domain": {"name": "CDOM_3"},
      "editable": true,
      "nullable": true,
      "length": 50
    }
  ],
  "indexes": [
    {
      "name": "R1390_pk",
      "fields": "OBJECTID",
      "isAscending": true,
      "isUnique": true,
      "description": ""
    },
    {
      "name": "S1047_idx",
      "fields": "SHAPE",
      "isAscending": true,
      "isUnique": true,
      "description": ""
    }
  ],
  "dateFieldsTimeReference": {
    "timeZone": "UTC",
    "respectsDaylightSaving": false
  },
  "types": [
    {
      "id": 1,
      "name": "subtype1",
      "domains": {
        "FLD1_LONG_FC2": {"name": "RDOM_1"},
        "FLD3_DBL_FC2": {"name": "CDOM_4"},
        "FLD4_TEXT_FC2": {"name": "CDOM_3"}
      },
      "templates": [
        {
          "name": "subtype1",
          "description": "",
          "prototype": {
            "attributes": {
              "FLD3_DBL_FC2": 1000.1,
              "FLD4_TEXT_FC2": "code 200",
              "FLD0_SUBT_FC2": 1,
              "FLD1_LONG_FC2": 25,
              "FLD2_DBL_FC2": null
            }
          },
          "drawingTool": "esriFeatureEditToolPolygon"
        }
      ]
    }
  ],
  "templates": [],
  "subtypes": [
    {
      "code": 1,
      "name": "subtype1",
      "defaultValues": {
        "FLD0_SUBT_FC2": 1,
        "FLD1_LONG_FC2": 25,
        "FLD2_DBL_FC2": null,
        "FLD3_DBL_FC2": 1000.1,
        "FLD4_TEXT_FC2": "code 200"
      },
      "domains": {
        "FLD1_LONG_FC2": {"name": "RDOM_1"},
        "FLD3_DBL_FC2": {"name": "CDOM_4"},
        "FLD4_TEXT_FC2": {"name": "CDOM_3"}
      }
    }
  ],
  "maxRecordCount" : 2000,
  "standardMaxRecordCount" : 4000,
  "tileMaxRecordCount" : 4000,
  "maxRecordCountFactor" : 1,
  "supportedQueryFormats": "JSON, geoJSON",
  "capabilities": "Create,Query,Update,Delete,Extract,Uploads,Editing",
  "useStandardizedQueries": true
}
```

### Example four: template and thumbnail

The following example is a snippet of a layer JSON response returning template and thumbnail information:



```
{
  ....
  "templates": [
    {
      "name": "template_sample",
      "description": "template with thumbnail",
      "prototype": {
        "attributes": {
          "direction": null,
          "name": null,
          "code": null
        }
      },
      "drawingTool": "esriFeatureEditToolPoint",
      "thumbnail": {
        "imageData":" <base 64>",
        "contentType": "image/png",
        "height": 34,
        "width": 40
      }
    }
  ]
  ....
},
...
```

### Example five: `maxRecordCount` point data

The following example is a snippet of a layer JSON response returning the `maxRecordCount` for point data:



```
{
  "maxRecordCount": 2000,
  "standardMaxRecordCount": 32000,
  "tileMaxRecordCount": 8000,
},
...
```

### Example six: `maxRecordCount` polyline data

The following example is a snippet of a layer JSON response returning the `maxRecordCount` for polyline data:



```
{
  "maxRecordCount": 2000,
  "standardMaxRecordCount": 4000,
  "tileMaxRecordCount": 4000,
},
...
```

### Example seven: `maxRecordCount` polygon data

The following example is a snippet of a layer JSON response returning the `maxRecordCount` for polygon data:



```
{
  "maxRecordCount": 2000,
  "standardMaxRecordCount": 4000,
  "tileMaxRecordCount": 4000,
},
...
```

### Example eight: `maxRecordCount` table

The following example is a snippet of a layer JSON response returning the `maxRecordCount` for table:



```
{
  "maxRecordCount": 2000,
  "standardMaxRecordCount": 32000,
  "tileMaxRecordCount": 8000,
},
...
```

### Example nine: `timeInfo`

The following example is a snippet of a layer JSON response returning the `timeInfo` property for the layer:



```
...
"timeInfo": {
  "startTimeField": "SLH_SALE_DATE",
  "endTimeField": "",
  "trackIdField": "",
  "timeExtent": [
    1420156800000,
    1538956800000
  ],
  "timeReference": {
    "timeZone": "UTC",
    "respectsDaylightSaving": false
  },
  "timeInterval": 10,
  "timeIntervalUnits": "esriTimeUnitsUnknown",
  "exportOptions": {
    "useTime": false,
    "timeDataCumulative": false,
    "TimeOffset": 0,
    "timeOffsetUnits": "esriTimeUnitsCenturies"
  }
}
...
```

### Example 10: Utility Network layer

The following example is a sample Utility Network layer JSON response:



```
{
  "currentVersion": 10.8,
  "cimVersion": "2.1.0",
  "id": 8,
  "name": "Electric Utility Network",
  "type": "Utility Network Layer",
  "description": "",
  "geometryType": null,
  "copyrightText": "",
  "parentLayer": null,
  "subLayers": [
    {
      "id": 9,
      "name": "Point Errors"
    },
    {
      "id": 10,
      "name": "Line Errors"
    },
    {
      "id": 11,
      "name": "Polygon Errors"
    },
    {
      "id": 12,
      "name": "Dirty Areas"
    }
  ],
  "minScale": 0,
  "maxScale": 0,
  "defaultVisibility": true,
  "extent": {
    "xmin": 1025871.4390050925,
    "ymin": 1861241.5247562313,
    "xmax": 1037672.4351865175,
    "ymax": 1873159.6725078186,
    "spatialReference": {
      "wkid": 102671,
      "latestWkid": 3435,
      "xyTolerance": 0.00328083333333333,
      "zTolerance": 0.001,
      "mTolerance": 0.001,
      "falseX": -17463800,
      "falseY": -46132600,
      "xyUnits": 3048.0060960121905,
      "falseZ": -100000,
      "zUnits": 10000,
      "falseM": -100000,
      "mUnits": 10000
    }
  },
  "hasAttachments": false,
  "htmlPopupType": "esriServerHTMLPopupTypeNone",
  "displayField": "",
  "typeIdField": null,
  "subtypeFieldName": null,
  "fields": null,
  "indexes": [],
  "subtypes": [],
  "relationships": [],
  "canModifyLayer": false,
  "canScaleSymbols": false,
  "hasLabels": false,
  "supportsStatistics": false,
  "supportsAdvancedQueries": false,
  "supportedQueryFormats": "JSON, geoJSON",
  "ownershipBasedAccessControlForFeatures": {"allowOthersToQuery": true},
  "useStandardizedQueries": true,
  "advancedQueryCapabilities": {
    "useStandardizedQueries": true,
    "supportsStatistics": false,
    "supportsOrderBy": false,
    "supportsDistinct": false,
    "supportsPagination": false,
    "supportsTrueCurve": false,
    "supportsReturningQueryExtent": true,
    "supportsQueryWithDistance": true,
    "supportsSqlExpression": false
  },
  "systemLayers": {
    "dirtyAreasLayerId": 12,
    "lineErrorsLayerId": 10,
    "pointErrorsLayerId": 9,
    "polygonErrorsLayerId": 11,
    "associationsTableId": 500001,
    "subnetworksTableId": 500002,
    "rulesTableId": 500003,
    "diagramEdgeLayerId": 500005,
    "diagramJunctionLayerId": 500006,
    "diagramContainerLayerId": 500007,
    "temporaryDiagramEdgeLayerId": 500008,
    "temporaryDiagramJunctionLayerId": 500009,
    "temporaryDiagramContainerLayerId": 500010
  },
  "associationTypeValues": {
    "connectivity": 1,
    "containment": 2,
    "attachment": 3
  },
  "capabilities": ""
},
...
```

### Example 11: spatial references

The following example is a snippet of a JSON response returning spatial references, VCS, tolerance, resolution properties, heigh model info, source spatial references, and source height model info:



```
"extent": {
  "xmin": -1.2912538509399999E7,
  "ymin": 4475883.597499996,
  "xmax": -8559568.4057,
  "ymax": 5338447.646700002,
  "spatialReference": {
    "wkid": 102100,
    "latestWkid": 3857,
    "vcsWkid": 115700,
    "latestVcsWkid": 115700,
    "xyTolerance": 0.001,
    "zTolerance": 0.001,
    "mTolerance": 0.001,
    "falseX": -20037700,
    "falseY": -30241100,
    "xyUnits": 1.4892314192838538E8,
    "falseZ": -100000,
    "zUnits": 10000,
    "falseM": -100000,
    "mUnits": 10000
  }
},
"heightModelInfo": {
  "heightModel": "ellipsoidal",
  "vertCRS": "WGS_1984",
  "heightUnit": "meter"
},
"sourceSpatialReference": {
  "wkid": 4326,
  "latestWkid": 4326,
  "vcsWkid": 5874,
  "latestVcsWkid": 5874,
  "xyTolerance": 0.001,
  "zTolerance": 0.001,
  "mTolerance": 0.001,
  "falseX": -20037700,
  "falseY": -30241100,
  "xyUnits": 10000,
  "falseZ": -100000,
  "zUnits": 10000,
  "falseM": -100000,
  "mUnits": 10000
},
"sourceHeightModelInfo": {
  "heightModel": "gravity_related_height",
  "vertCRS": "High_Water_Height",
  "heightUnit": "meter"
},
...
```

### Example 12: Topology layers

The following example is a sample Topology layer JSON response:



```
{
  "currentVersion": 10.81,
  "cimVersion": "2.6.0",
  "id": 0,
  "name": "topo_1081.GDB.topo_2",
  "type": "Topology Layer",
  "description": "",
  "geometryType": null,
  "copyrightText": "",
  "parentLayer": null,
  "subLayers": [
    {
      "id": 1,
      "name": "Dirty Areas"
    },
    {
      "id": 2,
      "name": "Point Errors"
    },
    {
      "id": 3,
      "name": "Line Errors"
    },
    {
      "id": 4,
      "name": "Polygon Errors"
    }
  ],
  "minScale": 0,
  "maxScale": 0,
  "defaultVisibility": true,
  "extent": {
    "xmin": -2.0037507842788246E7,
    "ymin": -3.024097145838615E7,
    "xmax": 2.0037507842788246E7,
    "ymax": 3.024097145838615E7,
    "spatialReference": {
      "wkid": 102100,
      "latestWkid": 3857,
      "xyTolerance": 0.001,
      "zTolerance": 0.001,
      "mTolerance": 0.001,
      "falseX": -20037700,
      "falseY": -30241100,
      "xyUnits": 10000,
      "falseZ": -100000,
      "zUnits": 10000,
      "falseM": -100000,
      "mUnits": 10000
    }
  },
  "hasAttachments": false,
  "htmlPopupType": "esriServerHTMLPopupTypeNone",
  "displayField": "",
  "typeIdField": null,
  "subtypeFieldName": null,
  "subtypeField": null,
  "defaultSubtypeCode": null,
  "fields": null,
  "geometryField": {},
  "indexes": [],
  "subtypes": [],
  "relationships": [],
  "canModifyLayer": false,
  "canScaleSymbols": false,
  "hasLabels": false,
  "supportsStatistics": false,
  "supportsExceedsLimitStatistics": false,
  "supportsAdvancedQueries": false,
  "supportedQueryFormats": "JSON, geoJSON, PBF",
  "isDataVersioned": false,
  "ownershipBasedAccessControlForFeatures": {
    "allowOthersToQuery": true
  },
  "useStandardizedQueries": true,
  "advancedQueryCapabilities": {
    "useStandardizedQueries": true,
    "supportsStatistics": false,
    "supportsPercentileStatistics": false,
    "supportsHavingClause": false,
    "supportsOrderBy": false,
    "supportsDistinct": false,
    "supportsCountDistinct": false,
    "supportsPagination": false,
    "supportsTrueCurve": true,
    "supportsQueryWithDatumTransformation": true,
    "supportsReturningQueryExtent": true,
    "supportsQueryWithDistance": true,
    "supportsSqlExpression": false
  },
  "supportsDatumTransformation": true,
  "dateFieldsTimeReference": null,
  "hasMetadata": true,
  "isDataArchived": false,
  "archivingInfo": {
    "supportsQueryWithHistoricMoment": false,
    "startArchivingMoment": -1
  },
  "supportsCoordinatesQuantization": true,
  "supportsDynamicLegends": false,
  "systemLayers": {
    "dirtyAreasLayerId": 1,
    "pointErrorsLayerId": 2,
    "lineErrorsLayerId": 3,
    "polygonErrorsLayerId": 4
  },
  "capabilities": "",
  "serviceItemId": "76f0e878d04a4d638e73ba3e4ee0f32b"
}
```

### Example 13: `attachmentProperties` and `attachmentFields`

The following example is a snippet of a layer JSON response returning both `attachmentProperties` and `attachmentFields` information:



```
{
  ...
  "attachmentProperties": [
    {
      "name": "id",
      "fieldName": "attachmentid",
      "isEnabled": true
    },
    {
      "name": "globalId",
      "fieldName": "globalid",
      "isEnabled": true
    },
    {
      "name": "name",
      "fieldName": "att_name",
      "isEnabled": true
    },
    {
      "name": "size",
      "fieldName": "data_size",
      "isEnabled": true
    },
    {
      "name": "contentType",
      "fieldName": "content_type",
      "isEnabled": true
    },
    {
      "name": "keywords",
      "fieldName": "KEYWORDS",
      "isEnabled": false
    },
    {
      "name": "exifInfo",
      "fieldName": "EXIFINFO",
      "isEnabled": false
    }
  ],
  "attachmentFields": [
    {
      "name": "attachmentid",
      "type": "esriFieldTypeOID",
      "alias": "attachmentid",
      "domain": null,
      "editable": false,
      "nullable": false,
      "defaultValue": null
    },
    {
      "name": "globalid",
      "type": "esriFieldTypeGlobalID",
      "alias": "globalid",
      "domain": null,
      "editable": false,
      "nullable": false,
      "length": 38,
      "defaultValue": null
    },
    {
      "name": "att_name",
      "type": "esriFieldTypeString",
      "alias": "att_name",
      "domain": null,
      "editable": true,
      "nullable": false,
      "length": 250,
      "defaultValue": null
    },
    {
      "name": "data_size",
      "type": "esriFieldTypeInteger",
      "alias": "data_size",
      "domain": null,
      "editable": true,
      "nullable": false,
      "defaultValue": null
    },
    {
      "name": "content_type",
      "type": "esriFieldTypeString",
      "alias": "content_type",
      "domain": null,
      "editable": true,
      "nullable": false,
      "length": 150,
      "defaultValue": null
    }
  ],
  "standardMaxRecordCount": 32000,
  "tileMaxRecordCount": 8000,
  "standardMaxRecordCountNoGeometry": 32000,
  "maxRecordCountFactor": 1,
  "serviceItemId": "f96c143856974e4ab5754128783a2377"
}
```

### Example 14: Trace Network layer

The following example is a sample Trace Network layer JSON response:



```
{
  "currentVersion": 10.9,
  "cimVersion": "2.7.0",
  "id": 3,
  "name": "TNetwork_2D Trace Network",
  "type": "Trace Network Layer",
  "description": "",
  "geometryType": null,
  "copyrightText": "",
  "parentLayer": null,
  "subLayers": [
    {
      "id": 4,
      "name": "Point Errors"
    },
    {
      "id": 5,
      "name": "Line Errors"
    },
    {
      "id": 6,
      "name": "System Junctions"
    },
    {
      "id": 7,
      "name": "Dirty Areas"
    }
  ],
  "minScale": 0,
  "maxScale": 0,
  "defaultVisibility": true,
  "extent": {
    "xmin": -180.00000009,
    "ymin": -90.00000008999996,
    "xmax": 180.00000009000007,
    "ymax": 90.00000009000007,
    "spatialReference": {
      "wkid": 4269,
      "latestWkid": 4269,
      "xyTolerance": 8.983152841195213E-9,
      "zTolerance": 0.001,
      "mTolerance": 0.001,
      "falseX": -400,
      "falseY": -400,
      "xyUnits": 9.999999999999999E8,
      "falseZ": -100000,
      "zUnits": 10000,
      "falseM": -100000,
      "mUnits": 10000
    }
  },
  "hasAttachments": false,
  "htmlPopupType": "esriServerHTMLPopupTypeNone",
  "displayField": "",
  "typeIdField": null,
  "subtypeFieldName": null,
  "subtypeField": null,
  "defaultSubtypeCode": null,
  "fields": null,
  "geometryField": {},
  "indexes": [],
  "subtypes": [],
  "relationships": [],
  "canModifyLayer": false,
  "canScaleSymbols": false,
  "hasLabels": false,
  "supportsStatistics": false,
  "supportsExceedsLimitStatistics": false,
  "supportsAdvancedQueries": false,
  "supportedQueryFormats": "JSON, geoJSON, PBF",
  "isDataVersioned": false,
  "ownershipBasedAccessControlForFeatures": {"allowOthersToQuery": true},
  "useStandardizedQueries": true,
  "advancedQueryCapabilities": {
    "useStandardizedQueries": true,
    "supportsStatistics": false,
    "supportsPercentileStatistics": false,
    "supportsHavingClause": false,
    "supportsOrderBy": false,
    "supportsDistinct": false,
    "supportsCountDistinct": false,
    "supportsPagination": false,
    "supportsLod": false,
    "supportsQueryWithLodSR": false,
    "supportsTrueCurve": true,
    "supportsQueryWithDatumTransformation": true,
    "supportsReturningQueryExtent": true,
    "supportsQueryWithDistance": true,
    "supportsSqlExpression": false,
    "supportsTimeRelation": true,
    "supportsSqlFormat": false
  },
  "supportsDatumTransformation": true,
  "dateFieldsTimeReference": null,
  "preferredTimeReference": null,
  "datesInUnknownTimezone": false,
  "hasMetadata": true,
  "isDataArchived": false,
  "archivingInfo": {
    "supportsQueryWithHistoricMoment": false,
    "startArchivingMoment": -1
  },
  "supportsCoordinatesQuantization": true,
  "supportsDynamicLegends": false,
  "systemLayers": {
    "dirtyAreasLayerId": 7,
    "lineErrorsLayerId": 5,
    "pointErrorsLayerId": 4,
    "systemJunctionLayerId": 6,
    "associationsTableId": 600001,
    "diagramEdgeLayerId": 600002,
    "diagramJunctionLayerId": 600003,
    "diagramContainerLayerId": 600004,
    "temporaryDiagramEdgeLayerId": 600005,
    "temporaryDiagramJunctionLayerId": 600006,
    "temporaryDiagramContainerLayerId": 600007
  },
  "capabilities": "",
  "serviceItemId": "6286495532fa4750b0c4665419d08f96"
}
```

### Example 15: 3D Object Feature Layer

The following example is a snippet of a layer JSON response specific to 3D object feature layers:



```
{
  ...
  "infoFor3D": {
    "supportedFormats": [
      [
        "IM_gen",
        "image/esri3do-gen",
        "gen",
        ""
      ],
      [
        "3D_obj",
        "model/obj",
        "obj",
        "Wavefront OBJ"
      ],
      [
        "3D_shapebuffer",
        "model/esri3do-shapebuffer",
        "multipatch,shapebuffer",
        "Esri shape buffer"
      ],
      [
        "IM_gtx",
        "image/esri3do-gtx",
        "gtx",
        ""
      ],
      [
        "3D_dae",
        "model/vnd.collada+xml",
        "dae",
        "Collada"
      ],
      [
        "IM_xyz",
        "image/xyz",
        "xyz",
        ""
      ],
      [
        "IM_hgt",
        "image/esri3do-hgt",
        "hgt",
        ""
      ],
      [
        "3D_shapebufferg",
        "model/esri3do-shapebufferg",
        "shapebufferg",
        "Esri shape buffer, geometry only"
      ],
      [
        "3D_ifc",
        "application/x-step",
        "ifc",
        "Industry Foundation Classes"
      ],
      [
        "3D_fbx",
        "model/fbx",
        "fbx",
        "Autodesk FBX"
      ],
      [
        "IM_n1",
        "image/esri3do-n1",
        "n1",
        ""
      ],
      [
        "MA_obj",
        "model/mtl",
        "mtl",
        ""
      ],
      [
        "3D_dwg",
        "model/vnd.dwg",
        "dwg",
        "Autodesk DWG"
      ],
      [
        "3D_glb",
        "model/gltf-binary",
        "glb",
        "Khronos Group glTF binary"
      ],
      [
        "IM_asc",
        "image/esri3do-asc",
        "asc",
        ""
      ],
      [
        "3D_usd",
        "model/vnd.usd",
        "usd",
        ""
      ],
      [
        "IM_jpeg",
        "image/jpeg",
        "jpeg,jpg,jpga",
        ""
      ],
      [
        "IM_gif",
        "image/gif",
        "gif",
        ""
      ],
      [
        "3D_usda",
        "model/vnd.usda",
        "usda",
        ""
      ],
      [
        "3D_usdc",
        "model/vnd.usdc",
        "usdc",
        "Universal Scene Description"
      ],
      [
        "IM_img",
        "application/img",
        "img",
        ""
      ],
      [
        "3D_usdz",
        "model/vnd.usd+zip",
        "usdz",
        "Universal Scene Description (zip)"
      ],
      [
        "3D_gltf",
        "model/gltf+json",
        "gltf",
        "Khronos Group glTF JSON"
      ],
      [
        "AU_m4a",
        "audio/m4a",
        "m4a",
        ""
      ],
      [
        "IM_gsb",
        "image/esri3do-gsb",
        "gsb",
        ""
      ],
      [
        "AU_mp3",
        "audio/mpeg",
        "mp3",
        ""
      ],
      [
        "AU_wav",
        "audio/x-wav",
        "wav",
        ""
      ],
      [
        "IM_e00",
        "image/esri3do-e00",
        "e00",
        ""
      ],
      [
        "IM_ACE2",
        "image/esri3do-ACE2",
        "ace2",
        ""
      ],
      [
        "IM_gff",
        "image/esri3do-gff",
        "gff",
        ""
      ],
      [
        "IM_bmp",
        "image/bmp",
        "bmp",
        ""
      ],
      [
        "IM_bt",
        "image/esri3do-bt",
        "bt",
        ""
      ],
      [
        "IM_dat",
        "image/esri3do-dat",
        "dat",
        ""
      ],
      [
        "IM_ddf",
        "image/esri3do-ddf",
        "ddf",
        ""
      ],
      [
        "IM_dem",
        "image/esri3do-dem",
        "dem",
        ""
      ],
      [
        "IM_rda",
        "image/esri3do-rda",
        "rda",
        ""
      ],
      [
        "IM_grb",
        "image/esri3do-grb",
        "grb",
        ""
      ],
      [
        "IM_grc",
        "image/esri3do-grc",
        "grc",
        ""
      ],
      [
        "IM_grd",
        "image/esri3do-grd",
        "grd",
        ""
      ],
      [
        "IM_hdr",
        "image/esri3do-hdr",
        "hdr",
        ""
      ],
      [
        "IM_raw",
        "image/esri3do-raw",
        "raw",
        ""
      ],
      [
        "IM_hf2",
        "image/esri3do-hf2",
        "hf2",
        ""
      ],
      [
        "IM_lcp",
        "image/esri3do-lcp",
        "lcp",
        ""
      ],
      [
        "IM_lerc",
        "image/esri3do-lerc",
        "lerc",
        ""
      ],
      [
        "IM_lerc2",
        "image/esri3do-lerc2",
        "lerc2",
        ""
      ],
      [
        "IM_mem",
        "image/esri3do-mem",
        "mem",
        ""
      ],
      [
        "IM_mpl",
        "image/esri3do-mpl",
        "mpl",
        ""
      ],
      [
        "IM_mpr",
        "image/esri3do-mpr",
        "mpr",
        ""
      ],
      [
        "IM_ntf",
        "image/esri3do-ntf",
        "ntf",
        ""
      ],
      [
        "IM_pix",
        "image/esri3do-pix",
        "pix",
        ""
      ],
      [
        "IM_png",
        "image/png",
        "png",
        ""
      ],
      [
        "IM_pnm",
        "image/esri3do-pnm",
        "pnm",
        ""
      ],
      [
        "IM_rst",
        "image/esri3do-rst",
        "rst",
        ""
      ],
      [
        "IM_rsw",
        "image/esri3do-rsw",
        "rsw",
        ""
      ],
      [
        "IM_sdat",
        "image/esri3do-sdat",
        "sdat",
        ""
      ],
      [
        "IM_tiff",
        "image/tiff",
        "tif,tiff",
        ""
      ],
      [
        "IM_vrt",
        "image/esri3do-vrt",
        "vrt",
        ""
      ],
      [
        "IM_xpm",
        "image/x-xpixmap",
        "xpm",
        ""
      ]
    ],
    "queryFormats": [
      "3D_shapebuffer"
    ],
    "editFormats": [
      "3D_shapebuffer",
      "3D_obj",
      "3D_dae",
      "3D_shapebufferg",
      "3D_ifc",
      "3D_fbx",
      "3D_dwg",
      "3D_glb",
      "3D_usd",
      "3D_usda",
      "3D_usdc",
      "3D_usdz",
      "3D_gltf"
    ],
    "transformFieldRoles": {
      "originX": "esri3do_ox",
      "originY": "esri3do_oy",
      "originZ": "esri3do_oz",
      "translationX": "esri3do_tx",
      "translationY": "esri3do_ty",
      "translationZ": "esri3do_tz",
      "scaleX": "esri3do_sx",
      "scaleY": "esri3do_sy",
      "scaleZ": "esri3do_sz",
      "rotationX": "esri3do_rx",
      "rotationY": "esri3do_ry",
      "rotationZ": "esri3do_rz",
      "rotationDeg": "esri3do_rdeg"
    },
    "assetTypeField": "esri3do_type",
    "sourceHashField": "esri3do_shash",
    "parentFeatureField": "esri3do_pid",
    "assetHashAlgorithm": "SHA256",
    "assetMapFields": [
      {
        "name": "esri3do_pid",
        "type": "esriFieldTypeGUID",
        "alias": "Feature GUID",
        "length": 38
      },
      {
        "name": "esri3do_flags",
        "type": "esriFieldTypeInteger",
        "alias": "Asset Flags"
      },
      {
        "name": "esri3do_status",
        "type": "esriFieldTypeInteger",
        "alias": "Asset Conversion Status"
      },
      {
        "name": "esri3do_name",
        "type": "esriFieldTypeString",
        "alias": "Asset Symbolic Name",
        "length": 512
      },
      {
        "name": "esri3do_type",
        "type": "esriFieldTypeString",
        "alias": "Asset Type",
        "length": 64
      },
      {
        "name": "esri3do_size",
        "type": "esriFieldTypeInteger",
        "alias": "Asset Size [bytes]"
      },
      {
        "name": "esri3do_seqno",
        "type": "esriFieldTypeInteger",
        "alias": "Asset Sequence Number"
      },
      {
        "name": "esri3do_cplx",
        "type": "esriFieldTypeInteger",
        "alias": "Asset Complexity"
      },
      {
        "name": "esri3do_ahash",
        "type": "esriFieldTypeString",
        "alias": "Asset Hash",
        "length": 80
      },
      {
        "name": "esri3do_shash",
        "type": "esriFieldTypeString",
        "alias": "Source Hash",
        "length": 80
      },
      {
        "name": "globalid",
        "type": "esriFieldTypeGlobalID",
        "alias": "GlobalID",
        "length": 38
      }
    ],
    "assetMapFieldRoles": {
      "globalID": "globalid",
      "parentGlobalId": "esri3do_pid",
      "assetName": "esri3do_name",
      "assetType": "esri3do_type",
      "conversionStatus": "esri3do_status",
      "flags": "esri3do_flags",
      "size": "esri3do_size",
      "complexity": "esri3do_cplx",
      "sourceHash": "esri3do_shash",
      "assetHash": "esri3do_ahash",
      "seqNo": "esri3do_seqno"
    },
    "tables": [
      {
        "id": 1,
        "name": "db_pz42c.hsu_xsohh.FC3DObject2_3DOAM",
        "role": "assetMaps"
      },
      {
        "id": 2,
        "name": "db_pz42c.hsu_xsohh.FC3DObject2_3DOAT",
        "role": "assets"
      }
    ]
  },
  "standardMaxRecordCount": 4000,
  "tileMaxRecordCount": 4000,
  "standardMaxRecordCountNoGeometry": 32000,
  "maxRecordCountFactor": 1,
  "serviceItemId": "8df1b1d49b0c49038438cd0b0049d91d"
}
```

### Example 16: 64-bit objectid and high precision date fields

The following example is a snippet of a layer JSON response with a 64-bit `objectid` column and a high precision date field:



```
...
"fields": [
  {
    "name": "objectid_1",
    "type": "esriFieldTypeOID",
    "alias": "OBJECTID_1",
    "domain": null,
    "editable": false,
    "nullable": false,
    "length": 8,
    "defaultValue": null,
    "modelName": "OBJECTID_1"
  },
  {
    "name": "dt",
    "type": "esriFieldTypeDate",
    "alias": "dt",
    "domain": null,
    "editable": true,
    "nullable": true,
    "length": 8,
    "precision": 1,
    "defaultValue": null,
    "modelName": "dt"
  }
]
...
```

### Example 17: IANA time zones

The following example is a snippet of a layer JSON that includes IANA time zone information. Whenever the layer advertises a `timeZone` property, a `timeZoneIANA` property is also provided:



```
{
  ...
  "editFieldsInfo": {
    "creationDateField": "created_date",
    "creatorField": "created_user",
    "editDateField": "last_edited_date",
    "editorField": "last_edited_user",
    "dateFieldsTimeReference": {
      "timeZone": "UTC",
      "timeZoneIANA": "Etc/UTC",
      "respectsDaylightSaving": false
    }
  },
  ...
  "timeInfo": {
    "startTimeField": "adate_pac",
    "endTimeField": null,
    "trackIdField": null,
    "type": "field",
    "timeExtent": [
      1601838000000,
      1601845200000
    ],
    "timeReference": {
      "timeZone": "Pacific Standard Time",
      "timeZoneIANA": "America/Los_Angeles",
      "respectsDaylightSaving": true
    },
    "timeInterval": 10,
    "timeIntervalUnits": "esriTimeUnitsUnknown",
    "exportOptions": {
      "useTime": true,
      "timeDataCumulative": false,
      "timeOffset": null,
      "timeOffsetUnits": null
    },
    "hasLiveData": false,
    "timeRelation": "esriTimeRelationOverlaps"
  },
  ...
  "datesInUnknownTimezone": false,
  "dateFieldsTimeReference": {
    "timeZone": "Eastern Standard Time",
    "timeZoneIANA": "America/New_York",
    "respectsDaylightSaving": true
  },
  "preferredTimeReference": {
    "timeZone": "Alaskan Standard Time",
    "timeZoneIANA": "America/Anchorage",
    "respectsDaylightSaving": true
  },
  ...
}
```

### Example 18: Full text indexes

The following is a snippet of a layer JSON response with a full text search index, indicated when `indexType` is set as `FullText`. These indexes are required to use the layer-level [Query](/rest/services-reference/enterprise/query-feature-service-layer/) operation's `fullText` parameter.



```
...
  "indexes": [
    {
      "indexType": "FullText",
      "name": " myFullText_indx",
      "isUnique": false,
      "description": "Layer settings",
      "fields": "city_name,state_city",
      "isAscending": true
    }
  ]
...
```

### Example 19: Full text search and true curve properties

The following is a snippet of a layer JSON response with full text search and true curve properties. The values listed under fullTextSearchableFields are fields with full text indexes, which are required to use the layer-level Query operation's `fullText` parameter.



```
...
"advancedQueryCapabilities": {
  ...
  "supportsFullTextSearch": true,
  "fullTextSearchCapabilities": {
    "supportsSearchOperator": true,
    "supportsOperator": false,
    "supportsSqlExpressionInFullText": true
  },
  "fullTextSearchableFields": [
   "NAME",
   "STATE_NAME"
  ],
  "supportsTrueCurve": true,
  "supportedCurveTypes": [
    "esriGeometryCircularArc",
    "esriGeometryEllipticArc",
    "esriGeometryBezier3Curve"
  ],
}
...
```