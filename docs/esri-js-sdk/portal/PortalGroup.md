# PortalGroup

**Module:** `@arcgis/core/portal/PortalGroup`

## Import

```javascript
import PortalGroup from "@arcgis/core/portal/PortalGroup.js";
```

```javascript
// CDN
const PortalGroup = await $arcgis.import("@arcgis/core/portal/PortalGroup.js");
```

**Since:** 4.0

## See Also

- ArcGIS Organization portals
- Portal
- ArcGIS REST API - Group
- getThumbnailUrl()

## Property Details

### `access`

### `created`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `id`

### `isInvitationOnly`

### `modified`

### `owner`

### `portal`

### `snippet`

### `sourceJSON`

### `tags`

### `thumbnailUrl`

### `title`

### `url`

### `addHandles`
- **Type:** `Inherited`

### `fetchCategorySchema`

### `fetchMembers`

### `getThumbnailUrl`

### `hasHandles`
- **Type:** `Inherited`

### `queryItems`

### `removeHandles`
- **Type:** `Inherited`

### `Members`


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
// Fetch featured group members
portal.fetchFeaturedGroups().then(function(groups){
  groups.forEach(function(group){
    // Fetch group category schema
    group.fetchCategorySchema().then(function(schemas){
      schemas.forEach(function(schema){
        console.log("schema: ", schema);
      })
    });
  });
});
```

```javascript
// Fetch featured group members
portal.fetchFeaturedGroups().then(function(groups){
   groups.forEach(function(group){
     group.fetchMembers().then(function(members){
       console.log("member", members);
     });
   });
});
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

