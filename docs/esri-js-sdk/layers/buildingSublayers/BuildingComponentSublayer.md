# BuildingComponentSublayer

**Module:** `@arcgis/core/layers/buildingSublayers/BuildingComponentSublayer`

## Import

```javascript
import BuildingComponentSublayer from "@arcgis/core/layers/buildingSublayers/BuildingComponentSublayer.js";
```

```javascript
// CDN
const BuildingComponentSublayer = await $arcgis.import("@arcgis/core/layers/buildingSublayers/BuildingComponentSublayer.js");
```

**Since:** 4.10

## See Also

- Sample - BuildingSceneLayer with Slice widget
- BuildingSceneLayer
- BuildingComponentSublayerView
- BuildingGroupSublayer
- SceneLayer
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- FeatureLayer.queryObjectIds

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `fields`

### `globalIdField`

### `id`
- **Type:** `Inherited`

### `isEmpty`
- **Type:** `Inherited`

### `listMode`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `modelName`
- **Type:** `Inherited`

### `objectIdField`

### `opacity`
- **Type:** `Inherited`

### `outFields`

### `popupEnabled`

### `popupTemplate`

### `renderer`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `createPopupTemplate`

### `createQuery`

### `getField`

### `getFieldDomain`

### `getFieldUsageInfo`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `removeHandles`
- **Type:** `Inherited`

### `when`


## Method Details

### `Method Details()`


## Examples

```javascript
// use modelName to identify a sublayer
const doorslayer = buildingSceneLayer.allSublayers.find(function(sublayer) {
  return sublayer.modelName === "Doors";
});
```

```javascript
// all features in the layer will be visualized with
// a blue color
sublayer.renderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: {
    type: "mesh-3d",  // autocasts as new MeshSymbol3D()
    symbolLayers: [{
      type: "fill",  // autocasts as new FillSymbol3DLayer()
      material: { color: "blue" }
    }]
  }
};
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

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

```javascript
// Although this example uses MapView, any class instance that is a promise may use when() in the same way
let view = new MapView();
view.when(function(){
  // This function will execute once the promise is resolved
}, function(error){
  // This function will execute if the promise is rejected due to an error
});
```

