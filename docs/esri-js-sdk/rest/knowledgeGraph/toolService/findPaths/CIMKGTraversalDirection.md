# CIMKGTraversalDirection

**Module:** `@arcgis/core/rest/knowledgeGraph/toolService/findPaths/CIMKGTraversalDirection`

## Import

```javascript
import CIMKGTraversalDirection from "@arcgis/core/rest/knowledgeGraph/toolService/findPaths/CIMKGTraversalDirection.js";
```

```javascript
// CDN
const CIMKGTraversalDirection = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/toolService/findPaths/CIMKGTraversalDirection.js");
```

**Since:** 4.32

## Property Details

### `CIMKGTraversalDirection`

### `declaredClass`
- **Type:** `Inherited`

### `traversalDirectionType`

### `type`

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

