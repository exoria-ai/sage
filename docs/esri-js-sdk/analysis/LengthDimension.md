# LengthDimension

**Module:** `@arcgis/core/analysis/LengthDimension`

## Import

```javascript
import LengthDimension from "@arcgis/core/analysis/LengthDimension.js";
```

```javascript
// CDN
const LengthDimension = await $arcgis.import("@arcgis/core/analysis/LengthDimension.js");
```

**Since:** 4.25

## Inheritance

Extends: **the**

## See Also

- DimensionAnalysis
- DimensionSimpleStyle
- DimensionLayer
- Sample - Length dimensioning

## Property Details

### `LengthDimension`

### `declaredClass`
- **Type:** `Inherited`

### `endPoint`

### `measureType`

### `offset`

### `orientation`

### `startPoint`

### `valid`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// create the dimension object
const lengthDimension = new LengthDimension({
   measureType: "vertical",
   startPoint: new Point({
      spatialReference: {
        wkid: 32610
      },
      x: 265,
      y: 24,
      z: 26
   }),
   endPoint: new Point({
      spatialReference: {
        wkid: 32610
      },
      x: 265,
      y: 24,
      z: 38
   }),
   orientation: 90,
   offset: 2
});
// create analysis and add the dimension object to it.
const dimensionAnalysis = new DimensionAnalysis({
   dimensions: [lengthDimension]
});
// add the analysis to the view
view.analyses.add(dimensionAnalysis);
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

