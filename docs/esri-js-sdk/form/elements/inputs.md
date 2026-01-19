# inputs

**Module:** `@arcgis/core/form/elements/inputs`

## Import

```javascript
import * as inputs from "@arcgis/core/form/elements/inputs.js";
```

```javascript
// CDN
const inputs = await $arcgis.import("@arcgis/core/form/elements/inputs.js");
```

```javascript
import { BarcodeScannerInput, ComboBoxInput, DatePickerInput, DateTimeOffsetPickerInput, DateTimePickerInput, RadioButtonsInput, SwitchInput, TextAreaInput, TextBoxInput, TimePickerInput } from "@arcgis/core/form/elements/inputs.js";
```

**Since:** 4.16

## Overview

A convenience module for importing esri/form/elements/inputs/Input classes when developing with TypeScript. For example, rather than importing form element inputs one at a time like this: import BarcodeScannerInput from "@arcgis/core/form/elements/inputs/BarcodeScannerInput.js"; import ComboBoxInput from "@arcgis/core/form/elements/inputs/ComboBoxInput.js"; import DatePickerInput from "@arcgis/core/form/elements/inputs/DatePickerInput.js"; import DateTimeOffsetPickerInput from "@arcgis/core/form/elements/inputs/DateTimeOffsetPickerInput.js"; import DateTimePickerInput from "@arcgis/core/form/elements/inputs/DateTimePickerInput.js"; import RadioButtonsInput from "@arcgis/core/form/elements/inputs/RadioButtonsInput.js"; import SwitchInput from "@arcgis/core/form/elements/inputs/SwitchInput.js"; import TextAreaInput from "@arcgis/core/form/elements/inputs/TextAreaInput.js"; import TextBoxInput from "@arcgis/core/form/elements/inputs/TextBoxInput.js"; import TimePickerInput from "@arcgis/core/form/elements/inputs/TimePickerInput.js"; You can use this module to import them on a single line: import { BarcodeScannerInput, ComboBoxInput, DatePickerInput, DateTimeOffsetPickerInput, DateTimePickerInput, RadioButtonsInput, SwitchInput, TextAreaInput, TextBoxInput, TimePickerInput } from "@arcgis/core/form/elements/inputs.js"; This module also allows you to implement type guards on the form element inputs, making your code smarter. import { Input } from "@arcgis/core/form/elements/inputs.js"; function logFormElementInput(input: Input): void { if (input.type === "text-area") { console.log("Form element input type is TextAreaInput"); } else { // The compiler knows the content element must be an input type such as `text-area` | `text-box` | `barcode-scanner` | `radio-buttons` | `combo-box`, etc. console.log("The value is not a valid form element input.") } }

## See Also

- FormTemplate
- FieldElement
- BarcodeScannerInput
- ComboBoxInput
- DatePickerInput
- DateTimeOffsetPickerInput
- DateTimePickerInput
- RadioButtonsInput
- SwitchInput
- TextAreaInput
- TextBoxInput
- TimePickerInput

## Property Details

### `BarcodeScannerInput`

### `ComboBoxInput`

### `DatePickerInput`

### `DateTimeOffsetPickerInput`

### `DateTimePickerInput`

### `Input`

### `RadioButtonsInput`

### `SwitchInput`

### `TextAreaInput`

### `TextBoxInput`

### `TimePickerInput`


## Examples

```javascript
import BarcodeScannerInput from "@arcgis/core/form/elements/inputs/BarcodeScannerInput.js";
import ComboBoxInput from "@arcgis/core/form/elements/inputs/ComboBoxInput.js";
import DatePickerInput from "@arcgis/core/form/elements/inputs/DatePickerInput.js";
import DateTimeOffsetPickerInput from "@arcgis/core/form/elements/inputs/DateTimeOffsetPickerInput.js";
import DateTimePickerInput from "@arcgis/core/form/elements/inputs/DateTimePickerInput.js";
import RadioButtonsInput from "@arcgis/core/form/elements/inputs/RadioButtonsInput.js";
import SwitchInput from "@arcgis/core/form/elements/inputs/SwitchInput.js";
import TextAreaInput from "@arcgis/core/form/elements/inputs/TextAreaInput.js";
import TextBoxInput from "@arcgis/core/form/elements/inputs/TextBoxInput.js";
import TimePickerInput from "@arcgis/core/form/elements/inputs/TimePickerInput.js";
```

```javascript
import { BarcodeScannerInput, ComboBoxInput, DatePickerInput, DateTimeOffsetPickerInput, DateTimePickerInput, RadioButtonsInput, SwitchInput, TextAreaInput, TextBoxInput, TimePickerInput } from "@arcgis/core/form/elements/inputs.js";
```

```javascript
import { Input } from "@arcgis/core/form/elements/inputs.js";

function logFormElementInput(input: Input): void {
  if (input.type === "text-area") {
    console.log("Form element input type is TextAreaInput");
  }
  else {
    // The compiler knows the content element must be an input type such as  `text-area` | `text-box` | `barcode-scanner` | `radio-buttons` | `combo-box`, etc.
    console.log("The value is not a valid form element input.")
  }
}
```

