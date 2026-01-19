# ListItemPanel

**Module:** `@arcgis/core/widgets/TableList/ListItemPanel`

## Import

```javascript
import TableListItemPanel from "@arcgis/core/widgets/TableList/ListItemPanel.js";
```

```javascript
// CDN
const TableListItemPanel = await $arcgis.import("@arcgis/core/widgets/TableList/ListItemPanel.js");
```

**Since:** 4.29

## See Also

- TableList
- ListItem
- ListItem.panel
- Calcite Icon Search

## Property Details

### `container`
- **Type:** `Inherited`

### `content`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `flowEnabled`

### `icon`

### `id`
- **Type:** `Inherited`

### `image`

### `label`
- **Type:** `Inherited`

### `listItem`

### `open`

### `title`

### `uid`

### `visible`

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

### `on`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

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

### `TableListItemPanelContent`


## Method Details

### `Method Details()`


## Examples

```javascript
const tableList = new TableList({
  view: view,
  listItemCreatedFunction: (event) =>{
    const { item } = event;
    const layer = item.layer;

    const count = await layer.queryFeatureCount();

    item.panel = {
      content: `Number of records: ${count}`,
      icon: "data-magnifying-glass",
    };
  }
});
```

```javascript
// Create the HTML div element programmatically at runtime and set to the widget's container
const basemapGallery = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
// Specify an already-defined HTML div element in the widget's container

const basemapGallery = new BasemapGallery({
  view: view,
  container: basemapGalleryDiv
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});

// HTML markup
<body>
  <div id="viewDiv"></div>
  <div id="basemapGalleryDiv"></div>
</body>
```

```javascript
// Specify the widget while adding to the view's UI
const basemapGallery = new BasemapGallery({
  view: view
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
const tableList = new TableList({
  view: view,
  listItemCreatedFunction: (event) => {
    const { item } = event;
    const { layer } = item;

    const count = await layer.queryFeatureCount();

    item.panel = {
      content: `Number of records: ${count}`,
      icon: "data-magnifying-glass",
    };
  }
});
```

```javascript
const tableList = new TableList({
  view: view,
  listItemCreatedFunction: (event) => {
    const { item } = event;
    item.panel = {
      content: document.getElementById("myDiv"),
      disabled: true,
      icon: "graph-bar"
    };
  }
});
```

