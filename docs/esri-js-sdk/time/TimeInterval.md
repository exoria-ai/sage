# TimeInterval

**Module:** `@arcgis/core/time/TimeInterval`

## Import

```javascript
import TimeInterval from "@arcgis/core/time/TimeInterval.js";
```

```javascript
// CDN
const TimeInterval = await $arcgis.import("@arcgis/core/time/TimeInterval.js");
```

**Since:** 4.31

## See Also

- TimeExtent

## Property Details

### `TimeInterval`

### `declaredClass`
- **Type:** `Inherited`

### `unit`

### `value`

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
const featureLayer = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0"
});
featureLayer.load().then(function(){
  const interval = featureLayer.timeInfo.interval;
  console.log("The layer's time interval is ", interval.value, interval.unit);
});
```

```javascript
const featureLayer = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0"
});
featureLayer.load().then(function(){
  const interval = featureLayer.timeInfo.interval;
  console.log("The layer's time interval is ", interval.value, " ", interval.unit);
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

