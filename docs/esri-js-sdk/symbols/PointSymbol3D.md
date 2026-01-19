# PointSymbol3D

**Module:** `@arcgis/core/symbols/PointSymbol3D`

## Import

```javascript
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
```

```javascript
// CDN
const PointSymbol3D = await $arcgis.import("@arcgis/core/symbols/PointSymbol3D.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - 3D symbols for points
- Renderer
- Graphic
- Sample - Visualize features thematically with multiple variables (3D)
- Sample - Create a local scene
- ArcGIS blog - Working with icons, lines, and fill symbols
- ArcGIS blog - Working with objects, paths, and extrusion
- ArcGIS blog - Using attributes to represent real-world sizes of features
- Sample: Point styles for cities
- Sample: Point styles for cities

## Property Details

### `PointSymbol3D`

### `callout`

### `declaredClass`
- **Type:** `Inherited`

### `styleOrigin`
- **Type:** `Inherited`

### `symbolLayers`

### `type`

### `verticalOffset`

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
    type: "object",  // autocasts as new ObjectSymbol3DLayer()
    width: 5,    // diameter of the object from east to west in meters
    height: 10,  // height of object in meters
    depth: 15,   // diameter of the object from north to south in meters
    resource: { primitive: "cube" },
    material: { color: "red" }
  }]
};
```

```javascript
let symbol = {
  type: "point-3d",  // autocasts as new PointSymbol3D()
  symbolLayers: [...],
  verticalOffset: ...,
  callout: {
    type: "line",  // autocasts as new LineCallout3D()
    size: 1.5,
    color: [150, 150, 150],
    border: {
      color: [50, 50, 50]
    }
  }
};
```

```javascript
let symbol = {
  type: "point-3d",  // autocasts as new PointSymbol3D()
  symbolLayers: [...],
  verticalOffset: {
    screenLength: 40,
    maxWorldLength: 100,
    minWorldLength: 20
  },
  callout: ...
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
// Creates a deep clone of the graphic's symbol
let symLyr = graphic.symbol.clone();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

