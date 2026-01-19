# RelationshipType

**Module:** `@arcgis/core/rest/knowledgeGraph/RelationshipType`

## Import

```javascript
import RelationshipType from "@arcgis/core/rest/knowledgeGraph/RelationshipType.js";
```

```javascript
// CDN
const RelationshipType = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/RelationshipType.js");
```

**Since:** 4.25

## See Also

- EntityType
- Relationship

## Property Details

### `RelationshipType`

### `alias`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `endPoints`

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
//endpoints for the employed_by relationship
"endpoints": [
 {
  "originEntityType": "Person",
  "destinationEntityType": "Company"
 }
]
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

