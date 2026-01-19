# AttachmentQuery

**Module:** `@arcgis/core/rest/support/AttachmentQuery`

## Import

```javascript
import AttachmentQuery from "@arcgis/core/rest/support/AttachmentQuery.js";
```

```javascript
// CDN
const AttachmentQuery = await $arcgis.import("@arcgis/core/rest/support/AttachmentQuery.js");
```

**Since:** 4.20

## See Also

- query
- capabilities.attachments
- ArcGIS REST API documentation
- Query Attachments REST API operation

## Property Details

### `AttachmentQuery`

### `attachmentTypes`

### `attachmentsWhere`

### `cacheHint`

### `declaredClass`
- **Type:** `Inherited`

### `globalIds`

### `keywords`

### `name`

### `num`

### `objectIds`

### `orderByFields`

### `returnMetadata`

### `size`

### `start`

### `where`

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
const query = new AttachmentQuery({
  where: "1=1", // query all features in the layer
  attachmentsWhere: "keywords = 'ladybug, purple'" // attachment queries
});
```

```javascript
const query = new AttachmentQuery({
  where: "1=1", // query all features in the layer
  keywords: ["ladybug", "purple"] // attachment keywords
});
```

```javascript
const query = new AttachmentQuery({
  where: "1=1", // query all features in the layer
  attachmentsWhere: "name = 'ladybug.png'" // attachment queries
});
```

```javascript
const query = new AttachmentQuery({
  where: "1=1", // query all features in the layer
  orderByFields: ["ATT_NAME DESC"] // sort attachments by name in descending order
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

