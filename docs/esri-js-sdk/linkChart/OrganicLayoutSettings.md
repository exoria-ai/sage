# OrganicLayoutSettings

**Module:** `@arcgis/core/linkChart/OrganicLayoutSettings`

## Import

```javascript
import OrganicLayoutSettings from "@arcgis/core/linkChart/OrganicLayoutSettings.js";
```

```javascript
// CDN
const OrganicLayoutSettings = await $arcgis.import("@arcgis/core/linkChart/OrganicLayoutSettings.js");
```

**Since:** 4.32

## See Also

- Web Map Specification | Link chart organic layout settings

## Property Details

### `OrganicLayoutSettings`

### `absoluteIdealEdgeLength`

### `autoRepulsionRadius`

### `computationBudgetTime`

### `declaredClass`
- **Type:** `Inherited`

### `idealEdgeLengthType`

### `multiplicativeIdealEdgeLength`

### `repulsionRadiusMultiplier`

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

