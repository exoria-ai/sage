# DimensionLayer

**Module:** `@arcgis/core/layers/DimensionLayer`

## Import

```javascript
import DimensionLayer from "@arcgis/core/layers/DimensionLayer.js";
```

```javascript
// CDN
const DimensionLayer = await $arcgis.import("@arcgis/core/layers/DimensionLayer.js");
```

**Since:** 4.25

## See Also

- DimensionLayerView
- DimensionAnalysis
- LengthDimension
- DimensionSimpleStyle
- DimensionAnalysisView3D
- Sample - Length dimensioning
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `DimensionLayer`

### `declaredClass`
- **Type:** `Inherited`

### `fullExtent`

### `id`
- **Type:** `Inherited`

### `listMode`
- **Type:** `Inherited`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `source`

### `spatialReference`

### `style`

### `title`

### `type`

### `uid`
- **Type:** `Inherited`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `createLayerView`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `load`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// create analysis with dimensions
const dimensionAnalysis = new DimensionAnalysis({
   dimensions: [
     new LengthDimension({
       startPoint: new Point({ }),
       endPoint: new Point({ })
     })
   ]
});
// add analysis to the layer and style it
const dimensionLayer = new DimensionLayer({
   source: dimensionAnalysis,
   style: new DimensionSimpleStyle({
     color: "white"
   }),
});

// add layer to scene view
view.map.add(dimensionLayer);
```

```javascript
// retrieve measured results from the layer view
const dimensionLayerView = await view.whenLayerView(dimensionLayer);
const results = dimensionLayerView.results;
```

```javascript
// retrieve layer view for the layer
const dimensionLayerView = await view.whenLayerView(dimensionLayer);

// allow existing length dimensions in the layer to be selected and edited
// select a dimensions by hovering and clicking on their offset manipulator
dimensionLayerView.interactive = true;

const abortController = new AbortController();

try {
  // start placing a new dimension interactively
  await dimensionLayerView.place({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Placement operation was cancelled.");
  }
}

// cancel the placement operation at some later point
abortController.abort();
```

```javascript
const dimensionLayer = new DimensionLayer();
```

```javascript
// The layer is no longer visible in the view
layer.visible = false;

// Watch for changes in the layer's visibility
// and set the visibility of another layer when it changes
reactiveUtils.watch(
  () => layer.visible,
  (visible) => {
    if (visible) {
      anotherLayer.visible = true;
    } else {
      anotherLayer.visible = false;
    }
  }
);
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

