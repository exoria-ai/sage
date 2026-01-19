# FenceGeotrigger

**Module:** `@arcgis/core/webdoc/geotriggersInfo/FenceGeotrigger`

## Import

```javascript
import FenceGeotrigger from "@arcgis/core/webdoc/geotriggersInfo/FenceGeotrigger.js";
```

```javascript
// CDN
const FenceGeotrigger = await $arcgis.import("@arcgis/core/webdoc/geotriggersInfo/FenceGeotrigger.js");
```

**Since:** 4.24

## Property Details

### `FenceGeotrigger`

### `declaredClass`
- **Type:** `Inherited`

### `enterExitRule`

### `feed`

### `feedAccuracyMode`

### `fenceNotificationRule`

### `fenceParameters`

### `name`

### `notificationOptions`

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
let fenceGeotrigger = new FenceGeotrigger({
  name: "Example Geotrigger - Notify when I am within 50m of my target areas.",
  enterExitRule: "enter-intersects-and-exit-does-not-intersect",
  feed: {
    filterExpression: {
      title: "Location filter",
      expression: "return $locationupdate.horizontalaccuracy <= 20"
    }
  },
  fenceNotificationRule: "enter",
  feedAccuracyMode: "use-geometry-with-accuracy",
  fenceParameters: {
    bufferDistance: 50,
    fenceSource: {
      layerUrl: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Recreation/MapServer/0"
    },
  },
  notificationOptions: {
    expressionInfo: {
      "title": "Expression",
      "expression": "'You have entered' + $fencefeature.AREA_NAME"
    }
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

