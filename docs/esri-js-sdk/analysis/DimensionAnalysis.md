# DimensionAnalysis

**Module:** `@arcgis/core/analysis/DimensionAnalysis`

## Import

```javascript
import DimensionAnalysis from "@arcgis/core/analysis/DimensionAnalysis.js";
```

```javascript
// CDN
const DimensionAnalysis = await $arcgis.import("@arcgis/core/analysis/DimensionAnalysis.js");
```

**Since:** 4.25

## See Also

- DimensionAnalysisView3D
- LengthDimension
- DimensionSimpleStyle
- DimensionLayer
- DimensionLayerView
- Sample - Length dimensioning
- Sample - Analysis objects

## Property Details

### `DimensionAnalysis`

### `declaredClass`
- **Type:** `Inherited`

### `dimensions`

### `id`
- **Type:** `Inherited`

### `origin`
- **Type:** `Inherited`

### `style`

### `type`

### `uid`
- **Type:** `Inherited`

### `valid`

### `addHandles`
- **Type:** `Inherited`

### `clone`
- **Type:** `Inherited`

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
     color: "white"
   }),
});

// add the analysis to the view
view.analyses.add(dimensionAnalysis);
```

```javascript
// retrieve measured results from the analysis view
const analysisView = await view.whenAnalysisView(dimensionAnalysis);
const results = dimensionAnalysisView.results;
```

```javascript
const abortController = new AbortController();

try {
  await analysisView.place({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Placement operation was cancelled.");
  }
}

// cancel the placement operation at some later point
abortController.abort();
```

```javascript
// allow existing dimensions in the analysis to be selected and edited
analysisView.interactive = true;
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

