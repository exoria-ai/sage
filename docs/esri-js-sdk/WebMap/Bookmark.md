# Bookmark

**Module:** `@arcgis/core/webmap/Bookmark`

## Import

```javascript
import Bookmark from "@arcgis/core/webmap/Bookmark.js";
```

```javascript
// CDN
const Bookmark = await $arcgis.import("@arcgis/core/webmap/Bookmark.js");
```

**Since:** 4.8

## See Also

- Bookmarks
- Bookmarks

## Property Details

### `Bookmark`

### `declaredClass`
- **Type:** `Inherited`

### `name`

### `thumbnail`

### `timeExtent`

### `uid`

### `viewpoint`

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
// create a bookmark with a time extent starting December 10, 1996
//   and ending December 25, 1996
const bookmark = new Bookmark({
   timeExtent: {
     start: new Date(1996, 11, 10),
     end: new Date(1996, 11, 25)
   }
})
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

