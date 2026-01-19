# DisplayFilterInfo

**Module:** `@arcgis/core/layers/support/DisplayFilterInfo`

## Import

```javascript
import DisplayFilterInfo from "@arcgis/core/layers/support/DisplayFilterInfo.js";
```

```javascript
// CDN
const DisplayFilterInfo = await $arcgis.import("@arcgis/core/layers/support/DisplayFilterInfo.js");
```

**Since:** 4.32

## See Also

- DisplayFilter
- FeatureLayer.displayFilterInfo
- FeatureLayer.displayFilterEnabled
- View.displayFilterEnabled
- Sample - Scale-dependent DisplayFilter

## Property Details

### `DisplayFilterInfo`

### `activeFilterId`

### `declaredClass`
- **Type:** `Inherited`

### `filters`

### `mode`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
// loop through the layer's display filters and create a dropdown to select the active filter
layer.displayFilterInfo.filters.forEach((filter) => {
  const option = document.createElement("calcite-option");
  option.value = filter.id;
  option.innerText = filter.title;
  filterSelect.appendChild(option);
});

// set the active filter when the user selects a filter from the dropdown
filterSelect.addEventListener("calciteSelectChange", () => {
  layer.displayFilterInfo.activeFilterId = filterSelect.value;
});
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

