# PlacesParameters

**Module:** `@arcgis/core/rest/support/PlacesParameters`

## Import

```javascript
import PlacesParameters from "@arcgis/core/rest/support/PlacesParameters.js";
```

```javascript
// CDN
const PlacesParameters = await $arcgis.import("@arcgis/core/rest/support/PlacesParameters.js");
```

**Since:** 4.27

## See Also

- Sample - Find nearby places and details
- Introduction to places
- Places category finder
- Places service
- places
- FetchPlaceParameters
- PlacesQueryParameters
- API keys

## Property Details

### `PlacesParameters`

### `apiKey`

### `declaredClass`
- **Type:** `Inherited`

### `icon`

### `url`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


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

