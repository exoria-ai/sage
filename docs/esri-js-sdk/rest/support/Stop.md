# Stop

**Module:** `@arcgis/core/rest/support/Stop`

## Import

```javascript
import Stop from "@arcgis/core/rest/support/Stop.js";
```

```javascript
// CDN
const Stop = await $arcgis.import("@arcgis/core/rest/support/Stop.js");
```

**Since:** 4.23

## See Also

- RouteParameters
- RouteLayer

## Property Details

### `Stop`

### `arriveTime`

### `arriveTimeOffset`

### `curbApproach`

### `declaredClass`
- **Type:** `Inherited`

### `departTime`

### `departTimeOffset`

### `geometry`

### `locationType`

### `name`

### `popupTemplate`

### `sequence`

### `status`

### `timeWindowEnd`

### `timeWindowStart`

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
const formatDate = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: "America/Los_Angeles"
});

 for (const stop of routeLayer.stops) {
   const { arriveTime, departTime, name, locationType } = stop;
   console.log(`Stop:           ${locationType} at ${name}`);
   console.log(`Arrival Time:   ${formatDate.format(arriveTime)}`);
   console.log(`Departure Time: ${formatDate.format(departTime)}`);
 }

 // Stop:           stop at Kenoak Pl, Pomona, California, 91768
 // Arrival Time:   12/7/2020, 3:58:50 PM
 // Departure Time: 12/7/2020, 3:58:50 PM
 // Stop:           stop at 173 E Arbeth St, Rialto, California, 92377
 // Arrival Time:   12/7/2020, 4:38:29 PM
 // Departure Time: 12/7/2020, 4:38:29 PM
 // etc
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

