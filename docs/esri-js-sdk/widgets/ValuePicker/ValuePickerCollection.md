# ValuePickerCollection

**Module:** `@arcgis/core/widgets/ValuePicker/ValuePickerCollection`

## Import

```javascript
import ValuePickerCollection from "@arcgis/core/widgets/ValuePicker/ValuePickerCollection.js";
```

```javascript
// CDN
const ValuePickerCollection = await $arcgis.import("@arcgis/core/widgets/ValuePicker/ValuePickerCollection.js");
```

**Since:** 4.27

## Property Details

### `ValuePickerCollection`

### `collection`

### `type`


## Examples

```javascript
// Assign a collection of objects to the ValuePicker.
const collection = new Collection([
  { name: "Isaac Newton", dob: new Date(1643, 0, 4)},
  { name: "Albert Einstein", dob: new Date(1879, 2, 14)},
  { name: "Ernest Rutherford", dob: new Date(1871, 7, 20)}
]);

const valuePicker = new ValuePicker({
  component: new ValuePickerCollection({ collection }),
  values: [collection.at(0)]
});

reactiveUtils.watch(
  () => valuePicker.values,
  (values) => {
    const scientist = values[0];
    console.log(`${scientist.name} was born on ${scientist.age.toDateString()}`);
  }
);
```

```javascript
const valuePicker = new ValuePicker({
  values: ["hybrid"]
  component: new ValuePickerCollection({
    collection: ["hybrid", "oceans", "osm"] // autocast to Collection
  })
});
```

