# Credential

**Module:** `@arcgis/core/identity/Credential`

## Import

```javascript
import Credential from "@arcgis/core/identity/Credential.js";
```

```javascript
// CDN
const Credential = await $arcgis.import("@arcgis/core/identity/Credential.js");
```

**Since:** 4.0

## See Also

- Access ArcGIS Online items using OAuth 2.0
- Access Secure Services
- Authentication and OAuth 2
- Guide topic - Proxy pages
- ArcGIS Organization portals
- Date - MDN
- IdentityManager.destroyCredentials
- IdentityManager.destroyCredentials

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `expires`

### `isAdmin`

### `oAuthState`

### `scope`

### `server`

### `ssl`

### `token`

### `userId`

### `addHandles`
- **Type:** `Inherited`

### `destroy`

### `emit`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `on`

### `refreshToken`

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
view.on("click", function(event){
  // event is the event handle returned after the event fires.
  console.log(event.mapPoint);
});
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

