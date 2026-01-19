# Symbol Objects

> Source: [/rest/services-reference/enterprise/symbol-objects/](https://developers.arcgis.com/rest/services-reference/enterprise/symbol-objects/)

## Overview

This topic discusses the JSON representation of statistics objects. The following objects are discussed here:

-   Color
-   Simple Marker Symbol
-   Simple Line Symbol
-   Simple Fill Symbol
-   Picture Marker Symbol
-   Picture Fill Symbol
-   Text Symbol

### Color

Color is represented as a four-element array. The four elements represent values for red, green, blue, and alpha in that order. Values range from 0 through 255. If color is undefined for a symbol, the color value is null.



```
[ <red>, <green>, <blue>, <alpha> ]
```



```
[ 67, 0, 255, 40 ]
```

### Simple Marker Symbol

Simple marker symbols can be used to symbolize point geometries. The `type` property for simple marker symbols is `esriSMS`. The `angle` property defines the number of degrees (0 to 360) that a marker symbol is rotated. The rotation is from East in a counter-clockwise direction where East is the 0° axis.



```
{
  "type": "esriSMS",
  "style": "< esriSMSCircle | esriSMSCross | esriSMSDiamond | esriSMSSquare | esriSMSX | esriSMSTriangle >",
  "color": <color>,
  "size": <size>,
  "angle": <angle>,
  "xoffset": <xoffset>,
  "yoffset": <yoffset>,
  "outline": { //if outline has been specified
    "color": <color>,
    "width": <width>
  }
}
```



```
{
  "type": "esriSMS",
  "style": "esriSMSSquare",
  "color": [76,115,0,255],
  "size": 8,
  "angle": 0,
  "xoffset": 0,
  "yoffset": 0,
  "outline": {
    "color": [152,230,0,255],
    "width": 1
  }
}
```

### Simple Line Symbol

Simple line symbols can be used to symbolize polyline geometries or outlines for polygon fills. The `type` property for simple line symbols is `esriSLS`.



```
{
  "type": "esriSLS",
  "style": "< esriSLSDash | esriSLSDashDot | esriSLSDashDotDot | esriSLSDot | esriSLSNull | esriSLSSolid >",
  "color": <color>,
  "width": <width>
}
```



```
{
  "type": "esriSLS",
  "style": "esriSLSDot",
  "color": [115,76,0,255],
  "width": 1
}
```

### Simple Fill Symbol

Simple fill symbols can be used to symbolize polygon geometries. The `type` property for simple fill symbols is `esriSFS`.



```
{
  "type": "esriSFS",
  "style": "<esriSFSBackwardDiagonal | esriSFSCross | esriSFSDiagonalCross | esriSFSForwardDiagonal | esriSFSHorizontal | esriSFSNull | esriSFSSolid | esriSFSVertical>",
  "color": <color>,
  "outline": <simpleLineSymbol> //if outline has been specified
}
```



```
{
  "type": "esriSFS",
  "style": "esriSFSSolid",
  "color": [115,76,0,255],
    "outline": {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "color": [110,110,110,255],
    "width": 1
  }
}
```

### Picture Marker Symbol

Picture marker symbols can be used to symbolize point geometries. The `type` property for picture marker symbols is `esriPMS`.

Keep the following in mind when using this object:

-   These symbols include the base64 encoded `imageData` as well as a url that could be used to retrieve an image from the server. This is a relative URL for static layers and a full URL for dynamic layers in a map aervice.
-   To resize the symbol specify only the height in points. For an image to be displayed in its original size, `height` and `width` can be skipped.
-   The `angle` property defines the number of degrees (0 to 360) that a marker symbol is rotated. The rotation is from East in a counter-clockwise direction where East is the 0° axis.



```
{
  "type": "esriPMS",
  "url": "<imageUrl>", //Relative URL for static layers and full URL for dynamic layers. Access relative URL using http://<mapservice-url>/<layerId1>/images/<imageUrl11>
  "imageData": "<base64EncodedImageData>",
  "contentType": "<imageContentType>",
  "width": <width>,
  "height": <height>,
  "angle": <angle>,
  "xoffset": <xoffset>,
  "yoffset": <yoffset>
}
```



```
{
  "type": "esriPMS",
  "url": "471E7E31",
  "imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMNJREFUSIntlcENwyAMRZ+lSMyQFcI8rJA50jWyQuahKzCDT+6h0EuL1BA1iip8Qg/Ex99fYuCkGv5bKK0EcB40YgSE7bnTxsa58LeOnMd0QhwGXkxB3L0w0IDxPaMqpBFxjLMuaSVmRjurWIcRDHxaiWZuEbRcEhpZpSNhE9O81GiMN5E0ZRt2M0iVjshek8UkTQfZy8JqGHYP/rJhODD4T6wehtbB9zD0MPQwlOphaAxD/uPLK7Z8MB5gFet+WKcJPQDx29XkRhqr/AAAAABJRU5ErkJggg==",
  "contentType": "image/png",
  "width": 19.5,
  "height": 19.5,
  "angle": 0,
  "xoffset": 0,
  "yoffset": 0
}
```

### Picture Fill Symbol

Picture fill symbols can be used to symbolize polygon geometries. The `type` property for picture fill symbols is `esriPFS`.

Keep the following in mind while working with this object:

-   These symbols include the base64 encoded `imageData` as well as a url that could be used to retrieve an image from the server. This is a relative URL for static layers and a full URL for dynamic layers in a map service.
-   To resize the symbol specify only the `height` in points. For an image to be displayed in its original size, `height` and `width` can be skipped.
-   The `angle` property defines the number of degrees (0 to 360) that a marker symbol is rotated. The rotation is from East in a counter-clockwise direction where East is the 0° axis.



```
{
  "type": "esriPFS",
  "url": "<imageUrl>", //Relative URL for static layers and full URL for dynamic layers. Access relative URL using http://<mapservice-url>/<layerId1>/images/<imageUrl11>
  "imageData": "<base64EncodedImageData>",
  "contentType": "<imageContentType>",
  "outline": <simpleLineSymbol>, //if outline has been specified
  "width": <width>,
  "height": <height>,
  "angle": <angle>,
  "xoffset": <xoffset>,
  "yoffset": <yoffset>,
  "xscale": <xscale>,
  "yscale": <yscale>
}
```



```
{
  "type": "esriPFS",
  "url": "866880A0",
  "imageData": "iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAM9JREFUeJzt0EEJADAMwMA96l/zTBwUSk5ByLxQsx1wTUOxhmINxRqKNRRrKNZQrKFYQ7GGYg3FGoo1FGso1lCsoVhDsYZiDcUaijUUayjWUKyhWEOxhmINxRqKNRRrKNZQrKFYQ7GGYg3FGoo1FGso1lCsoVhDsYZiDcUaijUUayjWUKyhWEOxhmINxRqKNRRrKNZQrKFYQ7GGYg3FGoo1FGso1lCsoVhDsYZiDcUaijUUayjWUKyhWEOxhmINxRqKNRRrKNZQrKFYQ7GGYh/hIwFRFpnZNAAAAABJRU5ErkJggg==",
  "contentType": "image/png",
  "outline": {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "color": [110,110,110,255],
    "width": 1
  },
  "width": 63,
  "height": 63,
  "angle": 0,
  "xoffset": 0,
  "yoffset": 0,
  "xscale": 1,
  "yscale": 1
}
```

### Text Symbol

Text symbols are used to add text to a feature (labeling). The `type` property for text symbols is `esriTS`.

Keep the following in mind when working with this object:

-   The borderlineSize, haloSize, and size properties are specified in points.
-   When used in a dynamic layer to specify a labeling object, as part of `drawingInfo`, the `angle` property is ignored. Also, the labeling engine can override `verticalAlignment` and `horizontalAlignment` values for proper label placement.
-   When used in an Export Web Map Task as part of specifying a client-side graphic, use text to specify the text that appears on the graphic. The text symbol used in export web map task supports `angle`, `horizontalAlignment`, and `verticalAlignment` properties. It does not support transparency (alpha) used in color. The `angle` property defines the number of degrees (0 to 360) that a text symbol is rotated. The rotation is from East in a counter-clockwise direction where East is the 0° axis.
-   Support for the `style` and `weight` properties are dependent on the specified font. Not all fonts support all the values. In most cases bold and bolder are the same.
-   The `rightToLeft` property only affects Hebrew and Arabic fonts.



```
{
  "type": "esriTS",
  "color": <color>,
  "backgroundColor": <color>,
  "borderLineSize": <size>,
  "borderLineColor": <color>,
  "haloSize": <size>,
  "haloColor": <color>,
  "verticalAlignment": "<baseline | top | middle | bottom>",
  "horizontalAlignment": "<left | right | center | justify>",
  "rightToLeft": <true | false>,
  "angle": <angle>,
  "xoffset": <xoffset>,
  "yoffset": <yoffset>,
  "kerning": <true | false>,
  "font": {
    "family": "<fontFamily>",
    "size": <fontSize>,
    "style": "<italic | normal | oblique>",
    "weight": "<bold | bolder | lighter | normal>",
    "decoration": "<line-through | underline | none>"
  },
  "text": "<client-side graphic text>" //only applicable when specified as a client-side graphic.
}
```



```
{
  "type": "esriTS",
  "color": [78,78,78,255],
  "backgroundColor": [0,0,0,0],
  "borderLineSize": 2,
  "borderLineColor": [255,0,255,255],
  "haloSize": 2,
  "haloColor": [0,255,0,255],
  "verticalAlignment": "bottom",
  "horizontalAlignment": "left",
  "rightToLeft": false,
  "angle": 0,
  "xoffset": 0,
  "yoffset": 0,
  kerning": true,
  "font": {
    "family": "Arial",
    "size": 12,
    "style": "normal",
    "weight": "bold",
    "decoration": "none"
  }
}
```