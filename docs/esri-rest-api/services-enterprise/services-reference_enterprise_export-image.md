# Export Image

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/export-image/

## Service Info

- **Parameter:** Details
- **bbox:** The extent (bounding box) of the exported image. Unless the bboxSR parameter has been specified, the bbox parameter is assumed to be in the spatial reference of the image service. The bbox coordinates should always use a period as the decimal separator, even in countries where traditionally a comma is used.SyntaxUse dark colors for code blocksCopy1
bbox=<xmin>,<ymin>,<xmax>,<ymax>ExampleUse dark colors for code blocksCopy1
bbox=-104,35.6,-94.32,41
- **size:** The size (width and height) of the exported image in pixels. If size  is not specified, an image with a default size of 400 by 400 will be exported.SyntaxUse dark colors for code blocksCopy1
size=<width>,<height>ExampleUse dark colors for code blocksCopy1
size=600,550
- **adjustAspectRatio:** This parameter indicates whether to adjust the aspect ratio or not. By default, adjustAspectRatio is true, which means that the actual bbox  parameter will be adjusted to match the width/height ratio of the size parameter, and the response image has square pixels.Values: true | false
- **imageSR:** The spatial reference of the exported image. The spatial reference can be specified as either a well-known ID or a spatial reference JSON object. If the imageSR  parameter is not specified, the image will be exported in the spatial reference of the image service.
- **datumTransformation:** A WKID or a JSON object specifying the geographic datum transformation. Use it to apply a single datum transformation or a composite datum transformation chain to the exported image when the geographic datum of imageSR is different than the geographic datum of image service's spatial reference. When not specified, a default datum transformation will be applied if needed.NoteWhile specifying transformation, you need to think about which datum transformation is most applicable to project the image service to the imageSR. The spatialReference property of the image service resource reports which spatial reference is used by the service.For a list of valid datum transformation ID values (WKID) and well-known text (WKT) strings, see Using spatial references. For more information on datum transformation, see the transformation parameter in the Project operation.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
//Syntax of a single datum transformation number with WKID (Well-Known ID)
datumTransformation=<wkid>

//Syntax of a single datum transformation json element with WKID
datumTransformation={"wkid": <wkid>}

//Syntax of a single datum transformation json element with geoTransforms
datumTransformation={"geoTransforms":[{"wkid": <wkid>,"transformForward": <boolean>}]}

//Syntax of a single datum transformation json element with WKT (Well-Known Text)
datumTransformation={"wkt": "<wkt>"}

//Syntax of a composite datum transformation chain json element with geoTransforms of WKIDs
datumTransformation={"geoTransforms":[{"wkid": <wkid1>,"transformForward": <boolean>}, {"wkid": <wkid2>,"transformForward": <boolean>}]}

//Syntax of a composite datum transformation chain json element with geoTransforms of WKTs
datumTransformation={"geoTransforms":[{"wkt": <wkt1>,"transformForward": <boolean>}, {"wkt": <wkt2>,"transformForward": <boolean>}]}ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
//a single datum transformation number with WKID (Well-Known ID)
datumtransformation=1196

//a single datum transformation json element with WKID
datumtransformation={"wkid":1196}

//a single datum transformation json element with geoTransforms
datumtransformation={"geoTransforms":[{"wkid":1196,"transformForward":true}]}

//a single datum transformation json element with WKT (Well-Known Text)
datumTransformation={"wkt":"GEOGTRAN[\"OSGB_1936_To_WGS_1984_2\",GEOGCS[\"GCS_OSGB_1936\",DATUM[\"D_OSGB_1936\",SPHEROID[\"Airy_1830\",6377563.396,299.3249646]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],METHOD[\"Geocentric_Translation\"],PARAMETER[\"X_Axis_Translation\",371.0],PARAMETER[\"Y_Axis_Translation\",-112.0],PARAMETER[\"Z_Axis_Translation\",434.0],OPERATIONACCURACY[10.0]]"}

//a composite datum transformation chain json element with geoTransforms of WKIDs
datumTransformation={"geoTransforms":[{"wkid":1315,"transformForward":true},{"wkid":1138,"transformForward":true}]}

//a composite datum transformation chain json element with geoTransforms of WKTs
datumTransformation={"geoTransforms":[{"wkt":"GEOGTRAN[\"OSGB_1936_To_ED_1950_UKOOA\",GEOGCS[\"GCS_OSGB_1936\",DATUM[\"D_OSGB_1936\",SPHEROID[\"Airy_1830\",6377563.396,299.3249646]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],GEOGCS[\"GCS_European_1950\",DATUM[\"D_European_1950\",SPHEROID[\"International_1924\",6378388.0,297.0]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],METHOD[\"Position_Vector\"],PARAMETER[\"X_Axis_Translation\",535.948],PARAMETER[\"Y_Axis_Translation\",-31.357],PARAMETER[\"Z_Axis_Translation\",665.16],PARAMETER[\"X_Axis_Rotation\",0.15],PARAMETER[\"Y_Axis_Rotation\",0.247],PARAMETER[\"Z_Axis_Rotation\",0.998],PARAMETER[\"Scale_Difference\",-21.689],OPERATIONACCURACY[2.0]]","transformForward":true},{"wkt":"GEOGTRAN[\"ED_1950_To_WGS_1984_6\",GEOGCS[\"GCS_European_1950\",DATUM[\"D_European_1950\",SPHEROID[\"International_1924\",6378388.0,297.0]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],METHOD[\"Geocentric_Translation\"],PARAMETER[\"X_Axis_Translation\",-86.0],PARAMETER[\"Y_Axis_Translation\",-96.0],PARAMETER[\"Z_Axis_Translation\",-120.0],OPERATIONACCURACY[6.0]]","transformForward":true}]}
- **bboxSR:** The spatial reference of the bbox parameter. The spatial reference can be specified as either a well-known ID or a spatial reference JSON object. If the bboxSR parameter is not specified, the bbox parameter is assumed to be in the spatial reference of the image service.
- **time:** The time instant or the time extent of the exported image. For time extents, either the startTime or endTime values can be null. A null value specified for start time or end time will represent infinity for start or end time, respectively.SyntaxUse dark colors for code blocksCopy1
2
3
4
5
//Time instant
time=<timeInstant>

//Time extent
time=<startTime>,<endTime>ExampleUse dark colors for code blocksCopy1
2
3
4
5
//Time instant (1 Jan 2008 00:00:00 GMT)
time=1199145600000

//Time extent (1 Jan 2008 00:00:00 GMT to 1 Jan 2009 00:00:00 GMT)
time=1199145600000, 1230768000000
- **format:** The format of the exported image. The default format is jpgpng. Support for the jpgpng format was added at 10.0. This format returns a JPG file if there are no transparent pixels in the requested extent; otherwise, it returns a PNG file (png32 ), which was added at 10.2. The bip, bsq, and lerc formats were added at 10.3. The bip and bsq formats are uncompressed data. All three formats are pixel data followed by a nodata mask (1 bit per pixel).Values: jpgpng | png | png8 | png24 | jpg | bmp | gif | tiff | png32 | bip | bsq | lerc
- **lercVersion:** The version of the LERC format if the user sets the format as lerc. The default is 1. If a version is specified, the server returns the matching version; otherwise, it returns the highest version available.Values: 1 | 2
- **pixelType:** The pixel type, also known as data type, pertains to the type of values stored in the raster, such as signed integer, unsigned integer, or floating point. Integers are whole numbers, whereas floating points have decimals.The exportImage operation involves two major steps: getting the image (band selection, spatial resolution, mosaicking, processing raster functions, and so on) and converting to a specific format (for example, JPG, PNG, or TIFF). This pixelType parameter controls the output of the first step. When pixel values exceed the valid value range of the requested pixel type, pixel values are truncated to fit to the pixel type. When the pixel type is not 8 bit but the requested format does not support the pixel type (for example, JPG or PNG), the image service applies a default stretch in the second step so the final result can fit into an 8-bit JPG or PNG. There is no default stretch applied when the request format is TIFF.The processing result of the first step has a default pixelType; it can be the same as or different from the source data. For example, an image service that serves floating-point elevation data can produce an F32 image when no rendering rule is applied and a U8 image when a hillshade function is used. In the first case (F32), specifying pixelType=U8 can lead to truncation; in the second case (U8 with hillshade), specifying pixelType as F32 can lead to a hillshaded image stored as F32 and cause unnecessary rendering when converting to JPG or PNG.Leave pixelType as unspecified, or UNKNOWN, in most exportImage use cases, unless such pixelType is desired.Values: C128 | C64 | F32 | F64 | S16 | S32 | S8 | U1 | U16 | U2 | U32 | U4 | U8 | UNKNOWN
- **noData:** The pixel value representing no information.ExampleUse dark colors for code blocksCopy1
2
3
4
5
//Pixel is transparent when the pixel value of any band is 0
noData=0

//When a pixel matches a nodata value, the pixel will be rendered transparent
noData=58,128,187
- **noDataInterpretation:** Interpretation of the noData setting. The default is esriNoDataMatchAny when noData is a number, and esriNoDataMatchAll when noData is a comma-delimited string.Values: esriNoDataMatchAny | esriNoDataMatchAll.ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
//A pixel is transparent only if the pixel value is 0 for all bands
noData=0&noDataInterpretation=esriNoDataMatchAll

//A pixel is transparent when the pixel value is 58,128,187.
noData=58,128,187&noDataInterpretation=esriNoDataMatchAll

//A pixel is transparent if any band is 0
noData=0&noDataInterpretation=esriNoDataMatchAny
- **interpolation:** The resampling process of extrapolating the pixel values while transforming the raster dataset when it undergoes warping or when it changes coordinate space.Values: RSP_BilinearInterpolation | RSP_CubicConvolution | RSP_Majority | RSP_NearestNeighbor
- **compression:** Controls how to compress the image when exporting to TIFF format: None, JPEG, or LZ77. It does not control compression on other formats. For other output image formats (such as JPEG, PNG, PNG24, PNG32, and GIF), compressions are automatically set by the format.ExampleUse dark colors for code blocksCopy1
compression=LZ77
- **compressionQuality:** Controls how much loss the image will be subjected to by the compression algorithm. Valid value ranges of compression quality are from 0 to 100. The compression quality works for the JPEG format, JPGPNG (if the result is a JPG), and TIFF with JPEG compression.ExampleUse dark colors for code blocksCopy1
compressionQuality=75
- **compressionTolerance:** Controls the tolerance of the lerc compression algorithm. The tolerance defines the maximum possible error of pixel values in the compressed image. It's a double value. The compression tolerance works for the LERC format only.ExampleUse dark colors for code blocksCopy1
2
//Is lossless for 8 and 16 bit images, but has an accuracy of +0.5 for floating point data
compressionTolerance=0.5
- **bandIds:** If there are multiple bands, you can specify a single band to export, or you can change the band combination (red, green, blue) by specifying the band number. Band number is 0 based.ExampleUse dark colors for code blocksCopy1
bandIds=2,1,0
- **mosaicRule:** Specifies the mosaic rule when defining how individual images should be mosaicked. When a mosaic rule is not specified, the default mosaic rule of the image service will be used (as advertised in the root resource: defaultMosaicMethod , mosaicOperator , sortField , sortValue ). Refer to the mosaic rule JSON objects for the syntax and examples.
- **renderingRule:** Specifies the rendering rule for how the requested image should be rendered. Refer to the raster function JSON objects for the syntax and examples.
- **sliceId:** Added at 10.8.1 and available if the image service uses ArcObjects11  or ArcObjectsRasterRendering  as the service provider.This parameter is for image services of multidimensional datasets only. The image export operation will be processed for the selected dimensional slice. The sliceId  parameter of a dimensional slice can be queried from the image service slices resource.
- **validateExtent:** Added at 10.9. This parameter is supported if the image service uses ArcObjects11  or ArcObjectsRasterRendering as the service provider.
The validateExtent parameter validates the bounding box of the request. When set to true, it returns an exception if the bounding box is beyond the image service’s extent. By default, validateExtent is false.
- **f:** The response format. The default response format is HTML. If the format is image , the image bytes are directly streamed to the client.Values: html  | json  | image  | kmz

## Description

> **Note:** NoteYou must license your ArcGIS Server as an ArcGIS Image Server site to use this resource with a mosaic dataset.

The exportImage operation is performed on an image service resource and results in an image resource. This resource provides information about the exported image, such as its URL, extent, width, and height.

In addition to the usual response formats of HTML and JSON, you can also request the image format while performing this operation. When you perform an export with the image format, the server responds by directly streaming the image bytes to the client. With this approach, you don't get any information associated with the exported image other than the image itself.

You can provide arguments to the export image operation as query parameters. These parameters include the request extent, size information, interpolation, pixel type, and so on. The parameter details are provided in the parameters table below.

## Request Parameters

## Response

## Examples

```json
1
bbox=<xmin>,<ymin>,<xmax>,<ymax>
```

