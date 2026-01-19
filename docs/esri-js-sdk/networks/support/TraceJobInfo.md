# TraceJobInfo

**Module:** `@arcgis/core/networks/support/TraceJobInfo`

## Import

```javascript
import TraceJobInfo from "@arcgis/core/networks/support/TraceJobInfo.js";
```

```javascript
// CDN
const TraceJobInfo = await $arcgis.import("@arcgis/core/networks/support/TraceJobInfo.js");
```

**Since:** 4.27

## See Also

- TraceParameters
- UtilityNetwork
- topologyValidationJobInfo.waitForJobCompletion()

## Property Details

### `TraceJobInfo`

### `declaredClass`
- **Type:** `Inherited`

### `lastUpdatedTime`

### `status`

### `statusUrl`

### `submissionTime`

### `addHandles`
- **Type:** `Inherited`

### `checkJobStatus`

### `destroy`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `waitForJobCompletion`


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
const traceLocation = TraceLocation.fromJSON({
  traceLocationType: "startingPoint",
  globalId: "{BBF88249-6BAD-438F-9DBB-0E48DD89EECA}",
  percentAlong: 0.5805425412252266
});

const traceParameters = TraceParameters.fromJSON({
  traceConfigurationGlobalId: "{DF22DA8D-6EC0-408B-A8B2-E468EC7DC9BF}",
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
traceParameters.traceLocations = [traceLocation];

const jobInfo = await network.submitTraceJob(traceParameters);
await jobInfo.checkJobStatus();
```

```javascript
// Stop monitoring this job for status updates.
jobInfo.destroy();
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
// Submit an asynchronous trace job.
const traceLocation: TraceLocation = TraceLocation.fromJSON({
  traceLocationType: "startingPoint",
  globalId: "{BBF88249-6BAD-438F-9DBB-0E48DD89EECA}",
  percentAlong: 0.5805425412252266
});

const traceParameters: TraceParameters = TraceParameters.fromJSON({
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
traceParameters.traceLocations = [traceLocation];

const jobInfo = await network.submitTraceJob(traceParameters);

await jobInfo.waitForJobCompletion();
```

