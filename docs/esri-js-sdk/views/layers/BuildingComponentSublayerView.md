# BuildingComponentSublayerView

**Module:** `@arcgis/core/views/layers/BuildingComponentSublayerView`

## Import

```javascript
import BuildingComponentSublayerView from "@arcgis/core/views/layers/BuildingComponentSublayerView.js";
```

**Since:** 4.17

## See Also

- BuildingSceneLayerView
- BuildingComponentSublayer.outFields

## Property Details

### `availableFields`

### `declaredClass`
- **Type:** `Inherited`

### `filter`

### `sublayer`

### `suspended`

### `updating`

### `addHandles`
- **Type:** `Inherited`

### `createQuery`

### `hasHandles`
- **Type:** `Inherited`

### `highlight`

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// query all sublayers for features that satisfy the sql expression
let query = new Query();
query.where = "FamilyType = 'Landscape'";
view.whenLayerView(buildingSceneLayer).then(function(bslv) {
   bslv.sublayerViews.forEach(function(componentSublayerView) {
     componentSublayerView.queryFeatures(query).then(function(result) {
       console.log(result.features);
     });
   });
});
```

```javascript
view.whenLayerView(buildingSceneLayer).then(function(bslv) {
  // get the sublayer view of the component sublayer with id 1
  const sublayerView = bslv.sublayerViews.find(function(sublayerView) {
    return sublayerView.sublayer.id === 1;
  });
  const query = sublayerView.createQuery();
  query.spatialRelationship = "contains";
  query.geometry = polygonGeometry;
  // query sublayer view
  sublayerView.queryObjectIds(query).then(function(result) {
    sublayerView.highlight(result);
  });
});
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

