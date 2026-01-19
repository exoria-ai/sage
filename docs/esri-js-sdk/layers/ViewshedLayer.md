# ViewshedLayer

**Module:** `@arcgis/core/layers/ViewshedLayer`

## Import

```javascript
import ViewshedLayer from "@arcgis/core/layers/ViewshedLayer.js";
```

```javascript
// CDN
const ViewshedLayer = await $arcgis.import("@arcgis/core/layers/ViewshedLayer.js");
```

**Since:** 4.31

## See Also

- ViewshedLayerView
- Viewshed
- ViewshedAnalysis
- ViewshedAnalysisView3D
- Sample - ViewshedLayer in slides
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

### `ViewshedLayer`

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
// create analysis with viewshed
const viewshedAnalysis = new ViewshedAnalysis({
   viewsheds: [
     new Viewshed({
       observer: new Point({ }),
       farDistance: 900,
       heading: 64,
       tilt: 84,
       horizontalFieldOfView: 85,
       verticalFieldOfView: 52
     })
   ]
});

// add analysis to the layer
const viewshedLayer = new ViewshedLayer({
   source: viewshedAnalysis,
});

// add layer to the map
view.map.add(viewshedLayer);
```

```javascript
// retrieve layer view for the layer
const viewshedLayerView = await view.whenLayerView(viewshedLayer);

// allow existing viewsheds in the layer to be selected and edited
// select a viewshed by hovering and clicking on their field-of-view manipulators
viewshedLayerView.interactive = true;

// start placing new viewsheds interactively
const abortController = new AbortController();

try {
  await viewshedLayerView.place({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Placement operation was cancelled.");
  }
}

// cancel the placement operation at some later point
abortController.abort();
```

```javascript
const viewshedLayer = new ViewshedLayer();
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

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

