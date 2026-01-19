# VersioningState

**Module:** `@arcgis/core/versionManagement/VersioningState`

## Import

```javascript
import VersioningState from "@arcgis/core/versionManagement/VersioningState.js";
```

```javascript
// CDN
const VersioningState = await $arcgis.import("@arcgis/core/versionManagement/VersioningState.js");
```

```javascript
// CDN
const [utils, WebMap] = await $arcgis.import([
  "@arcgis/core/versionManagement/versionAdapters/utils.js",
  "@arcgis/core/WebMap.js"
]);
```

**Since:** 4.30

## See Also

- Version Management Service
- Version Management Component

## Property Details

### `VersioningState`

### `currentVersion`

### `currentVersionInfo`

### `defaultVersionIdentifier`

### `featureServiceUrl`

### `isDefault`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `state`

### `url`

### `usePersistentReadSessions`

### `versionInfos`

### `versionManagementService`

### `versionableItems`

### `alterVersion`

### `cancelLoad`

### `changeVersion`

### `deleteVersion`

### `getVersionInfoExtended`

### `getVersionInfos`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `redo`

### `startEditing`

### `stopEditing`

### `undo`

### `when`

### `VersionInfo`

### `VersionInfoExtendedJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
const [utils, WebMap] = await $arcgis.import([
  "@arcgis/core/versionManagement/versionAdapters/utils.js",
  "@arcgis/core/WebMap.js"
]);
const webmap = new WebMap({
  portalItem: { // autocasts as new PortalItem()
    id: "e691172598f04ea8881cd2a4adaa45ba"
  }
});
const versioningStates = await utils.createVersioningStates(webmap, false);
```

```javascript
const result = await versioningState.alterVersion(
  { name: "newVersion", guid: "{49C6AC87-CDA8-46D4-A79B-449105981209}" },
  {
    versionName: "versionName",
    ownerName: "newOwner",
    description: "newDescription",
    access: "public"
  }
 );
```

```javascript
await versioningState.changeVersion(
  { name: "admin.version", guid: "{422D1B63-D795-4478-A4B1-AD6109377074}"}
);
```

```javascript
versioningState.deleteVersion({
  name: "versionName",
  guid: "{422D1B63-D795-4478-A4B1-AD6109377075}"
});
```

```javascript
await versioningState.startEditing();
```

```javascript
await versioningState.stopEditing(true);
```

