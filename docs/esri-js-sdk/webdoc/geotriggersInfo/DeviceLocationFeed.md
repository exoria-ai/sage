# DeviceLocationFeed

**Module:** `@arcgis/core/webdoc/geotriggersInfo/DeviceLocationFeed`

## Import

```javascript
import DeviceLocationFeed from "@arcgis/core/webdoc/geotriggersInfo/DeviceLocationFeed.js";
```

```javascript
// CDN
const DeviceLocationFeed = await $arcgis.import("@arcgis/core/webdoc/geotriggersInfo/DeviceLocationFeed.js");
```

**Since:** 4.24

## Property Details

### `DeviceLocationFeed`

### `declaredClass`
- **Type:** `Inherited`

### `filterExpression`

### `type`

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
let feed = new DeviceLocationFeed({
  filterExpression: { // autocasts as new ExpressionInfo()
    title: "Location filter",
    expression: "return $locationupdate.horizontalaccuracy <= 20"
  }
})
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

