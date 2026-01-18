# Layer (Feature Service)

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/layer-feature-service/

## Service Info

- **Parameter:** Details
- **returnUpdates:** If value is true , an updated time extent is returned. If the layer is not time-aware, an empty response is returned.Values: true  | false
- **returnDomainNames:** WarningThis parameter is not supported by ArcGIS Enterprise hosted feature services, and is therefore assumed to be false for these services.If value is true , domain information provided in the layer includes only the domain name. To get the full domain information, use the queryDomains operation in the service resource. This domains included in the layer can be used to linked to the full domain information via the domain name. If the value is false  or not set, full domain information is included in the layer as it was in past releases.Values: true  | false
- **f:** The response format. The default response format is html .Values: html  | json  | pjson

## Description

The layer resource represents a single feature layer or a nonspatial table in a feature service. A feature layer is a table or view with at least one spatial column.

For tables, it provides basic information about the table such as its ID, name, fields, types, and templates. For feature layers, in addition to the table information, it provides information such as its geometry type, min and max scales, and spatial reference. Each type includes information about the type, such as the type ID, name, and definition expression. Types also include a default symbol and a list of feature templates. Each feature template includes a template name, description, and prototypical feature.

The property capabilities return Query, Create, Delete, Update, Editing, Sync, Uploads and Extract capabilities. The Editing capability will be included if Create, Delete, or Update is enabled for a feature service.

The geometryType property returns the geometry type of the layer. Five geometry types are supported: point (esriGeometryPoint ), multipoint (esriGeometryMultipoint ), polyline (esriGeometryPolyline ), polygon (esriGeometryPolygon ), and envelope (esriGeometryEnvelope ). To learn more about these supported geometry types, see Geometry objects.

The maxRecordCount property returns the maximum number of records that will be returned at once for a query.

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
9
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

```json
1
2
3
4
5
"parentLayer": {
  "id": 0,
  "name": "topo_1081.GDB.topo_2"
},
...
```

```json
1
2
3
4
5
"uniqueIdInfo": {
    "type": "simple",
    "fields": ["_id"],
    "OIDFieldContainsHashValue": true
}
```

