# SourceTypeValueBehavior

**Module:** `@arcgis/core/rest/knowledgeGraph/SourceTypeValueBehavior`

## Import

```javascript
import SourceTypeValueBehavior from "@arcgis/core/rest/knowledgeGraph/SourceTypeValueBehavior.js";
```

```javascript
// CDN
const SourceTypeValueBehavior = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/SourceTypeValueBehavior.js");
```

**Since:** 4.31

## Property Details

### `SourceTypeValueBehavior`

### `behavior`

### `declaredClass`
- **Type:** `Inherited`

### `value`

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

