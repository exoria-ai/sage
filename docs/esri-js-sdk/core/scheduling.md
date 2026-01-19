# scheduling

**Module:** `@arcgis/core/core/scheduling`

## Import

```javascript
import * as scheduling from "@arcgis/core/core/scheduling.js";
```

```javascript
// CDN
const scheduling = await $arcgis.import("@arcgis/core/core/scheduling.js");
```

**Since:** 4.7

## Overview

Various utilities and convenience functions for executing code at various phases of browser frames. The scheduling module allows you to register tasks that are executed in every animation frame. This can be used to synchronize updates with ongoing animations of the view, or to animate the view manually by adjusting the extent or camera in every frame. // Animate the scene view camera heading in every frame let handle = scheduling.addFrameTask({ update: function() { let camera = view.camera.clone(); camera.heading += 0.2; view.camera = camera; } }); // Remove frame task as soon as the user starts navigating in the view reactiveUtils.whenOnce(() => view.navigating, () => handle.remove());

## Property Details

### `addFrameTask`

### `schedule`

### `FrameTaskHandle`

### `PhaseCallback`

### `PhaseCallbacks`

### `PhaseEvent`


## Method Details

### `Method Details()`


## Examples

```javascript
// Animate the scene view camera heading in every frame
let handle = scheduling.addFrameTask({
  update: function() {
    let camera = view.camera.clone();
    camera.heading += 0.2;
    view.camera = camera;
  }
});

// Remove frame task as soon as the user starts navigating in the view
reactiveUtils.whenOnce(() => view.navigating, () => handle.remove());
```

```javascript
// Animate the scene view camera heading in every frame
let handle = scheduling.addFrameTask({
  update: function() {
    let camera = view.camera.clone();
    camera.heading += 0.2;
    view.camera = camera;
  }
});

// Remove frame task as soon as the user starts navigating in the view
reactiveUtils.whenOnce(() => view.navigating, () => handle.remove());
```

```javascript
// Use scheduling.schedule to log an error message at most once per tick
let logErrorHandle;

function logError(error) {
  if (!logErrorHandle) {
    logErrorHandle = scheduling.schedule(function() {
      console.error(error);
      logErrorHandle = null;
    });
  }
});
```

