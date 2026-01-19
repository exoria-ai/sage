# Handles

**Module:** `@arcgis/core/core/Handles`

## Import

```javascript
import Handles from "@arcgis/core/core/Handles.js";
```

```javascript
// CDN
const Handles = await $arcgis.import("@arcgis/core/core/Handles.js");
```

**Since:** 4.7

## Property Details

### `add`

### `destroy`

### `has`

### `remove`

### `removeAll`

### `Handle`


## Method Details

### `Method Details()`


## Examples

```javascript
let handles = new Handles();

handles.add(handle); // added to the default group
handles.add([handle1, handle2]); // added to the default group

handles.add(handle, "handle-group");
handles.add([handle1, handle2], "other-handle-group");
```

```javascript
let handles = new Handles();

handles.add(reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
));
```

```javascript
let handles = new Handles();

handles.add(reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
));

handles.destroy();
```

```javascript
let handles = new Handles();

handles.remove(); // removes handles from default group

handles.remove("handle-group");
handles.remove("other-handle-group");
```

