# HeightModelInfo

**Module:** `@arcgis/core/geometry/HeightModelInfo`

## Import

```javascript
import HeightModelInfo from "@arcgis/core/geometry/HeightModelInfo.js";
```

```javascript
// CDN
const HeightModelInfo = await $arcgis.import("@arcgis/core/geometry/HeightModelInfo.js");
```

**Since:** 4.5

## See Also

- Vertical coordinate systems

## Property Details

### `HeightModelInfo`

### `declaredClass`
- **Type:** `Inherited`

### `heightModel`

### `heightUnit`

### `vertCRS`

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

