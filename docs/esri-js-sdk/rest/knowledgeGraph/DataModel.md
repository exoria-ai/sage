# DataModel

**Module:** `@arcgis/core/rest/knowledgeGraph/DataModel`

## Import

```javascript
import DataModel from "@arcgis/core/rest/knowledgeGraph/DataModel.js";
```

```javascript
// CDN
const DataModel = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/DataModel.js");
```

**Since:** 4.25

## See Also

- EntityType
- RelationshipType
- knowledgeGraphService.fetchKnowledgeGraph()
- knowledgeGraphService.refreshDataModel()

## Property Details

### `arcgisManaged`

### `declaredClass`
- **Type:** `Inherited`

### `entityTypes`

### `identifierInfo`

### `metaEntityTypes`

### `provenanceSourceTypeValues`

### `relationshipTypes`

### `searchIndexes`

### `spatialReference`

### `strict`

### `timestamp`

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
"identifierInfo": {
 	"IdentifierMappingInfo": {
 		"databaseNativeIdentifier": null,
 		"identifierInfoType": "esriIdentifierInfoTypeUniformProperty",
 		"uniformPropertyIdentifier": {
 			"identifierPropertyName": "globalid"
 		}
 	},
 	"identifierGenerationInfo": {
 		"uuidMethodHint": "esriUUIDESRI"
 	}
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

