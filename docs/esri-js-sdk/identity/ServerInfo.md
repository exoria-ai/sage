# ServerInfo

**Module:** `@arcgis/core/identity/ServerInfo`

## Import

```javascript
import ServerInfo from "@arcgis/core/identity/ServerInfo.js";
```

```javascript
// CDN
const ServerInfo = await $arcgis.import("@arcgis/core/identity/ServerInfo.js");
```

**Since:** 4.0

## See Also

- IdentityManager
- Access Secure Services
- Authentication and OAuth 2
- Guide topic - Proxy pages
- Guide topic - CORS
- hasPortal
- hasServer
- IdentityManager.registerServers()
- currentVersion
- IdentityManager.registerServers()
- ArcGIS Server authentication tier

## Property Details

### `ServerInfo`

### `adminTokenServiceUrl`

### `currentVersion`

### `declaredClass`
- **Type:** `Inherited`

### `hasPortal`

### `hasServer`

### `server`

### `shortLivedTokenValidity`

### `tokenServiceUrl`

### `webTierAuth`

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
// Register the serverInfo with the IdentityManager
esriId.registerServers([{
  hasServer: true,
  server: "https://<server domain>/arcgis",
  tokenServiceUrl: "https://<server domain>/arcgis/tokens/"
}]);
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

