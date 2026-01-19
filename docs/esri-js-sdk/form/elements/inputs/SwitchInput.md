# SwitchInput

**Module:** `@arcgis/core/form/elements/inputs/SwitchInput`

## Import

```javascript
import SwitchInput from "@arcgis/core/form/elements/inputs/SwitchInput.js";
```

```javascript
// CDN
const SwitchInput = await $arcgis.import("@arcgis/core/form/elements/inputs/SwitchInput.js");
```

**Since:** 4.20

## See Also

- FieldElement
- CodedValueDomain

## Property Details

### `SwitchInput`

### `declaredClass`
- **Type:** `Inherited`

### `offValue`

### `onValue`

### `type`

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
// Creates a new Switch input for a field element within a form
const switchInput = new SwitchInput({
  offValue: "No",
  onValue: "Yes"
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

