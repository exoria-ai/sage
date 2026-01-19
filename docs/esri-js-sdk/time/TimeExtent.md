# TimeExtent

**Module:** `@arcgis/core/time/TimeExtent`

## Import

```javascript
import TimeExtent from "@arcgis/core/time/TimeExtent.js";
```

```javascript
// CDN
const TimeExtent = await $arcgis.import("@arcgis/core/time/TimeExtent.js");
```

**Since:** 4.31

## See Also

- Sample - TimeSlider widget

## Property Details

### `TimeExtent`

### `declaredClass`
- **Type:** `Inherited`

### `end`

### `start`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `expandTo`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `intersection`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `union`


## Method Details

### `Method Details()`


## Examples

```javascript
// Represents the data for the month of Jan, 1970
const timeExtent = new TimeExtent({
  start: new Date(Date.UTC(1970, 0, 1, 6, 30)),
  end: new Date(Date.UTC(1970, 0, 31, 6, 30))
});
```

```javascript
// Typical usage
// Represents the data for the month of Jan, 1970
const timeExtent = new TimeExtent({
  start: new Date(Date.UTC(1970, 0, 1, 6, 30)),
  end: new Date(Date.UTC(1970, 0, 31, 6, 30))
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
// Expand a time extent to a decade.
const extent = new TimeExtent({
  start: new Date(2012, 3, 5),
  end: new Date(2019, 0, 4)
});
const decade = extent.expandTo("decades");
// decade is: 1/1/2010 to 1/1/2020
```

```javascript
// Expand a time extent to the nearest month.
const extent = new TimeExtent({
  start: new Date(2012, 3, 5),
  end: new Date(2019, 0, 4)
});
const expandToMonth = extent.expandTo("months");
// expandToMonth is: 4/1/2012 to 2/1/2019
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

