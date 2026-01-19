# LinkChartProperties

**Module:** `@arcgis/core/linkChart/LinkChartProperties`

## Import

```javascript
import LinkChartProperties from "@arcgis/core/linkChart/LinkChartProperties.js";
```

```javascript
// CDN
const LinkChartProperties = await $arcgis.import("@arcgis/core/linkChart/LinkChartProperties.js");
```

**Since:** 4.31

## See Also

- Web Map Specification | Link chart Properties

## Property Details

### `LinkChartProperties`

### `declaredClass`
- **Type:** `Inherited`

### `layoutSettings`

### `layoutType`

### `nonspatialDataDisplay`

### `relationshipsUrl`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


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

