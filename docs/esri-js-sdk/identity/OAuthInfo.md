# OAuthInfo

**Module:** `@arcgis/core/identity/OAuthInfo`

## Import

```javascript
import OAuthInfo from "@arcgis/core/identity/OAuthInfo.js";
```

```javascript
// CDN
const OAuthInfo = await $arcgis.import("@arcgis/core/identity/OAuthInfo.js");
```

**Since:** 4.0

## See Also

- Sample - Access ArcGIS Online items using OAuth 2.0
- Authentication and secure resources
- Authentication and OAuth 2
- Proxy pages with the API
- ArcGIS portals
- IdentityManager
- oauth-callback.html
- userId
- intl
- flowType
- popupCallbackUrl
- oauth-callback.html
- popup
- oauth-callback.html
- popup
- forceUserId

## Property Details

### `OAuthInfo`

### `appId`

### `authNamespace`

### `declaredClass`
- **Type:** `Inherited`

### `expiration`

### `flowType`

### `forceUserId`

### `locale`

### `minTimeUntilExpiration`

### `popup`

### `popupCallbackUrl`

### `popupWindowFeatures`

### `portalUrl`

### `preserveUrlHash`

### `userId`

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
const [OAuthInfo, esriId] = await $arcgis.import([
  "@arcgis/core/identity/OAuthInfo.js",
  "@arcgis/core/identity/IdentityManager.js"
]);
// Create a new OAuthInfo object.
// The OAuth sign-in page will be shown in a popup window and use the specified callback URL.
const info = new OAuthInfo({
  appId: "<put client id here>",
  popup: true,
  // If using a callback page other than the default one,
  // make sure it supports the authentication type used.
  popupCallbackUrl: "<url to callback page>"
});

// Add this OAuthInfo object to the IdentityManager.
esriId.registerOAuthInfos([info]);
```

```javascript
// The `flowType` defaults to `auto`.
// If using a supported server/portal version, two-step authentication is used.
// If not, reverts to one-step.
const infoAuto = new OAuthInfo({
  appId: "<put client id here>"
});
```

```javascript
// One-step workflow - no longer recommended.
// Should only be used if working with older versions of Server/Portal, (ie. < 10.9).
const infoImplicit = new OAuthInfo({
  appId: "<put client id here>",
  flowType: "implicit",
  popup: true,
  // Updated callback page works with both two-step and one-step authentication
  popupCallbackUrl: "oauth-callback.html"
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

