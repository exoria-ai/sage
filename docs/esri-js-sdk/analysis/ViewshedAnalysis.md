# ViewshedAnalysis

**Module:** `@arcgis/core/analysis/ViewshedAnalysis`

## Import

```javascript
import ViewshedAnalysis from "@arcgis/core/analysis/ViewshedAnalysis.js";
```

```javascript
// CDN
const ViewshedAnalysis = await $arcgis.import("@arcgis/core/analysis/ViewshedAnalysis.js");
```

**Since:** 4.30

## See Also

- ViewshedAnalysisView3D
- Viewshed
- ViewshedLayer
- ViewshedLayerView
- Sample - Interactive viewshed analysis
- Sample - Analysis objects
- 3D viewshed overview

## Property Details

### `ViewshedAnalysis`

### `declaredClass`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `origin`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `valid`

### `viewsheds`

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
const viewshed = new Viewshed({
   observer: new Point({ }),
   farDistance: 900,
   heading: 64,
   tilt: 84,
   horizontalFieldOfView: 85,
   verticalFieldOfView: 52
 });
 const viewshedAnalysis = new ViewshedAnalysis({
   viewsheds: [viewshed],
 });

 // add the analysis to the view
 view.analyses.add(viewshedAnalysis);
```

```javascript
const abortController = new AbortController();

try {
  // get a view for the analysis
  const analysisView = await view.whenAnalysisView(viewshedAnalysis);

  // start placing a new viewshed interactively
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
// allow existing viewsheds in the analysis to be selected and edited
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

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

