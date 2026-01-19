# WMSSublayer

**Module:** `@arcgis/core/layers/support/WMSSublayer`

## Import

```javascript
import WMSSublayer from "@arcgis/core/layers/support/WMSSublayer.js";
```

```javascript
// CDN
const WMSSublayer = await $arcgis.import("@arcgis/core/layers/support/WMSSublayer.js");
```

**Since:** 4.4

## Property Details

### `WMSSublayer`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `dimensions`

### `fullExtent`

### `id`

### `layer`

### `legendEnabled`

### `legendUrl`

### `maxScale`

### `minScale`

### `name`

### `parent`

### `popupEnabled`

### `queryable`

### `spatialReferences`

### `sublayers`

### `title`

### `uid`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `ElevationDimension`

### `GenericDimension`

### `TimeDimension`

### `TimeDimensionInterval`


## Method Details

### `Method Details()`


## Examples

```javascript
const layer = new WMSLayer({
  url: "https://public-wms.met.no/verportal/verportal.map?request=GetCapabilities&service=WMS&version=1.3.0"
});
await layer.load();
const precipitation = layer.allSublayers.find((sl) => sl.name === "precipitation_3h_global");
layer.sublayers = [precipitation];
const timeDimension = precipitation.dimensions.find((dimension) => dimension.name === "time");
```

```javascript
const dates = timeDimension.extent; // This time dimension is expressed as an array of dates.
const start = dates[0]; // Get the first and earliest date
const end = dates[dates.length -1]; // Get last date
const timeSlider = new TimeSlider({
  container: "timeSliderDiv",
  view: view,
  mode: "instant",
  timeVisible: true,
  loop: true,
  fullTimeExtent: { // The TimeSlider UI will span all dates
    start,
    end
  },
  stops: {
    dates // The TimeSlider thumb will snap exactly to each valid date
  }
})
```

```javascript
// Display the title and description for the WMS sublayer named "RADAR_1KM_RDBR".
const wmsLayer = new WMSLayer({
  url: "https://geo.weather.gc.ca/geomet"
});
wmsLayer.load().then(() => {
  const subLayer = layer.findSublayerByName("RADAR_1KM_RDBR");
  let parent = wmsSubLayer.parent;
  while(parent) {
    parent.visible = true;
    parent = parent.parent;
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

