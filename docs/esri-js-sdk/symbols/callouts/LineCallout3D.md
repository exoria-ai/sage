# LineCallout3D

**Module:** `@arcgis/core/symbols/callouts/LineCallout3D`

## Import

```javascript
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D.js";
```

```javascript
// CDN
const LineCallout3D = await $arcgis.import("@arcgis/core/symbols/callouts/LineCallout3D.js");
```

**Since:** 4.4

## See Also

- Sample: Point styles for cities
- Sample: Using callout lines with labels

## Property Details

### `LineCallout3D`

### `border`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `size`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
let symbol = {
  type: "point-3d",  // autocasts as new PointSymbol3D()
  symbolLayers: [{
    type: "icon",  // autocasts as new IconSymbol3DLayer()
    resource: {
      href: "CityHall.svg"
    },
    size: 20
  }],
  verticalOffset: {
    screenLength: 40,
    maxWorldLength: 100,
    minWorldLength: 20
  },
  callout: {
    type: "line", // autocasts as new LineCallout3D()
    size: 1.5,
    color: "white",
    border: {
      color: "black"
    }
  }
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

