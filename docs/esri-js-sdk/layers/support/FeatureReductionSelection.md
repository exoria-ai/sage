# FeatureReductionSelection

**Module:** `@arcgis/core/layers/support/FeatureReductionSelection`

## Import

```javascript
import FeatureReductionSelection from "@arcgis/core/layers/support/FeatureReductionSelection.js";
```

```javascript
// CDN
const FeatureReductionSelection = await $arcgis.import("@arcgis/core/layers/support/FeatureReductionSelection.js");
```

**Since:** 4.14

## See Also

- Sample: Point styles for cities
- CSVLayer.featureReduction
- FeatureLayer.featureReduction
- GeoJSONLayer.featureReduction
- OGCFeatureLayer.featureReduction
- SceneLayer.featureReduction
- StreamLayer.featureReduction

## Property Details

### `FeatureReductionSelection`

### `declaredClass`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
layer.featureReduction = {
  type: "selection"
};
```

```javascript
// enables feature reduction by selection
layer.featureReduction = {
  type: "selection"
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

