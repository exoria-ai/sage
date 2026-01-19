# DirectionLine

**Module:** `@arcgis/core/rest/support/DirectionLine`

## Import

```javascript
import DirectionLine from "@arcgis/core/rest/support/DirectionLine.js";
```

```javascript
// CDN
const DirectionLine = await $arcgis.import("@arcgis/core/rest/support/DirectionLine.js");
```

**Since:** 4.23

## See Also

- RouteParameters
- RouteLayer

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `directionLineType`

### `distance`

### `duration`

### `geometry`

### `popupTemplate`

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
// Print the distance and time between each direction.
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

 for (const directionLine of routeLayer.directionLines) {
  const { distance, duration } = directionLine;
  console.log(`Drive ${formatDistance.format(distance)} meters for ${formatMinutes.format(duration)} minutes.`);
}

// Drive 76 meters for 0.4 minutes.
// Drive 77 meters for 0.2 minutes.
// Drive 150 meters for 0.2 minutes.
// Drive 3,670 meters for 2.6 minutes.
// Drive 307 meters for 0.2 minutes.
// Drive 6,293 meters for 4.5 minutes.
// Drive 42,276 meters for 29.2 minutes.
// etc.
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

