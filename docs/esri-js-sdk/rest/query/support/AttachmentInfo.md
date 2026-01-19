# AttachmentInfo

**Module:** `@arcgis/core/rest/query/support/AttachmentInfo`

## Import

```javascript
import AttachmentInfo from "@arcgis/core/rest/query/support/AttachmentInfo.js";
```

```javascript
// CDN
const AttachmentInfo = await $arcgis.import("@arcgis/core/rest/query/support/AttachmentInfo.js");
```

**Since:** 4.19

## Overview

The AttachmentInfo class returns information about attachments associated with a feature. The contents of the attachment are streamed to the client. Attachments are available if the FeatureLayer.capabilities.data.supportsAttachment is true.

## See Also

- PopupTemplate
- AttachmentsContent
- Sample - Multiple popup elements

## Property Details

### `AttachmentInfo`

### `contentType`

### `declaredClass`
- **Type:** `Inherited`

### `exifInfo`

### `globalId`

### `id`

### `keywords`

### `name`

### `orientationInfo`

### `parentGlobalId`

### `parentObjectId`

### `size`

### `url`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `ExifInfo`

### `OrientationInfo`


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

