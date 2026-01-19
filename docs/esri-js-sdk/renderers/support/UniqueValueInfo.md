# UniqueValueInfo

**Module:** `@arcgis/core/renderers/support/UniqueValueInfo`

## Import

```javascript
import UniqueValueInfo from "@arcgis/core/renderers/support/UniqueValueInfo.js";
```

```javascript
// CDN
const UniqueValueInfo = await $arcgis.import("@arcgis/core/renderers/support/UniqueValueInfo.js");
```

**Since:** 4.0

## See Also

- UniqueValueRenderer
- Guide - Esri color ramps
- Guide - Visualization best practices
- Guide - Esri color ramps
- Guide - Visualization best practices

## Property Details

### `UniqueValueInfo`

### `declaredClass`
- **Type:** `Inherited`

### `label`

### `symbol`

### `value`

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
// Creates a deep clone of the first unique value info in the renderer
let firstInfo = renderer.uniqueValueInfos[0].clone();
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

