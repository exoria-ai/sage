# FeatureEffect

**Module:** `@arcgis/core/layers/support/FeatureEffect`

## Import

```javascript
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect.js";
```

```javascript
// CDN
const FeatureEffect = await $arcgis.import("@arcgis/core/layers/support/FeatureEffect.js");
```

**Since:** 4.22

## See Also

- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- All samples that use effect
- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- All samples that use effect
- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- Sample - Apply multiple effect to a layerView
- All samples that use effect
- SDK samples that use effect

## Property Details

### `FeatureEffect`

### `declaredClass`
- **Type:** `Inherited`

### `excludedEffect`

### `excludedLabelsVisible`

### `filter`

### `includedEffect`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `Effect`


## Method Details

### `Method Details()`


## Examples

```javascript
// apply a feature effect to features that do not
// meet the filter requirements
const featureFilter = new FeatureFilter({
  geometry: filterGeometry,
  spatialRelationship: "intersects",
  distance: distance,
  units: units
});

// set effect on excluded features
// make them gray and transparent
layer.featureEffect = new FeatureEffect({
  filter: featureFilter,
  excludedEffect: "grayscale(100%) opacity(30%)"
});
```

```javascript
// Typical usage
const effect = new FeatureEffect({
  filter: new FeatureFilter({
    where: "magnitude >= 3"
  }),
  excludedEffect: "grayscale(100%) opacity(30%)"
});

layer.featureEffect = effect;
```

```javascript
const excludedEffect = "grayscale(50%) opacity(30%)";

layer.featureEffect = new FeatureEffect({
  filter: new FeatureFilter({
    where: "POPULATION > 1000000"
  }),
  excludedEffect: excludedEffect
});
```

```javascript
const includedEffect = "sepia(70%) saturate(150%) hue-rotate(320deg) opacity(60%)";
layer.featureEffect = new FeatureEffect({
  filter: new FeatureFilter({
    where: "POPULATION > 1000000"
  }),
  includedEffect: includedEffect
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

