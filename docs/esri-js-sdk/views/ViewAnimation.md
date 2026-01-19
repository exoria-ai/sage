# ViewAnimation

**Module:** `@arcgis/core/views/ViewAnimation`

## Import

```javascript
import ViewAnimation from "@arcgis/core/views/ViewAnimation.js";
```

```javascript
// CDN
const ViewAnimation = await $arcgis.import("@arcgis/core/views/ViewAnimation.js");
```

**Since:** 4.0

## See Also

- SceneView.goTo()
- MapView.animation

## Property Details

### `ViewAnimation`

### `declaredClass`
- **Type:** `Inherited`

### `state`

### `target`

### `addHandles`
- **Type:** `Inherited`

### `finish`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `removeHandles`
- **Type:** `Inherited`

### `stop`

### `when`


## Method Details

### `Method Details()`


## Examples

```javascript
reactiveUtils.when(() => view.animation, function(animation) {
  console.log(animation.state); // prints out "running"
  animation.when(function(animation) {
      console.log(animation.state); // prints out "finished"
    })
    .catch(function(animation) {
      console.log(animation.state); // prints out "stopped"
    });
});
```

```javascript
let animation = view.goTo(target, { speedFactor: 0.1 });

reactiveUtils.watch(
  () => animation.state,
  (state) => {
    switch (state) {
      case "finished":
        console.log("Animation finished.");
        break;
      case "stopped":
        console.log("Animation stopped.");
        break;
    }
  }
);
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

```javascript
// Although this example uses MapView, any class instance that is a promise may use when() in the same way
let view = new MapView();
view.when(function(){
  // This function will execute once the promise is resolved
}, function(error){
  // This function will execute if the promise is rejected due to an error
});
```

