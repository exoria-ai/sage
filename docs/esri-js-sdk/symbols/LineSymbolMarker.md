# LineSymbolMarker

**Module:** `@arcgis/core/symbols/LineSymbolMarker`

## Import

```javascript
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
```

```javascript
// CDN
const LineSymbolMarker = await $arcgis.import("@arcgis/core/symbols/LineSymbolMarker.js");
```

**Since:** 4.16

## See Also

- Symbol Builder
- Renderer
- Graphic

## Property Details

### `LineSymbolMarker`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `placement`

### `style`

### `type`

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
const lineSymbol = new SimpleLineSymbol({
   color: "gray",
   width: 1.5,
   // Define a blue "x" marker at the beginning of the line
   marker: { // autocasts from LineSymbolMarker
      style: "x",
      color: "blue",
      placement: "begin"
   }
});
```

```javascript
const lineSymbolMarker = new LineSymbolMarker({
  color: "blue",
  placement: "begin-end",
  style: "arrow"
});
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

