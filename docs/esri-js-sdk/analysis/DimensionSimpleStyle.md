# DimensionSimpleStyle

**Module:** `@arcgis/core/analysis/DimensionSimpleStyle`

## Import

```javascript
import DimensionSimpleStyle from "@arcgis/core/analysis/DimensionSimpleStyle.js";
```

```javascript
// CDN
const DimensionSimpleStyle = await $arcgis.import("@arcgis/core/analysis/DimensionSimpleStyle.js");
```

**Since:** 4.25

## See Also

- DimensionAnalysis
- LengthDimension
- DimensionLayer
- Sample - Length dimensioning

## Property Details

### `DimensionSimpleStyle`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `fontSize`

### `lineSize`

### `textBackgroundColor`

### `textColor`

### `type`

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
// create analysis with dimensions
const dimensionAnalysis = new DimensionAnalysis({
   dimensions: [
     new LengthDimension({
       startPoint: new Point({ }),
       endPoint: new Point({ })
     })
   ],
   style: new DimensionSimpleStyle({
     color: "white",
     lineSize: 1.5,
     textBackgroundColor: "white",
     textColor: "black",
     fontSize: 9
   }),
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

