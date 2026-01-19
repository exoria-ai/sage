# Widget

**Module:** `@arcgis/core/widgets/Widget`

## Import

```javascript
import Widget from "@arcgis/core/widgets/Widget.js";
```

```javascript
// CDN
const Widget = await $arcgis.import("@arcgis/core/widgets/Widget.js");
```

**Since:** 4.2

## Inheritance

Extends: **Accessor**

## See Also

- Accessor
- widget
- Guide - Implementing Accessor
- Guide - Watching for changes
- Guide - Watching for component changes
- Guide - Get started: TypeScript
- Calcite Icon Search

## Property Details

### `container`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`

### `icon`

### `id`

### `label`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `classes`

### `destroy`

### `emit`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `on`

### `postInitialize`

### `removeHandles`
- **Type:** `Inherited`

### `render`

### `renderNow`

### `scheduleRender`

### `when`


## Method Details

### `Method Details()`


## Examples

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
// Hides the widget in the view
widget.visible = false;
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
// .tsx syntax showing how to set css classes while rendering the widget

render() {
  const dynamicClasses = {
    [css.flip]: this.flip,
    [css.primary]: this.primary
  };

  return (
    <div class={classes(css.root, css.mixin, dynamicClasses)} />
  );
}
```

