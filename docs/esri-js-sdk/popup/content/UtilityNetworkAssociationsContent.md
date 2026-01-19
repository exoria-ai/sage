# UtilityNetworkAssociationsContent

**Module:** `@arcgis/core/popup/content/UtilityNetworkAssociationsContent`

## Import

```javascript
import UtilityNetworkAssociationsContent from "@arcgis/core/popup/content/UtilityNetworkAssociationsContent.js";
```

```javascript
// CDN
const UtilityNetworkAssociationsContent = await $arcgis.import("@arcgis/core/popup/content/UtilityNetworkAssociationsContent.js");
```

**Since:** 4.31

## See Also

- PopupTemplate
- Content
- Editor

## Property Details

### `UtilityNetworkAssociationsContent`

### `associationTypes`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `displayCount`

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
// Create the UtilityNetworkAssociationsContent popup element
const utilityNetworkAssociationsContent = new UtilityNetworkAssociationsContent({
  associationTypes: [
    {
      type: "container",
    },
    {
      type: "connectivity",
      associatedAssetGroup: 2,
      associatedNetworkSourceId: 5,
      associatedAssetType: 3
    },
    {
      type: "attachment",
      description: "Describe this associations"
    },
    {
      type: "content",
      title: "myContents"
    },
    {
      type: "structure",
    },
  ],
  title: "This Feature's Associations",
  description: "Associations that belong to this feature"
});

// add the utilityNetworkAssociationsContent to the popup templates
const popupTemplate  = new PopupTemplate({
  title: "MyAssociations",
  content: [utilityNetworkAssociationsContent]
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

