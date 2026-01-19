# SceneModifications

**Module:** `@arcgis/core/layers/support/SceneModifications`

## Import

```javascript
import SceneModifications from "@arcgis/core/layers/support/SceneModifications.js";
```

```javascript
// CDN
const SceneModifications = await $arcgis.import("@arcgis/core/layers/support/SceneModifications.js");
```

**Since:** 4.16

## See Also

- Sample - Integrated mesh modification
- IntegratedMeshLayer
- IntegratedMesh3DTilesLayer
- SceneModification
- Array.prototype.at()
- Array.prototype.concat()
- Array.prototype.every()
- Array.prototype.filter()
- Array.prototype.find()
- Array.prototype.findIndex()
- Array.prototype.forEach()
- Array.prototype.includes()
- Array.prototype.indexOf()
- Array.prototype.join()
- Array.prototype.lastIndexOf()
- Array.prototype.map()
- Array.prototype.pop()
- Array.prototype.push()
- Array.prototype.reduce()
- reduceRight
- Array.prototype.reduceRight()
- reduce
- Array.prototype.reverse()
- Array.prototype.shift()
- Array.prototype.slice()
- Array.prototype.some()
- Array.prototype.sort()
- Array.prototype.splice()
- Array.prototype.unshift()

## Property Details

### `SceneModifications`

### `declaredClass`
- **Type:** `Inherited`

### `length`
- **Type:** `Inherited`

### `add`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `addMany`
- **Type:** `Inherited`

### `at`
- **Type:** `Inherited`

### `clone`

### `concat`
- **Type:** `Inherited`

### `destroyAll`
- **Type:** `Inherited`

### `destroyMany`
- **Type:** `Inherited`

### `drain`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `every`
- **Type:** `Inherited`

### `filter`
- **Type:** `Inherited`

### `find`
- **Type:** `Inherited`

### `findIndex`
- **Type:** `Inherited`

### `flatten`
- **Type:** `Inherited`

### `forEach`
- **Type:** `Inherited`

### `fromJSON`

### `getItemAt`
- **Type:** `Inherited`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `includes`
- **Type:** `Inherited`

### `indexOf`
- **Type:** `Inherited`

### `join`
- **Type:** `Inherited`

### `lastIndexOf`
- **Type:** `Inherited`

### `map`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `pop`
- **Type:** `Inherited`

### `push`
- **Type:** `Inherited`

### `reduce`
- **Type:** `Inherited`

### `reduceRight`
- **Type:** `Inherited`

### `remove`
- **Type:** `Inherited`

### `removeAll`
- **Type:** `Inherited`

### `removeAt`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `removeMany`
- **Type:** `Inherited`

### `reorder`
- **Type:** `Inherited`

### `reverse`
- **Type:** `Inherited`

### `shift`
- **Type:** `Inherited`

### `slice`
- **Type:** `Inherited`

### `some`
- **Type:** `Inherited`

### `sort`
- **Type:** `Inherited`

### `splice`
- **Type:** `Inherited`

### `toArray`
- **Type:** `Inherited`

### `toJSON`

### `unshift`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let gpc = new Graphic();  // Creates a new graphic
let layer = new GraphicsLayer(); // Creates a new graphics layer
layer.graphics.add(gpc);  // Adds graphic to layer's graphics collection
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
// Creates two new graphics
let gpc1 = new Graphic();
let gpc2 = new Graphic();

let layer = new GraphicsLayer(); // Creates a new graphics layer

// Adds both graphics to layer's graphics collection
layer.graphics.addMany([gpc1, gpc2]);
```

```javascript
// get the layer at the first position
let firstLayer = map.layers.at(0);
// get the layer at the last position
let lastLayer = map.layers.at(-1);
```

```javascript
// creating a collection of all the basemap's layers.
let basemap = map.basemap;
let basemapLayers = basemap.baseLayers.concat(basemap.referenceLayers);
```

```javascript
let meetsStandardSize = graphicsLayer.graphics.every(function(item, i){
  // Tests each geometry's area to see if it is greater than 1,000 acres
  return calculateArea(item.geometry) > 1000;
});
```

