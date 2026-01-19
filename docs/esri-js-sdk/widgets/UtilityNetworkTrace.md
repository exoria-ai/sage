# UtilityNetworkTrace

**Module:** `@arcgis/core/widgets/UtilityNetworkTrace`

## Import

```javascript
import UtilityNetworkTrace from "@arcgis/core/widgets/UtilityNetworkTrace.js";
```

```javascript
// CDN
const UtilityNetworkTrace = await $arcgis.import("@arcgis/core/widgets/UtilityNetworkTrace.js");
```

**Since:** 4.22

## See Also

- UtilityNetworkTraceViewModel
- UtilityNetwork
- NamedTraceConfiguration
- Trace (Utility Network)
- Sample - UtilityNetworkTrace widget
- Calcite Icon Search

## Property Details

### `UtilityNetworkTrace`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `defaultGraphicColor`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `enableResultArea`

### `flags`

### `icon`

### `id`
- **Type:** `Inherited`

### `inputSettings`

### `label`

### `resultAreaProperties`

### `selectOnComplete`

### `selectedTraces`

### `showGraphicsOnComplete`

### `showSelectionAttributes`

### `traceResults`

### `utilityNetwork`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `checkCanTrace`

### `classes`
- **Type:** `Inherited`

### `confirmReset`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `InputSetting`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a new instance of the UtilityNetworkTrace widget and set
// its required parameters.
const unTraceWidget = new UtilityNetworkTrace({
  view: view
});

view.ui.add(unTraceWidget, "top-right");
```

```javascript
// Create the HTML div element programmatically at runtime and set to the widget's container
const basemapGallery = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
// Specify an already-defined HTML div element in the widget's container

const basemapGallery = new BasemapGallery({
  view: view,
  container: basemapGalleryDiv
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});

// HTML markup
<body>
  <div id="viewDiv"></div>
  <div id="basemapGalleryDiv"></div>
</body>
```

```javascript
// Specify the widget while adding to the view's UI
const basemapGallery = new BasemapGallery({
  view: view
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
const unt = new UtilityNetworkTrace({
 view: view,
 showSelectionAttributes: true,
 selectOnComplete: true,
 showGraphicsOnComplete: true,
 selectedTraces: ["{E8D545B8-596D-4656-BF5E-16C1D7CBEC9B}"],
 flags: [
   {
     type: "starting-point",
     mapPoint: {
       spatialReference: { latestWkid: 3857, wkid: 102100 },
       x: -9814829.166046409,
       y: 5127094.1017433
     }
   },
   {
     type: "barrier",
     mapPoint: {
     spatialReference: { latestWkid: 3857, wkid: 102100 },
       x: -9814828.449441982,
       y: 5127089.085566963
     }
   }
 ]
});
```

```javascript
const unt = new UtilityNetworkTrace({
 un: un,
 view: view,
 enableResultArea: true,
 resultAreaProperties: {
   type: "buffer",
   distance: 10,
   unit: "feet",
   areaUnit: "square-feet",
   color: {
     color: [255, 165, 0, 0.5],
     haloOpacity: 0.9,
     fillOpacity: 0.2,
     hex: "#ffa500"
   },
   show: true
 }
});
```

