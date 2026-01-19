# PathSymbol3DLayer

**Module:** `@arcgis/core/symbols/PathSymbol3DLayer`

## Import

```javascript
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer.js";
```

```javascript
// CDN
const PathSymbol3DLayer = await $arcgis.import("@arcgis/core/symbols/PathSymbol3DLayer.js");
```

**Since:** 4.0

## See Also

- Path visualization in 3D
- Symbol Builder
- Symbol3DLayer
- Symbol3D
- Renderer
- ArcGIS blog - Using attributes to represent real-world sizes of features

## Property Details

### `PathSymbol3DLayer`

### `anchor`

### `cap`

### `castShadows`

### `declaredClass`
- **Type:** `Inherited`

### `height`

### `join`

### `material`

### `profile`

### `profileRotation`

### `type`

### `width`

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
// create a PathSymbol3DLayer with a strip style
let stripPath = {
  type: "line-3d",  // autocasts as new LineSymbol3D()
  symbolLayers: [{
    type: "path",  // autocasts as new PathSymbol3DLayer()
    profile: "quad",  // creates a rectangular shape
    width: 20,  // path width in meters
    height: 5,  // path height in meters
    material: { color: "#ff7380" },
    cap: "square",
    profileRotation: "heading"
  }]
};

// create a PathSymbol3DLayer with a pipe style
let pipePath = {
  type: "line-3d",  // autocasts as new LineSymbol3D()
  symbolLayers: [{
    type: "path",  // autocasts as new PathSymbol3DLayer()
    profile: "circle",  // creates a rectangular shape
    width: 20,  // path width will also set the height to the same value
    material: { color: "#ff7380" },
    cap: "round"
  }]
};
```

```javascript
// disables shadow casting
symbolLayer.castShadows = false;
```

```javascript
// create a path with a wall style
let wallPath = {
  type: "line-3d",  // autocasts as new LineSymbol3D()
  symbolLayers: [{
    type: "path",  // autocasts as new PathSymbol3DLayer()
    profile: "quad",  // creates a rectangular shape
    width: 1,  // path width in meters
    height: 20,  // path height in meters
    material: { color: "#a382cc" }
  }]
};
```

```javascript
// create a path with a pipe style
let wallPath = {
  type: "line-3d",  // autocasts as new LineSymbol3D()
  symbolLayers: [{
    type: "path",  // autocasts as new PathSymbol3DLayer()
    profile: "circle",
    height: 20,  // path width in meters this also sets the width to 20 meters
    material: { color: "##a382cc" }
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

