# FieldIndex

**Module:** `@arcgis/core/rest/knowledgeGraph/FieldIndex`

## Import

```javascript
import FieldIndex from "@arcgis/core/rest/knowledgeGraph/FieldIndex.js";
```

```javascript
// CDN
const FieldIndex = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/FieldIndex.js");
```

**Since:** 4.25

## Property Details

### `FieldIndex`

### `ascending`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `fieldNames`

### `name`

### `unique`

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
//example of a field index on the `name` field
"fieldIndexes": [
  {
    "declaredClass": "esri.rest.knowledgeGraph.FieldIndex",
    "name": "esri__name_idx",
    "unique": true,
    "ascending": true,
    "description": "index on name field",
    "fieldNames": [
      "name"
    ]
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

