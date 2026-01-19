# content

**Module:** `@arcgis/core/popup/content`

## Import

```javascript
import * as content from "@arcgis/core/popup/content.js";
```

```javascript
// CDN
const content = await $arcgis.import("@arcgis/core/popup/content.js");
```

```javascript
import { TextContent, MediaContent, FieldsContent, AttachmentsContent, CustomContent, ExpressionContent, RelationshipContent } from "@arcgis/core/popup/content.js";
```

**Since:** 4.11

## Overview

A convenience module for importing Content classes when developing with TypeScript. For example, rather than importing content elements one at a time like this: import TextContent from "@arcgis/core/popup/content/TextContent.js"; import MediaContent from "@arcgis/core/popup/content/MediaContent.js"; import FieldsContent from "@arcgis/core/popup/content/FieldsContent.js"; import AttachmentsContent from "@arcgis/core/popup/content/AttachmentsContent.js"; import CustomContent from "@arcgis/core/popup/content/CustomContent.js"; import ExpressionContent from "@arcgis/core/popup/content/ExpressionContent.js"; import RelationshipContent from "@arcgis/core/popup/content/RelationshipContent.js"; You can use this module to import them on a single line: import { TextContent, MediaContent, FieldsContent, AttachmentsContent, CustomContent, ExpressionContent, RelationshipContent } from "@arcgis/core/popup/content.js"; This module also allows you to implement type guards on the content elements, making your code smarter. import { Content } from "@arcgis/core/popup/content.js"; function logContentElement(content: Content): void { if (content.type === "media") { console.log("Content type is media"); } else { // The compiler knows the content element must be `text | fields | media | attachment | custom` console.log("The value is not a valid popup content element.") } }

## See Also

- PopupTemplate
- TextContent
- MediaContent
- FieldsContent
- AttachmentsContent
- CustomContent
- ExpressionContent
- RelationshipContent

## Property Details

### `AttachmentsContent`

### `Content`

### `CustomContent`

### `ExpressionContent`

### `FieldsContent`

### `MediaContent`

### `RelationshipContent`

### `TextContent`

### `UtilityNetworkAssociationsContent`


## Examples

```javascript
import TextContent from "@arcgis/core/popup/content/TextContent.js";
import MediaContent from "@arcgis/core/popup/content/MediaContent.js";
import FieldsContent from "@arcgis/core/popup/content/FieldsContent.js";
import AttachmentsContent from "@arcgis/core/popup/content/AttachmentsContent.js";
import CustomContent from "@arcgis/core/popup/content/CustomContent.js";
import ExpressionContent from "@arcgis/core/popup/content/ExpressionContent.js";
import RelationshipContent from "@arcgis/core/popup/content/RelationshipContent.js";
```

```javascript
import { TextContent, MediaContent, FieldsContent, AttachmentsContent, CustomContent, ExpressionContent, RelationshipContent } from "@arcgis/core/popup/content.js";
```

```javascript
import { Content } from "@arcgis/core/popup/content.js";

function logContentElement(content: Content): void {
  if (content.type === "media") {
    console.log("Content type is media");
  }
  else {
    // The compiler knows the content element must be `text | fields | media | attachment | custom`
    console.log("The value is not a valid popup content element.")
  }
}
```

