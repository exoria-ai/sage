# WaterSymbol3DLayer

**Module:** `@arcgis/core/symbols/WaterSymbol3DLayer`

## Import

```javascript
import WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer.js";
```

```javascript
// CDN
const WaterSymbol3DLayer = await $arcgis.import("@arcgis/core/symbols/WaterSymbol3DLayer.js");
```

**Since:** 4.12

## See Also

- Realistic water visualization in 3D

## Property Details

### `WaterSymbol3DLayer`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `type`

### `waterbodySize`

### `waveDirection`

### `waveStrength`

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
const waterLayer = new FeatureLayer({
  ...,
  renderer: {
    type: "simple",
    symbol: {
      type: "polygon-3d",
      symbolLayers: [{
        type: "water",
        waveDirection: 180,
        color: "#5975a3",
        waveStrength: "moderate",
        waterbodySize: "small"
      }]
    }
  }
});
```

```javascript
// a new color by a HEX string
symbolLayer.color = "#005b66";
```

```javascript
// sets the waterBodySize for an ocean like waterbody.
symbolLayer.waterbodySize = "large";
```

```javascript
// sets the wave direction to 215 degrees
symbolLayer.waveDirection = 215;
```

```javascript
// sets the wave strength to small waves
symbolLayer.waveStrength = "slight";
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

