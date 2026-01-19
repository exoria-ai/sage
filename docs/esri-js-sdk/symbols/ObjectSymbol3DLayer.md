# ObjectSymbol3DLayer

**Module:** `@arcgis/core/symbols/ObjectSymbol3DLayer`

## Import

```javascript
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
```

```javascript
// CDN
const ObjectSymbol3DLayer = await $arcgis.import("@arcgis/core/symbols/ObjectSymbol3DLayer.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - Flat vs. volumetric 3D symbol layers
- Sample - Visualize features thematically with multiple variables (3D)
- Sample - Visualize features with realistic 3D symbols
- Symbol3DLayer
- Symbol3D
- Renderer
- ArcGIS blog - Working with objects, paths, and extrusion
- ArcGIS blog - Using attributes to represent real-world sizes of features
- Sample: Visualize features with realistic 3D symbols

## Property Details

### `ObjectSymbol3DLayer`

### `anchor`

### `anchorPosition`

### `castShadows`

### `declaredClass`
- **Type:** `Inherited`

### `depth`

### `heading`

### `height`

### `material`

### `resource`

### `roll`

### `tilt`

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
// symbol using a cylinder as a resource
const symbol = new PointSymbol3D ({
  symbolLayers: [ new ObjectSymbol3DLayer({
    width: 5,  // diameter of the object from east to west in meters
    height: 20,  // height of the object in meters
    depth: 15,  // diameter of the object from north to south in meters
    resource: { primitive: "cylinder" },
    material: { color: "red" }
  })]
});
```

```javascript
// symbol using a glTF 3D model as a resource
const symbol = new PointSymbol3D({
  symbolLayers: [ new ObjectSymbol3DLayer({
    resource: {
      href: "../3d-assets/model.gltf"
    },
    height: 3,
    material: {
      color: "red"
    }
  })]
});
```

```javascript
symbolLayer.anchor = "relative";
symbolLayer.anchorPosition = { x: 0, y: 0, z: -0.5 }; // equivalent to `anchor: "bottom"`
```

```javascript
symbolLayer.anchor = "relative";
symbolLayer.anchorPosition = { x: 1.5, y: 1, z: 0 }; // the anchor can be placed outside of the symbol's bounding box
```

```javascript
// disables shadow casting
symbolLayer.castShadows = false;
```

```javascript
// depth of the symbol in meters
symbolLayer.depth = 5000;
```

