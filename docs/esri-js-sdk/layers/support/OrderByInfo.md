# OrderByInfo

**Module:** `@arcgis/core/layers/support/OrderByInfo`

## Import

```javascript
import OrderByInfo from "@arcgis/core/layers/support/OrderByInfo.js";
```

```javascript
// CDN
const OrderByInfo = await $arcgis.import("@arcgis/core/layers/support/OrderByInfo.js");
```

**Since:** 4.21

## Property Details

### `OrderByInfo`

### `declaredClass`
- **Type:** `Inherited`

### `field`

### `order`

### `valueExpression`

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
// Draws features in the view so that features with larger population
// values are rendered on top of larger features.
const orderBy = new OrderByInfo({
  field: "POPULATION",
  order: "descending"
});

layer.orderBy = [orderBy];
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

