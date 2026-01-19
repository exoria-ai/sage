# SimpleRenderer

**Module:** `@arcgis/core/renderers/SimpleRenderer`

## Import

```javascript
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
```

```javascript
// CDN
const SimpleRenderer = await $arcgis.import("@arcgis/core/renderers/SimpleRenderer.js");
```

**Since:** 4.0

## See Also

- Styles and data visualization
- Sample - Visualize features with simple symbols
- Sample - SceneLayer
- Sample - Continuous color
- Sample - Continuous size
- Sample - Visualize features with realistic 3D symbols
- Styles and data visualization

## Property Details

### `SimpleRenderer`

### `declaredClass`
- **Type:** `Inherited`

### `label`

### `symbol`

### `type`

### `visualVariables`

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
// Set a basic symbol on a layer to visualize all features the same way
let citiesRenderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: {
    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
    size: 6,
    color: "black",
    outline: {  // autocasts as new SimpleLineSymbol()
      width: 0.5,
      color: "white"
    }
  }
};
let citiesLayer = new FeatureLayer({
  url: "http://url.to.service",
  renderer: citiesRenderer
});
```

```javascript
// Set a continuous color ramp on the renderer with visual variables
let citiesRenderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
  visualVariables: [{
    type: "color",
    field: "POPULATION",
    normalizationField: "SQ_KM",
    // features with 30 ppl/sq km or below are assigned the first color
    stops: [{ value: 100, color: "#fffcd4" },
          { value: 500, color: "#0d2644" }]
  }]
};
let citiesLayer = new FeatureLayer({
  url: "http://url.to.service",
  renderer: citiesRenderer
});
```

```javascript
let renderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: {
    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
    color: [ 255, 128, 0, 0.5 ],
    outline: {  // autocasts as new SimpleLineSymbol()
      width: 1,
      color: "white"
    }
  }
};
```

```javascript
renderer.visualVariables = [{
  type: "size",
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY",
  legendOptions: {
    title: "% population in poverty by county"
  },
  stops: [
    { value: 0.15, size: 4, label: "<15%" },
    { value: 0.25, size: 12, label: "25%" },
    { value: 0.35, size: 24, label: ">35%" }
  ]
}];
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

