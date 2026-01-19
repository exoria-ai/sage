# IdentityManager

**Module:** `@arcgis/core/identity/IdentityManager`

## Import

```javascript
import esriId from "@arcgis/core/identity/IdentityManager.js";
```

```javascript
// CDN
const esriId = await $arcgis.import("@arcgis/core/identity/IdentityManager.js");
```

```javascript
// CDN
const [OAuthInfo, esriId] = await $arcgis.import([
  "@arcgis/core/identity/OAuthInfo.js",
  "@arcgis/core/identity/IdentityManager.js"
]);
```

**Since:** 4.0

## See Also

- Access Secure Services
- Authentication and OAuth 2
- Guide topic - Proxy pages
- ArcGIS Organization portals
- Sample - Access ArcGIS Online items using OAuth 2.0
- Passing authentication to IFramed apps
- enablePostMessageAuth
- disablePostMessageAuth
- Passing authentication to IFramed apps

## Property Details

### `dialog`

### `tokenValidity`

### `checkAppAccess`

### `checkSignInStatus`

### `destroyCredentials`

### `disablePostMessageAuth`

### `emit`

### `enablePostMessageAuth`

### `findCredential`

### `findOAuthInfo`

### `findServerInfo`

### `generateToken`

### `getCredential`

### `hasEventListener`

### `initialize`

### `isBusy`

### `on`

### `registerOAuthInfos`

### `registerServers`

### `registerToken`

### `setOAuthRedirectionHandler`

### `setOAuthResponseHash`

### `setProtocolErrorHandler`

### `toJSON`

### `handlerCallback`


## Method Details

### `Method Details()`


## Examples

```javascript
const esriId = await $arcgis.import("@arcgis/core/identity/IdentityManager.js");
let portalURL = "https://host.arcgis.com";
findOAuthInfo = function (){
  let oAuthInfo = esriId.findOAuthInfo(portalURL)
  console.log(oAuthInfo.toJSON())
}
```

```javascript
view.on("click", function(event){
  // event is the event handle returned after the event fires.
  console.log(event.mapPoint);
});
```

```javascript
const [OAuthInfo, esriId] = await $arcgis.import([
  "@arcgis/core/identity/OAuthInfo.js",
  "@arcgis/core/identity/IdentityManager.js"
]);
let oAuthInfo = new OAuthInfo({
  appId: "<registered client id>"
}); // required parameter
esriId.registerOAuthInfos([oAuthInfo]);
```

```javascript
const [ServerInfo, esriId] = await $arcgis.import(["@arcgis/core/identity/ServerInfo.js", "@arcgis/core/identity/IdentityManager.js"]);
let serverInfo = new ServerInfo();
serverInfo.server = "https://sampleserver6.arcgisonline.com";
serverInfo.tokenServiceUrl = "https://sampleserver6.arcgisonline.com/arcgis/tokens/generateToken";
serverInfo.hasServer = true;
esriId.registerServers([serverInfo]);
```

```javascript
const esriId = await $arcgis.import("@arcgis/core/identity/IdentityManager.js");
esriId.setOAuthRedirectionHandler(function(info)
 {
   // Execute custom logic then perform redirect
   window.location = info.authorizeUrl + "?" + new URLSearchParams(info.authorizeParams).toString();
});
```

