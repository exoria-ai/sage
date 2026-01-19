# EntityType

**Module:** `@arcgis/core/rest/knowledgeGraph/EntityType`

## Import

```javascript
import EntityType from "@arcgis/core/rest/knowledgeGraph/EntityType.js";
```

```javascript
// CDN
const EntityType = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/EntityType.js");
```

**Since:** 4.25

## See Also

- Entity
- RelationshipType

## Property Details

### `EntityType`

### `alias`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `fieldIndexes`
- **Type:** `Inherited`

### `name`
- **Type:** `Inherited`

### `properties`
- **Type:** `Inherited`

### `role`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
//sample structure of an entity type
{
 "declaredClass": "esri.rest.knowledgeGraph.EntityType",
 "name": "company",
 "alias": "Company",
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
     "role": "esriGraphPropertyRegular",
     "defaultValue": null
   },
   {
     "declaredClass": "esri.rest.knowledgeGraph.GraphProperty",
     "name": "id",
     "alias": "ID",
     "fieldType": "esriFieldTypeOID",
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
   }
 ],
 "fieldIndexes": [
   {
     "declaredClass": "esri.rest.knowledgeGraph.FieldIndex",
     "name": "esri__id_idx",
     "unique": true,
     "ascending": true,
     "description": "",
     "fieldNames": [
       "id"
     ]
   },
   {
     "declaredClass": "esri.rest.knowledgeGraph.FieldIndex",
     "name": "esri__name_idx",
     "unique": true,
     "ascending": true,
     "description": "",
     "fieldNames": [
       "name"
     ]
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

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

