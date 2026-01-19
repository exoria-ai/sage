# Print

**Module:** `@arcgis/core/widgets/Print`

## Import

```javascript
import Print from "@arcgis/core/widgets/Print.js";
```

```javascript
// CDN
const Print = await $arcgis.import("@arcgis/core/widgets/Print.js");
```

**Since:** 4.2

## See Also

- Print component demo
- PrintViewModel
- Printing in web applications
- Configure the portal to print maps
- Export Web Map Task (Geoprocessing service) [REST doc]
- TemplateOptions.format
- TemplateOptions.layout
- Heading Elements
- Calcite Icon Search
- CustomTemplate

## Property Details

### `Print`

### `allowedFormats`

### `allowedLayouts`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `exportedLinks`

### `extraParameters`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `includeDefaultTemplates`

### `includeOrganizationTemplates`

### `label`

### `portal`

### `printServiceUrl`

### `showPrintAreaEnabled`

### `templateCustomTextElements`

### `templateOptions`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

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

### `FileLink`


## Method Details

### `Method Details()`


## Examples

```javascript
const print = new Print({
  view: view,
  // specify your own print service
  printServiceUrl:
     "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
});

// Adds widget below other elements in the top left corner of the view
view.ui.add(print, "top-left");
```

```javascript
// typical usage
const print = new Print({
  view: view,
  printServiceUrl: "https://www.example.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
});
```

```javascript
const print = new Print({
  view: view,
  printServiceUrl:
         "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
  allowedFormats: ["jpg", "png8", "png32"]
});
```

```javascript
const print = new Print({
  view: view,
  printServiceUrl:
         "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
  allowedLayouts: ["a3-landscape", "a3-portrait"]
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

