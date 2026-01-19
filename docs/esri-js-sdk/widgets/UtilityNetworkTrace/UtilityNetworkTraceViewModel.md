# UtilityNetworkTraceViewModel

**Module:** `@arcgis/core/widgets/UtilityNetworkTrace/UtilityNetworkTraceViewModel`

## Import

```javascript
import UtilityNetworkTraceViewModel from "@arcgis/core/widgets/UtilityNetworkTrace/UtilityNetworkTraceViewModel.js";
```

```javascript
// CDN
const UtilityNetworkTraceViewModel = await $arcgis.import("@arcgis/core/widgets/UtilityNetworkTrace/UtilityNetworkTraceViewModel.js");
```

**Since:** 4.22

## Inheritance

Extends: **the**

## See Also

- UtilityNetworkTrace
- Utility Network Trace component
- UtilityNetwork
- NamedTraceConfiguration
- Trace (Utility Network)
- Programming patterns: Widget viewModel pattern
- Sample - UtilityNetworkTrace widget
- MapView
- SceneView

## Property Details

### `UtilityNetworkTraceViewModel`

### `declaredClass`
- **Type:** `Inherited`

### `defaultGraphicColor`

### `enableResultArea`

### `flags`

### `goToOverride`

### `resultAreaProperties`

### `selectOnComplete`

### `selectedTraces`

### `showGraphicsOnComplete`

### `showSelectionAttributes`

### `state`

### `traceResults`

### `utilityNetwork`

### `view`

### `addFlagByHit`

### `addHandles`
- **Type:** `Inherited`

### `addResultAreaToMap`

### `addResultGraphicToView`

### `addTerminal`

### `callTrace`

### `changeResultGraphicColor`

### `checkCanTrace`

### `checkSelectionExist`

### `clearResult`

### `createResultAreaGraphic`

### `executeTrace`

### `getValidSources`

### `hasHandles`
- **Type:** `Inherited`

### `loadUtilityNetwork`

### `manageFilterBarrier`

### `mergeSelection`

### `queryFeaturesById`

### `queryFlagByHitTest`

### `removeAllResultAreaGraphics`

### `removeFlag`

### `removeHandles`
- **Type:** `Inherited`

### `removeResultAreaFromMap`

### `removeResultGraphicFromView`

### `removeSelection`

### `removeTerminal`

### `reset`

### `selectFeaturesById`

### `selectResults`

### `selectTraces`

### `selectTracesOnLoad`

### `zoomToAsset`

### `AssetGroupJSON`

### `AssetTypeJSON`

### `DisplayField`

### `EdgeSourceJSON`

### `FeatureSetInfo`

### `FlagProperty`

### `GraphicColor`

### `JunctionSourceJSON`

### `ResultAreaPropertiesExtend`

### `TraceItem`

### `TraceResultExtend`

### `ValidSetup`


## Method Details

### `Method Details()`


## Examples

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
// The following snippet uses Search but can be applied to any
// widgets that support the goToOverride property.
search.goToOverride = function(view, goToParams) {
  goToParams.options = {
    duration: updatedDuration
  };
  return view.goTo(goToParams.target, goToParams.options);
};
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

