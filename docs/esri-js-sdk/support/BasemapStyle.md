# BasemapStyle

**Module:** `@arcgis/core/support/BasemapStyle`

## Import

```javascript
import BasemapStyle from "@arcgis/core/support/BasemapStyle.js";
```

```javascript
// CDN
const BasemapStyle = await $arcgis.import("@arcgis/core/support/BasemapStyle.js");
```

**Since:** 4.28

## See Also

- Basemap styles service (v2)
- Basemap.style
- Tutorial - Change the basemap style
- Tutorial - Change the basemap language
- Sample - Basemap worldview
- Sample - Basemap places
- Basemap styles
- Tutorial - Change the basemap style
- Tutorial - Change the basemap language
- Supported languages
- Basemap places
- Sample - Basemap places
- Supported worldviews
- Sample - Basemap worldview

## Property Details

### `BasemapStyle`

### `apiKey`

### `declaredClass`
- **Type:** `Inherited`

### `id`

### `language`

### `places`

### `serviceUrl`

### `worldview`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const basemap = new Basemap({
  style: new BasemapStyle({
    id: "arcgis/human-geography",
    language: "es" // place labels will be displayed in spanish
  })
})
```

```javascript
// sets the basemap to the ArcGIS navigation night style
basemap.style = {
  id: "arcgis/navigation-night"
}

// sets the basemap to the ArcGIS outdoor style
basemap.style.id = "arcgis/outdoor";
```

```javascript
// basemap place labels will in spanish
basemap.style = {
  id: "arcgis/outdoor",
  language: "es"
}

// basemap style will use the names of places in their local language (e.g. "Lisboa" for Lisbon)
basemap.style.language = "local";
```

```javascript
const basemapWithPlaces = new Basemap({
  style: new BasemapStyle({
    id: "arcgis/navigation",
    places: "all"
  })
})
```

```javascript
const moroccoBasemap = new Basemap({
  style: new BasemapStyle({
    id: "arcgis/streets",
    worldview: "morocco",
    language: "ar"
  })
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

