# Apply Edits (Feature Service/Layer)

> Source: [/rest/services-reference/enterprise/apply-edits-feature-service-layer/](https://developers.arcgis.com/rest/services-reference/enterprise/apply-edits-feature-service-layer/)

**URL:**: https://<root>/<serviceName>/FeatureServer/<layerId>/applyEdits

**Methods:**: POST

**Required Capability:**: Create, Update, Delete. Create is required to add features, Update is required to update features, and Delete is required to delete features.

**Version Introduced:**: 10.0

## Description

The `applyEdits` operation adds, updates, and deletes features to the associated feature layer or table in a single call and returns the results of the edits that are grouped by the type of edit (`addResults` , `updateResults` , and `deleteResults` ). Each grouping contains an array of edit result objects that identify a single feature and indicates whether the edits were successful. If the edits were unsuccessful, the edit result object includes an [error code](/rest/services-reference/enterprise/feature-service-error-codes/) and error description. This operation is performed on a [feature service layer resource](/rest/services-reference/enterprise/layer-feature-service/).

Services can be published from enterprise geodatabase layers that have [attribute rules](https://pro.arcgis.com/en/pro-app/latest/help/data/geodatabases/overview/an-overview-of-attribute-rules.htm). Attribute rules are applied to the back-end datasets and take effect when edits are applied. Types of attribute rules include calculation rules that automatically apply a calculated value to a field and constraint rules that cause an edit to return an error if the constraint is violated. For an example, see the constraint rule violation JSON response below.

## New at 12.0

-   Support for the `applyEdits` operation on a unique ID service layer is indicated when the layer-level property `supportsApplyEditsWithUniqueIds` is set to `true`.

## New at 11.5

The unique IDs feature has been added to support databases with string ID fields. For more information on unique IDs, see the Layer (Feature Service) page, `useUniqueIds` in the Request parameters table below, and JSON Response Example three.

### New at 11.4

-   This operation now supports `pbf` as an upload format for applying edits. A new parameter, `editsUploadFormat`, has been added to specify the format of the uploaded file specified in the `editsUploadId` parameter. Support for pbf is indicated when the layer-level `advancedEditingCapabilities` property, under `supportedApplyEditsUploadIDFormats`, lists `PBF` as a value.
-   Reference feature services now support applying edits as pbf with control points.

### New at 11.3

-   Four new field types are now supported: `esriFieldTypeTimeOnly`, `esriFieldTypeDateOnly`, `esriFieldTypeTimestampOffset`, `esriFieldTypeBigInteger`.
-   Reference feature services will return control points in the JSON response from query results and accept features with control points when applying edits. Control points are special vertices used to apply symbol effects to line or polygon features. Geometries are persisted in the geodatabase with an identifier as to whether each vertex is a control point.

## New at 11.1

-   This operation now includes the `editsUploadId` parameter. Support for the new parameter is indicated when the layer-level `supportsApplyEditsbyUploadID` property, under `advancedEditingCapabilities` , is set to `true` .

-   For non-hosted feature services referencing an enterprise geodatabase, the `async` parameter now uses a geoprocessing service, which allows for longer running operations.
-   For hosted feature services, a field's default value is now applied when a row is added with no provided value when using either this operation or [Append](/rest/services-reference/enterprise/append-feature-service-layer/).

## New at 11.0

The following are new at 11.0:

-   ArcGIS Enterprise hosted feature services now support the `async` parameter.
    
-   A new parameter, `returnEditResults` , was introduced at this release. When set to `false` , `applyEdits` only returns a response of the following form:
    
    
    
    ```
    {"success": <true|false>}
    ```
    
    The `returnEditResults` parameter can be set to `false` only when `rollbackOnFailure` is set to `true` . Support for this new parameter is indicated by a feature service having the layer-level `supportsReturnedEditResults` property, under `advancedEditingCapabilities` , set to `true` .
    

## New at 10.9.1

The layer-level `applyEdits` operation for hosted feature services in ArcGIS Online, and non-hosted feature services in ArcGIS Enterprise, includes an option to process requests asynchronously. This option is ideal for longer-running edit operations that may time out otherwise. The `async` parameter can be used if the layer resource has the `supportsAsyncApplyEdits` layer property set to `true` (under `advancedEditingCapabilities` ).

## New at 10.9

A new parameter, `timeReferenceUnknownClient` , has been added at 10.9. Setting `timeReferenceUnknownClient` to `true` indicates that the client is capable of working with date field data values that are not in UTC. For more information about this parameter, see the [Request parameters](/rest/services-reference/enterprise/apply-edits-feature-service-layer/#GUID-B0639AB4-599A-4105-9014-93A5CFC416B1) table below.

## Request parameters

| Parameter | Details |
|---|---|
| adds(Optional. At least one of the following parameters must be included in the request: adds , updates , or deletes ) | The array of features to be added. The structure of each feature in the array is the same as the structure of the JSON feature object returned by the ArcGIS REST API. Features to be added to a feature layer should include the geometry. Records to be added to a table should not include geometry.If useGlobalIds is true , the features are added while preserving their globalIds values. If useGlobalIds is false or not specified, the globalIds values submitted with the features are ignored and the service assigns new globalIds values to the new features.Syntax adds=[<feature1>, <feature2>]Example 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 adds=[ { "geometry": { "x": -118.15, "y": 33.80 }, "attributes": { "OWNER": "Joe Smith", "VALUE": 94820.37, "APPROVED": true, "LASTUPDATE": 1227663551096, "GlobalID": "{74100804-E229-49b8-8CDC-9B5D3EF03EDA}" } }, { "geometry": { "x": -118.37, "y": 34.086 }, "attributes": { "OWNER": "John Doe", "VALUE": 17325.90, "APPROVED": false, "LASTUPDATE": 1227628579430, "GlobalID": "{39B856DC-AFE4-4c02-B433-A9361ACD91CF}" } } ] |
| updates(Optional. At least one of the following parameters must be included in the request: adds , updates , or deletes ) | The array of features to be updated. The structure of each feature in the array is the same as the structure of the JSON feature object returned by the ArcGIS REST API. Records to be added to a table should not include geometry.If useUniqueIds is true, each updated feature must have a key-value for every uniqueIds field. Use of global IDs and/or object IDs is not allowed when using unique IDs.If useGlobalIds is false or not specified, the attributes property of the feature should include the object ID of the feature along with the other attributes (the globalId value of the feature is not required).If useGlobalIds is true , the globalId value is used to identify the feature when applying the update (the object ID of the feature is not required).Syntax updates=[<feature1>, <feature2>]Example 1, using uniqueIds: [ { "geometry": { "x": -118.15, "y": 33.8 }, "attributes": { "UNIQUEID1": "gMVbupIB1qj3KCKjIaZk", "UNIQUEID2": "myValue", "OWNER": "Joe Smith", "VALUE": 94820.37, "APPROVED": true, "LASTUPDATE": 1227667627940 } }, { "geometry": { "x": -118.37, "y": 34.086 }, "attributes": { "UNIQUEID1": "kJWhjtIB1qj3KCLeIaAf", "UNIQUEID2": "myOtherValue", "OWNER": "John Doe", "VALUE": 17325.9, "APPROVED": false, "LASTUPDATE": 9269154204840 } } ]Example 2, using globalId: [ { "geometry": { "x": -118.15, "y": 33.8 }, "attributes": { "OWNER": "Joe Smith", "VALUE": 94820.37, "APPROVED": true, "LASTUPDATE": 1227667627940, "GlobalID": "{1A9F8368-F9BB-428B-BB03-F45724362DB5}" } }, { "geometry": { "x": -118.37, "y": 34.086 }, "attributes": { "OWNER": "John Doe", "VALUE": 17325.9, "APPROVED": false, "LASTUPDATE": 9269154204840, "GlobalID": "{6CE34136-EC3A-40D7-80BF-E1D9BE33812A }" } } ]Example 3, using objectId: [ { "geometry": { "x": -118.15, "y": 33.80 }, "attributes": { "OBJECTID": 37, "OWNER": "Joe Smith", "VALUE": 94820.37, "APPROVED": true, "LASTUPDATE": 1227667627940 } }, { "geometry": { "x": -118.37, "y": 34.086 }, "attributes": { "OBJECTID": 462, "OWNER": "John Doe", "VALUE": 17325.90, "APPROVED": false, "LASTUPDATE": 9269154204840 } } ] |
| deletes(Optional. At least one of the following parameters must be included in the request: adds , updates , or deletes ) | The IDs of the features or records to be deleted.If useUniqueIds is true, each deleted feature must have a value for every uniqueIds field and must be in the format determined by uniqueIdInfo.type. Use of global IDs and/or object IDs is not allowed when using unique IDs.If useGlobalIds is false or not specified, the objectIds values of the features to be deleted must be provided. If useGlobalIds is true , the globalIds values of the features to be deleted must be provided.Syntax 2 3 deletes=<objectId1>, <objectId2> deletes=[<uniqueIds1>,<uniqueIds1>]Example 2 3 4 5 6 7 8 9 10 11 12 13 14 deletes=37, 462 deletes=[37, 462] deletes=["{1A9F8368-F9BB-428B-BB03-F45724362DB5}","{6CE34136-EC3A-40D7-80BF-E1D9BE33812A}"] deletes=[“98aQ45IB1qj3KCKj7aug”] //layer's uniqueIdInfo.type=simple deletes=[ [ "98aQ45IB1qj3KCKj7aug", //layer's uniqueIdInfo.type=composite "yeXRMZMBed_rc6KBDj6V" ], [ "v_LwmYcB8pn_00j6g0-_", "wPLwmYcB8pn_00j6g0-_" ] ] |
| gdbVersion | The geodatabase version to apply the edits. This parameter applies only if the isDataVersioned layer-level property is true . If gdbVersion is not specified, edits are made to the published map's version.Syntax gdbVersion=<version>Example gdbVersion=SDE.DEFAULT |
| returnEditMoment(Optional) | Introduced at 10.5. This is only applicable for ArcGIS Server services. Specifies whether the response will report the time that edits were applied. If set to true , the server will return the time in the response's editMoment key. The default value is false .Values: true \| false |
| rollbackOnFailure(Optional) | Specifies whether the edits will be applied only if all submitted edits succeed. If false , the server will apply the edits that succeed, even if some of the submitted edits fail. If true , edits will only be applied if all edits succeed. The default value is true .Values: true\|false |
| useGlobalIds(Optional) | When set to true , the features and attachments in the adds , updates , deletes , and attachments parameters are identified by their gloablIds value rather than their objectId or attachmentId value. The service adds the new features and attachments while preserving the globalId value submitted in the payload. If the globalId value of a feature or attachment conflicts with an existing feature or attachment, the addition of that feature or attachment fails. Other additions, updates, or deletions are attempted if rollbackOnFailure is false . If rollbackOnFailure is true , the entire operation fails and rolls back on any failure, including a globalId conflict. The default value is false .Values: true \| false |
| attachments(Optional) | This parameter adds, updates, or deletes attachments. It applies only when the useGlobalIds parameter is set to true . When set to adds , the globalIds values of the attachments provided by the client are preserved. When useGlobalIds is true , the updates and deletes options are identified by each feature or attachment globalId value, rather than their objectId or attachmentId value. This parameter requires the layer's supportsApplyEditsWithGlobalIds property to be true .Attachments to be added or updated can use either pre-uploaded data or base 64 encoded data.Syntax: { "adds": [<attachment1>, <attachment2>], "updates": [<attachment1>, <attachment2>], "deletes": ["<attachmentGlobalId1>", "<attachmentGlobalId2>"] }Example: { "adds": [ { "globalId": "{55E85F98-FBDD-4129-9F0B-848DD40BD911}", "parentGlobalId": "{02041AEF-4174-4d81-8A98-D7AC5B9F4C2F}", "contentType": "image/pjpeg", "name": "Pothole.jpg", "uploadId": "{DD1D0A30-CD6E-4ad7-A516-C2468FD95E5E}" }, { "globalId": "{3373EE9A-4619-41B7-918B-DB54575465BB}", "parentGlobalId": "{6FA4AA68-76D8-4856-971D-B91468FCF7B7}", "contentType": "image/pjpeg", "name": "Debree.jpg", "data": "<base 64 encoded data>" } ], "updates": [ { "globalId": "{8FDD9AEF-E05E-440A-9426-1D7F301E1EBA}", "contentType": "image/pjpeg", "name": "IllegalParking.jpg", "uploadId": "{57860BE4-3B85-44DD-A0E7-BE252AC79061}" } ], "deletes": [ "{95059311-741C-4596-88EF-C437C50F7C00}", "{18F43B1C-2754-4D05-BCB0-C4643C331C29}" ] } |
| assetMaps(Optional) | Introduced at ArcGIS Enterprise 11.1. Specifies an array of adds and updates (similar to attachments) for feature layer assets assets associated with a 3D Object Feature Layer. For more information, see the Apply Edits with Asset Maps section below. |
| trueCurveClient(Optional) | Indicates to the server whether the client is true curve capable. When set to true , true curve geometries will be downloaded and geometries containing true curves will be used by the map service without densifying it. When set to false , the client is not true curves capable. The default value is false .Values: true \| false |
| sessionID(Optional) | Introduced at 10.6. The sessionID is a GUID value that clients establish at the beginning and use throughout the edit session. The sessonID parameter ensures isolation during the edit session. The sessionID parameter is set by a client during long transaction editing on a branch version.Syntax sessionID=<sessionID>Example sessionID={E81C2E2D-C6A7-40CB-BF61-FB499E53DD1D} |
| usePreviousEditMoment(Optional) | Introduced at 10.6. The usePreviousEditMoment parameter is used to apply the edits with the same edit moment as the previous set of edits. This allows an editor to apply a single block of edits partially, complete another task, and complete the block of edits. This parameter is set by a client during long transaction editing on a branch version.When set to true , the edits are applied with the same edit moment as the previous set of edits. When set to false or not set (the default), the edits are applied with a new edit moment.Values: true \| false |
| datumTransformation(Optional) | Introduced at 10.8. This parameter applies a datum transformation while projecting input geometries from their spatial reference to the layer's source spatial reference. When specifying transformations, you need to think about which datum transformation is best for this projection. For a list of valid datum transformation ID values and well-known text strings, see Using spatial references. For more information on datum transformations, see the transformation parameter in the Project operation.Syntax 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 //Syntax to apply a simple transformation datumTransformation=<wkid> //Syntax to apply a simple transformation datumTransformation={"wkt": "<WKT>"} //Syntax to apply a composite transformation datumTransformation={ "geoTransforms":[ { "wkid":<id>, "forward":<true\|false> }, { "wkt":"<WKT>", "forward":<true\|false> } ] }Example 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 //Applies a simple transformation datumTransformation=1623 //Applies a composite transformation datumTransformation={ "geoTransforms":[ { "wkid":1088, "transformForward": true }, { "wkt": "GEOGTRAN[\"S_JTSK_To_WGS_1984_1\",GEOGCS[\"GCS_S_JTSK\",DATUM[\"D_S_JTSK\", SPHEROID[\"Bessel_1841\",6377397.155,299.1528128]],PRIMEM[\"Greenwich\",0.0], UNIT[\"Degree\",0.0174532925199433]],GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\", SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0], UNIT[\"Degree\",0.0174532925199433]],METHOD[\"Position_Vector\"], PARAMETER[\"X_Axis_Translation\",570.8],PARAMETER[\"Y_Axis_Translation\",85.7], PARAMETER[\"Z_Axis_Translation\",462.8],PARAMETER[\"X_Axis_Rotation\",4.998], PARAMETER[\"Y_Axis_Rotation\",1.587],PARAMETER[\"Z_Axis_Rotation\",5.261], PARAMETER[\"Scale_Difference\",3.56]]", "transformForward":false } ] } |
| timeReferenceUnknownClient | Setting timeReferenceUnknownClient to true indicates that the client is capable of working with data values that are not in UTC. If its not set to true , and the service layer's datesInUnknownTimeZone property is set to true , an error is returned. The default is falseIt's possible to define a service's time zone of date fields as unknown. Setting the time zone to unknown means that date values will be returned as is from the database, rather than as date values in UTC. Non-hosted feature services can be set to use an unknown time zone using ArcGIS Server Manager. Setting the time zones to unknown also sets the datesInUnknownTimeZone layer property to true . Currently, hosted feature services do not support this setting. This setting does not apply to editor tracking date fields, which are stored and returned in UTC even when the time zone is set to unknown.Most clients released prior to ArcGIS Enterprise 10.9 will not be able to work with feature services that have an unknown time setting. The timeReferenceUnknownClient parameter prevents these clients from working with the service to avoid problems. Setting this parameter to true indicates that the client is capable of working with unknown date values that are not in UTC.Value: true \| false |
| async | New at 10.9.1. The async parameter can be used if the layer resource has the supportsAsyncApplyEdits property set to true (found under advancedEditingCapabilities ). If true , the request is processed as an asynchronous job, and a URL is returned that a client can visit to check the status of the job (statusUrl ). The default value is false . For more information, see the topic on asynchronous usage for more information.The status and resultUrl properties are returned when checking the status of a job. However, the other asynchronous properties may not be returned. Once the status is COMPLETED , a resultUrl is provided that returns responses matching the JSON response example below.Async applyEdits is intended for longer-running edit operations that may time out in synchronous mode while the client is waiting for a response. For larger and longer-running processes, it is recommended that you use other operations, such as append , instead of applyEdits . For ArcGIS Enterprise non-hosted feature services, the async process is subject to the feature service time-out settings. For example, if the maximum time a client can use a service is 10 minutes, the async process will run up to 10 minutes. The number of instances configured per machine will also be shared by both synchronous and asynchronous calls.Values: true \| false |
| returnEditResults(Optional) | Introduced at 11.0. Determines whether the request returns results per edit or a standard success response. When set to false , the request returns only a response of the following form: {"success": <true\|false>}The returnEditResults parameter can only be set to false when rollbackOnFailure is set to true . When returnEditResults is set to true , the request returns results per edit. The default value is true .Values: true \| false |
| editsUploadId(Optional) | Introduced at ArcGIS Enterprise 11.1 for hosted and non-hosted feature services.This parameter references an upload ID from an uploaded file containing service edits. This parameter provides the option to pre-upload edits to the ArcGIS Server and reference them through this parameter, rather than provide edits in-line with the edits parameter. The input for editsUploadId is the ID returned after performing the upload operation. If both edit and editsUploadId are included in a request, this parameter will take precedence.Syntax example uploadId=<uploadID>Example uploadId=ibfd0aa4c-f40e-4554-b499-829bcfa2711aExample upload file content (JSON) { "adds": [ { "geometry": { "x": -10359451, "y": 5617771 }, "attributes": { "globalid": "{B99CA10D-9FDB-447D-9E8B-44AEDC540629}", "reprowid": 10000, "textfield": "added_editsUploadId" } } ], "updates": [ { "attributes": { "fk": 2, "textfield": "updated_editsUploadId", "globalid": "{D46CA10D-9FDB-447D-9E8B-44AEDC540629}", "guids": "{5711983D-A0B0-4C21-BCF3-F5AB93985CB9}", "reprowid": 22, "objectid": 22, "observed": 1012471200000 }, "geometry": { "x": -10359418.1975, "y": 5617744.1070000008 } } ], "deletes": ["{69958E11-C6F6-424E-8EEF-E24C0E9B86A6}"], "attachments": { "adds": [ { "globalId": "{FAA66666-766F-47CA-993B-8A3FC57616A1}", "parentGlobalId": "{2ABA1967-6AF3-4F66-83C3-0961EAA53584}", "contentType": "image/jpeg", "name": "addAttachment.jpg", "uploadId": "addAttachmentUploadId" } ], "updates": [ { "id": 25, "globalId": "{469E2233-1F07-43BE-B2C6-155273AA71C5}", "parentGlobalId": "{ED41CBEA-D20A-4CC8-B40B-270E129E5974}", "contentType": "image/jpeg", "name": "updateAttachment.jpg", "uploadId": "updateAttachmentUploadId" } ], "deletes": ["{D1DE4DE4-196A-4D00-9773-13E4135C40D5}"] } } |
| editsUploadFormat(Optional) | Introduced at 11.4. Specifies the format of the uploaded file specified in the editsUploadId parameter. If this parameter is not included in the request, the format is assumed to be json. The default value is json.Values: json \| pbf |
| useUniqueIds(Optional) | Introduced at 11.5. If using updates and/or deletes operation(s), value must be set to true. Default value is false.Values: true \| false |
| f | The response format. The default format is html .Values: html \| json \| pjson |

## Example usage

The following is a sample request URL used to access the `applyEdits` endpoint:



```
https://organization.example.com/<context>/rest/services/SanFrancisco/311Incidents/FeatureServer/0/applyEdits
```

### Apply Edits for 3D Object Feature Layer

The layer level `applyEdits` operation has a parameter called `assetMaps` which is used to perform adds and updates to a 3D Object Feature Layer.

Both 3D Feature Layer aware clients and 3D Feature Layer unaware clients or applications can access the `applyEdits` operation. Applications or clients that are 3D Feature Layer aware will send the `assetMaps` field and omit `geometry` . An application or client that is not 3D Feature Layer aware will send a multipatch feature where the geometry contains all the information, and will not send the `assetMaps` parameter. The layer supports both kinds of clients.

Example `adds` request with `assetMaps` :



```
adds=[
  {
    "attributes": {
      "OWNER": "Joe Smith",
      "VALUE": 94820.37,
      "APPROVED": true,
      "LASTUPDATE": 1227663551096,
      "GlobalID": "{064185b3-d827-fa42-a9bb-aff1ccb9b6a1}"
    }
  }
]
assetMaps={
  "adds":[
    {
      "globalId": "{c9e887e9-c8bd-4014-be62-03e5b0f7b25f}"
      "parentGlobalId": "{064185b3-d827-fa42-a9bb-aff1ccb9b6a1}"
      "assetName": "geometry.glb",
      "assetHash": "6486ee53c8faba18045ef29d382f1c8227bde3a25d37f7a62fe0d2259a3a14dd",
      "flags": ["PROJECT_VERTICES"]
    }
  ]
}
```

The `updates` array will also have a corresponding entry in `assetMaps` for each feature, similar to those the `adds` array has. As with the existing `applyEdits` , attributes and `assetMaps` are each optional and will result in a partial update of the feature (i.e., only attributes, only shape). The existing geometry and the new `assetMaps` are mutually exclusive.

Response Syntax:



```
{
  "addResults": [<editResult1>, <editResult2>],
  "updateResults": [<editResult1>, <editResult2>],
  "deleteResults": [<editResult1>, <editResult2>],
  "attachments": {
    "addResults": [<attachmentEditResult1>, <attachmentEditResult2>],
    "updateResults": [<attachmentEditResult1>, <attachmentEditResult2>],
    "deleteResults": [<attachmentEditResult1>, <attachmentEditResult2>]
  }
  "assetMaps": {
    "addResults": [<assetMapsEditResult1>, <assetMapsEditResult2>],
    "updateResults": [<assetMapsResult1>, <assetMapsEditResult2>]
  }
}
```

Example response:



```
{
  "addResults": [
    {
      "objectId": 618,
      "globalId": "{74100804-E229-49b8-8CDC-9B5D3EF03EDA}",
      "success": true
    },
    {
      "objectId": 619,
      "globalId": "{39B856DC-AFE4-4c02-B433-A9361ACD91CF}",
      "success": true
    }
  ],
  "updateResults": [
    {
      "objectId": 50,
      "globalId": "{9537AFCE-BF6B-4931-93E8-403E12D76916}",
      "success": false,
      "error": {
        "code": 1019,
        "description": "Violated attribute constraint rule. [Error No: -1, ]"
      }
    }
  ],
  "deleteResults": [
    {
      "objectId": 25,
      "globalId": "{1A9F8368-F9BB-428B-BB03-F45724362DB5}",
      "success": true
    },
    {
      "objectId": 26,
      "globalId": "{6CE34136-EC3A-40D7-80BF-E1D9BE33812A}",
      "success": true
    }
  ],
  "assetMaps": {
    "addResults": [
      {
        "GlobalID": "{c9e887e9-c8bd-4014-be62-03e5b0f7b25f}",
        "success": true
      },
      {
        "GlobalId": "{62ed3f5e-467a-444d-ad25-ed7e559ef14b}",
        "success": true
      }
    ],
    "updateResults": [
      {
        "GlobalId": "{9db72076-e109-467e-94c7-3d5a3a4ef9ef}",
        "success": true
      }
    ]
  }
}
```

### Example one

The following is a sample POST request that demonstrates adding an array of features using the `applyEdits` operation on a feature service layer resource, formatted for readability:



```
POST /<context>/rest/services/SanFrancisco/311Incidents/FeatureServer/0/applyEdits HTTP/1.1
Host: organization.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: []

adds=[
  {
    "attributes": {
      "req_id": "508389",
      "req_type": "Graffiti Complaint - Public Property",
      "req_date": "09\/19\/2009",
      "req_time": "18:44",
      "address": "11TH ST and HARRISON ST",
      "x_coord": "6008925.0",
      "y_coord": "2108713.8",
      "district": "6",
      "status": 1
    },
    "geometry": {
      "x": -122.41247978999991,
      "y": 37.770630098000083
    }
  },
	 {
    "attributes": {
      "req_id": "508395",
      "req_type": "Graffiti Complaint - Public Property",
      "req_date": "09\/19\/2009",
      "req_time": "19:01",
      "address": "13TH ST and MANCHESTER ST",
      "x_coord": "6008929.0",
      "y_coord": "2108713.9",
      "district": "6",
      "status": 1
    },
    "geometry": {
      "x": -121.42248867898987,
      "y": 38.790630098000452
    }
  }
]&updates=&deletes=&gdbVersion=&rollbackOnFailure=true&useGlobalIds=false&returnEditMoment=false&trueCurveClient=true&attachments=&timeReferenceUnknownClient=false&datumTransformation=&async=false&returnEditResults=true&f=pjson
```

### Example two

The following is a sample POST request that demonstrates updating an array of features using the `applyEdits` operation on a feature service layer resource, formatted for readability:



```
POST /<context>/rest/services/SanFrancisco/311Incidents/FeatureServer/0/applyEdits HTTP/1.1
Host: organization.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: []

adds=&updates=[
  {
    "attributes": {
	     "objectid: 1234567
      "req_id": "508389",
      "req_type": "Graffiti Complaint - Private Property",
      "req_date": "09\/19\/2009",
      "req_time": "18:44",
      "address": "11TH ST and HARRISON ST",
      "x_coord": "6008925.0",
      "y_coord": "2108713.8",
      "district": "6",
      "status": 2
    },
    "geometry": {
      "x": -122.41247978999991,
      "y": 37.770630098000083
    }
  },
	 {
    "attributes": {
      "req_id": "508395",
      "req_type": "Graffiti Complaint - Public Property",
      "req_date": "09\/19\/2009",
      "req_time": "19:01",
      "address": "13TH ST and MANCHESTER ST",
      "x_coord": "6008929.0",
      "y_coord": "2108713.9",
      "district": "6",
      "status": 2
    },
    "geometry": {
      "x": -121.42248867898987,
      "y": 38.790630098000452
    }
  }
]&deletes=&gdbVersion=&rollbackOnFailure=true&useGlobalIds=false&returnEditMoment=false&trueCurveClient=true&attachments=&timeReferenceUnknownClient=false&datumTransformation=&async=false&returnEditResults=true&f=pjson
```

### Example three

The following is a sample POST request that demonstrates deleting features using the `applyEdits` operation on a feature service layer resource, formatted for readability:



```
POST /<context>/rest/services/SanFrancisco/311Incidents/FeatureServer/0/applyEdits HTTP/1.1
Host: organization.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: []

adds=&updates=&deletes=37, 462&gdbVersion=&rollbackOnFailure=true&useGlobalIds=false&returnEditMoment=false&trueCurveClient=true&attachments=&timeReferenceUnknownClient=false&datumTransformation=&async=false&returnEditResults=true&f=pjson
```

### Example four

The following is a sample POST request to set vertices as control points for a feature. The control points are set in the `ids` array. The index of each `ids` array value matches up with the vertex at the same index in the geometry. In this example, the first and third vertices are set as being control points (value 1 on the `ids` array).



```
POST /<context>/rest/services/SanFrancisco/pipes/FeatureServer/0/applyEdits HTTP/1.1
Host: organization.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: []

adds=&updates= [
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
          1,
          0,
          1,
          0
        ]
      ]
    }
  }
]&deletes=&gdbVersion=&rollbackOnFailure=true&useGlobalIds=false&returnEditMoment=false&trueCurveClient=true&attachments=&timeReferenceUnknownClient=false&datumTransformation=&async=false&returnEditResults=true&f=pjson
```

### Example five

The following is a sample POST request that demonstrates adding a new feature that includes the following field types: `esriFieldTypeTimestampOffset`, `esriFieldTypeDateOnly`, `esriFieldTypeTimeOnly`, and `esriFieldTypeBigInteger`:



```
POST /<context>/rest/services/SanFrancisco/pipes/FeatureServer/0/applyEdits HTTP/1.1
Host: organization.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: []

updates=&adds=[
  {
    "attributes": {
      "dateonlyfld": "2023-08-23",
      "timestampoffsetfld": "2003-01-25T17:00:00-05:00",
      "timeonlyfld": "15:54:36",
      "abigint": 10111222333
    },
    "geometry": {
      "x": -116.64799770499997,
      "y": 34.13584615600007
    }
  }
]&deletes=&gdbVersion=&rollbackOnFailure=true&useGlobalIds=false&returnEditMoment=false&trueCurveClient=true&attachments=&timeReferenceUnknownClient=false&datumTransformation=&async=false&returnEditResults=true&f=pjson
```

## JSON Response syntax



```
{
  "addResults": [<editResult1>, <editResult2>],
  "updateResults": [<editResult1>, <editResult2>],
  "deleteResults": [<editResult1>, <editResult2>],
  "attachments": {
    "addResults": [<attachmentEditResult1>, <attachmentEditResult2>],
    "updateResults": [<attachmentEditResult1>, <attachmentEditResult2>],
    "deleteResults": [<attachmentEditResult1>, <attachmentEditResult2>]
  }
}
```

## JSON Response examples

### Example one

The sample response below demonstrates a general successful response for the `applyEdits` operation that included `adds` , `updates` , and `deletes` in the request:



```
{
  "addResults": [
    {
      "objectId": 618,
      "success": true
    },
    {
      "success": false,
      "error": {
        "code": -2147217395,
        "description": "Setting of Value for depth failed."
      }
    }
  ],
  "updateResults": [
    {
      "objectId": 50,
      "success": true
    }
  ],
  "deleteResults": [
    {
      "objectId": 25,
      "success": true
    },
    {
      "objectId": 26,
      "success": true
    }
  ]
}
```

### Example two

The example below shows `useGlobalids` is `true` and the `attachments` parameter is set:



```
{
  "addResults": [
    {
      "objectId": 618,
      "globalId": "{74100804-E229-49b8-8CDC-9B5D3EF03EDA}",
      "success": true
    },
    {
      "objectId": 619,
      "globalId": "{39B856DC-AFE4-4c02-B433-A9361ACD91CF}",
      "success": true
    }
  ],
  "updateResults": [
    {
      "objectId": 50,
      "globalId": "{9537AFCE-BF6B-4931-93E8-403E12D76916}",
      "success": true
    }
  ],
  "deleteResults": [
    {
      "objectId": 25,
      "globalId": "{1A9F8368-F9BB-428B-BB03-F45724362DB5}",
      "success": true
    },
    {
      "objectId": 26,
      "globalId": "{6CE34136-EC3A-40D7-80BF-E1D9BE33812A}",
      "success": true
    }
  ],
  "attachments": {
    "addResults": [
      {
        "objectId": 500,
        "globalId": "{55E85F98-FBDD-4129-9F0B-848DD40BD911}",
        "success": true
      },
      {
        "objectId": 501,
        "globalId": "{3373EE9A-4619-41B7-918B-DB54575465BB}",
        "success": true
      }
    ],
    "updateResults": [
      {
        "objectId": 600,
        "globalId": "{8FDD9AEF-E05E-440A-9426-1D7F301E1EBA}",
        "success": true
      }
    ],
    "deleteResults": [
      {
        "objectId": 800,
        "globalId": "{95059311-741C-4596-88EF-C437C50F7C00}",
        "success": true
      },
      {
        "objectId": 801,
        "globalId": " {18F43B1C-2754-4D05-BCB0-C4643C331C29}",
        "success": true
      }
    ]
  }
}
```

### Example three

The sample response below demonstrates a general successful response for the `applyEdits` operation that included `adds`, `updates`, and `deletes` in the request. The request used `uniqueIds` and `OIDFieldContainsHashValue` is `true`:



```
{
  "addResults": [
    {
      "success": true,
      "objectId": 2422078912310289094, //server-genererated integer value based on feature's unique IDs
      "uniqueIds": ["9caL35IB1qj3KCKjS6to"]
    },
    {
      "success": true,
      "objectId": 8657380342547400003,
      "uniqueIds": ["dDqSk5MBHitA6zl3YjO3"]
    }
  ],
  "updateResults": [
    {
      "success": true,
      "objectId": 3970651609512467392, //server-genererated integer value based on feature's unique IDs
      "uniqueIds": ["-MZD6JIB1qj3KCKj3KuW"]
    }
  ],
  "deleteResults": [
    {
      "success": true,
      "objectId": 3970651609512467392, //server-genererated integer value based on feature's `uniqueIds`
      "uniqueIds": ["98aQ45IB1qj3KCKj7aug"]
    }
  ]
}
```

### Example four

The example below shows a constraint rule is violated and `rollBackOnFailure` is `true` :



```
{
  "error": {
    "code": 400,
    "extendedCode": -2147207418,
    "message": "Unable to complete operation.",
    "details": [
      "Violated attribute constraint rule. [Error No: -1, ]",
      "Operation rolled back."
    ]
  }
}
```

### Example five

The example below shows a constraint rule is violated and `rollBackOnFailure` is `false` :



```
{
  "addResults": [],
  "updateResults": [
    {
      "objectId": 2,
      "globalId": "{B703ACAC-A1A8-4F49-BB19-1E684A67A265}",
      "success": false,
      "error": {
        "code": 1019,
        "extendedCode": -2147207418,
        "description": "Violated attribute constraint rule. [Error No: -1, ]"
      }
    },
    {
      "objectId": 1,
      "globalId": "{2FACC38A-3E3E-43A5-A6EB-BC9075407EC8}",
      "success": true
    }
  ],
  "deleteResults": []
}
```

### Example six

The example below shows `async` is `true` and a status URL is returned:



```
{
  "statusUrl": "https://organization.example.com/<context>/rest/services/testservice/FeatureServer/jobs/sf_j9563cb9e-8cf4-4c99-945d-09e43d408ac7/status"
}
```

Making a request to a job status URL will return the following response once the operation has completed:



```
{
  "status": "COMPLETED",
  "resultUrl": " https://organization.example.com/<context>/rest/directories/arcgisoutput/testservice _MapServer/j9563cb9e-8cf4-4c99-945d-09e43d408ac7.json"
}
```

The `resultUrl` returned in the example above gives access to the results of `applyEdits` :



```
{
  "addResults": [
    {
      "objectId": 53,
      "globalId": "{2AF16CAD-D5B8-4F4C-BF36-432FBF660C0B}",
      "success": true
    }
  ],
  "updateResults": [ ],
  "deleteResults": [ ]
}
```

### Example seven

This example shows an error case in which an edit is attempted for a capability that is not supported and `async` is set to `true` . As with example 5, a `statusUrl` value is returned in the response:



```
{
  "statusUrl": "https://organization.example.com/<context>/rest/services/VRNVA/FeatureServer/jobs/sf_j7aadb493-7987-44cb-9a4c-53e1f9fd97bf/status"
}
```

Making a request to a job status URL will return the following response once the operation has completed:



```
{
  "status": "COMPLETED",
  "resultUrl": "https://organization.example.com/<context>/rest/directories/arcgisoutput/VRNVA_MapServer/j7aadb493-7987-44cb-9a4c-53e1f9fd97bf.json"
}
```

In this case, however, information returned from the `resultUrl` value contains the error:



```
{
  "error" : {
    "code" : 400,
    "message" : "Requested operation is not supported by this service.",
    "details" : []
  }
}
```

### Example eight

The example below shows a response in which `returnEditResults` is `false` and the operation is successful:



```
{
  "success": true
}
```

### Example nine

The sample response below is returned when the request sets the `editsUploadId` parameter to reference a file where features and attachments were added, updated, and deleted from layer 0:



```
{
  "attachments": {
    "addResults": [
      {
        "success": true,
        "globalId": "{FAA66666-766F-47CA-993B-8A3FC57616A1}",
        "objectId": 63
      }
    ],
    "updateResults": [
      {
        "success": true,
        "globalId": "{469E2233-1F07-43BE-B2C6-155273AA71C5}",
        "objectId": 25
      }
    ],
    "deleteResults": [
      {
        "success": true,
        "globalId": "{D1DE4DE4-196A-4D00-9773-13E4135C40D5}",
        "objectId": 24
      }
    ]
  },
  "addResults": [
    {
      "success": true,
      "globalId": "{B99CA10D-9FDB-447D-9E8B-44AEDC540629}",
      "objectId": 109
    }
  ],
  "updateResults": [
    {
      "success": true,
      "globalId": "{D46CA10D-9FDB-447D-9E8B-44AEDC540629}",
      "objectId": 22
    }
  ],
  "deleteResults": [
    {
      "success": true,
      "globalId": "{69958E11-C6F6-424E-8EEF-E24C0E9B86A6}",
      "objectId": 21
    }
  ]
}
```