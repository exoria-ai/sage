# intl

**Module:** `@arcgis/core/intl`

## Import

```javascript
import * as intl from "@arcgis/core/intl.js";
```

```javascript
// CDN
const intl = await $arcgis.import("@arcgis/core/intl.js");
```

**Since:** 4.12

## Overview

Overview Setting the locale Number formatting Date and time formatting Tips and tricks Overview This module provides the ability to set the app locale along with date and number formatting methods and supporting utilities. The formatting functions formatDate(), formatNumber(), and substitute() rely on the Internationalization APIs available in all web browsers to enable locale-sensitive date, time, and number formatting. Setting the locale The SDK will automatically use locale defined via lang attribute on the root html element, or the locale of the browser. To override this behavior, you can set the locale used by the SDK with the setLocale method. This locale will determine: the number and date formatting used throughout the API, the translation of widgets, and the place label language of basemaps (if using the basemap styles service). See the localization guide page for more information. Number formatting You can format numbers with formatNumber() in three different styles: decimal, percent, or currency. const decimalFormatted = intl.formatNumber(12.5, { style: "decimal" }); const percentFormatted = intl.formatNumber(12.5, { style: "percent" }); const currencyFormatted = intl.formatNumber(12.5, { style: "currency", currency: "EUR", currencyDisplay: "symbol" }); console.log(decimalFormatted); // In French locale: 12,5 console.log(percentFormatted); // In French locale: 1 250 % console.log(currencyFormatted); // In French locale: 12,50 € By default, numbers are formatted using the appropriate set of options for a specified style. It is also possible to control whether to use a grouping separator with a number of integer, fractional, or significant digits. Date and time formatting You can format dates with formatDate(). Each date-time component of the formatted date can be controlled: weekday, era, year, month, day, hour, minute, second, and timeZoneName. The locale and region are taken into account to determine the most appropriate order of each component, or whether to use 24-hour or 12-hour time formats. For example, formatting a date in en-US and in en-GB gives different results. const now = Date.now(); const dateTimeFormatOptions = { weekday: "long", day: "2-digit", month: "long", year: "numeric", hour: "numeric", minute: "numeric" }; const formatted = intl.formatDate(now, dateTimeFormatOptions); console.log(formatted); // In English en-US: Monday, June 24, 2019, 2:28 PM // In English en-GB: Monday, 24 June 2019, 14:28 // In French fr-FR: lundi 24 juin 2019 à 14:28 Tips and tricks The formatDate(), formatNumber(), and substitute() functions are light wrappers around the Intl APIs that cache the created Intl.DateTimeFormat and Intl.NumberFormat formatter objects for a set of options. Consider reusing the same options objects to avoid having to recreate these objects. const currencyFormatter = { style: "currency", currency: "EUR", currencyDisplay: "symbol" }; function formatCurrency(amount) { return formatNumber(amount, currencyFormatter); }

## See Also

- Intl on MDN Web Docs
- Intl.DateTimeFormat on MDN Web Docs
- Intl.NumberFormat on MDN Web Docs
- FieldInfoFormat
- Sample - Load portal items via drag and drop
- FieldInfoFormat.dateFormat
- FieldInfo.fieldFormat
- FieldInfo.fieldFormat
- FieldInfoFormat
- fetchMessageBundle()
- registerMessageBundleLoader()
- registerMessageBundleLoader()
- @messageBundle
- FieldInfoFormat.dateFormat
- NavigatorLanguage on MDN Web Docs
- setLocale()
- onLocaleChange()
- W3C | Language tags in HTML and XML
- Wikipedia | IETF language tag
- getLocale()
- setLocale()
- fetchMessageBundle()
- registerMessageBundleLoader()
- normalizeMessageBundleLocale()
- @messageBundle
- MessageBundleLoader
- createJSONLoader
- More info on locale on MDN Web Docs
- getLocale()
- onLocaleChange()
- Sample - Load portal items via drag and drop
- registerMessageBundleLoader()
- createJSONLoader()
- fetchMessageBundle()
- registerMessageBundleLoader()
- createJSONLoader
- FieldInfoFormat
- Web map specification - format
- FieldInfoFormat
- SubstituteOptions
- SubstituteOptions
- substitute()

## Property Details

### `convertDateFormatToIntlOptions`

### `convertDateTimeFieldFormatToIntlOptions`

### `convertNumberFieldFormatToIntlOptions`

### `convertNumberFormatToIntlOptions`

### `createJSONLoader`

### `fetchMessageBundle`

### `formatDate`

### `formatDateOnly`

### `formatNumber`

### `formatTimeOnly`

### `formatTimestamp`

### `getLocale`

### `getLocaleLanguage`

### `normalizeMessageBundleLocale`

### `onLocaleChange`

### `prefersRTL`

### `registerMessageBundleLoader`

### `setLocale`

### `substitute`

### `FetchMessageBundle`

### `LocaleChangeCallback`

### `LocationFunction`

### `MessageBundleLoader`

### `NumberFormat`

### `SubstituteDateTimeFormatOptions`

### `SubstituteNumberFormatOptions`

### `SubstituteOptions`


## Method Details

### `Method Details()`


## Examples

```javascript
const decimalFormatted = intl.formatNumber(12.5, {
    style: "decimal"
  });

  const percentFormatted = intl.formatNumber(12.5, {
    style: "percent"
  });

  const currencyFormatted = intl.formatNumber(12.5, {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "symbol"
  });

  console.log(decimalFormatted);  // In French locale: 12,5
  console.log(percentFormatted);  // In French locale: 1 250 %
  console.log(currencyFormatted); // In French locale: 12,50 €
```

```javascript
const now = Date.now();

const dateTimeFormatOptions = {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric"
};

const formatted = intl.formatDate(now, dateTimeFormatOptions);

console.log(formatted);
// In English en-US: Monday, June 24, 2019, 2:28 PM
// In English en-GB: Monday, 24 June 2019, 14:28
// In French fr-FR: lundi 24 juin 2019 à 14:28
```

```javascript
const currencyFormatter = {
  style: "currency",
  currency: "EUR",
  currencyDisplay: "symbol"
};

function formatCurrency(amount) {
  return formatNumber(amount, currencyFormatter);
}
```

```javascript
const dateFormatIntlOptions = intl.convertDateFormatToIntlOptions("short-date-short-time");

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters
// Setting the string value 'short-date-short-time' is similar to what is set in the object below
// dateFormatIntlOptions = {
//   day: "numeric",
//   month: "numeric",
//   year: "numeric",
//   hour: "numeric",
//   minute: "numeric"
// }

const now = Date.now(); // 1560375191812
const formattedDate = intl.formatDate(now, dateFormatIntlOptions);

console.log(formattedDate); // expected output for US English locale: "6/12/2019, 2:33 PM"
```

```javascript
const dateTimeFieldFormat = new DateTimeFieldFormat({
  dateStyle: "short",
  timeStyle: "short",
  hour12: "always"
});
const dateTimeFieldFormatIntlOptions = intl.convertDateTimeFieldFormatToIntlOptions(dateTimeFieldFormat);
const now = Date.now(); // 1759292167543
const formattedDateTime = intl.formatDate(now, dateTimeFieldFormatIntlOptions);
console.log(formattedDateTime); // expected output for US English locale: "9/30/25, 9:16 PM"
```

```javascript
const numberFieldFormat = new NumberFieldFormat({
  useGrouping: "always",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const numberFieldFormatIntlOptions = intl.convertNumberFieldFormatToIntlOptions(numberFieldFormat);
const number = 123456.789;
const formattedNumber = intl.formatNumber(number, numberFieldFormatIntlOptions);
console.log(formattedNumber); // expected output for English locale: 123,456.79
```

