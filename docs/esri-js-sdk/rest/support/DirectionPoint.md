# DirectionPoint

**Module:** `@arcgis/core/rest/support/DirectionPoint`

## Import

```javascript
import DirectionPoint from "@arcgis/core/rest/support/DirectionPoint.js";
```

```javascript
// CDN
const DirectionPoint = await $arcgis.import("@arcgis/core/rest/support/DirectionPoint.js");
```

**Since:** 4.23

## See Also

- RouteLayer
- RouteParameters
- Routing Services | Direct request | Output parameters | directionPoints

## Property Details

### `arrivalTime`

### `arrivalTimeOffset`

### `declaredClass`
- **Type:** `Inherited`

### `directionPointType`

### `displayText`

### `geometry`

### `popupTemplate`

### `sequence`

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
// Print driving directions.
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

for (const directionPoint of routeLayer.directionPoints) {
  const { arrivalTime, displayText } = directionPoint;
  console.log(`${formatDate.format(arrivalTime)}: ${displayText}`);
}

// Output
// 12/7/2020, 3:58:50 PM: Start at Kenoak Pl, Pomona, California, 91768
// 12/7/2020, 3:58:50 PM: Go northeast on Kenoak Pl toward Preciado St
// 12/7/2020, 3:59:15 PM: Turn left on Preciado St
// 12/7/2020, 3:59:26 PM: Turn left on N White Ave
// 12/7/2020, 3:59:37 PM: Turn right onto the ramp and go on I-10 W
// 12/7/2020, 4:02:10 PM: Take the ramp on the right to CA-57 S / CA-57 N toward Santa Ana / I-210
// 12/7/2020, 4:02:24 PM: Keep right at the fork onto CA-57 N toward I-210
// 12/7/2020, 4:06:54 PM: Take the ramp on the right at exit 25B and go on CA-210 E toward San Bernardino
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

