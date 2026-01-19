# FillSymbol

**Module:** `@arcgis/core/symbols/FillSymbol`

## Import

```javascript
import FillSymbol from "@arcgis/core/symbols/FillSymbol.js";
```

```javascript
// CDN
const FillSymbol = await $arcgis.import("@arcgis/core/symbols/FillSymbol.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Renderer
- Graphic

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `outline`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let sym = {
  type: "simple-fill",  // autocasts as new SimpleFillSymbol()
  color: "red",
  outline: {  // autocasts as new SimpleLineSymbol()
    color: [128, 128, 128, 0.5],
    width: "0.5px"
  }
};
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

