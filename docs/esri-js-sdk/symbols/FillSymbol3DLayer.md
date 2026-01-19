# FillSymbol3DLayer

**Module:** `@arcgis/core/symbols/FillSymbol3DLayer`

## Import

```javascript
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
```

```javascript
// CDN
const FillSymbol3DLayer = await $arcgis.import("@arcgis/core/symbols/FillSymbol3DLayer.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - SceneLayer
- Symbol3DLayer
- Symbol3D
- Renderer
- ArcGIS blog - Working with icons, lines, and fill symbols
- Sample: Coloring options for textured buildings

## Property Details

### `FillSymbol3DLayer`

### `castShadows`

### `declaredClass`
- **Type:** `Inherited`

### `edges`

### `material`

### `outline`

### `pattern`

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
const symbol = {
  type: "polygon-3d",  // autocasts as new PolygonSymbol3D()
  symbolLayers: [{
    type: "fill",  // autocasts as new FillSymbol3DLayer()
    material: { color: "red" }
  }]
};
```

```javascript
// disables shadow casting
symbolLayer.castShadows = false;
```

```javascript
const symbol = {
  type: "mesh-3d", // autocasts as new MeshSymbol3D()
  symbolLayers: [{
    type: "fill", // autocasts as new FillSymbol3DLayer()
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
  color: "dodgerblue",
  colorMixMode: "tint"
};
```

```javascript
// HEX string
symbolLayer.material = {
  color: "#33cc33"
}
```

```javascript
// array of RGBA values
symbolLayer.material = {
  color: [51, 204, 51, 0.3]
}
```

