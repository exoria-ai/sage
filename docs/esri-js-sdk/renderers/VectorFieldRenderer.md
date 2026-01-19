# VectorFieldRenderer

**Module:** `@arcgis/core/renderers/VectorFieldRenderer`

## Import

```javascript
import VectorFieldRenderer from "@arcgis/core/renderers/VectorFieldRenderer.js";
```

```javascript
// CDN
const VectorFieldRenderer = await $arcgis.import("@arcgis/core/renderers/VectorFieldRenderer.js");
```

**Since:** 4.17

## See Also

- Sample - Visualizing wind data with VectorFieldRenderer
- Sample - Visualizing wind data with VectorFieldRenderer
- Styles and data visualization

## Property Details

### `VectorFieldRenderer`

### `attributeField`

### `declaredClass`
- **Type:** `Inherited`

### `flowRepresentation`

### `style`

### `symbolTileSize`

### `type`

### `visualVariables`

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
const renderer = new VectorFieldRenderer({
  style: "beaufort-kn", // Beaufort point symbol (knots)
  flowRepresentation: "flow-from", // show flow to angle for wind direction
  symbolTileSize: 10, // draw one symbol in every 10x10 pixels
   visualVariables: [
     {
       type: "size",
       field: "Magnitude", // values read from the first band
       maxDataValue: 32,
       maxSize: "100px",
       minDataValue: 0.04,
       minSize: "8px"
     },
     {
       type: "rotation",
       field: "Direction", // values read from the second band
       rotationType: "geographic"
     }
   ]
});
```

```javascript
const renderer = new VectorFieldRenderer({
  style: "beaufort-kn", // Beaufort point symbol (knots)
  flowRepresentation: "flow-from", // show flow to angle for wind direction
  symbolTileSize: 10, // controls the density of the displayed vector symbols.
   visualVariables: [
     {
       type: "size",
       field: "Magnitude", // values read from the first band
       maxDataValue: 32,
       maxSize: "100px",
       minDataValue: 0.04,
       minSize: "8px"
     },
     {
       type: "rotation",
       field: "Direction", // values read from the second band
       rotationType: "geographic"
     }
   ]
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
// Creates a deep clone of the first layer's renderer
let renderer = view.map.layers.at(0).renderer.clone();
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

