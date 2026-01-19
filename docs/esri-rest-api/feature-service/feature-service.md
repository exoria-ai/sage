# Feature Service

> Source: [/rest/services-reference/enterprise/feature-service/](https://developers.arcgis.com/rest/services-reference/enterprise/feature-service/)

**URL:**: https://<root>/<serviceName>/FeatureServer

**Methods:**: GET

**Operations:**: Append, Apply Edits, Create Replica, Extract Changes, Get Estimates, Query, Query Domains, Relationships, Synchronize Replica, Unregister Replica

**Child Resources:**: Layer

**Version Introduced:**: 10.0

## Description

A feature service can contain datasets (for example, tables and views) with or without a spatial column. Datasets with a spatial column are considered layers; those without a spatial column are considered tables. A feature service allows clients to query and edit feature geometry and attributes.

This resource provides basic information about the feature service, including the feature layers and tables that it contains, the service description, and so on.

The `capabilities` property returns `Create`, `Delete`, `Extract`, `Query`, `Update`, `Sync`, `Uploads`, and `SharedTemplateEditing` (added at ArcGIS Enterprise 11.4) capabilities. The `Uploads` capability is included if `Create`, `Delete`, or `Update` is enabled for a feature service. The `Editing` capability is included if `Create`, `Delete`, and `Update` is enabled and `allowGeometryUpdates` is `true`. The [Sync](/rest/services-reference/enterprise/sync-overview/) capability allows editors to make local edits and periodically sync with the feature service. The `Extract` capability allows editors to create a local copy of data without the ability to sync with the feature service. The `SharedTemplateEditing` capability allows users to add shared templates as well as update and delete the shared template they have created.

The `maxRecordCount` property returns the maximum number of records that will be returned at once for a query. The `Feature Service` resource has an input parameters option and `outSR` to support viewing of a feature service footprint.

The following properties describe features that have been added to Feature Service through the releases. If the property does not exist, it's equivalent to having a value of `false` or is not set:

-   `hasVersionedData` will be `true` if the data is versioned.
-   `supportedQueryFormats` returns the formats in which query results can be returned.
-   `allowGeometryUpdates` returns `true` if the geometry of the features in the layer can be edited.
-   `zDefault` and `enableZDefaults` are returned for a service configured with default z-values.
-   `supportsDisconnectedEditing` will be `true` to indicate the support for disconnected editing.
-   `syncEnabled` will be `true` to indicate the support for sync.
-   `supportsRegisterExistingData` will be `true` if the service supports registration of existing data for `createReplica` . Only present if `syncEnabled` is `true` .
-   `supportsSyncDirectionControl` will be `true` if the service will allow control of data sync direction. Only present if `syncEnabled` is `true` .
-   `supportsPerLayerSync` will be `true` if the layers can be synchronized independently, and the service will accept a value of `perLayer` for the sync model during the `createReplica` operation. If `supportsPerLayerSync` is `false` , the only sync model supported is `perReplica` . Only present if `syncEnabled` is `true` .
-   `supportsPerReplicaSync` will be `true` if the layers can be synchronized together, and the service will accept a value of `perReplica` for the sync model during the `createReplica` operation. If `supportsPerReplicaSync` is `false` , the only sync model supported is `perLayer` . Only present if `syncEnabled` is `true` .
-   `supportsSyncModelNone` will be `true` if the service supports extracting data without the creation of a replica. If `true` , the service will accept setting `syncModel=none` for the sync model during the `createReplica` operation.
-   `supportsAttachmentsSyncDirection` will be `true` if the service supports options to define how attachments will be synced. If `true` , the service will accept setting the `attachmentsSyncDirection` parameter during the `createReplica` operation.
-   `supportsRollbackOnFailure` will be `true` if the `rollbackOnFailure` parameter can be set to `true` or `false` when running the [synchronizeReplica](/rest/services-reference/enterprise/synchronize-replica/) operation. `supportsRollbackOnFailure` will be `false` if the `synchronizeReplica` operation does not support the parameter.
-   `supportsAsync` will be `true` if the service can execute sync operations [asynchronously](/rest/services-reference/enterprise/asynchronous-operations/). Only present if `syncEnabled` is `true` .
-   `supportsApplyEditsWithGlobalIds` in the root resource will be `true` if all layers in the service have `supportsApplyEditsWithGlobalIds` as `true` . See [Feature Service Layer Properties](/rest/services-reference/enterprise/layer-feature-service/) for more details.
-   A feature service that supports the `append` API exposes the `supportsAppend` metadata property. When the `supportsAppend` property is absent or is `false` , the owner of the feature service cannot use the `append` API. Also the Append capability cannot be added to a feature service if the `supportsAppend` is `true` . See [Append (Feature Service)](/rest/services-reference/enterprise/append-feature-service/) or [Append (Feature Service/Layer)](/rest/services-reference/enterprise/apply-edits-feature-service-layer/) for more details.
-   Introduced with the April 2021 ArcGIS Online release, the `supportedExportFormats` property, when present, describes the formats supported when exporting content from a feature layer item in a portal. The associated feature layer item can be found using the feature service `serviceItemId` property. The export operation is called through the Portal Directory (Sharing API) and is not a feature service operation, thus this property only applies to services that are federated with a portal.

## New at 12.0

-   The service-level `supportedExportFormats` property has been expanded to include `kml` as a supported value.
-   Two additional properties have been added to the service resource:
    -   `supportsApplyEditsWithUniqueIds`: Will be true to indicate support for the `applyEdits` operation on a unique ID service.
    -   `supportsSharedTemplatesRelationshipId`: Will be true to indicate support for `relationshipId` in feature templates with a relationship in the defintion.

## New at 11.5

-   The `Sync` capability is now supported with the following field types:
    
    -   `esriFieldTypeTimeOnly`
    -   `esriFieldTypeDateOnly`
    -   `esriFieldTypeTimestampOffset`
    -   `esriFieldTypeBigInteger`
    -   `esriFieldTypeOID` with length 8 (64 bit)
-   Additional server logs have been added with usage information.
    
-   ArcGIS Enterprise on Kubernetes supports spatiotemporal-based hosted feature services.
    
-   Reference feature services now support the [service-level](/rest/services-reference/enterprise/append-feature-service/) and [layer-level](/rest/services-reference/enterprise/append-feature-service-layer/) Append operations. Support for the Append operation is indicated on a service-level when the `supportsAppend` property set as `true`. The layer resource will also advertise supported formats with the `supportedAppendFormats` property.
    
-   Two additional properties have been added to the service resource:
    
    -   `supportsSharedTemplates`: Will be true for services that are capable of supporting shared templates.
    -   `supportedCurveTypes`: Lists the types of true curves that the service supports.

## New at 11.4

-   The service-level [Apply Edits](/rest/services-reference/enterprise/apply-edits-feature-service/) operation now supports `pbf` as an upload format.
-   The service's `fullExtent` property, and the `extent` property returned by the service-level [Get Estimates](/rest/services-reference/enterprise/get-estimate-feature-service/) operation, will include z and m values (when applicable).
-   An option has been added to include applicable attribute rules in the mobile geodatabase generated by the Create Replica operation. For more information, see [Using syncDataOptions](/rest/services-reference/enterprise/create-replica/#using-syncdataoptions)
-   A new service-level operation, [Get Estimates](/rest/services-reference/enterprise/get-estimate-feature-service/), has been added. This new operation can be called on multiple layers at once, as compared to the [layer-level Get Estimates operation](/rest/services-reference/enterprise/get-estimates-feature-servicelayer/) that can only be performed on one layer at a time. The operation is supported when the `infoInEstimates` property is present on the service resource, which indicates what estimates are returned when the operation is called (e.g. `extent`, `count`, etc.).

## New at 11.3

-   The `esriFieldTypeTimeOnly`, `esriFieldTypeDateOnly`, `esriFieldTypeTimestampOffset`, and `esriFieldTypeBigInteger` field types have exited beta and are now supported.
    
-   Feature services can now be published from a Snowflake data source with Geography type using ArcGIS Pro 3.3 or later.
    
-   Feature services now support one-way feature service-to-feature service synchronization.
    
-   Support has been added for sync on services with 64 bit objectID fields and Utility Network data. The sync capability is not supported on services without Utility Network layers when 64 bit objectID fields are present.
    
-   Service webhooks are now supported with branch versioned data. See the [Create webhooks](https://enterprise.arcgis.com/en/portal/latest/administer/windows/create-webhooks.htm) documentation for more details.
    
-   The `hasSharedTemplates` property will be `true` if the service supports shared templates. To support shared templates, the service needs to be running on a geodatabase that has been created or upgraded using ArcGIS Pro 3.3 or later.
    

## New at 11.2

### General updates

The updates below have been added, in general, for hosted feature services and non-hosted feature services (referencing enterprise geodatabases) publish from ArcGIS Pro:

-   Oriented imagery data can now be published as feature service layers. These layers will be of the type Oriented Imagery Layers and will list information specific to oriented imagery under the `orientedImageryInfo` layer-level property. See the [Oriented Imagery](https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/oriented-imagery-overview.htm) topic for more information.
    
-   Feature services now support WKT2. Service-level operations that allow for spatial reference information as input for specific parameters will now accept a WKT2 value and generate an appropriate response. For more information on WKT2 examples, reference the following [JSON example](https://raw.githubusercontent.com/Esri/projection-engine-db-doc/master/json/pe_list_projcs.json). For WKT2 values, see the [Using spatial references](/rest/services-reference/enterprise/using-spatial-references/) documentation.
    
-   Four new field types have been added as [beta features](https://enterprise.arcgis.com/en/get-started/latest/windows/what-s-new-in-arcgis-enterprise.htm#ESRI_SECTION2_5EC774A55D0B449684563858A00CA0AA): `esriFieldTypeTimeOnly` , `esriFieldTypeDateOnly` , `esriFieldTypeTimestampOffset` and `esriFieldTypeBigInteger` . The beta only applies to feature services that include these fields. The sync capability is not supported when these fields are present. The `esriFieldTypeTimeOnly` , `esriFieldTypeDateOnly` and `esriFieldTypeTimestampOffset` fields return ISO8601 values and require values in ISO8601 when applying edits.
    
-   Support has been added for `esriFieldTypeDate` fields that contain high precision values. These fields can contain up to millisecond precision, although some clients may not use the full precision for querying or editing. Both hosted feature services and non-hosted feature services referencing geodatabase datasets that include high precision date fields support these new field types. Support is indicated when a `esriFieldTypeDate` field has a `precision` property set as 1.
    

### Hosted feature services

Feature services on relational data store in ArcGIS Enterprise now support contingent attribute values. Support for this is indicated when the service-level `supportsQueryContingentValues` property is set as `true` .

### Cloud Data Warehouse (CDW) feature services

Starting at ArcGIS Enterprise 11.2, feature services can now be published from an Amazon Redshift data source using ArcGIS Pro 3.2 or later.

## New at 11.1

### General updates

The updates below have been added, in general, for hosted feature services and non-hosted feature services (referencing enterprise geodatabases) publish from ArcGIS Pro:

-   Starting at ArcGIS Enterprise 11.1, feature services can now be published from a Snowflake data source using ArcGIS Pro 3.1 or later.
-   The service- and layer-level `supportedExportFormats` properties have been expanded to include `csv` and `geojson` as supported formats for exported data.
-   Starting at ArcGIS Enterprise 11.1, the [Create Replica](/rest/services-reference/enterprise/create-replica/) operation will not require the `geometry` parameter when its `syncModel` parameter is set as `none` . This will cause all records to be included for the feature layer unless other filters are set. However, the `geometry` parameter is required if `syncModel` values other than none are used.
-   Both the service- and layer-level `applyEdits` operations now include the `editsUploadId` parameter. This parameter references an upload ID from an uploaded file containing service edits, providing the option to pre-upload edits to the ArcGIS Server and reference them rather than provide edits in-line with the edits parameter. Support for the new parameter is indicated when the service- and layer-level `supportsApplyEditsbyUploadID` properties, under `advancedEditingCapabilities` , are set to `true` .

### Enterprise geodatabase

The update below has been added for non-hosted feature services that reference enterprise geodatabase data and are published from ArcGIS Pro:

-   Starting at ArcGIS Enterprise 11.1, the [Extract Changes](/rest/services-reference/enterprise/extract-changes-feature-service/) operation includes support for the `returnDeletedFeatures` parameter. This parameter allows you to specify whether the full information for a deleted feature is returned, or just the feature's identifier.

### Hosted feature services

The updates below have been added for hosted feature services from a relational data store:

-   Both the [service-](/rest/services-reference/enterprise/append-feature-service/) and [layer-level](/rest/services-reference/enterprise/append-feature-service-layer/)`append` operations feature the following enhancements:
    
-   The Append capability can now be set for qualifying hosted feature services to allow non-service owners and non-organization administrators with access to the feature service to run the `append` operations. In prior releases, the Append capability could not be set for hosted feature services, limiting the scope of those who could use the `append` operations on a given hosted feature service.
    
-   The `esriFieldTypeBlob` field type is now supported.
    
-   The [Relationships](/rest/services-reference/enterprise/relationships-feature-service/) resource is now supported for qualifying hosted feature services. Support for this is indicated when the service-level `supportsRelationshipsResource` property is `true` .
    

## New at 11.0

### General updates

The updates below have been added, in general, for hosted feature services and non-hosted feature services (referencing enterprise geodatabases) published from ArcGIS Pro.

-   The feature service resource for hosted and non-hosted feature services published for ArcGIS Indoors include an `isIndoorsService` property, set as `true` , on their service resource. Editable feature services with the `isIndoorsService` property as `true` can be edited by viewer users if the organization has a valid Indoors license.
-   At this release, feature services can be published from a Google BigQuery data source using ArcGIS Pro 3.0 or later.
-   The service-level `supportedExportFormats` property has been expanded to include `shapefile` as a supported value.
-   At this release, a file geodatabase extracted from a feature service using the `createReplica` operation now includes a `GDB_ServiceItems` table. This table contains the feature service and feature service layer resource JSON information of the service the table was extracted from. For more information, see the [Create Replica](/rest/services-reference/enterprise/create-replica/) topic.

### Non-hosted feature services

The following updates apply to non-hosted feature services (referencing enterprise geodatabase data) published from ArcGIS Pro.

-   The `createReplica` operation's `replicaOptions` parameter has expanded its `SyncDataOptions` accepted property values, as indicated by the feature service's `supportedSyncDataOptions` service-level property. For more information, see the [Create Replica](/rest/services-reference/enterprise/create-replica/) topic.
    
-   The `synchronizeReplica` operation includes a new parameter, `reconcileBranchVersion` , that can be applied to replicas created from branch versioned data where the feature service has the `versionPerDownloadedMap` setting. For more information on the new parameter, see the [Synchronize Replica](/rest/services-reference/enterprise/synchronize-replica/) topic.
    
-   The `extractChanges` operation has been expanded to support the following changes, support for which depend on properties under `extractChangesCapabilities` on the service-level resource:
    
    -   A new parameter, `fieldsToCompare` . Support for this is indicated when the `supportsFieldsToCompare` property, under `extractChangesCapabilities` , is set as `true` .
    -   The ability to return features rather than IDs only. Support for this is indicated when the `supportsFeatureReturn` property, under `extractChangesCapabilities` , is set as `true` .
    -   A new parameter, `serverGens` . Support for this is indicated when the `supportsServerGens` property, under `extractChangesCapabilities` , is set as `true` .
    -   The ability to return attachment differences. Support for this is indicated when the `supportsReturnAttachments` property, under `extractChangesCapabilities` , is set as `true`
    
    For more information on these changes, see the [Extract Changes](/rest/services-reference/enterprise/extract-changes-feature-service/) topic.
    

### Hosted feature services

The following changes apply for hosted feature services:

-   The service-level `applyEdits` operation now supports an `async` parameter. Support for this parameter is indicated when the service-level `supportsAsyncApplyEdits` property, under `advancedEditingCapabilities` , is `true` . For more information on this new parameter, see the [Apply Edits](/rest/services-reference/enterprise/apply-edits-feature-service/) topic.
-   The service-level `applyEdits` operation includes a new parameter, `returnEditResults` . Support for this new parameter is indicated by a feature service having the service-level `supportsReturnEditResults` property, under `advancedEditingCapabilities` , set as `true` . To learn more about the new parameter, see the service-level [Apply Edits](/rest/services-reference/enterprise/apply-edits-feature-service/) topic.

The following updates apply to hosted feature services running on a relational data store:

-   The `ChangeTracking` capability can now be enabled on a feature service resource using the `updateDefinition` operation. Adding `ChangeTracking` exposes the `extractChanges` options and adds the `extractChangesCapabilities` property to the feature service resource. This property describes the `extractChanges` operation that are supported for that feature service.
    

## New at 10.9.1

-   The feature service resource includes a `supportedExportFormats` property that describes the formats supported when exporting data. Data can be exported when the extract or sync capability is enabled and the `createReplica` operation is called with the `syncModel=none` option.
-   The service level `applyEdits` operation for hosted feature services in ArcGIS Online, and nonhosted feature services in ArcGIS Enterprise, includes an option to process requests asynchronously. This option is ideal for longer running edit operations that may otherwise time out. The async parameter can be used if the service resource has the `supportsAsyncApplyEdits` property as `true` under `advancedEditingCapabilities` .

## New at 10.9

-   The feature service resource's `syncCapabilities` object now supports a `supportsBiDirectionalSyncForServer` property. Hosted feature services, feature services running on branch versioned data or feature services running on nonversioned with archiving data can support bidirectional syncing. Currently bidirectional sync workflows require the target to be a hosted feature service running on either ArcGIS Online or ArcGIS Enterprise 10.9. Bidirectional syncing with another service requires [replica tracking](https://pro.arcgis.com/en/pro-app/latest/tool-reference/data-management/enable-replica-tracking.htm) to be enabled on the data. For hosted feature services, replica tracking is automatically enabled when sync is enabled, starting at 10.9. For more information, see [Share content with collaboration groups](https://enterprise.arcgis.com/en/portal/latest/administer/windows/share-content-with-collaboration-participants.htm#ESRI_SECTION2_4351A65EE8AC49EBB3AE0D7C22D481ED), [`createReplica`](/rest/services-reference/enterprise/create-replica/) , and [`synchronizeReplica`](/rest/services-reference/enterprise/synchronize-replica/) .
-   The [`extractChanges`](/rest/services-reference/enterprise/extract-changes-feature-service/) operation includes a new parameter that, when `true` , returns whether geometry updates have been made to a layer in the feature service. The new parameter is supported when the service's `extractChangesCapabilities` property includes `supportsReturnHasGeometryUpdates` as `true` .
-   The `createReplica` operation's `syncDataOptions` parameter has been expanded to add full annotation and an option to include a subset of Utility Network system information when taking data offline. The services `supportedSyncDataOptions` property indicates which of the `syncDataOptions` are available for a service. See the [`createReplica`](/rest/services-reference/enterprise/create-replica/) operation for more information on these values.

## New at 10.8.1

-   Feature services now support topology layers. Topology layers are composite layers that reference `subLayers` and do not have any `capabilities` . The `subLayer` references describe the layer's error features and dirty areas. In clients such as ArcGIS Pro 2.6, topology layers are used in conjunction with the validation service to support topology validation and error feature correction.
-   When a topology layer is included, the `controllerDatasetLayers` array property adds a reference to it in the `topologyLayerIds` property. To see an example of topology layers being included in a feature service, see the [topology example in the Example Usage section below](/rest/services-reference/enterprise/feature-service/#json-response-example).
-   New `advancedReplicaResourcesCapabilities` properties in the `syncCapabilities` object are provided for sync-enabled feature services published from ArcGIS Pro that reference enterprise geodatabase data. These describe new parameters that can be passed to the replicas resource. See [Replicas](/rest/services-reference/enterprise/replicas-feature-service/) for more details.
-   Hosted and nonhosted feature services running on a federated server include a `serviceItemId` property at 10.8.1. This describes the ID of the associated feature layer item in the home app. Hosted feature services in ArcGIS Enterprise have supported this property since 10.7.
-   If the connected user has the **Version Management** privilege assigned to them through either being assigned the default administrator or a custom role, they can perform additional operations on branch versioned data (`isDataBranchVersioned` as `true` ). This includes editing protected and private branch versions owned by others, as long as the service allows editing. This also includes being able to access and unregister replicas owned by others for services based on branch versioned data. A user with the **Version Management** privilege can sync to a protected default version on editable services based on branch versioned data.

## New at 10.8

-   The feature service resource now returns the `supportsDatumTransformation` property. This property is returned as `true` if the service supports the addition of datum transformations. If `true` , [Create Replica](/rest/services-reference/enterprise/create-replica/), the layer-level [Query](/rest/services-reference/enterprise/query-feature-service-layer/), [Query Related](/rest/services-reference/enterprise/query-related-records-feature-service/), and [service](/rest/services-reference/enterprise/apply-edits-feature-service/) and [layer-level](/rest/services-reference/enterprise/apply-edits-feature-service-layer/) Apply Edits operations will allow datum transformations.
-   The appropriate [user type extension](https://enterprise.arcgis.com/en/portal/latest/administer/windows/license-user-type-extensions.htm) is required when editing feature services that contain Utility Network or Parcel Fabric layers. The user type extensions are not required to query Utility Network or Parcel Fabric layers through the feature service. The `userTypeExtensions` property of the [Layer](/rest/services-reference/enterprise/layer-feature-service/) resource indicates whether the layer is part of a `parcelFabric` or `utilityNetwork` .
-   The `supportsReturnServiceEditsInSourceSR` property in `advancedEditingCapabilities` indicates whether the option to `supportsReturnServiceEditsInSourceSR` is available on the service's [Apply Edits](/rest/services-reference/enterprise/apply-edits-feature-service/) operation.
-   The `datumTransformations` property indicates the default datum transformations applied with operations on the service.
-   The `referenceScale` property represents the scale at which a participating layer's symbol size and text are fixed.

## Request parameters

| Parameter | Details |
|---|---|
| option | If option is footprints , the footprint of the feature service is returned as a feature collection. This feature collection can be viewed in Map Viewer Classic. This is only supported when f is json .Value: footprints |
| outSR | The spatial reference of the geometry returned in footprints. This parameter is supported only when option=footprints is specified. The spatial reference should be specified as a well-known ID. If outSR is not specified, the geometry is returned in GCS_WGS_1984 . |
| useGlobalIds | Used to specify whether upsert needs to use GlobalId when matching features. The default value is false and ObjectId is used by default. |
| f | The response format. The default response format is html .Values: html \| json \| pjson |

## Example usage

The following is a sample request URL for a feature service:



```
https://organization.example.com/<context>/rest/services/USA/FeatureServer?f=pjson
```

## JSON Response syntax



```
{
  "currentVersion": <currentVersion>,
  "serviceDescription": "<serviceDescription>",
  "hasVersionedData": <true | false>,
  "supportsDisconnectedEditing": <true | false>,
  "supportsDatumTransformation": <true | false>, //Added at 10.8
  "supportsReturnDeleteResults": <true | false>,
  "hasStaticData" : <true | false>,
  "maxRecordCount" : "<maxRecordCount>",
  "supportedQueryFormats": "<supportedQueryFormats>",
  "supportsRelationshipsResource": <true | false>,
  "supportsAppend":  <true | false>,
  "supportedAppendFormats": "<supportedAppendFormats>",
  "supportsTrueCurve": <true | false>,
  "supportedCurveTypes": [<Curve Types>] //Added at 11.5
  "capabilities": "<capabilities>",
  "description": "<description>",
  "copyrightText": "<copyrightText>",
  "userTypeExtensions": [<Extension Types>], //Added at 10.8
  "advancedEditingCapabilities": {<advancedEditingCapabilities>},
  "spatialReference": {<spatialReference>},
  "initialExtent": {<envelope>},
  "fullExtent": {<envelope>},
  "allowGeometryUpdates": <true | false>,
  "units": "<units>",
  "syncEnabled" : <true | false>,
  "supportedExportFormats": "<supported formats>", //Added at 10.9.1
  "returnServiceEditsHaveSR": <true | false>, //Added at 10.7.1
  //Added at 10.7
  "validationSystemLayers": {
    "validationPointErrorlayerId": <validationPointErrorlayerId>,
    "validationLineErrorlayerId": <validationLineErrorlayerId>,
    "validationPolygonErrorlayerId": <validationPolygonErrorlayerId>,
    "validationObjectErrortableId": <validationObjectErrortableId>
  },
  //Added at 10.6.1
  "extractChangesCapabilities": {
    "supportsReturnIdsOnly": <true | false>,
    "supportsReturnExtentOnly": <true | false>,
    "supportsReturnAttachments": <true | false>,
    "supportsLayerQueries": <true | false>,
    "supportsSpatialFilter": <true | false>,
    "supportsReturnFeature": <true | false>,
  },
  "syncCapabilities": {
    "supportsASync": <true | false>,
    "supportsRegisteringExistingData": <true | false>,
    "supportsSyncDirectionControl": <true | false>,
    "supportsPerLayerSync": <true | false>,
    "supportsPerReplicaSync": <true | false>,
    "supportsRollbackOnFailure": <true | false>,
    "supportedSyncDataOptions": <supportedSyncDataOptions>,
    "supportsQueryWithDatumTransformatiom": <true | false>, //Added at 10.8
  },
  "editorTrackingInfo": {
    "enableEditorTracking": <true | false>,
    "enableOwnershipAccessControl": <true | false>,
    "allowOthersToUpdate": <true | false>,
    "allowOthersToDelete": <true | false>
  },
  "documentInfo": {
   "<key1>": "<value1>",
   "<key2>": "<value2>"
   },
  //the feature layers published by this service
  "layers": [
    { "id": <layerId1>, "name": "<layerName1>" },
    { "id": <layerId2>, "name": "<layerName2>" }
  ],
  //the non-spatial tables published by this service
  "tables": [
    { "id": <tableId1>, "name": "<tableName1>" },
    { "id": <tableId2>, "name": "<tableName2>" }
  ],
  "relationships": [
    { "id": <relationshipId1>, "name": "<relationshipName1>" },
    { "id": <relationshipId2>, "name": "<relationshipName2>" }
  ],
  "datumTransformations": [<datumTransformations>] //Added at 10.7.1
  "enableZDefaults": <true | false>,
  "isLocationTrackingService": <true | false>,
  "isLocationTrackingView": <true | false>,
  "isIndoorsService": <true | false>,
  "zDefault": <zDefaultValue>

}
```

## JSON Response example

The following is an example of a feature service resource's JSON response:



```
{
  "currentVersion": 11.1,
  "serviceDescription": "Birds",
  "hasVersionedData": false,
  "supportsDisconnectedEditing: false,
  "supportsDatumTransformation": true,
  "supportsReturnDeleteResults": true,
  "supportsRelationshipsResource": true,
  "supportsAppend": true,
  "supportedAppendFormats": "FILEGDB,PBF",
  "supportsTrueCurve": true,
  "supportedCurveTypes": [
    "esriGeometryCircularArc",
    "esriGeometryEllipticArc",
    "esriGeometryBezier3Curve"
  ],
  "syncEnabled": false,
  "supportedExportFormats": "sqlite,filegdb,shapefile,csv,geojson",
  "hasStaticData": false,
  "maxRecordCount": 1000,
  "supportedQueryFormats": "JSON",
  "capabilities": "Query,Create,Delete,Update,Uploads,Editing,Extract,ChangeTracking,Sync",
  "description": "",
  "copyrightText": "",
  "userTypeExtensions: [
    "utilityNetwork"
  ],
  "advancedEditingCapabilities": {
    "supportsSplit": true,
    "supportsReturnServiceEditsInSourceSR": true
  },
  "spatialReference": {
    "wkid": 4326,
    "latestWkid": 4326
  },
  "initialExtent": {
    "xmin": -118.016756138237,
    "ymin": 32.8933824408207,
    "xmax": -116.532738278622,
    "ymax": 34.3261469363675,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  },
  "fullExtent": {
    "xmin": -117.855689264791,
    "ymin": 32.5702577626442,
    "xmax": -116.87086222794,
    "ymax": 34.1460567673275,
    "zmin": 0,
    "zmax": 300,
    "mmin": 3,
    "mmax": 9,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  },
  "allowGeometryUpdates": true,
  "units": "esriDecimalDegrees",
  "syncEnabled": true,
  "validationSystemLayers": {
    "validationPointErrorlayerId": 1,
    "validationLineErrorlayerId": 2,
    "validationPolygonErrorlayerId": 3,
    "validationObjectErrortableId": 5
  },
  "extractChangesCapabilities": {
    "supportsReturnIdsOnly": true,
    "supportsReturnExtentOnly": false,
    "supportsReturnAttachments": false,
    "supportsLayerQueries": false,
    "supportsSpatialFilter": false,
    "supportsReturnFeature": false,
    "supportsReturnHasGeometryUpdates": true
  },
  "syncCapabilities": {
    "supportsASync": true,
    "supportsRegisteringExistingData": true,
    "supportsSyncDirectionControl": true,
    "supportsPerLayerSync": true,
    "supportsPerReplicaSync": false,
    "supportsRollbackOnFailure": false,
    "supportedSyncDataOptions": 3
    "supportsQueryWithDatumTransformation": true,
  },
  "editorTrackingInfo": {
    "enableEditorTracking": false,
    "enableOwnershipAccessControl": false,
    "allowOthersToUpdate": true,
    "allowOthersToDelete": false
  },
  "layers": [
    {
      "id": 0,
      "name": "Sitings",
      "parentLayerId": -1,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "geometryType": "esriGeometryPoint"
    },
    {
      "id": 1,
      "name": "NestingGrounds",
      "parentLayerId": -1,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "geometryType": "esriGeometryPolygon"
    },
    {
      "id": 2,
      "name": "LandCover",
      "parentLayerId": -1,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "geometryType": "esriGeometryPolygon"
    }
  ],
  "tables": [],
  "relationships": [
   {
    "id": 0,
    "name": "relationship_1"
   }
  ],
  "datumTransformations": [
    {
      "geoTransforms": [
        {
          "wkid": 15931,
          "latestWkid": 15931,
          "transformForward": false,
          "name": NAD_1983_NSRS2007_To_WGS_1984_1"
        }
      ]
    },
    {
      "geoTransforms": [
        {
          "wkid": 15931,
          "latestWkid": 15931,
          "transformForward": true,
          "name": NAD_1983_NSRS2007_to_WGS_1984_1"
        }
      ]
    }
  ],
  "isIndoorsService": true,
  "isLocationTrackingService": true,
  "isLocationTrackingView": true
}
```

The following is a portion of a JSON response example for a spatial reference, VCS, tolerance, resolution properties, and high model info:



```
...
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
 },
 "heightModelInfo": {
  "heightModel": "ellipsoidal",
  "vertCRS": "WGS_1984",
  "heightUnit": "meter"
 },
...
```

The following is an example of a feature service that includes topology layers:



```
{
...
  "layers": [
    {
      "id": 0,
      "name": "topo_1081.GDB.topo_2",
      "parentLayerId": -1,
      "defaultVisibility": true,
      "subLayerIds": [
        1,
        2,
        3,
        4
      ],
      "minScale": 0,
      "maxScale": 0,
      "type": "Topology Layer"
    },
    {
      "id": 1,
      "name": "Dirty Areas",
      "parentLayerId": 0,
      "defaultVisibility": false,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolygon"
    },
    {
      "id": 2,
      "name": "Point Errors",
      "parentLayerId": 0,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPoint"
    },
    {
      "id": 3,
      "name": "Line Errors",
      "parentLayerId": 0,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolyline"
    },
    {
      "id": 4,
      "name": "Polygon Errors",
      "parentLayerId": 0,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolygon"
    },
    {
      "id": 5,
      "name": "topo_1081.GDB.us_caps_test_2",
      "parentLayerId": -1,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPoint"
    },
    {
      "id": 6,
      "name": "topo_1081.GDB.us_caps_buff_2",
      "parentLayerId": -1,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolyline"
    },
    {
      "id": 7,
      "name": "topo_1081.GDB.us_states_test_2",
      "parentLayerId": -1,
      "defaultVisibility": true,
      "subLayerIds": null,
      "minScale": 0,
      "maxScale": 0,
      "type": "Feature Layer",
      "geometryType": "esriGeometryPolygon"
    }
  ],
  "tables": [],
  "relationships": [],
  "controllerDatasetLayers": {
    "topologyLayerIds": [
      0
    ]
  },
  "supportsDynamicLayers": true,
  "enableZDefaults": false,
  "allowUpdateWithoutMValues": false,
  "supportsVCSProjection": true,
  "referenceScale": 0,
  "serviceItemId": "64bbff5e478f41cf8ddc6d7792b3d2eb"
},
...
```