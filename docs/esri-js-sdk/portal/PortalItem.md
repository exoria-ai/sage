# PortalItem

**Module:** `@arcgis/core/portal/PortalItem`

## Import

```javascript
import PortalItem from "@arcgis/core/portal/PortalItem.js";
```

```javascript
// CDN
const PortalItem = await $arcgis.import("@arcgis/core/portal/PortalItem.js");
```

**Since:** 4.0

## See Also

- ArcGIS Organization portals
- Portal
- PortalItemResource
- Sample - Load a basic WebScene
- Item access privileges
- ArcGIS REST API - Item
- getThumbnailUrl()
- ArcGIS REST API - Add Resources
- Basemap.destroy()
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Ground.destroy()
- Layer.destroy()
- ArcGIS REST API- Item Resources
- ArcGIS REST API - Remove Resources
- ArcGIS REST API - Remove Resources

## Property Details

### `PortalItem`

### `access`

### `accessInformation`

### `apiKey`

### `applicationProxies`

### `avgRating`

### `categories`

### `classification`

### `created`

### `culture`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `extent`

### `groupCategories`

### `id`

### `isLayer`

### `isOrgItem`

### `itemControl`

### `itemPageUrl`

### `itemUrl`

### `licenseInfo`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `modified`

### `name`

### `numComments`

### `numRatings`

### `numViews`

### `owner`

### `ownerFolder`

### `portal`

### `screenshots`

### `size`

### `snippet`

### `sourceJSON`

### `tags`

### `thumbnailUrl`

### `title`

### `type`

### `typeKeywords`

### `url`

### `addHandles`
- **Type:** `Inherited`

### `addRating`

### `addResource`

### `cancelLoad`

### `clone`

### `deleteRating`

### `destroy`

### `fetchData`

### `fetchRating`

### `fetchRelatedItems`

### `fetchResources`

### `fromJSON`

### `getThumbnailUrl`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `reload`

### `removeAllResources`

### `removeHandles`
- **Type:** `Inherited`

### `removeResource`

### `toJSON`

### `update`

### `updateThumbnail`

### `when`

### `FetchResource`

### `FetchResourcesParams`

### `FetchResourcesResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// Typical usage
let item = new PortalItem({
  id: "affa021c51944b5694132b2d61fe1057"
});
item.load();
```

```javascript
const portalItem = new PortalItem({
  id: "caa9bd9da1f4487cb4989824053bb847",
  // Set an API key to access a secure portal item configured with API key authentication.
  apiKey: "APIKEY"
});
```

```javascript
// to access the portal item at this url
// http://www.arcgis.com/home/item.html?id=d7892b3c13b44391992ecd42bfa92d01
let item = new PortalItem({
  id: "d7892b3c13b44391992ecd42bfa92d01"
});
```

```javascript
if (item.isLayer) {
  Layer.fromPortalItem({
    portalItem: item
  }).then(addLayerToMap);
}
```

```javascript
Layer.fromPortalItem({
  portalItem: {
    id: "e691172598f04ea8881cd2a4adaa45ba",
    // autocastable to Portal
    portal: {
      url: "https://thePortalUrl"
    }
  }
});
```

```javascript
let portalA = new Portal({
  url: "https://www.exampleA.com/arcgis" // First instance
});

let portalB = new Portal({
  url: "https://www.exampleB.com/arcgis" // Second instance
});

let item = new PortalItem({
  id: "e691172598f04ea8881cd2a4adaa45ba",
  portal: portalA // This loads the first portal instance set above
});

item.load();
```

