# reactiveUtils

**Module:** `@arcgis/core/core/reactiveUtils`

## Import

```javascript
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
```

```javascript
// CDN
const reactiveUtils = await $arcgis.import("@arcgis/core/core/reactiveUtils.js");
```

**Since:** 4.23

## Overview

Overview Using reactiveUtils Working with collections Working with objects WatchHandles and Promises Working with truthy values Overview reactiveUtils provide capabilities for observing changes to the state of the SDK's properties, and is an important part of managing your application's life-cycle. State can be observed on a variety of different data types and structures including strings, numbers, arrays, booleans, collections, and objects. Using reactiveUtils reactiveUtils provides five methods that offer different patterns and capabilities for observing state: on(), once(), watch(), when() and whenOnce(). The following is a basic example using reactiveUtils.watch(). It demonstrates how to track the Map component updating property and then send a message to the console when the property changes. This snippet uses a getValue function as an expression that evaluates the updating property, and when a change is observed the new value is passed to the callback: // Basic example of watching for changes on a boolean property const viewElement = document.querySelector("arcgis-map"); reactiveUtils.watch( // getValue function () => viewElement.updating, // callback (updating) => { console.log(updating) }); Working with collections reactiveUtils can be used to observe changes within a collection, such as Map.allLayers. Out-of-the-box JavaScript methods such as .map() and .filter() can be used as expressions to be evaluated in the getValue function. // Watching for changes within a collection // whenever a new layer is added to the map const viewElement = document.querySelector("arcgis-map"); reactiveUtils.watch( () => viewElement.map.allLayers.map( layer => layer.id), (ids) => { console.log(`FeatureLayer IDs ${ids}`); }); Working with objects With reactiveUtils you can track named object properties through dot notation (e.g. viewElement.updating) or through bracket notation (e.g. viewElement["updating"]). You can also use the optional chaining operator (?.). This operator simplifies the process of verifying that properties used in the getValue function are not undefined or null. // Watch for changes in an object using optional chaining // whenever the map's extent changes const viewElement = document.querySelector("arcgis-map"); reactiveUtils.watch( () => viewElement?.extent?.xmin, (xmin) => { console.log(`Extent change xmin = ${xmin}`) }); WatchHandles and Promises The watch(), on() and when() methods return a WatchHandle. Be sure to remove watch handles when they are no longer needed to avoid memory leaks. // Use a WatchHandle to stop watching const viewElement = document.querySelector("arcgis-map"); const handle = reactiveUtils.watch( () => viewElement?.extent?.xmin, (xmin) => { console.log(`Extent change xmin = ${xmin}`) }); // In another function handle.remove() The once() and whenOnce() methods return a Promise instead of a WatchHandle. In some advanced use cases where an API action may take additional time, these methods also offer the option to cancel the async callback via an AbortSignal. Be aware that if the returned Promise is not resolved, it can also result in a memory leak. // Use an AbortSignal to cancel an async callback // during view animation const abortController = new AbortController(); // Observe the View's animation state reactiveUtils.whenOnce( () => view?.animation, {signal: abortController.signal}) .then((animation) => { console.log(`View animation state is ${animation.state}`) }); // Cancel the async callback const someFunction = () => { abortController.abort(); } Working with truthy values The when() and whenOnce() methods watch for truthy values, these are values that evaluate to true in boolean contexts. To learn more about using truthy, visit this MDN Web doc article. The snippets below use the Popup.visible property, which is a boolean. // Observe changes on a boolean property const viewElement = document.querySelector("arcgis-map"); reactiveUtils.when(() => viewElement.popup?.visible, () => console.log("Truthy")); reactiveUtils.when(() => !viewElement.popup?.visible, () => console.log("Not truthy")); reactiveUtils.when(() => viewElement.popup?.visible === true, () => console.log("True")); reactiveUtils.when(() => viewElement.popup?.visible !== undefined, () => console.log("Defined")); reactiveUtils.when(() => viewElement.popup?.visible === undefined, () => console.log("Undefined"));

## See Also

- Watch for changes guide topic
- Sample - Watch for changes in components using reactiveUtils
- Sample - Property changes with reactiveUtils
- Samples with reactiveUtils

## Property Details

### `on`

### `once`

### `watch`

### `when`

### `whenOnce`

### `ReactiveEqualityFunction`

### `ReactiveListenerChangeCallback`

### `ReactiveListenerOptions`

### `ReactiveOnCallback`

### `ReactiveOnExpression`

### `ReactiveWatchCallback`

### `ReactiveWatchExpression`

### `ReactiveWatchOptions`


## Method Details

### `Method Details()`


## Examples

```javascript
// Basic example of watching for changes on a boolean property
const viewElement = document.querySelector("arcgis-map");
reactiveUtils.watch(
  // getValue function
  () => viewElement.updating,
  // callback
  (updating) => {
    console.log(updating)
  });
```

```javascript
// Watching for changes within a collection
// whenever a new layer is added to the map
const viewElement = document.querySelector("arcgis-map");
reactiveUtils.watch(
  () => viewElement.map.allLayers.map( layer => layer.id),
  (ids) => {
    console.log(`FeatureLayer IDs ${ids}`);
  });
```

```javascript
// Watch for changes in an object using optional chaining
// whenever the map's extent changes
const viewElement = document.querySelector("arcgis-map");
reactiveUtils.watch(
  () => viewElement?.extent?.xmin,
  (xmin) => {
    console.log(`Extent change xmin = ${xmin}`)
  });
```

```javascript
// Use a WatchHandle to stop watching
const viewElement = document.querySelector("arcgis-map");
const handle = reactiveUtils.watch(
  () => viewElement?.extent?.xmin,
  (xmin) => {
    console.log(`Extent change xmin = ${xmin}`)
  });

// In another function
handle.remove()
```

```javascript
// Use an AbortSignal to cancel an async callback
// during view animation
const abortController = new AbortController();

// Observe the View's animation state
reactiveUtils.whenOnce(
  () => view?.animation, {signal: abortController.signal})
  .then((animation) => {
    console.log(`View animation state is ${animation.state}`)
  });

// Cancel the async callback
const someFunction = () => {
  abortController.abort();
}
```

```javascript
// Observe changes on a boolean property
const viewElement = document.querySelector("arcgis-map");
reactiveUtils.when(() => viewElement.popup?.visible, () => console.log("Truthy"));
reactiveUtils.when(() => !viewElement.popup?.visible, () => console.log("Not truthy"));
reactiveUtils.when(() => viewElement.popup?.visible === true, () => console.log("True"));
reactiveUtils.when(() => viewElement.popup?.visible !== undefined, () => console.log("Defined"));
reactiveUtils.when(() => viewElement.popup?.visible === undefined, () => console.log("Undefined"));
```

