# arcade

**Module:** `@arcgis/core/arcade`

## Import

```javascript
import * as arcade from "@arcgis/core/arcade.js";
```

```javascript
// CDN
const arcade = await $arcgis.import("@arcgis/core/arcade.js");
```

**Since:** 4.24

## Overview

This module allows you to evaluate Arcade expressions outside traditional ArcGIS Arcade profiles. Profiles define the valid input variables (i.e. profile variables) for expressions, supported functions, and valid return types of expressions. All Arcade expressions executed in the ArcGIS Maps SDK for JavaScript must conform to the rules of the profile where they are written. The createArcadeExecutor method provides an API for executing Arcade expressions outside the context of predefined ArcGIS Arcade profiles. This module allows you to do the following: Execute expressions already written for existing ArcGIS profiles in another context. For example, an end user may have written an expression for a renderer, popup, or label in a WebMap and the data produced by the expression should be displayed outside the WebMap in a custom component, table, or summarized in a chart. Define custom Arcade profiles and provide a configurable experience within an app for users to write their own expressions. Developers may want to take advantage of the simplified experience of filtering and querying data using the chainable FeatureSet functions Arcade provides.

## See Also

- Sample - Execute Arcade for a custom chart
- What is Arcade?
- ArcGIS Arcade
- Sample - Execute Arcade for a custom chart
- Arcade profile specifications
- Arcade profiles implemented by the JS API
- createArcadeExecutor()
- createArcadeExecutor

## Property Details

### `createArcadeExecutor`

### `createArcadeProfile`

### `ArcadeExecutor`

### `ArcadeServices`

### `ArrayElementType`

### `ArrayVariable`

### `BatchExecuteContext`

### `DictionaryVariable`

### `ExecuteContext`

### `ExecuteFunction`

### `ExecuteFunctionAsync`

### `ExecuteFunctionAsyncBatch`

### `FeatureSetLayer`

### `FulfilledArcadePromise`

### `Profile`

### `ProfileVariable`

### `ProfileVariableInstanceType`

### `RejectedArcadePromise`

### `ResultType`

### `SettledArcadePromise`

### `SimpleVariable`

### `VariableInstancesCreator`


## Method Details

### `Method Details()`


## Examples

```javascript
// Synchronous execution for all features in layer view
// % of the population not in labor force
const arcadeScript = "(($feature.POP_16UP - $feature.EMP_CY) / $feature.POP_16UP) * 100"

const profile = {
  variables: [{
    name: "$feature",
    type: "feature"
  }]
};

const laborForceExecutor = await createArcadeExecutor(arcadeScript, profile);
// ensures data values from fields used in the expression are
// available when the expression executes.
layer.outFields = laborForceExecutor.fieldsUsed;

const { features } = await layerView.queryFeatures();

const allValues = features.map( (feature) => {
  return laborForceExecutor.execute({
    "$feature": feature
  });
});

// allValues can be displayed in a chart, or used to
// report stats for this variable
```

```javascript
// Asynchronous execution for one feature clicked in the view

const profile = {
  variables: [{
    name: "$feature",
    type: "feature"
  }, {
    name: "$layer",
    type: "featureSet"
  }]
};

// This expression executes on each feature click. It compares the % of the population
// not participating in the labor force with the same value of all features within
// one mile of the selected feature's location
const arcadeScript = `
  var featureNotLaborForce = Round((($feature.POP_16UP - $feature.EMP_CY)/$feature.POP_16UP)*100);
  var id = $feature.OBJECTID;

  var neighbors = Filter( Intersects( $layer, BufferGeodetic($feature, 1, "mile") ), "OBJECTID <> @id" );
  if( Count(neighbors) == 0 ){
    return "No neighbors within 1 mile";
  }

  var neighborsNotLaborForceAverage = Average(neighbors, "( (POP_16UP - EMP_CY) / POP_16UP) * 100");
  var difference = Round(featureNotLaborForce - neighborsNotLaborForceAverage);
  var differenceText = IIF(difference > 0, "+"+difference, Text(difference));
  return differenceText;
`;

const neighborhoodExecutor = await createArcadeExecutor(arcadeScript, profile);
// ensures data values from fields used in the expression are
// available when the expression executes.
layer.outFields = neighborhoodExecutor.fieldsUsed;

view.on("click", async (event) => {
  const hitResponse = await view.hitTest(event, include: { layer });
  const hitGraphic = hitResponse?.results[0].graphic;

  const scriptResult = await neighborhoodExecutor.executeAsync({
    "$feature": hitGraphic,
    "$layer": hitGraphic.layer
  }, {
    spatialReference: view.spatialReference
  });

  // display the value of scriptResult in a UI component or use it
  // in some form of client-side analysis
});
```

```javascript
const labelingProfile = arcade.createArcadeProfile("labeling");
// creates the following object to be provided to the createArcadeExecutor method.
// {
//   variables: [{
//     name: "$feature",
//     type: "feature"
//   }]
// }

const labelExecutor = await createArcadeExecutor("$feature.NAME + ' COUNTY'", labelingProfile);
```

```javascript
// Synchronous execution for all features in layer view
// % of the population not in labor force
const arcadeScript = "(($feature.POP_16UP - $feature.EMP_CY) / $feature.POP_16UP) * 100"

const profile = {
  variables: [{
    name: "$feature",
    type: "feature"
  }]
};

const laborForceExecutor = await createArcadeExecutor(arcadeScript, profile);
// ensures data values from fields used in the expression are
// available when the expression executes.
layer.outFields = laborForceExecutor.fieldsUsed;

const { features } = await layerView.queryFeatures();

const allValues = features.map( (feature) => {
  return laborForceExecutor.execute({
    "$feature": feature
  });
});

// allValues can be displayed in a chart, or used to
// report stats for this variable
```

```javascript
// Asynchronous execution for one feature clicked in the view

const profile = {
  variables: [{
    name: "$feature",
    type: "feature"
  }, {
    name: "$layer",
    type: "featureSet"
  }]
};

// This expression executes on each feature click. It compares the % of the population
// not participating in the labor force with the same value of all features within
// one mile of the selected feature's location
const arcadeScript = `
  var featureNotLaborForce = Round((($feature.POP_16UP - $feature.EMP_CY)/$feature.POP_16UP)*100);
  var id = $feature.OBJECTID;

  var neighbors = Filter( Intersects( $layer, BufferGeodetic($feature, 1, "mile") ), "OBJECTID <> @id" );
  if( Count(neighbors) == 0 ){
    return "No neighbors within 1 mile";
  }

  var neighborsNotLaborForceAverage = Average(neighbors, "( (POP_16UP - EMP_CY) / POP_16UP) * 100");
  var difference = Round(featureNotLaborForce - neighborsNotLaborForceAverage);
  var differenceText = IIF(difference > 0, "+"+difference, Text(difference));
  return differenceText;
`;

const neighborhoodExecutor = await createArcadeExecutor(arcadeScript, profile);
// ensures data values from fields used in the expression are
// available when the expression executes.
layer.outFields = neighborhoodExecutor.fieldsUsed;

view.on("click", async (event) => {
  const hitResponse = await view.hitTest(event, include: { layer });
  const hitGraphic = hitResponse?.results[0].graphic;

  const scriptResult = await neighborhoodExecutor.executeAsync({
    "$feature": hitGraphic,
    "$layer": hitGraphic.layer
  }, {
    spatialReference: view.spatialReference
  });

  // display the value of scriptResult in a UI component or use it
  // in some form of client-side analysis
});
```

```javascript
const profile = {
  variables: [{
    name: "$feature",
    type: "feature"
  }]
};

// Arcade expression defined by user...
const syncExecutor = await createArcadeExecutor(arcadeScript, profile);
// ensures data values from fields used in the expression are
// available when the expression executes.
layer.outFields = syncExecutor.fieldsUsed;

// throw error if expression from user uses
// invalid functions that require async execution
if(syncExecutor.isAsync){
  throw new Error("Invalid expression. Expression should not use FeatureSet functions.");
}

const { features } = await layerView.queryFeatures();

const allValues = features.map( (feature) => {
  return syncExecutor.execute({
    "$feature": feature
  });
});

// allValues can be displayed in a chart, or used to
// report stats for this variable
```

