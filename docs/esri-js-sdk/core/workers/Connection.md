# Connection

**Module:** `@arcgis/core/core/workers/Connection`

## Import

```javascript
import Connection from "@arcgis/core/core/workers/Connection.js";
```

```javascript
// CDN
const Connection = await $arcgis.import("@arcgis/core/core/workers/Connection.js");
```

**Since:** 4.2

## Property Details

### `Connection`

### `broadcast`

### `close`

### `invoke`


## Method Details

### `Method Details()`


## Examples

```javascript
// Module loaded in worker : calculator.js
export function getSum(numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  return sum;
}
```

```javascript
// Module loaded in main thread
export function getSumAsync(numbers) {
  let connection = null;

  return workers.open("./calculator.js")
    .then(function(conn) {
      // Keep the connection reference to later close it.
      connection = conn;

      return connection.invoke("getSum", numbers);
    })
    .then(function(result) {
      // close the connection
      connection.close();
      connection = null;

      return result;
    });
}

// Invoke our method.
getSumAsync([0, 2, 4, 6, 8])
  .then(function(result) {
    console.log("Result:", result);
  });
```

```javascript
// Module loaded in worker : calculator.js
export function mapMultiply(params) {
  // params has numbers and factor values.
  let numbers = params.numbers;
  let factor = params.factor;

  for (let i = 0; i < numbers.length; i++) {
    numbers[i] *= factor;
  }

  return numbers;
}
```

```javascript
// Module loaded in main thread
export function mapMultiplyAsync(numbers, factor) {
  let connection = null;

  return workers.open("./calculator.js")
    .then(function(conn) {
      // Keep the connection reference to later close it.
      connection = conn;

       // invoke mapMultiply and pass in object with two key-value pairs.
      return connection.invoke("mapMultiply", {
        numbers: numbers,
        factor: factor
      });
    })
    .then(function(result) {
      // close the connection after we are done.
      connection.close();
      connection = null;

      return result;
    });
}

// Invoke the method.
mapMultiplyAsync([0, 2, 4, 6, 8], 2)
  .then(function(result) {
    console.log("Result:", result);
  });
```

```javascript
// Module loaded in worker : calculator.js
export function mapMultiplyFloat64(params) {
  // the numbers parameter is an ArrayBuffer
  // we create a typed array from it.
  let numbers = new Float64Array(params.numbers);
  let factor = params.factor;

  for (let i = 0; i < numbers.length; i++) {
    numbers[i] *= factor;
  }

  // Transfer back the buffer
  return {
    result: numbers.buffer,
    transferList: [numbers.buffer]
  };
}
```

```javascript
// Module loaded in main thread
export function mapMultiplyFloat64Async(numbers, factor) {
  let connection = null;

  return workers.open("./calculator.js")
    .then(function(conn) {
      // Keep the connection reference to later close it.
      connection = conn;

      return connection.invoke("mapMultiplyFloat64", {
        numbers: numbers,
        factor: factor
      });
    })
    .then(function(result) {
      // close the connection after we are done.
      connection.close();
      connection = null;

      return result;
    });
}

// Invoke our method.
let floats = new Float64Array(5);
floats[0] = 0;
floats[1] = 2;
floats[2] = 4;
floats[3] = 6;
floats[4] = 8;
mapMultiplyFloat64Async(floats, 2)
  .then(function(result) {
    let resultFloats = new Float64Array(result);
    console.log("Result:", resultFloats);
  });
```

