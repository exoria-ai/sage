# decorators

**Module:** `@arcgis/core/core/accessorSupport/decorators`

## Import

```javascript
import * as decorators from "@arcgis/core/core/accessorSupport/decorators.js";
```

```javascript
// CDN
const decorators = await $arcgis.import("@arcgis/core/core/accessorSupport/decorators.js");
```

**Since:** 4.2

## Overview

This module contains Accessor TypeScript decorators. Decorators allow us to define and/or modify behavior of existing properties, methods, and constructors at design time.

## Inheritance

Extends: **Accessor**

## See Also

- Accessor
- widget
- Get started - TypeScript
- Implementing Accessor
- Accessor
- Accessor
- Accessor

## Property Details

### `aliasOf`

### `cast`

### `property`

### `subclass`

### `Caster`


## Method Details

### `Method Details()`


## Examples

```javascript
// property example
@aliasOf("viewModel.name")
name: string = "name";
```

```javascript
// method example
@aliasOf("viewModel.someMethod")
someMethod: () => string;
```

```javascript
import Accessor from "@arcgis/core/core/Accessor.js";
import { subclass, property, cast } from "@arcgis/core/core/accessorSupport/decorators.js";

@subclass()
class Color extends Accessor {

  @property()
  r: number = 0;

  @property()
  g: number = 0;

  @property()
  b: number = 0;

  @property()
  a: number = 1;

  @cast("r")
  @cast("g")
  @cast("b")
  protected castComponent(value) {
    // cast method that clamp the value that
    // will be set on r, g or b between 0 and 255
    return Math.max(0, Math.min(255, value));
  }

  @cast("a")
  protected castAlpha(value) {
    // cast method that clamp the value that
    // will be set on a between 0 and 255
    return Math.max(0, Math.min(1, value));
  }
}
```

```javascript
import Accessor from "@arcgis/core/core/Accessor.js";
import { subclass, property, cast } from "@arcgis/core/core/accessorSupport/decorators.js";

function clampRGB(component: number) {
  return Math.min(Math.max(component, 0), 255);
}

function clampAlpha(alpha: number) {
  return Math.min(Math.max(alpha, 0), 1);
}

@subclass()
class Color extends Accessor {

  @property()
  @cast(clampRGB)
  r: number = 0;

  @property()
  @cast(clampRGB)
  g: number = 0;

  @property()
  @cast(clampRGB)
  b: number = 0;

  @property()
  @cast(clampRGB)
  a: number = 1;
}
```

```javascript
// typescript syntax to specify the property.
@property()
title: string = "Awesome Title!"
```

```javascript
// TypeScript syntax which creates a subclass that extends the Accessor class.
@subclass("my.custom.class")
class MyCustomClass extends Accessor {
  // ...
}
```

