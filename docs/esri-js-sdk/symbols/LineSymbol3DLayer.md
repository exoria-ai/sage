# LineSymbol3DLayer

**Module:** `@arcgis/core/symbols/LineSymbol3DLayer`

## Import

```javascript
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
```

```javascript
// CDN
const LineSymbol3DLayer = await $arcgis.import("@arcgis/core/symbols/LineSymbol3DLayer.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - 3D hiking map with line patterns
- Sample - Line markers and label placement
- Symbol3DLayer
- Symbol3D
- Renderer
- ArcGIS blog - Working with icons, lines, and fill symbols

## Property Details

### `LineSymbol3DLayer`

### `cap`

### `declaredClass`
- **Type:** `Inherited`

### `join`

### `marker`

### `material`

### `pattern`

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
const symbol = {
  type: "line-3d",  // autocasts as new LineSymbol3D()
  symbolLayers: [{
    type: "line",  // autocasts as new LineSymbol3DLayer()
    size: 2,  // points
    material: { color: "black" },
    cap: "round",
    join: "round",
    pattern: {  // autocasts as new LineStylePattern3D()
      type: "style",
      style: "dash"
    },
    marker: {  // autocasts as new LineStyleMarker3D()
      type: "style",
      style: "arrow",
      placement: "end",
      color: "red"  // black line with red arrows
    }
  }]
};
```

```javascript
const symbol = {
  type: "line-3d",  // autocasts as new LineSymbol3D()
  symbolLayers: [{
    type: "line",  // autocasts as new LineSymbol3DLayer()
    material: { color: "black" },
    marker: {  // autocasts as new LineStyleMarker3D()
      type: "style",
      style: "arrow",
      placement: "end",
      color: "red"  // black line with red arrows
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

```javascript
// object with rgba properties
symbolLayer.material = {
  color: {
    r: 51,
    g: 51,
    b: 204,
    a: 0.7
  }
};
```

