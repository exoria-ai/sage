# Portal

**Module:** `@arcgis/core/portal/Portal`

## Import

```javascript
import Portal from "@arcgis/core/portal/Portal.js";
```

```javascript
// CDN
const Portal = await $arcgis.import("@arcgis/core/portal/Portal.js");
```

**Since:** 4.0

## See Also

- ArcGIS Organization portals
- Sample - Access ArcGIS Online items using OAuth 2.0
- ArcGIS REST API - Portal Self
- helperServices
- hasClassificationSchema
- ArcGIS REST API Documentation
- ArcGIS REST API Documentation
- PortalQueryResult
- PortalQueryResult
- PortalQueryResult

## Property Details

### `Portal`

### `access`

### `allSSL`

### `authMode`

### `authorizedCrossOriginDomains`

### `basemapGalleryGroupQuery`

### `basemapGalleryGroupQuery3D`

### `bingKey`

### `canListApps`

### `canListData`

### `canListPreProvisionedItems`

### `canProvisionDirectPurchase`

### `canSearchPublic`

### `canShareBingPublic`

### `canSharePublic`

### `canSignInArcGIS`

### `canSignInIDP`

### `colorSetsGroupQuery`

### `commentsEnabled`

### `created`

### `culture`

### `customBaseUrl`

### `declaredClass`
- **Type:** `Inherited`

### `default3DBasemapQuery`

### `defaultBasemap`

### `defaultDevBasemap`

### `defaultExtent`

### `defaultVectorBasemap`

### `description`

### `devBasemapGalleryGroupQuery`

### `eueiEnabled`

### `featuredGroups`

### `featuredItemsGroupQuery`

### `g3DTilesGalleryGroupQuery`

### `g3dTilesEnabled`

### `galleryTemplatesGroupQuery`

### `hasCategorySchema`

### `hasClassificationSchema`

### `helperServices`

### `homePageFeaturedContent`

### `homePageFeaturedContentCount`

### `httpPort`

### `httpsPort`

### `id`

### `ipCntryCode`

### `isOrganization`

### `isPortal`

### `isReadOnly`

### `layerTemplatesGroupQuery`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `maxTokenExpirationMinutes`

### `modified`

### `name`

### `portalHostname`

### `portalMode`

### `portalProperties`

### `recycleBinEnabled`

### `region`

### `restUrl`

### `rotatorPanels`

### `showHomePageDescription`

### `sourceJSON`

### `supportsHostedServices`

### `symbolSetsGroupQuery`

### `templatesGroupQuery`

### `thumbnailUrl`

### `units`

### `url`

### `urlKey`

### `use3dBasemaps`

### `useDefault3dBasemap`

### `useStandardizedQuery`

### `useVectorBasemaps`

### `user`

### `vectorBasemapGalleryGroupQuery`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `createElevationLayers`

### `fetchBasemaps`

### `fetchCategorySchema`

### `fetchClassificationSchema`

### `fetchDefault3DBasemap`

### `fetchFeaturedGroups`

### `fetchRegions`

### `fetchSettings`

### `getDefault`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `queryGroups`

### `queryItems`

### `queryUsers`

### `removeHandles`
- **Type:** `Inherited`

### `when`


## Method Details

### `Method Details()`


## Examples

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

```javascript
// load the Portal and PortalQueryParams modules
const [Portal, PortalQueryParams] = await $arcgis.import([
  "@arcgis/core/portal/Portal.js",
  "@arcgis/core/portal/PortalQueryParams.js"
]);
portal = new Portal();
// Setting authMode to immediate signs the user in once loaded
portal.authMode = "immediate";

// Once portal is loaded, user signed in
portal.load().then(function() {
  console.log(portal);

  // Create query parameters for the portal search
  // This object autocasts as new PortalQueryParams()
  let queryParams = {
    query: "owner:" + portal.user.username,
    sortField: "numViews",
    sortOrder: "desc",
    num: 20
  };
  // Query the items based on the queryParams created from portal above
  portal.queryItems(queryParams).then(createGallery);
});
```

```javascript
// create new Portal object with relevant URL
const portal = new Portal({
  url: "YOUR_PORTAL_URL"
});

// load Portal instance
portal.load().then(function() {
  // display all helper services
  console.log("Show available helperServices: ", portal.helperServices);
  // access helperServices from the Portal instance
  // to get the routing URL of interest
  const routeURL = portal.helperServices.route.url;
  // use helperServices to perform routing
  route.solve(routeURL, routeParams).then(showRouteInfo);
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
portal.fetchBasemaps("title:\"Cloud Creek Basemaps\" AND owner:jsmith")
 .then(function(basemaps){
   // do something with the basemaps
 });
```

