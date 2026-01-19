# ValuePicker

**Module:** `@arcgis/core/widgets/ValuePicker`

## Import

```javascript
import ValuePicker from "@arcgis/core/widgets/ValuePicker.js";
```

```javascript
// CDN
const ValuePicker = await $arcgis.import("@arcgis/core/widgets/ValuePicker.js");
```

**Since:** 4.27

## See Also

- ValuePickerCollection
- ValuePickerCombobox
- ValuePickerLabel
- ValuePickerSlider
- Slider
- Calcite Icon Search
- ValuePickerCollection.collection
- ValuePickerCombobox.items
- ValuePickerLabel.items

## Property Details

### `ValuePicker`

### `canNext`

### `canPlay`

### `canPrevious`

### `caption`

### `component`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`
- **Type:** `Inherited`

### `layout`

### `loop`

### `playRate`

### `values`

### `visible`
- **Type:** `Inherited`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `next`

### `on`
- **Type:** `Inherited`

### `pause`

### `play`

### `postInitialize`
- **Type:** `Inherited`

### `previous`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const valuePicker = new ValuePicker();
view.ui.add(valuePicker, "top-right");
```

```javascript
valuePicker.on("play",     () => { console.log("user clicks play"); })
valuePicker.on("pause",    () => { console.log("user clicks pause"); })
valuePicker.on("previous", () => { console.log("user clicks previous"); })
valuePicker.on("next",     () => { console.log("user clicks next"); })
```

```javascript
const labelComponent = {
  type: "label",
  items: [
    { value: "ind", label: "Industrial" },
    { value: "res", label: "Residential" },
    { value: "com", label: "Commercial" }
  ]
};

const valuePicker = new ValuePicker({
  component: labelComponent,
  values: ["ind"]
});
view.ui.add(valuePicker, "top-right");
```

```javascript
reactiveUtils.watch(
  () => valuePicker.values,
  (values) => console.log(`The land use zone code is: ${values[0]}`)
);
```

```javascript
const valuePicker = new ValuePicker({
  component: { // autocasts ValuePickerCollection when type is "collection".
    type: "collection",
    collection: ["hybrid", "oceans", "osm"]
  },
  values: ["hybrid"]
});
view.ui.add(valuePicker, "top-right");
```

```javascript
reactiveUtils.watch(
  () => valuePicker.values,
  (values) => console.log(`The current basemap is: ${values[0]}`)
);
```

