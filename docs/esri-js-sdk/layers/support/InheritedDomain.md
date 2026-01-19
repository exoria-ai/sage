# InheritedDomain

**Module:** `@arcgis/core/layers/support/InheritedDomain`

## Import

```javascript
import InheritedDomain from "@arcgis/core/layers/support/InheritedDomain.js";
```

```javascript
// CDN
const InheritedDomain = await $arcgis.import("@arcgis/core/layers/support/InheritedDomain.js");
```

**Since:** 4.0

## See Also

- Domain Objects - ArcGIS Server REST API
- CodedValueDomain
- RangeDomain

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `name`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
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

