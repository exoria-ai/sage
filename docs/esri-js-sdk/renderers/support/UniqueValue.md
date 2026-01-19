# UniqueValue

**Module:** `@arcgis/core/renderers/support/UniqueValue`

## Import

```javascript
import UniqueValue from "@arcgis/core/renderers/support/UniqueValue.js";
```

```javascript
// CDN
const UniqueValue = await $arcgis.import("@arcgis/core/renderers/support/UniqueValue.js");
```

**Since:** 4.25

## See Also

- UniqueValueClass.values
- UniqueValueRenderer.field
- UniqueValueRenderer.field2
- UniqueValueRenderer.field3

## Property Details

### `UniqueValue`

### `declaredClass`
- **Type:** `Inherited`

### `value`

### `value2`

### `value3`

### `addHandles`
- **Type:** `Inherited`

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
// Features with only the combination values below from
// field, field2, and field3 in the renderer
// will be represented with the symbol defined in the class.
uniqueValueClass.values = {
  value: 10,
  value2: "Republican",
  value3: "18-25"
};
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

