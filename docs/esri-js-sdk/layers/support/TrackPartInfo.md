# TrackPartInfo

**Module:** `@arcgis/core/layers/support/TrackPartInfo`

## Import

```javascript
import TrackPartInfo from "@arcgis/core/layers/support/TrackPartInfo.js";
```

```javascript
// CDN
const TrackPartInfo = await $arcgis.import("@arcgis/core/layers/support/TrackPartInfo.js");
```

**Since:** 4.32

## See Also

- TrackInfo

## Property Details

### `TrackPartInfo`

### `declaredClass`
- **Type:** `Inherited`

### `labelingInfo`

### `labelsVisible`

### `renderer`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
// Displays the observation count of the track
layer.trackInfo = {
  fields: [{
    name: "total_observations",
    statisticType: "count"
  }],
  trackLines: {
    labelingInfo: [{
      labelExpressionInfo: {
        expression: "$feature.total_observations"
      },
      symbol: {
        type: "text",
        color: "white",
        font: {
          size: "12px"
        },
        haloSize: 1,
        haloColor: "black"
      }
    }]
  }
};
```

```javascript
// Turns off track labels, but preserves labelingInfo
const trackInfo = layer.trackInfo.clone();
trackInfo.labelsVisible = false;
layer.trackInfo = trackInfo;
```

```javascript
layer.trackInfo = {
  previousObservations: {
    renderer: {
       type: "simple",  // autocasts as new SimpleRenderer()
       symbol: {
         type: "simple-marker",  // autocasts as new SimpleFillSymbol()
         outline: {  // autocasts as new SimpleLineSymbol()
           width: 0.5,
           color: "white"
         }
       },
       visualVariables: [{
         type: "color",
         field: "speed",
         stops: [
           { value: 5, color: "red" },
           { value: 45, color: "green" }
         ]
       }]
    }
  }
};
```

```javascript
// Hides the renderer
trackPartInfo.visible = false;
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

