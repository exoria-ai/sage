# AddressCandidate

**Module:** `@arcgis/core/rest/support/AddressCandidate`

## Import

```javascript
import AddressCandidate from "@arcgis/core/rest/support/AddressCandidate.js";
```

```javascript
// CDN
const AddressCandidate = await $arcgis.import("@arcgis/core/rest/support/AddressCandidate.js");
```

**Since:** 4.20

## See Also

- locator
- Find Address Candidates

## Property Details

### `address`

### `attributes`

### `declaredClass`
- **Type:** `Inherited`

### `extent`

### `location`

### `score`

### `addHandles`
- **Type:** `Inherited`

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

