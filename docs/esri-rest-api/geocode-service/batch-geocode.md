# Batch Geocode

> Source: [/rest/services-reference/enterprise/batch-geocode/](https://developers.arcgis.com/rest/services-reference/enterprise/batch-geocode/)

**URL:**: https://<geocodeservice-url>/batch-geocode

**Methods:**: GET

**Version Introduced:**: 10.5

![Batch Geocode](/rest/services-reference/enterprise/static/3073d7d9bad48edbb743e5ee93143706/88c73/GUID-A3CBEE3B-DF47-42DE-950C-6FC53C673059-web.png)

The **Batch Geocode** task geocodes a table or file of addresses and returns the geocoded results. It supports `CSV` , `XLS` or table input. The task geocodes the entire file regardless of size.

## Request URL



```
https://<analysis url>/BatchGeocode/submitJob
```

## Request parameters

| Parameter | Description |
|---|---|
| geocodeParameters(Required) | This includes parameters that help parse the file, as well the field lengths and a field mapping. This JSON is the output from AnalyzeGeocodeInput . It is important to inspect the field mapping closely and adjust it accordingly before submitting your job, otherwise your geocoding results may not be accurate. It is recommended to use the output from AnalyzeGeocodeInput and modify the field mapping instead of constructing this JSON by hand and passing it in.Valuesfield_info : A list of triples with the field names of your input file/table, its field type (usually TEXT ), and its allowed length (usually 255 ).Example 2 3 [('ObjectID', 'TEXT', 255), ('Address', 'TEXT', 255), ('Region', 'TEXT', 255), ('Postal', 'TEXT', 255)]column_names : Submit the column names of your data if your data does not have a header row.file_type : Either CSV , XLS , or tablecolumn_delimiter : "; ", "\t ", "\| ", or ", "text_qualifier : Either "\" " or "\' "field_mapping : Field mapping between each input field and candidate fields on the geocode service.Example 2 [['ObjectID', 'OBJECTID'], ['Address', 'Address'], ['Region', 'Region'], ['Postal', 'Postal']]header_row_exists : Enter true or false .Example {"field_info": "[('ObjectID', 'TEXT', 255), ('SingleLine', 'TEXT', 255), ('Address', 'TEXT', 255), ('Region', 'TEXT', 255), ('Postal', 'TEXT', 255), ('PostalExt', 'TEXT', 255), ('Country', 'TEXT', 255), ('Source', 'TEXT', 255)]", "column_names": "", "file_type": "csv", "column_delimiter": ",", "text_qualifier": "", "field_mapping": "[['ObjectID', 'OBJECTID'], ['SingleLine', 'SingleLine'], ['Address', 'Address'], ['Region', 'Region'], ['Postal', 'Postal'], ['PostalExt', 'PostalExt'], ['Country', ''], ['Source', '']]", "header_row_exists": true} |
| geocodeServiceURL(Required) | Enter the REST URL of the geocode service that you want to geocode your addresses against. The URL must end in geocodeServer and allow batch requests. This could be a utility service, locator item on the portal, or a locator that is anonymously accessible. The geocode service must be configured to allow for batch geocoding. For more information, see: Configuring batch geocodingExample https://organization.example.com/<context>/rest/services/Locators/ESRI_Geocode_USA/GeocodeServer |
| outputType(Required) | Specifies the output type format the expected geocode results are returned in.Values: csv \| xls \| Feature Collection \| Feature Service |
| inputTable(Optional) | The input table specification must include the following:A URL to an input tableA service token to access the tableSyntax {"url":"<table_url>","serviceToken":"<token>"} |
| inputFileItem(Optional) | The input file with the addresses and places to geocode should be a portal item. Input the itemid of the item in the portal. The format of the item in the portal can be one of the following:CSVMicrosoft ExcelSyntax inputFileItem={"itemid":"<itemid_of_file>"} |
| sourceCountry(Optional) | This parameter will limit geocoding to the country or countries specified. Specifying the country where the addresses or places are from in the inputFileItem or inputTable will improve the accuracy of geocoding in most cases. If a field representing countries in the inputFileItem or inputTable is mapped to the input Country field from the geocode service in field_mapping , the country value from the inputFileItem or inputTable will override the sourceCountry parameter.This is limited to the specified country or countries, and when no sourceCountry is specified, geocoding is performed against all supported countries of the locator. You can specify the input value as either two-character or three-character country codes in a comma-separated list. See the Supported Country Codes column for the input value to use.Example sourceCountry=us |
| category(Optional) | Limits the types of places the geocode service searches, which eliminates false positive matches and potentially speeds up the search process. When no category is used, geocoding is performed against all supported categories. In general, you can use the parameter for the following:Limit matches to specific place types or address levelsAvoid fallback matches to unwanted address levelsDisambiguate coordinate searchesSee the ArcGIS REST API web help for details about category filtering.Example category=POI |
| outputFields(Optional) | Parameter options are the following:Create a comma separated list of the output fields you want returned.Enter an empty string, which is equivalent to * , to return all available output fields.Use the keyword NONE to return the Shape field if the outputType is a Feature Collection or Feature Service . The Shape X and Shape Y fields are returned if the outputType is either a .csv or .xls file. The original field names from the inputFileItem or inputTable parameters are maintained with their original field names.Example outputFields=score,match_addr,x,y |
| headerRowsToSkip(Optional) | Describes on which row your data begins in your file or table. The default is 1 (since the first row contains the headers). The default is 1 .Example headerRowsToSkip=1 |
| outputName(Optional) | If provided, the task will create a feature service of the results. You define the name of the service. If an outputName value is not provided, the task will return a feature collection.Syntax: { "serviceProperties": { "name": "<service name>" } }In ArcGIS Online or ArcGIS Enterprise 10.9.1 and later, you can overwrite an existing feature service by providing the itemId value of the existing feature service and setting the overwrite property to true. Including the serviceProperties parameter is optional. As described in the Feature output topic, you must either be the owner of the feature service or have administrative privileges to perform the overwrite.Syntax: { "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }or { "serviceProperties": { "name": "<existing service name>" }, "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } } |
| context(Optional) | The Context parameter contains the following additional settings that affect task operation:Extent (extent)—A bounding box that defines the analysis area. Only input features that intersect the bounding box will be analyzed.Output spatial reference (outSR)—The output features will be projected into the output spatial reference.Syntax: { "extent" : {extent}, "outSR" : {spatial reference} } |
| locatorParameters | This parameter takes a dictionary that can contain any or all of the following optional geocoding parameters:locationType —Specifies the preferred output geometry for PointAddress and Subaddress matches. The options for this parameter are rooftop , which is the location that represents the rooftop, parcel centroid for the address, or front door and street , which is the side of street or street entrance location that can be used for routing. If the preferred location does not exist in the data, the default location of street will be returned instead. For geocode results with Addr_type=PointAddress , the x,y attribute values describe the coordinates of the address along the street, while the DisplayX and DisplayY values describe the rooftop or building centroid coordinates. See the ArcGIS REST API web help for details about the locationType parameter for geocodeAddresses .sourceCountry —Limits search to the specified country or countries. When no sourceCountry is specified, geocoding is performed against all supported countries of the locator. Including this parameter in the dictionary will overwrite the sourceCountry parameter if it was used already. Not all geocode services support sourceCountry .category —Limits the types of places the geocode service searches, which eliminates false positive matches and potentially speeds up the search process. When no category is used, geocoding is performed against all supported categories. Not all geocode services support category . Including this parameter in the dictionary will overwrite the category parameter value if it was used already.Syntax { "locationType": "rooftop", "sourceCountry": "US", "category": "POI" } |
| f | The response format. The default response format is html .Values: html \| json |

## Response

When you submit a request, the service assigns a unique job ID for the transaction.



```
{
  "jobId": "<unique job identifier>",
  "jobStatus": "<job status>"
}
```

After the initial request is submitted, you can use `jobId` to periodically check the status of the job and messages as described in [Checking job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, use `jobId` to retrieve the results. To track the status, you can make a request in the following form:



```
https://<analysis-url>/BatchGeocode/jobs/<jobId>
```

## Access results

When the status of the job request is `esriJobSucceded` , you can access the results of the analysis by making a request in the following form:



```
https://<analysis-url>/BatchGeocode/jobs/<jobId>/results/<output parameter name>?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| geocodeResult | geocodeResult can be a feature collection JSON, or it contains the itemId of the geocoding job. itemId is either a feature service or a file, depending on the desired outputType .Example {"url": "https://<analysis url>/BatchGeocode/jobs/<jobId>/results/resultLayer"}The result has properties for parameter name, data type, and value. The contents of value depend on the outputName parameter provided in the initial request.If outputName was provided, value contains the URL to the feature service layer: { "paramName": "geocodeResult", "dataType": "GPString", "value": { "itemId": "3754b700a028480da874f6cd6e100e65", "url": "https://organization.example.com/<context>/sharing/rest/content/items/3754b700a028480da874f6cd6e100e65" } }If outputName was not provided, value contains a feature collection: { "value": { "layerDefinition": {}, "featureSet": {} } }See Feature Output for more information about how the result layer or collection is accessed. |
| geocodingStatistics | geocodingStatistics output JSON includes statistics about the batch geocoding job. The result has properties for parameter name, data type, and value. The value contains the JSON of percentages for matched, unmatched, and tied records in the batch geocoding job. It may also contain "Dropped Records", an additional list of ObjectIDs for the records that were unable to be processed. { "paramName": "geocodingStatistics", "dataType": "GPString", "value": { "Matched": "992 Matched (99.1%)", "Unmatched": "0 Unmatched (0.0%)", "Tied": "8 Tied (0.8%)" } } |