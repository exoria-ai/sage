# TimeInfo

**Module:** `@arcgis/core/layers/support/TimeInfo`

## Import

```javascript
import TimeInfo from "@arcgis/core/layers/support/TimeInfo.js";
```

```javascript
// CDN
const TimeInfo = await $arcgis.import("@arcgis/core/layers/support/TimeInfo.js");
```

**Since:** 4.11

## See Also

- Wikipedia - List of tz database time zones
- Date-time queries | Time zone properties

## Property Details

### `TimeInfo`

### `declaredClass`
- **Type:** `Inherited`

### `endField`

### `fullTimeExtent`

### `interval`

### `startField`

### `stops`

### `timeZone`

### `trackIdField`

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
const { start, end } = featureLayer.timeInfo.fullTimeExtent;
const range = end - start;  // milliseconds
const days = range / ( 1000 * 60 * 60 * 24 ); // days
console.log(`The layer's temporal extent is ${days} days.`);
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

