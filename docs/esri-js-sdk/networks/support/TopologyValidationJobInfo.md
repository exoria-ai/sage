# TopologyValidationJobInfo

**Module:** `@arcgis/core/networks/support/TopologyValidationJobInfo`

## Import

```javascript
import TopologyValidationJobInfo from "@arcgis/core/networks/support/TopologyValidationJobInfo.js";
```

```javascript
// CDN
const TopologyValidationJobInfo = await $arcgis.import("@arcgis/core/networks/support/TopologyValidationJobInfo.js");
```

**Since:** 4.26

## See Also

- ValidateNetworkTopologyParameters
- UtilityNetwork
- topologyValidationJobInfo.waitForJobCompletion()

## Property Details

### `TopologyValidationJobInfo`

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
const extent = new Extent({
  xmin: 470789.0888,
  ymin: 3597733.2051,
  xmax: 531454.2759999996,
  ymax: 3639864.802100001,
  spatialReference: { wkid: 26911, latestWkid: 26911 }
});

const result = await network.submitTopologyValidationJob(
  new ValidateNetworkTopologyParameters({
    validateArea: extent,
    gdbVersion: "version.test"
  })
);

const jobInfo = await result.checkJobStatus();
console.log("jobInfo.status", jobInfo.status);
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
// Submit an asynchronous validate network topology job. Display the remote job status every 1.5 seconds.
const extent = new Extent({
  xmin: 470789.0888,
  ymin: 3597733.2051,
  xmax: 531454.2759999996,
  ymax: 3639864.802100001,
  spatialReference: { wkid: 26911, latestWkid: 26911 }
});

const result = await network.submitTopologyValidationJob(
  new ValidateNetworkTopologyParameters({
    validateArea: extent,
    gdbVersion: "version.test"
  })
);

const options = {
  interval: 1500,
  statusCallback: (j) => {
    console.log("Job Status: ", j.jobStatus);
  }
};

await jobInfo.waitForJobCompletion(options);
```

