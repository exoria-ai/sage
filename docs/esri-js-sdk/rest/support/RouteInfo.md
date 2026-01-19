# RouteInfo

**Module:** `@arcgis/core/rest/support/RouteInfo`

## Import

```javascript
import RouteInfo from "@arcgis/core/rest/support/RouteInfo.js";
```

```javascript
// CDN
const RouteInfo = await $arcgis.import("@arcgis/core/rest/support/RouteInfo.js");
```

**Since:** 4.23

## See Also

- RouteParameters
- RouteLayer

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `endTime`

### `endTimeOffset`

### `geometry`

### `name`

### `popupTemplate`

### `startTime`

### `startTimeOffset`

### `totalDistance`

### `totalDuration`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `fromGraphic`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toGraphic`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// Display the route name and overall distance and duration.
const routeLayer = new RouteLayer({
  portalItem: {
    id: "69569b47b1e445b8a42ec12feab41ce9"
  }
});
await routeLayer.load();

const locale = "en-US";
const formatMinutes = new Intl.NumberFormat(locale, {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});
const formatDistance = new Intl.NumberFormat(locale, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
const formatDate = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: "America/Los_Angeles"
});

const { name, startTime, endTime, totalDistance, totalDuration } = routeLayer.routeInfo;
console.log(`Route name:      ${name}`);
console.log(`Start Time:      ${formatDate.format(startTime)}`);
console.log(`End Time:        ${formatDate.format(endTime)}`);
console.log(`Travel Time:     ${formatMinutes.format(totalDuration)} minutes`);
console.log(`Travel Distance: ${formatDistance.format(totalDistance)} meters`);

// Route name:      Kenoak Pl, Pomona, California, 91768 — 16561 Valley Blvd, Fontana, California, 92335
// Start Time:      12/7/2020, 3:58:50 PM
// End Time:        12/7/2020, 6:12:20 PM
// Travel Time:     133.5 minutes
// Travel Distance: 173,148 meters
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

