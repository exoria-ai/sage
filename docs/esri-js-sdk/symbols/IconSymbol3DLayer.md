# IconSymbol3DLayer

**Module:** `@arcgis/core/symbols/IconSymbol3DLayer`

## Import

```javascript
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
```

```javascript
// CDN
const IconSymbol3DLayer = await $arcgis.import("@arcgis/core/symbols/IconSymbol3DLayer.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - 3D icon rotation
- Sample - Visualize features thematically with multiple variables (2D)
- Sample - Flat vs. volumetric 3D symbol layers
- Symbol3DLayer
- Symbol3D
- Renderer
- ArcGIS blog - Working with icons, lines, and fill symbols

## Property Details

### `IconSymbol3DLayer`

### `anchor`

### `anchorPosition`

### `angle`

### `declaredClass`
- **Type:** `Inherited`

### `material`

### `outline`

### `resource`

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
    angle: 90, // degree
    size: 8,  // points
    resource: { primitive: "circle" },
    material: { color: "red" }
  }]
};
```

```javascript
symbolLayer.anchor = "relative";
symbolLayer.anchorPosition = { x: 0, y: 0.5 }; // equivalent to `anchor: "bottom"`
```

```javascript
symbolLayer.anchor = "relative";
symbolLayer.anchorPosition = { x: 1.5, y: 1 }; // the anchor can be placed outside of the icon
```

```javascript
// rotation angle in degree
symbolLayer.angle = 45;
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

