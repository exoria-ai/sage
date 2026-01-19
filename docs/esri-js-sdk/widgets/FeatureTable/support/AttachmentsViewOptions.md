# AttachmentsViewOptions

**Module:** `@arcgis/core/widgets/FeatureTable/support/AttachmentsViewOptions`

## Import

```javascript
import AttachmentsViewOptions from "@arcgis/core/widgets/FeatureTable/support/AttachmentsViewOptions.js";
```

```javascript
// CDN
const AttachmentsViewOptions = await $arcgis.import("@arcgis/core/widgets/FeatureTable/support/AttachmentsViewOptions.js");
```

**Since:** 4.33

## Property Details

### `attachmentId`

### `attachmentInfos`

### `candidates`

### `declaredClass`
- **Type:** `Inherited`

### `error`

### `form`

### `mode`

### `objectId`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `onEditComplete`

### `removeHandles`
- **Type:** `Inherited`

### `reset`


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

