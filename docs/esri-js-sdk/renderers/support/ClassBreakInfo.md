# ClassBreakInfo

**Module:** `@arcgis/core/renderers/support/ClassBreakInfo`

## Import

```javascript
import ClassBreakInfo from "@arcgis/core/renderers/support/ClassBreakInfo.js";
```

```javascript
// CDN
const ClassBreakInfo = await $arcgis.import("@arcgis/core/renderers/support/ClassBreakInfo.js");
```

**Since:** 4.0

## See Also

- ClassBreaksRenderer
- Guide - Esri color ramps
- Guide - Visualization best practices
- Guide - Esri color ramps
- Guide - Visualization best practices

## Property Details

### `ClassBreakInfo`

### `declaredClass`
- **Type:** `Inherited`

### `label`

### `maxValue`

### `minValue`

### `symbol`

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
// Creates a deep clone of the first class break in the renderer
let firstClassBreak = renderer.classBreaks[0].clone();
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

