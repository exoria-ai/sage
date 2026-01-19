# AttachmentsOrderByInfo

**Module:** `@arcgis/core/popup/support/AttachmentsOrderByInfo`

## Import

```javascript
import AttachmentsOrderByInfo from "@arcgis/core/popup/support/AttachmentsOrderByInfo.js";
```

```javascript
// CDN
const AttachmentsOrderByInfo = await $arcgis.import("@arcgis/core/popup/support/AttachmentsOrderByInfo.js");
```

**Since:** 4.32

## Property Details

### `AttachmentsOrderByInfo`

### `declaredClass`
- **Type:** `Inherited`

### `field`

### `order`

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
// Sort the attachments by their `ATT_NAME` attribute in descending order
const attachmentsOrderByInfo = new AttachmentsOrderByInfo({
  field: "ATT_NAME",
  order: "descending"
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

