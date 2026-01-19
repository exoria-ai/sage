# TraceParameters

**Module:** `@arcgis/core/rest/networks/support/TraceParameters`

## Import

```javascript
import TraceParameters from "@arcgis/core/rest/networks/support/TraceParameters.js";
```

```javascript
// CDN
const TraceParameters = await $arcgis.import("@arcgis/core/rest/networks/support/TraceParameters.js");
```

**Since:** 4.20

## See Also

- trace
- Learn more about branch versioning

## Property Details

### `TraceParameters`

### `declaredClass`
- **Type:** `Inherited`

### `gdbVersion`

### `moment`

### `namedTraceConfigurationGlobalId`

### `outSpatialReference`

### `resultTypes`

### `traceConfiguration`

### `traceLocations`

### `traceType`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `ResultTypeJSON`


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

```javascript
// Creates a new instance of this class and initializes it with values inputted in json format. A resultTypes object is passed into the resultTypes property.
const traceParameters = TraceParameters.fromJSON({
   traceConfigurationGlobalId: "{DF22DA8D-6EC0-408B-A8B2-E468EC7DC9BF}",
   moment: 1554214441244,
   gdbVersion: "SDE.DEFAULT",
   resultTypes: [
     {
       type: "elements",
       includeGeometry: false,
       includePropagatedValues: false,
       networkAttributeNames: [],
       diagramTemplateName: "",
       resultTypeFields: []
     },
     {
       type: "aggregatedGeometry",
       includeGeometry: false,
       includePropagatedValues: false,
       networkAttributeNames: [],
       diagramTemplateName: "",
       resultTypeFields: []
     }
   ],
   traceType: "subnetwork"
 });
```

