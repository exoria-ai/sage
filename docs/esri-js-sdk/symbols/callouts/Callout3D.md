# Callout3D

**Module:** `@arcgis/core/symbols/callouts/Callout3D`

## Import

```javascript
import Callout3D from "@arcgis/core/symbols/callouts/Callout3D.js";
```

```javascript
// CDN
const Callout3D = await $arcgis.import("@arcgis/core/symbols/callouts/Callout3D.js");
```

**Since:** 4.4

## Property Details

### `Callout3D`

### `declaredClass`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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

