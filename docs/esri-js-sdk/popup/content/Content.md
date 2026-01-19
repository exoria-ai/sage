# Content

**Module:** `@arcgis/core/popup/content/Content`

## Import

```javascript
import Content from "@arcgis/core/popup/content/Content.js";
```

```javascript
// CDN
const Content = await $arcgis.import("@arcgis/core/popup/content/Content.js");
```

**Since:** 4.11

## See Also

- PopupTemplate
- Sample - Intro to PopupTemplate
- Sample - Custom popup actions per feature
- Sample - Multiple popup elements
- Sample - PopupTemplate function
- Sample - PopupTemplate with promise
- TextContent
- FieldsContent
- MediaContent
- AttachmentsContent
- CustomContent
- ExpressionContent
- RelationshipContent
- UtilityNetworkAssociationsContent

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `type`

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

