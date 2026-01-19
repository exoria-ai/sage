# ExpressionInfo

**Module:** `@arcgis/core/webdoc/geotriggersInfo/ExpressionInfo`

## Import

```javascript
import ExpressionInfo from "@arcgis/core/webdoc/geotriggersInfo/ExpressionInfo.js";
```

```javascript
// CDN
const ExpressionInfo = await $arcgis.import("@arcgis/core/webdoc/geotriggersInfo/ExpressionInfo.js");
```

**Since:** 4.24

## Property Details

### `ExpressionInfo`

### `declaredClass`
- **Type:** `Inherited`

### `expression`

### `returnType`

### `title`

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
let expression = new ExpressionInfo({
  title: "Notice",
  expression: "'You have entered' + $fencefeature.AREA_NAME"
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

