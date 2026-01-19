# Delete Features

> Source: [/rest/services-reference/enterprise/delete-features/](https://developers.arcgis.com/rest/services-reference/enterprise/delete-features/)

**URL:**: https://<root>/<serviceName>/FeatureServer/<layerId>/deleteFeatures

**Methods:**: POST

**Required Capability:**: Delete

**Version Introduced:**: 10.0

## Description

This operation deletes features in a feature layer or table. The `deleteFeatures` operation is performed on a [feature service layer resource](/rest/services-reference/enterprise/layer-feature-service/).

The operation returns the results of the edits in an array of edit result objects. Each edit result identifies a single edit and indicates whether the delete was successful. If not, it includes an error code and an error description.

You can provide arguments to the `deleteFeatures` operation as query parameters defined in the parameters table below.

## New at 11.5

The unique IDs feature has been added to support databases with string ID fields. For more information on unique IDs, see the Layer (Feature Service) page, `uniqueIds` and `useUniqueIds` in the Request parameters table below, and JSON Response syntax (when uniqueIds are specified and layer's uniqueIdInfo.type=simple).

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html .Values: html \| json |
| objectIds | The object IDs of the layer or table to be deleted.Syntax: objectIds=<objectId1>, <objectId2>Example: objectIds=37, 462 |
| where | A where clause for the query filter. Any legal SQL where clause operating on the fields in the layer is allowed. Features conforming to the specified where clause will be deleted.Example: where=POP2000 > 350000 |
| geometry | The geometry to apply as the spatial filter. Features conforming to the spatial relationship (specified using the spatialRel parameter) of this geometry will be deleted. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, you can also specify the geometry of envelopes and points with a simple comma-separated syntax.Syntax:JSON structures: geometryType=<geometryType>&geometry={ geometry}Envelope simple syntax: geometryType=esriGeometryEnvelope&geometry=<xmin>,<ymin>,<xmax>,<ymax>Point simple syntax: geometryType=esriGeometryPoint&geometry=<x>,<y>Examples:geometryType=esriGeometryEnvelope&geometry={xmin: -104, ymin: 35.6, xmax: -94.32, ymax: 41}geometryType=esriGeometryEnvelope&geometry=-104,35.6,-94.32,41geometryType=esriGeometryPoint&geometry=-104,35.6 |
| geometryType | The type of geometry specified by the geometry parameter. The geometry type can be an envelope, a point, a line, or a polygon. The default geometry type is an envelope.Values: esriGeometryPoint \| esriGeometryMultipoint \| esriGeometryPolyline \| esriGeometryPolygon \| esriGeometryEnvelope |
| inSR | The spatial reference of the input geometry .The spatial reference can be specified as either a well-known ID or a spatial reference JSON object.If inSR is not specified, the geometry is assumed to be in the spatial reference of the map. |
| spatialRel | The spatial relationship to be applied to the input geometry while performing the query. The supported spatial relationships include intersects, contains, envelope intersects, within, and so on. The default spatial relationship is intersects (esriSpatialRelIntersects ).Values: esriSpatialRelIntersects \| esriSpatialRelContains \| esriSpatialRelCrosses \| esriSpatialRelEnvelopeIntersects \| esriSpatialRelIndexIntersects \| esriSpatialRelOverlaps \| esriSpatialRelTouches \| esriSpatialRelWithin \| esriSpatialRelRelation |
| gdbVersion | The geodatabase version to apply the edits. This parameter applies only if the isDataVersioned property of the layer is true .If the gdbVersion parameter is not specified, edits are made to the published map’s version.Syntax: gdbVersion=<version>Example: gdbVersion=SDE.DEFAULT |
| returnEditMoment(Optional) | This option was added at 10.5 and works with ArcGIS Server services only.Specifies whether the response will report the time that features were deleted. If returnEditMoment = true , the server will report the time in the response's editMoment key. The default value is false .Values:true\|falseExample: returnEditMoment=true |
| rollbackOnFailure(Optional) | Specifies whether the edits should be applied only if all submitted edits succeed. If false , the server will apply the edits that succeed even if some of the submitted edits fail. If true , the server will apply the edits only if all edits succeed. The default value is true .Not all data supports setting this parameter. Query the supportsRollbackonFailureParameter property of the layer to determine whether a layer supports setting this parameter. If supportsRollbackOnFailureParameter = false for a layer, then when editing this layer, rollbackOnFailure will always be true , regardless of how the parameter is set. However, if supportsRollbackonFailureParameter = true , the rollbackOnFailure parameter value will be honored on edit operations.Values: true\|falseExample: rollbackOnFailure=true |
| returnDeleteResults(Optional) | This option was added at 10.7.Indicates whether a result is returned per deleted row when the deleteFeatures operation is run. The default is true .When supportsReturnDeleteResults is true , you can choose to have a single result returned rather than a result per deleted row returned by setting returnDeleteResults=false . This allows for more efficient bulk delete operations but will report more general information when there is an error.Values: true \| falseExample: returnDeleteResults=true |
| async(Optional) | This option was added at 10.7.Indicates whether to process the deleteFeatures operation as an asynchronous. The default is false .When run with async = true , the operation will return a status URL. Clients can then call on the status URL to see a status of how the operation is progressing. When a status of completed is returned, the operation is complete. This is very similar to how asynchronous processing works with the createReplica and synchronizeReplica operation. See asynchronous operations for more details.Values: true \| falseExample: async=true |
| uniqueIds (Optional) | An array of the unique IDs of the feature(s) to be deleted. useUniqueIds and OIDFieldContainsHashValue must be true when using unique IDs. |
| useUniqueIds (Optional) | Introduced at 11.5. Indicates if unique IDs are being used. Default value is false. useUniqueIds and OIDFieldContainsHashValue must be true when using unique IDs.Values: true \| false |

## Example usage

Delete features using the `deleteFeatures` operation on a feature service layer resource.

`https://services.myserver.com/ERmEceOGq5cHrItq/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0/deleteFeatures`

The input to the `deleteFeatures` operation can be a list of ObjectIDs, where clause, and geometry to apply as a spatial filter.

## JSON Response syntax (when uniqueIds are specified and layer's uniqueIdInfo.type=simple)

`OIDFieldContainsHashValue` is `true` and `useUniqueIds` is `true`.



```
{
  "deleteResults": [
    {
      "success" : <true | false>,
      "objectId": <objectId1>, //server-genererated integer value based on feature's unique IDs
      "uniqueIds": <uniqueIds1>
    }
  ]
}
```

## JSON Response syntax (when uniqueIds are specified and layer's uniqueIdInfo.type=composite)

`OIDFieldContainsHashValue` is `true` and `useUniqueIds` is `true`.



```
{
  "deleteResults": [
    {
      "success" : <true | false>,
      "objectId": <objectId1>, //server-genererated integer value based on feature's unique IDs
      "uniqueIds": [<uniqueIds1>, <uniqueIds2>]
    }
  ]
}
```

## JSON Response syntax (when objectIds are specified)



```
{
  "deleteResults" : [
    {
      "objectId" : <objectId1>,
      "globalId" : <globalId1>,
      "success" : <true | false>,
      "error" : { //only if success is false
        "code" : <code1>,
        "description" : "<description1>",
      }
    },
    {
      "objectId" : <objectId2>,
      "globalId" : <globalId2>,
      "success" : <true | false>,
      "error" : { //only if success is false
        "code" : <code2>,
        "description" : "<description2>",
      }
    }
  ]
}
```

## JSON Response syntax (when objectIds are not specified)



```
{ "success" : true }
```

## JSON Response example



```
{
   "deleteResults": [
   {
    "objectId": 19,
    "success": true
   },
   {
    "objectId": 23,
    "success": true
   }
  ]
}
```

## JSON Response example (when data has uniqueIds and layer's uniqueIdInfo.type=composite)



```
{
  "deleteResults": [
    {
      "success": true,
      "objectId": 5693486419344173481, //server-genererated integer value based on feature's unique IDs
      "uniqueIds": ["98aQ45IB1qj3KCKj7aug","yeXRMZMBed_rc6KBDj6V"]
    },
    {
      "success": true,
      "objectId": 3970651609512467392,
      "uniqueIds": ["v_LwmYcB8pn_00j6g0-_","wPLwmYcB8pn_00j6g0-_"]
    }
  ]
}
```

## JSON Response example (when data has globalIds)



```
{
 "deleteResults": [
  {
   "objectId": 6,
   "globalId": "{12AE3B4A-D8DC-4923-8F19-A78A7C896129}",
   "success": true
  }
 ]
}
```

## JSON Response example (when returnDeleteResults=false)



```
{"success": true}
```