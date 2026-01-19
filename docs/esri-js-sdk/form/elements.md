# elements

**Module:** `@arcgis/core/form/elements`

## Import

```javascript
import * as elements from "@arcgis/core/form/elements.js";
```

```javascript
// CDN
const elements = await $arcgis.import("@arcgis/core/form/elements.js");
```

```javascript
import FieldElement from "@arcgis/core/form/elements/FieldElement.js";
import GroupElement from "@arcgis/core/form/elements/GroupElement.js";
import RelationshipElement from "@arcgis/core/form/elements/RelationshipElement.js";
import TextElement from "@arcgis/core/form/elements/TextElement.js";
```

**Since:** 4.16

## Overview

A convenience module for importing Element classes when developing with TypeScript. For example, rather than importing form elements one at a time like this: import FieldElement from "@arcgis/core/form/elements/FieldElement.js"; import GroupElement from "@arcgis/core/form/elements/GroupElement.js"; import RelationshipElement from "@arcgis/core/form/elements/RelationshipElement.js"; import TextElement from "@arcgis/core/form/elements/TextElement.js"; You can use this module to import them on a single line: import { FieldElement, GroupElement, RelationshipElement, TextElement } from "@arcgis/core/form/elements.js"; This module also allows you to implement type guards on the form elements, making your code smarter. import { Element } from "@arcgis/core/form/elements.js"; function logFormElement(element: Element): void { if (element.type === "field") { console.log("Form element type is field"); } else { // The compiler knows the content element must be `field | group | relationship` console.log("The value is not a valid form element.") } }

## See Also

- FormTemplate
- FieldElement
- GroupElement
- RelationshipElement
- TextElement
- UtilityNetworkAssociationsElement

## Property Details

### `AttachmentElement`

### `Element`

### `FieldElement`

### `GroupElement`

### `RelationshipElement`

### `TextElement`

### `UtilityNetworkAssociationsElement`


## Examples

```javascript
import FieldElement from "@arcgis/core/form/elements/FieldElement.js";
import GroupElement from "@arcgis/core/form/elements/GroupElement.js";
import RelationshipElement from "@arcgis/core/form/elements/RelationshipElement.js";
import TextElement from "@arcgis/core/form/elements/TextElement.js";
```

```javascript
import { FieldElement, GroupElement, RelationshipElement, TextElement } from "@arcgis/core/form/elements.js";
```

```javascript
import { Element } from "@arcgis/core/form/elements.js";

function logFormElement(element: Element): void {
  if (element.type === "field") {
    console.log("Form element type is field");
  }
  else {
    // The compiler knows the content element must be `field | group | relationship`
    console.log("The value is not a valid form element.")
  }
}
```

