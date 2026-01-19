# SynthesizeAssociationGeometriesParameters

**Module:** `@arcgis/core/rest/networks/support/SynthesizeAssociationGeometriesParameters`

## Import

```javascript
import SynthesizeAssociationGeometriesParameters from "@arcgis/core/rest/networks/support/SynthesizeAssociationGeometriesParameters.js";
```

```javascript
// CDN
const SynthesizeAssociationGeometriesParameters = await $arcgis.import("@arcgis/core/rest/networks/support/SynthesizeAssociationGeometriesParameters.js");
```

**Since:** 4.20

## See Also

- synthesizeAssociationGeometries
- Learn more about branch versioning

## Property Details

### `SynthesizeAssociationGeometriesParameters`

### `declaredClass`
- **Type:** `Inherited`

### `extent`

### `gdbVersion`

### `maxGeometryCount`

### `moment`

### `outSpatialReference`

### `returnAttachmentAssociations`

### `returnConnectivityAssociations`

### `returnContainmentAssociations`

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

