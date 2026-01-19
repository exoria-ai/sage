# VersionManagementViewModel

**Module:** `@arcgis/core/widgets/VersionManagement/VersionManagementViewModel`

## Import

```javascript
import VersionManagementViewModel from "@arcgis/core/widgets/VersionManagement/VersionManagementViewModel.js";
```

```javascript
// CDN
const VersionManagementViewModel = await $arcgis.import("@arcgis/core/widgets/VersionManagement/VersionManagementViewModel.js");
```

**Since:** 4.29

## See Also

- UtilityNetwork
- VersionManagementService

## Property Details

### `VersionManagementViewModel`

### `declaredClass`
- **Type:** `Inherited`

### `executionError`

### `featureServiceLookup`

### `loadError`

### `serverVersionLookup`

### `serviceNameLookup`

### `state`

### `userLookup`

### `versionAdministratorLookup`

### `versioningStateLookup`

### `versioningStates`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `alterVersion`

### `changeVersion`

### `createVersion`

### `deleteVersion`

### `getVersionInfos`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `AlterVersionParameters`

### `CreateVersionParameters`

### `FeatureServiceResourcesBundle`

### `VersionInfo`

### `VersionInfoExtendedJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
const webMap = new WebMap({
    portalItem: {
    id: "webmapID"
  }
});

const view = new MapView({
    map: webMap
});

featureLayer = new FeatureLayer({
    url: "https://myHostName.domain.com/arcgis/rest/services/TestService_11_2/FeatureServer/0",
});

webMap.layers.add(featureLayer);

const viewModel = new VersionManagementViewModel({ view });
await whenOnce(() => viewModel.state === "ready");
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
await versionManagementViewModel.alterVersion({
  featureServiceUrl: "https://myHostName.domain.com/arcgis/rest/services/TestService_11_2/FeatureServer/0",
  versionIdentifier: {
  guid: myVersion.versionIdentifier.guid,
  name: myVersion.versionIdentifier.name,
},
  versionName: "updatedVersionName"
});
```

```javascript
await versionManagementViewModel.changeVersion(
   "https://myHostName.domain.com/arcgis/rest/services/TestService_11_2/FeatureServer/0",
   "incomingVersionName",
   "incomingVersionGuid"
 )
```

```javascript
await viewModel.createVersion({
    featureServerUrl: "https://myHostName.domain.com/arcgis/rest/services/TestService_11_2/FeatureServer/0",
    versionName: "NewVersionName",
    description: "New Version Description",
    access: "public",
});
```

```javascript
await versionManagementViewModel.deleteVersion(
  "https://myHostName.domain.com/arcgis/rest/services/TestService_11_2/FeatureServer/0",
  "versionName",
  "{45A4CF5B-69FB-4D94-96F7-25F92EB4C0EC}"
);
```

