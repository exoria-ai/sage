# BuildingSummaryStatistics

**Module:** `@arcgis/core/layers/support/BuildingSummaryStatistics`

## Import

```javascript
import BuildingSummaryStatistics from "@arcgis/core/layers/support/BuildingSummaryStatistics.js";
```

```javascript
// CDN
const BuildingSummaryStatistics = await $arcgis.import("@arcgis/core/layers/support/BuildingSummaryStatistics.js");
```

**Since:** 4.15

## See Also

- BuildingSceneLayer

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `fields`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `when`

### `BuildingFieldStatistics`


## Method Details

### `Method Details()`


## Examples

```javascript
// load the layer
buildingLayer.load().then(function() {
 // load the statistics on the summaryStatistics property
 // to be able to access them
 buildingLayer.summaryStatistics.load().then(function() {
   console.log(buildingLayer.summaryStatistics);
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

```javascript
// Although this example uses MapView, any class instance that is a promise may use when() in the same way
let view = new MapView();
view.when(function(){
  // This function will execute once the promise is resolved
}, function(error){
  // This function will execute if the promise is rejected due to an error
});
```

