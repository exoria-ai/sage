# Circuit

**Module:** `@arcgis/core/networks/support/Circuit`

## Import

```javascript
import Circuit from "@arcgis/core/networks/support/Circuit.js";
```

```javascript
// CDN
const Circuit = await $arcgis.import("@arcgis/core/networks/support/Circuit.js");
```

**Since:** 4.34

## See Also

- UtilityNetwork
- CircuitManager
- CircuitSection
- Subcircuit
- CircuitLocation
- Telecom domain network

## Property Details

### `Circuit`

### `attributes`

### `circuitManager`

### `circuitType`

### `declaredClass`
- **Type:** `Inherited`

### `globalId`

### `isDeleted`

### `isSectioned`

### `lastExportedTime`

### `lastVerifiedTime`

### `name`

### `sections`

### `startLocation`

### `status`

### `stopLocation`

### `subcircuits`

### `addHandles`
- **Type:** `Inherited`

### `getAttribute`

### `getSectionById`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `setAttribute`

### `setSections`

### `setStartStopLocations`


## Method Details

### `Method Details()`


## Examples

```javascript
const startLocation = new CircuitLocation({
  sourceId: 20,
  globalId: "{665803BB-258E-4BAE-A5B2-27DBD8A83C30}",
  terminalId: 1,
  firstUnit: 1,
  numUnits: 1,
});

const stopLocation = new CircuitLocation({
  sourceId: 20,
  globalId: "{58CB492A-1992-4518-A60F-6119B1317E89}",
  terminalId: 1,
  firstUnit: 1,
  numUnits: 1,
});

const circuit = new Circuit({
  name: "FIRSTCIRCUIT",
  circuitType: "physical",
  startLocation,
  stopLocation,
});
```

```javascript
const sectionOne = new CircuitSection({
  sectionId: 1,
  subcircuit: new Subcircuit({ name: "SUBCIRCUITVALUE1" }),
});

const sectionTwo = new CircuitSection({
  sectionId: 2,
  subcircuit: new Subcircuit({ name: "SUBCIRCUITVALUE2" }),
});

const sectionThree = new CircuitSection({
  sectionId: 3,
  subcircuit: new Subcircuit({ name: "SUBCIRCUITVALUE3" }),
});

const sectionFour = new CircuitSection({
  sectionId: 4,
  subcircuit: new Subcircuit({ name: "SUBCIRCUITVALUE4" }),
});

const sections = new Map([
  [sectionOne, [sectionTwo, sectionThree]],
  [sectionTwo, [sectionFour]],
  [sectionThree, [sectionFour]],
  [sectionFour, []],
]);

const circuit = new Circuit({
  name: "TESTCIRCUIT",
  sections,
});
```

```javascript
const circuit = new Circuit({ name: "TESTCIRCUIT" });
```

```javascript
{
  "1": [2, 3],
  "2": [4],
  "3": [4],
  "4": [],
}
```

```javascript
const sectionOne = new CircuitSection({
  sectionId: 1,
  subcircuit: new Subcircuit({ name: "SUBCIRCUITVALUE1" }),
});

const sectionTwo = new CircuitSection({
  sectionId: 2,
  subcircuit: new Subcircuit({ name: "SUBCIRCUITVALUE2" }),
});

const sectionThree = new CircuitSection({
  sectionId: 3,
  subcircuit: new Subcircuit({ name: "SUBCIRCUITVALUE3" }),
});

const sectionFour = new CircuitSection({
  sectionId: 4,
  subcircuit: new Subcircuit({ name: "SUBCIRCUITVALUE4" }),
});

const sections = new Map([
  [sectionOne, [sectionTwo, sectionThree]],
  [sectionTwo, [sectionFour]],
  [sectionThree, [sectionFour]],
  [sectionFour, []],
]);

const circuit = new Circuit({
  name: "TESTCIRCUIT",
  sections,
});
```

