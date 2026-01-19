# ExtrudeSymbol3DLayer

**Module:** `@arcgis/core/symbols/ExtrudeSymbol3DLayer`

## Import

```javascript
import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer.js";
```

```javascript
// CDN
const ExtrudeSymbol3DLayer = await $arcgis.import("@arcgis/core/symbols/ExtrudeSymbol3DLayer.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - Visualize features thematically with extrusion
- Sample - Extrude building footprints based on real world heights
- Symbol3DLayer
- Symbol3D
- Renderer
- ArcGIS blog - Working with objects, paths, and extrusion
- ArcGIS blog - Using attributes to represent real-world sizes of features

## Property Details

### `ExtrudeSymbol3DLayer`

### `castShadows`

### `declaredClass`
- **Type:** `Inherited`

### `edges`

### `material`

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
  type: "polygon-3d",  // autocasts as new PolygonSymbol3D()
  symbolLayers: [{
    type: "extrude",  // autocasts as new ExtrudeSymbol3DLayer()
    size: 100000,  // 100,000 meters in height
    material: { color: "red" }
  }]
};
```

```javascript
// disables shadow casting
symbolLayer.castShadows = false;
```

```javascript
let symbol = {
  type: "polygon-3d", // autocasts as new PolygonSymbol3D()
  symbolLayers: [{
    type: "extrude", // autocasts as new ExtrudeSymbol3DLayer()
    material: {
      color: [244, 247, 134]
    },
    edges: {
      type: "solid", // autocasts as new SolidEdges3D()
      color: [50, 50, 50, 0.5]
    }
  }]
};
```

```javascript
// CSS color string
symbolLayer.material = {
  color: "dodgerblue"
};
```

```javascript
// HEX string
symbolLayer.material = {
  color: "#33cc33";
}
```

```javascript
// array of RGBA values
symbolLayer.material = {
  color: [51, 204, 51, 0.3];
}
```

