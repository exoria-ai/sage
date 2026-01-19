# TextElementInput

**Module:** `@arcgis/core/widgets/FeatureForm/TextElementInput`

## Import

```javascript
import TextElementInput from "@arcgis/core/widgets/FeatureForm/TextElementInput.js";
```

```javascript
// CDN
const TextElementInput = await $arcgis.import("@arcgis/core/widgets/FeatureForm/TextElementInput.js");
```

**Since:** 4.32

## See Also

- FeatureForm
- FeatureFormViewModel
- FieldInput

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `expressionsUsed`

### `fieldsUsed`

### `group`

### `rawText`

### `text`

### `textFormat`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

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

