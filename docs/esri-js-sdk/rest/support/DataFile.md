# DataFile

**Module:** `@arcgis/core/rest/support/DataFile`

## Import

```javascript
import DataFile from "@arcgis/core/rest/support/DataFile.js";
```

```javascript
// CDN
const DataFile = await $arcgis.import("@arcgis/core/rest/support/DataFile.js");
```

**Since:** 4.20

## See Also

- geoprocessor

## Property Details

### `DataFile`

### `declaredClass`
- **Type:** `Inherited`

### `itemId`

### `url`

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
const [Geoprocessor, DataFile] = await $arcgis.import([
  "@arcgis/core/rest/Geoprocessor.js", "@arcgis/core/rest/support/DataFile.js"
]);
let gp = new Geoprocessor( ... );
function requestSucceeded(result) {
  let itemID = result.item.itemID;
  let dataFile = new DataFile();
  dataFile.itemID = itemID;
  let params = {
    "Input_File": dataFile
  };
  gp.execute(params).then(function(gpResult){
    ...
   });
}
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

