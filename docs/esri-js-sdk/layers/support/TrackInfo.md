# TrackInfo

**Module:** `@arcgis/core/layers/support/TrackInfo`

## Import

```javascript
import TrackInfo from "@arcgis/core/layers/support/TrackInfo.js";
```

```javascript
// CDN
const TrackInfo = await $arcgis.import("@arcgis/core/layers/support/TrackInfo.js");
```

**Since:** 4.32

## See Also

- Guide - Visualization
- StreamLayer.trackInfo
- FeatureLayer.trackInfo
- Arcade Feature Reduction Popup Profile

## Property Details

### `TrackInfo`

### `declaredClass`
- **Type:** `Inherited`

### `enabled`

### `fields`

### `latestObservations`

### `maxDisplayDuration`

### `maxDisplayObservationsPerTrack`

### `popupEnabled`

### `popupTemplate`

### `previousObservations`

### `timeField`

### `trackLines`

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
// Based on the fields in the layer, the following track info fields
// could be defined:
trackInfo.fields = [{
  name: "total_observations",
  statisticType: "count"
}, {
  name: "AVG_speed",
  onStatisticField: "speed",
  statisticType: "avg"
}];
```

```javascript
trackInfo.latestObservations = {
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-marker",
      style: "circle",
      color: "red",
      size: 10
    }
  }
};
```

```javascript
trackInfo.maxDisplayDuration = { value: 30, unit: "seconds" };
```

```javascript
trackInfo.maxDisplayObservationsPerTrack = 10;
```

```javascript
trackInfo.popupEnabled = false;
```

