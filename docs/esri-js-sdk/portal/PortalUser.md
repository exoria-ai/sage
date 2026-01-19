# PortalUser

**Module:** `@arcgis/core/portal/PortalUser`

## Import

```javascript
import PortalUser from "@arcgis/core/portal/PortalUser.js";
```

```javascript
// CDN
const PortalUser = await $arcgis.import("@arcgis/core/portal/PortalUser.js");
```

**Since:** 4.0

## See Also

- ArcGIS Organization portals
- Portal
- ArcGIS REST API - User
- getThumbnailUrl()
- ArcGIS REST API delete items

## Property Details

### `access`

### `created`

### `culture`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `email`

### `fullName`

### `id`

### `modified`

### `orgId`

### `portal`

### `preferredView`

### `privileges`

### `region`

### `role`

### `roleId`

### `sourceJSON`

### `thumbnailUrl`

### `units`

### `userContentUrl`

### `username`

### `addHandles`
- **Type:** `Inherited`

### `addItem`

### `deleteItem`

### `deleteItems`

### `fetchFolders`

### `fetchGroups`

### `fetchItems`

### `fetchTags`

### `getThumbnailUrl`

### `hasHandles`
- **Type:** `Inherited`

### `queryFavorites`

### `removeHandles`
- **Type:** `Inherited`

### `restoreItem`

### `DeleteItemsResult`

### `FetchItemsResult`


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
// Delete an item from the user's content.
// This will recycle an item if the recycle bin is enabled and item is supported, or
// permanently delete it if the recycle bin is disabled or not supported.
const portalItem = new PortalItem({
  id: "affa021c51944b5694132b2d61fe1057"
});
portal.user.deleteItem(portalItem).then(() => {
  console.log("Item deleted from user's content.");
})
// If the item could not be deleted, an error will be returned.
.catch((error) => {
  console.error("Error deleting item: ", error);
});
```

```javascript
// Delete items from the user's content.
// This will permanently delete items even if recycle bin is enabled.
let itemArray = [portalItem1, portalItem2, portalItem3];
portal.user.deleteItems(itemArray, true).then((deleteItemsResults) => {
  deleteItemsResults.forEach((deleteItemsResult) => {
    if (deleteItemsResult.success) {
      console.log(`${deleteItemsResult.item.title} deleted from user's content.`);
    } else {
      console.error(`Error deleting ${deleteItemsResult.item.title}: `, result.error);
    }
  });
});
```

```javascript
// Once portal is loaded, user signed in
portal.load().then(() => {
  portalUser.fetchFolders().then((folders) => {
    folders.forEach((folder) => {
      console.log("User folder", folder.title);
    });
  });
});
```

```javascript
// Once portal is loaded, user signed in
portal.load().then(() => {
  // fetch all the groups user can access
  portal.user.fetchGroups().then((groups) => {
    groups.forEach((group) => {
      console.log(`${group.title} group`);
    });
  });
});
```

```javascript
// Retrieves items from the user's root folder.
portal.user.fetchItems().then((fetchItemsResult) => {
   console.log("Next start index: ", fetchItemsResult.nextStart);
   fetchItemsResult.items.forEach((item) => {
     console.log("Portal item title:", item.title);
   });
});
```

