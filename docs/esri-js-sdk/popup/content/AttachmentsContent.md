# AttachmentsContent

**Module:** `@arcgis/core/popup/content/AttachmentsContent`

## Import

```javascript
import AttachmentsContent from "@arcgis/core/popup/content/AttachmentsContent.js";
```

```javascript
// CDN
const AttachmentsContent = await $arcgis.import("@arcgis/core/popup/content/AttachmentsContent.js");
```

**Since:** 4.11

## See Also

- PopupTemplate
- AttachmentInfo
- Sample - Intro to PopupTemplate
- AttachmentInfo.keywords
- AttachmentQuery.keywords
- Query Attachments REST API operation
- AttachmentInfo.contentType
- AttachmentQuery.attachmentTypes
- Query Attachments REST API operation

## Property Details

### `AttachmentsContent`

### `attachmentKeywords`

### `attachmentTypes`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `displayType`

### `orderByFields`

### `title`

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
// Create the AttachmentsContent popup element
// If the selected feature has attributes associated with it, they will display within the popup
let attachmentsElement = new AttachmentsContent({
  // Shows all attachments as a list of linked files
  displayType: "list",
  // Sorts the attachments by their `ATT_NAME` attachmentInfo field in descending order
  orderByFields: [{ field: "ATT_NAME", order: "descending" }]
});

// Create the PopupTemplate
let template = new PopupTemplate({
  title: "Beverly Hills trees by block",
  outFields: ["*"],
  content: [attachmentsElement]
});
```

```javascript
// Sort the attachments by their `ATT_NAME` attribute in descending order
const attachmentsElement = new AttachmentsContent({
  orderByFields: [
    { field: "ATT_NAME", order: "descending" }
  ]
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

