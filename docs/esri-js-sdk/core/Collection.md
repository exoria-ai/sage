# Collection

**Module:** `@arcgis/core/core/Collection`

## Import

```javascript
import Collection from "@arcgis/core/core/Collection.js";
```

```javascript
// CDN
const Collection = await $arcgis.import("@arcgis/core/core/Collection.js");
```

```javascript
// CDN
const [Collection, Point] = await $arcgis.import([
  "@arcgis/core/core/Collection.js",
  "@arcgis/core/geometry/Point.js"
]);
```

**Since:** 4.0

## See Also

- GraphicsLayer
- Map
- Array.prototype.at()
- slice()
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

### `Collection`

### `declaredClass`
- **Type:** `Inherited`

### `length`

### `add`

### `addHandles`
- **Type:** `Inherited`

### `addMany`

### `at`

### `clone`

### `concat`

### `destroyAll`

### `destroyMany`

### `drain`

### `emit`

### `every`

### `filter`

### `find`

### `findIndex`

### `flatten`

### `forEach`

### `getItemAt`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `includes`

### `indexOf`

### `isCollection`

### `join`

### `lastIndexOf`

### `map`

### `ofType`

### `on`

### `pop`

### `push`

### `reduce`

### `reduceRight`

### `remove`

### `removeAll`

### `removeAt`

### `removeHandles`
- **Type:** `Inherited`

### `removeMany`

### `reorder`

### `reverse`

### `shift`

### `slice`

### `some`

### `sort`

### `splice`

### `toArray`

### `unshift`

### `ItemCallback`

### `ItemCompareCallback`

### `ItemMapCallback`

### `ItemReduceCallback`

### `ItemTestCallback`


## Method Details

### `Method Details()`


## Examples

```javascript
// Removes a layer from the map using Collection.remove();
map.layers.remove(layer);
```

```javascript
// a collection of graphics displayed in the view
const graphics = view.graphics;

for (const graphic of graphics){
  // do something with each view graphic
}
```

```javascript
// reactiveUtils watch method can be used to watch the visible
// property of each layer within the map.allLayer's collection
const handle = reactiveUtils.watch(
  () => view.map.allLayers.every((layer) => layer.visible),
  (allVisible) => {
    console.log(`All layers are visible = ${allVisible}`);
  }
);
```

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

