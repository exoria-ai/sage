# elements

**Module:** `@arcgis/core/tables/elements`

## Import

```javascript
import * as elements from "@arcgis/core/tables/elements.js";
```

```javascript
// CDN
const elements = await $arcgis.import("@arcgis/core/tables/elements.js");
```

```javascript
import TableAttachmentElement from "@arcgis/core/tables/elements/AttributeTableAttachmentElement.js";
import TableFieldElement from "@arcgis/core/tables/elements/AttributeTableFieldElement.js";
import TableGroupElement from "@arcgis/core/tables/elements/AttributeTableGroupElement.js";
import TableRelationshipElement from "@arcgis/core/tables/elements/AttributeTableRelationshipElement.js";
```

**Since:** 4.31

## Overview

A convenience module for importing AttributeTableElement classes when developing with TypeScript. For example, rather than importing table elements one at a time like this: import TableAttachmentElement from "@arcgis/core/tables/elements/AttributeTableAttachmentElement.js"; import TableFieldElement from "@arcgis/core/tables/elements/AttributeTableFieldElement.js"; import TableGroupElement from "@arcgis/core/tables/elements/AttributeTableGroupElement.js"; import TableRelationshipElement from "@arcgis/core/tables/elements/AttributeTableRelationshipElement.js"; You can use this module to import them on a single line: import { AttributeTableAttachmentElement, AttributeTableFieldElement, AttributeTableGroupElement, AttributeTableRelationshipElement } from "@arcgis/core/tables/elements.js"; This module also allows you to implement type guards on the attribute table elements, making your code smarter. import { AttributeTableElement } from "@arcgis/core/tables/elements.js"; function logTableElement(element: AttributeTableElement): void { if (element.type === "field") { console.log("Attribute table element type is field"); } else { console.log("The value is not a table field element.") } }

## See Also

- AttributeTableTemplate
- AttributeTableAttachmentElement
- AttributeTableFieldElement
- AttributeTableGroupElement
- AttributeTableRelationshipElement

## Property Details

### `AttributeTableAttachmentElement`

### `AttributeTableElement`

### `AttributeTableFieldElement`

### `AttributeTableGroupElement`

### `AttributeTableRelationshipElement`


## Examples

```javascript
import TableAttachmentElement from "@arcgis/core/tables/elements/AttributeTableAttachmentElement.js";
import TableFieldElement from "@arcgis/core/tables/elements/AttributeTableFieldElement.js";
import TableGroupElement from "@arcgis/core/tables/elements/AttributeTableGroupElement.js";
import TableRelationshipElement from "@arcgis/core/tables/elements/AttributeTableRelationshipElement.js";
```

```javascript
import { AttributeTableAttachmentElement, AttributeTableFieldElement, AttributeTableGroupElement, AttributeTableRelationshipElement } from "@arcgis/core/tables/elements.js";
```

```javascript
import { AttributeTableElement } from "@arcgis/core/tables/elements.js";

function logTableElement(element: AttributeTableElement): void {
  if (element.type === "field") {
    console.log("Attribute table element type is field");
  }
  else {
    console.log("The value is not a table field element.")
  }
}
```

