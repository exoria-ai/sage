# VersionManagementService

**Module:** `@arcgis/core/versionManagement/VersionManagementService`

## Import

```javascript
import VersionManagementService from "@arcgis/core/versionManagement/VersionManagementService.js";
```

```javascript
// CDN
const VersionManagementService = await $arcgis.import("@arcgis/core/versionManagement/VersionManagementService.js");
```

**Since:** 4.28

## See Also

- Version Management Service
- Version Management Component

## Property Details

### `VersionManagementService`

### `capabilities`

### `defaultVersionIdentifier`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `name`

### `url`

### `alterVersion`

### `canRedo`

### `canUndo`

### `cancelLoad`

### `changeVersion`

### `changeVersionWithResult`

### `createVersion`

### `deleteVersion`

### `getLockType`

### `getVersionIdentifierFromGuid`

### `getVersionIdentifierFromName`

### `getVersionInfoExtended`

### `getVersionInfos`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `post`

### `reconcile`

### `redo`

### `startEditing`

### `startEditingWithResult`

### `startReading`

### `startReadingWithResult`

### `stopEditing`

### `stopEditingWithResult`

### `stopReading`

### `stopReadingWithResult`

### `undo`

### `when`

### `PostResult`

### `ReconcileResult`

### `ServiceError`

### `ServiceResult`

### `VersionAdapter`

### `VersionIdentifier`

### `VersionInfoExtendedJSON`

### `VersionInfoJSON`

### `VersionManagementServiceCapabilities`


## Method Details

### `Method Details()`


## Examples

```javascript
// Initialize the VersionManagementService from a url
const versionManagementService = new VersionManagementService({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/VersionManagementServer"
});

// The layers that will be managed under the VersionManagementService
const layer1 = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/FeatureServer/12"
});
const layer2 = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/FeatureServer/13"
});
const layers = [layer1, layer2];

// The VersionManagementService must be loaded before any methods can be called
await versionManagementService.load();

// Change the version of two layers
versionManagementService.changeVersion(
  layers,
  { name: "sde.DEFAULT", guid: "{13DEDC17-5867-4DBC-9855-0736C4C57162}"},
  { name: "admin.version", guid: "{422D1B63-D795-4478-A4B1-AD6109377074}"}
);
```

```javascript
// Create a Version Management Service from a url
const versionManagementService = new VersionManagementService({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/VersionManagementServer"
});
```

```javascript
// Make sure the VersionManagementService is loaded
await versionManagementService.load();

const result = await versionManagementService.alterVersion(
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
// Initialize the VersionManagementService from a url
const versionManagementService = new VersionManagementService({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/VersionManagementServer"
});

const layer1 = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/12"
});
const layer2 = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/13"
});
const layers = [layer1, layer2];

// Make sure the VersionManagementService is loaded
await versionManagementService.load();

await versionManagementService.changeVersion(
  layers,
  { name: "sde.DEFAULT", guid: "{13DEDC17-5867-4DBC-9855-0736C4C57162}"},
  { name: "admin.version", guid: "{422D1B63-D795-4478-A4B1-AD6109377074}"}
);
```

```javascript
const [utils, VersionManagementService, FeatureLayer] = await $arcgis.import([
  "@arcgis/core/versionManagement/versionAdapters/utils.js",
  "@arcgis/core/versionManagement/VersionManagementService.js",
  "@arcgis/core/layers/FeatureLayer.js"
]);
// Initialize the VersionManagementService from a url
const versionManagementService = new VersionManagementService({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/VersionManagementServer"
});

const layer1 = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/12"
});
const layer2 = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/13"
});
const adapters = utils.createVersionAdapters([layer1, layer2]);

// Make sure the VersionManagementService is loaded
await versionManagementService.load();

await versionManagementService.changeVersionWithResult(
  adapters,
  { name: "sde.DEFAULT", guid: "{13DEDC17-5867-4DBC-9855-0736C4C57162}"},
  { name: "admin.version", guid: "{422D1B63-D795-4478-A4B1-AD6109377074}"}
);
```

```javascript
// Make sure the VersionManagementService is loaded
await versionManagementService.load();

// Create a version by passing the new version name, description, and access type set to 'public'.
const version = await versionManagementService.createVersion({
  versionName: "versionName",
  description: "description",
  access: "public"
});
```

