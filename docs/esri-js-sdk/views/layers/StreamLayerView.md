# StreamLayerView

**Module:** `@arcgis/core/views/layers/StreamLayerView`

## Import

```javascript
import StreamLayerView from "@arcgis/core/views/layers/StreamLayerView.js";
```

**Since:** 4.4

## See Also

- StreamLayer
- Sample - Add StreamLayer to your Map
- StreamLayer.featureEffect
- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- Sample - Filter features by attributes
- Sample - Filter features by geometry
- highlight()
- Sample: Highlight SceneLayer
- Sample: Highlight point features
- suspended
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended
- disconnect
- connect
- View.highlights
- Sample: Highlight features by geometry
- Sample: Highlight point features
- resume
- pause

## Property Details

### `connectionError`

### `connectionStatus`

### `declaredClass`
- **Type:** `Inherited`

### `featureEffect`

### `filter`

### `highlightOptions`

### `layer`
- **Type:** `Inherited`

### `spatialReferenceSupported`
- **Type:** `Inherited`

### `suspended`
- **Type:** `Inherited`

### `uid`
- **Type:** `Inherited`

### `updating`
- **Type:** `Inherited`

### `view`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `visibleAtCurrentScale`
- **Type:** `Inherited`

### `visibleAtCurrentTimeExtent`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `connect`

### `createQuery`

### `disconnect`

### `emit`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `highlight`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `on`

### `pause`

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryLatestObservations`

### `queryObjectIds`

### `removeHandles`
- **Type:** `Inherited`

### `resume`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// gray out features that fall outside of the 3 mile buffer of the mouse's location
// by setting feature effect on excluded features
layerView.featureEffect = new FeatureEffect({
  filter: new FeatureFilter({
    geometry: filterGeometry,
    spatialRelationship: "intersects",
    distance: 3,
    units: "miles"
  }),
  excludedEffect: "grayscale(100%) opacity(30%)"
});
```

```javascript
// Apply a drop-shadow feature effect to the features that intersect the borough boundaries,
// while applying blur and brightness effects to the features that are excluded from filter criteria.
// The resulting map will make it easier to spot if the residents are more likely to experience deprivation
// if they live on a borough boundary.
const featureFilter = new FeatureFilter({
  where: "BoroughEdge='true'"
});
layerView.featureEffect = new FeatureEffect({
  filter: featureFilter,
  includedEffect: "drop-shadow(3px, 3px, 3px, black)",
  excludedEffect: "blur(1px) brightness(65%)"
});
```

```javascript
// display earthquakes that have
// magnitude value of 3 or higher
layerView.filter = new FeatureFilter({
  where: "mag >= 3",
});
```

```javascript
// Features in the layerview will be highlighted with bright
// yellow colors in the map.
const layerView = await view.whenLayerView(layer);
layerView.highlightOptions = {
  color: [255, 255, 0, 1],
  haloOpacity: 0.9,
  fillOpacity: 0.2
};
```

```javascript
// Check for the first time layerView.updating becomes false. Then query for
// features that are visible within the view associated with the layer view.
await reactiveUtils.whenOnce(() => !layerView.updating);
const query = layerView.createQuery();
query.geometry = layerView.view.extent;
const result = layerView.queryFeatures(query);
```

```javascript
// Check for the first time layerView.updating becomes false. Then query for
// features that are visible within the view associated with the layer view.
await reactiveUtils.whenOnce(() => !layerView.updating);
const query = layerView.createQuery();
query.geometry = layerView.view.extent;
const result = layerView.queryFeatures(query);
```

