# JobInfo

**Module:** `@arcgis/core/rest/support/JobInfo`

## Import

```javascript
import JobInfo from "@arcgis/core/rest/support/JobInfo.js";
```

```javascript
// CDN
const JobInfo = await $arcgis.import("@arcgis/core/rest/support/JobInfo.js");
```

**Since:** 4.20

## See Also

- geoprocessor
- GPMessage
- ParameterValue
- GP Job Progress Messages
- Geoprocessing Service (Async) | Cancel a job
- jobInfo.waitForJobCompletion()

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `jobId`

### `jobStatus`

### `messages`

### `progress`

### `requestOptions`

### `sourceUrl`

### `addHandles`
- **Type:** `Inherited`

### `cancelJob`

### `checkJobStatus`

### `destroy`

### `fetchResultData`

### `fetchResultImage`

### `fetchResultMapImageLayer`

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
// Submit an asynchronous geoprocessing job
const jobInfo = await submitJob(url, params);

// Define a callback that will be called periodically. The function will print the
// geoprocessor's progress and percentage complete (if a step progressor).
const statusCallback = ({ jobStatus, progress }) => {
  if (jobStatus !== "job-executing") { return; }

  const { message, percent } = progress;
  const status = `Message:  ${message}
                  Progress: ${percent ?? "not specified"}`
  console.log(`Status: ${status}`);
};

// Wait for the geoprocessing job to complete and print job progress
// to the console every five seconds
await jobInfo.waitForJobCompletion({ interval: 5000, statusCallback });
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
// Cancel an ongoing geoprocessing job when the user clicks a "cancel" button.
document.getElementById("cancelButton").addEventListener("click", () => {
  jobInfo.cancelJob().then(() => {
    console.log("Job cancelled successfully.");
  }).catch(() => {
    console.log("Problem occurred which cancelling the geoproccessing job");
  });
});
```

```javascript
// Stop monitoring this job for status updates.
jobInfo.destroy();
```

```javascript
// Get the resulting map image layer from a completed geoprocessing job.
jobInfo.fetchResultMapImageLayer(jobInfo.jobId)).then(function(layer){
  view.map.add(layer);
});
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

