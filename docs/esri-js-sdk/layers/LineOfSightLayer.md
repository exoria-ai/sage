# LineOfSightLayer

**Module:** `@arcgis/core/layers/LineOfSightLayer`

## Import

```javascript
import LineOfSightLayer from "@arcgis/core/layers/LineOfSightLayer.js";
```

```javascript
// CDN
const LineOfSightLayer = await $arcgis.import("@arcgis/core/layers/LineOfSightLayer.js");
```

**Since:** 4.24

## See Also

- LineOfSightLayerView
- LineOfSightAnalysis
- LineOfSightAnalysisTarget
- LineOfSightAnalysisObserver
- LineOfSightAnalysisView3D
- Line Of Sight component
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

### `LineOfSightLayer`

### `analysis`

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

### `observer`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `spatialReference`

### `targets`

### `title`
- **Type:** `Inherited`

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
// create line of sight analysis
const lineOfSightAnalysis = new LineOfSightAnalysis({
  observer: new LineOfSightAnalysisObserver({ position: new Point({ }) }),
  targets:[
    new LineOfSightAnalysisTarget({ position: new Point({ }) })
  ]
});

// Create the layer with the analysis.
const lineOfSightLayer = new LineOfSightLayer({
  analysis: lineOfSightAnalysis
});

// add to the map
view.map.add(lineOfSightLayer);
```

```javascript
// wait for the view to not be updating to ensure we get the latest results
await reactiveUtils.whenOnce(() => !view.updating);

// retrieve the results from the layer view
const lineOfSightLayerView = await view.whenLayerView(lineOfSightLayer);
const results = lineOfSightLayerView.results;

// enable editing existing analysis interactively
lineOfSightLayerView.interactive = true;
```

```javascript
const abortController = new AbortController();

try {
  await lineOfSightLayerView.place({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Placement operation was cancelled.");
  }
}

// cancel the placement operation at some later point
abortController.abort();
```

```javascript
const lineOfSightLayer = new LineOfSightLayer();
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

