# GeotriggerNotificationOptions

**Module:** `@arcgis/core/webdoc/geotriggersInfo/GeotriggerNotificationOptions`

## Import

```javascript
import GeotriggerNotificationOptions from "@arcgis/core/webdoc/geotriggersInfo/GeotriggerNotificationOptions.js";
```

```javascript
// CDN
const GeotriggerNotificationOptions = await $arcgis.import("@arcgis/core/webdoc/geotriggersInfo/GeotriggerNotificationOptions.js");
```

**Since:** 4.24

## Property Details

### `GeotriggerNotificationOptions`

### `declaredClass`
- **Type:** `Inherited`

### `expressionInfo`

### `requestedActions`

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
let notificationOptions = new GeotriggerNotificationOptions({
  expressionInfo: { // autocasts as new ExpressionInfo()
    title: "Notice",
    expression: "'You have entered' + $fencefeature.AREA_NAME"
  }),
  requestedActions: [ "showMessage" ]
})
```

```javascript
// Some actions a client app can consume and define behavior for
options.requestedActions = [ "someAction", "someOtherAction", "aThirdAction" ]

// A more realistic example: actions a client app can consume and define (likely tracking-related) behavior for
options.requestedActions = [ "startTracking", "stopTracking" ]
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

