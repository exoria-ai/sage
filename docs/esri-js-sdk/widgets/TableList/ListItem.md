# ListItem

**Module:** `@arcgis/core/widgets/TableList/ListItem`

## Import

```javascript
import TableListItem from "@arcgis/core/widgets/TableList/ListItem.js";
```

```javascript
// CDN
const TableListItem = await $arcgis.import("@arcgis/core/widgets/TableList/ListItem.js");
```

**Since:** 4.17

## See Also

- TableList
- TableListViewModel
- FeatureLayer.isTable
- Map.tables
- Layer.listMode

## Property Details

### `actionsOpen`

### `actionsSections`

### `children`

### `error`

### `hidden`

### `layer`

### `listModeDisabled`

### `open`

### `panel`

### `parent`

### `publishing`

### `title`

### `uid`

### `clone`


## Method Details

### `Method Details()`


## Examples

```javascript
// displays content from the DOM in the LayerList
const tableList = new TableList({
  view: view,
  listItemCreatedFunction: (event) =>{
    const { item } = event;
    item.panel = {
      content: document.getElementById("myDiv"),
      icon: "graph-bar"
    };
  }
});
```

