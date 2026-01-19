# Symbol3DVerticalOffset

**Module:** `@arcgis/core/symbols/support/Symbol3DVerticalOffset`

## Import

```javascript
import Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset.js";
```

```javascript
// CDN
const Symbol3DVerticalOffset = await $arcgis.import("@arcgis/core/symbols/support/Symbol3DVerticalOffset.js");
```

## See Also

- PointSymbol3D.verticalOffset
- LabelSymbol3D.verticalOffset
- Sample: Using callout lines with labels

## Property Details

### `Symbol3DVerticalOffset`

### `declaredClass`
- **Type:** `Inherited`

### `maxWorldLength`

### `minWorldLength`

### `screenLength`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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

