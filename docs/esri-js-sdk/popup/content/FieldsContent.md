# FieldsContent

**Module:** `@arcgis/core/popup/content/FieldsContent`

## Import

```javascript
import FieldsContent from "@arcgis/core/popup/content/FieldsContent.js";
```

```javascript
// CDN
const FieldsContent = await $arcgis.import("@arcgis/core/popup/content/FieldsContent.js");
```

**Since:** 4.11

## See Also

- PopupTemplate
- FieldInfo
- Content
- ExpressionInfo
- Sample - Intro to PopupTemplate
- Sample - Multiple popup elements

## Property Details

### `FieldsContent`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `fieldInfos`

### `title`

### `type`

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
// Create the FieldsInfo for the FieldsContent popup element
// Field Info 1
let fieldInfo1 = new FieldInfo({
  fieldName: "relationships/0/Point_Count_COMMON", // using a related table's field
  label: "Sum of species tree count",
  visible: true,
  format: format: {
    digitSeparator: true,
    places: 0
  },
  statisticType: "sum"
});

// Field Info 2
let fieldInfo2 = new FieldInfo({
  fieldName: "BLOCKCE10",
  label: "Block",
  visible: true
});

// Create the FieldsContent element
let fieldsElement = new FieldsContent({
  fieldInfos: [fieldInfo1, fieldInfo2]
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

