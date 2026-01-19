# CircuitSection

**Module:** `@arcgis/core/networks/support/CircuitSection`

## Import

```javascript
import CircuitSection from "@arcgis/core/networks/support/CircuitSection.js";
```

```javascript
// CDN
const CircuitSection = await $arcgis.import("@arcgis/core/networks/support/CircuitSection.js");
```

**Since:** 4.34

## See Also

- UtilityNetwork
- CircuitManager
- Circuit
- Subcircuit
- CircuitLocation
- Telecom domain network

## Property Details

### `CircuitSection`

### `declaredClass`
- **Type:** `Inherited`

### `path`

### `role`

### `sectionId`

### `sectionType`

### `startLocation`

### `stopLocation`

### `subcircuit`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `setStartStopLocations`

### `setSubcircuit`


## Method Details

### `Method Details()`


## Examples

```javascript
const startLocation = new CircuitLocation({
  sourceId: 20,
  globalId: "{728C3E4A-DA4B-4766-9CA5-AF19B9E3F89C}",
  terminalId: 1,
  firstUnit: 1,
  numUnits: 1,
});

const stopLocation = new CircuitLocation({
  sourceId: 20,
  globalId: "{0E3D7C20-E74D-482F-AE40-4319BCF0EA74}",
  terminalId: 1,
  firstUnit: 1,
  numUnits: 1,
});

const section = new CircuitSection({
  sectionId: 1,
  sectionType: "physical",
  startLocation,
  stopLocation,
});
```

```javascript
const section = new CircuitSection({
  sectionId: 1,
  sectionType: "physical",
  subcircuit: new Subcircuit({
    name: "SUBCIRCUITVALUE1",
    isReserved: false,
  }),
});
```

```javascript
const section = new CircuitSection({ sectionId: 1 });
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

