# GraphProperty

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphProperty`

## Import

```javascript
import GraphProperty from "@arcgis/core/rest/knowledgeGraph/GraphProperty.js";
```

```javascript
// CDN
const GraphProperty = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphProperty.js");
```

**Since:** 4.25

## Property Details

### `GraphProperty`

### `alias`

### `declaredClass`
- **Type:** `Inherited`

### `defaultValue`

### `defaultVisibility`

### `editable`

### `fieldType`

### `geometryType`

### `hasM`

### `hasZ`

### `name`

### `nullable`

### `required`

### `role`

### `systemMaintained`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
//The `EntityType`  'person' may have the following properties.
[{
  name: "first_name"
  alias: "First Name",
  defaultValue: null,
  defaultVisibility: true,
  editable: true,
  fieldType: "esriFieldTypeString",
  geometryType: "esriGeometryNull",
  hasM: false,
  hasZ: false,
  nullable: true,
  required: false,
  searchable: false,
  systemMaintained: false
},
{
  name: "age",
  alias: "Age",
  defaultValue: null,
  defaultVisibility: true,
  editable: true,
  fieldType: "esriFieldTypeNumber",
  geometryType: "esriGeometryNull",
  hasM: false,
  hasZ: false,
  nullable: false,
  required: false,
  searchable: true,
  systemMaintained: false
}]
```

```javascript
//example of a RelationshipType definition including properties.
{
  "declaredClass": "esri.rest.knowledgeGraph.RelationshipType",
  "name": "employed_by",
  "alias": "Employed By",
  "role": "Regular",
  "strict": false,
  "properties": [{
    "declaredClass": "esri.rest.knowledgeGraph.GraphProperty",
    "name": "id",
    "alias": "id",
    "fieldType": "esriFieldTypeGUID",
    "geometryType": "esriGeometryNull",
    "hasM": false,
    "hasZ": false,
    "nullable": false,
    "editable": false,
    "required": true,
    "defaultVisibility": true,
    "systemMaintained": true,
    "role": "esriGraphPropertyRegular",
    "defaultValue": null
  },
  {
    "declaredClass": "esri.rest.knowledgeGraph.GraphProperty",
    "name": "start_date",
    "alias": "Start Date",
    "fieldType": "esriFieldTypeString",
    "geometryType": "esriGeometryNull",
    "hasM": false,
    "hasZ": false,
    "nullable": false,
    "editable": true,
    "required": true,
    "defaultVisibility": true,
    "systemMaintained": false,
    "role": "esriGraphPropertyRegular",
    "defaultValue": null
  }]
}
```

```javascript
// possible field types
"esriFieldTypeSmallInteger"
"esriFieldTypeInteger"
"esriFieldTypeSingle"
"esriFieldTypeDouble"
"esriFieldTypeLong"
"esriFieldTypeString"
"esriFieldTypeDate"
"esriFieldTypeOID"
"esriFieldTypeGeometry"
"esriFieldTypeBlob"
"esriFieldTypeRaster"
"esriFieldTypeGUID"
"esriFieldTypeGlobalID"
"esriFieldTypeXML"
"esriFieldTypeBigInteger"
"esriFieldTypeTimestampOffset"
"esriFieldTypeTimeOnly"
"esriFieldTypeDateOnly"
```

```javascript
{
	"declaredClass": "esri.rest.knowledgeGraph.EntityType",
	"name": "documents",
	"alias": "Documents",
	"role": "Regular",
	"strict": false,
	"properties": [
		{
			"declaredClass": "esri.rest.knowledgeGraph.GraphProperty",
			"name": "Name",
			"alias": "Name",
			"fieldType": "esriFieldTypeString",
			"geometryType": "esriGeometryNull",
			"hasM": false,
			"hasZ": false,
			"nullable": true,
			"editable": true,
			"required": false,
			"defaultVisibility": true,
			"systemMaintained": false,
			"role": "esriGraphPropertyDocumentName",
			"defaultValue": null
		},
		{
			"declaredClass": "esri.rest.knowledgeGraph.GraphProperty",
			"name": "text",
			"alias": "text",
			"fieldType": "esriFieldTypeString",d
			"geometryType": "esriGeometryNull",
			"hasM": false,
			"hasZ": false,
			"nullable": false,
			"editable": false,
			"required": true,
			"defaultVisibility": true,
			"systemMaintained": true,
			"role": "esriGraphPropertyDocumentText",
			"defaultValue": null
		}
	]
}
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

