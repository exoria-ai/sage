# Geocode File

> Source: [/rest/services-reference/enterprise/geocode-file/](https://developers.arcgis.com/rest/services-reference/enterprise/geocode-file/)

**URL:**: https://<geocodeservice-url>/geocode-file

**Methods:**: GET

**Version Introduced:**: 10.7

The `GeocodeFile` task geocodes a zipped table or file of addresses and returns the geocoded results. It supports zipped CSV and XLS files and geodatabase table input. The task geocodes the entire file regardless of its size.

## Request URL



```
https://<analysis-url>/GeocodeFile/submitJob
```

## Request parameters

| Parameter | Description |
|---|---|
| geocodeParameters(Required) | This includes parameters that help parse the file, the field lengths, and field mapping. This JSON is the output from AnalyzeGeocodeInput . It is important to inspect the field mapping and adjust it accordingly before submitting your job, otherwise the geocoding results may not be accurate. It is recommended that you use the output from AnalyzeGeocodeInput and modify the field mapping instead of constructing this JSON by hand and passing it in.Syntax values:field_info —A list of triples with the field names of your input file or table, its field type (usually TEXT ), and its allowed length (usually 255 ).column_names —Submit the column names of your data if your data does not have a header row.file_type —Either csv , xlsx , or gdbcolumn_delimiter —"; ", "\t ", "\| ", or ", "text_qualifier —Either "\" " or "\' "field_mapping —Field mapping between each input field and candidate fields on the geocoding service.header_row_exists —Enter true or false .Example geocodeParameters={"field_info": "[['ObjectID', 'TEXT', 255], ['SingleLine', 'TEXT', 255], ['Address', 'TEXT', 255], ['Region', 'TEXT', 255], ['Postal', 'TEXT', 255], ['PostalExt', 'TEXT', 255], ['Country', 'TEXT', 255], ['Source', 'TEXT', 255]]", "column_names": "", "file_type": "gdb", "column_delimiter": ",", "text_qualifier": "", "field_mapping": "[['ObjectID', 'OBJECTID'], ['SingleLine', 'SingleLine'], ['Address', 'Address'], ['Region', 'Region'], ['Postal', 'Postal'], ['PostalExt', 'PostalExt'], ['Country', ''], ['Source', '']]", "header_row_exists": true} |
| geocodeServiceURL(Required) | The REST URL of the geocode service you want to geocode your addresses against. The URL must end in geocodeServer and allow batch requests. This can be a utility service or a locator that is anonymously accessible. The geocode service must be configured to allow batch geocoding. For more information, see Configuring batch geocoding. |
| outputType(Required) | Specifies the file type to which the geocode results will be written.Values: csv \| xls \| gdb |
| inputFile(Required) | The input file that contains addresses or places to geocode in a zipped CSV file, XLSX file, or zipped file geodatabase table. The file must already be uploaded to ArcGIS Server.Syntax inputFile={"itemID":"<itemid_of_file>"} |
| tableName(Optional) | The name of the table that contains the addresses or places to geocode in the inputFile . The table name of the input XLSX file or file geodatabase table. The sheet name of the zipped XLSX inputFile . If your input is a zipped XLSX file, enter the name of the sheet in tableName . If your input is a zipped file geodatabase table, enter the name of the table in the file geodatabase that you want to geocode.Use the name of the table if the inputFile is a XLSX file or file geodatabase table. Use the sheet name of the zipped XLSX inputFile . Use the name of the table with the locations to geocode in the file geodatabaseExample tableName=Sheet1 |
| sourceCountry(Optional) | This parameter will limit geocoding to the country or countries specified. Specifying the country where the addresses or places are from in the inputFile will improve the accuracy of geocoding in most cases. If a field representing countries in the inputFile is mapped to the input Country field from the geocode service in field_mapping , the country value from the inputFile will override the sourceCountry parameter.This is limited to the specified country or countries, and when no sourceCountry is specified, geocoding is performed against all supported countries of the locator. You can specify the input value as either two-character or three-character country codes in a comma-separated list. See the Supported Country Codes column for the input value to use.Example sourceCountry=US |
| category(Optional) | Limits the types of places the geocode service searches, which eliminates false positive matches and potentially speeds up the search process. When no category is used, geocoding is performed against all supported categories. In general, you can use the parameter for the following:Limit matches to specific place types or address levelsAvoid fallback matches to unwanted address levelsDisambiguate coordinate searchesSee the ArcGIS REST API web help for details about category filtering.Example category=POI |
| outputFields(Optional) | Specifies which geocode service output fields are returned in the geocode results.The parameter options are the following:Create a comma separated list of the output fields you want returned.Enter an empty string, which is equivalent to * , to return all available output fields.Use the keyword NONE to return the Shape field if the outputType is a feature class in a file geodatabase. The Shape X and Shape Y fields are returned if the outputType is either a .csv or .xls file. The original field names from the inputFile and tableName parameters are maintained with their original field names.Example outputFields=score,match_addr,x,y |
| headerRowsToSkip(Optional) | Describes the first row containing data to be geocoded in the file or table. The default value is 1 since the first row contains the field headers.Example headerRowsToSkip=1 |
| outputName(Optional) | If provided, the task will create a feature service of the results. You define the name of the service. If an outputName value is not provided, the task will return a feature collection.Syntax: { "serviceProperties": { "name": "<service name>" } }In ArcGIS Online or ArcGIS Enterprise 10.9.1 and later, you can overwrite an existing feature service by providing the itemId value of the existing feature service and setting the overwrite property to true. Including the serviceProperties parameter is optional. As described in the Feature output topic, you must either be the owner of the feature service or have administrative privileges to perform the overwrite.Syntax: { "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }or { "serviceProperties": { "name": "<existing service name>" }, "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } } |
| context(Optional) | The Context parameter contains the following additional settings that affect task operation:Extent (extent)—A bounding box that defines the analysis area. Only input features that intersect the bounding box will be analyzed.Output spatial reference (outSR)—The output features will be projected into the output spatial reference.Syntax: { "extent" : {extent}, "outSR" : {spatial reference} } |
| locatorParameters(Optional) | This parameter takes a dictionary that can contain any or all of the following optional geocoding parameters:locationType — Specifies the preferred output geometry for PointAddress and Subaddress matches. The options for this parameter are rooftop , which is the location that represents the rooftop, parcel centroid for the address, or front door and street , which is the side of street or street entrance location that you can use for routing. If the preferred location does not exist in the data, the default location of street will be returned instead. For geocode results with Addr_type=PointAddress , the x,y attribute values describe the coordinates of the address along the street, while the DisplayX and DisplayY values describe the rooftop or building centroid coordinates. See the ArcGIS REST API web help for details about the locationType parameter for geocodeAddresses .sourceCountry —Limits search to the specified country or countries. When no sourceCountry is specified, geocoding is performed against all supported countries of the locator. Including this parameter in the dictionary will overwrite the sourceCountry parameter if it was used already. Not all geocode services support sourceCountry .category —Limits the types of places the geocode service searches, which eliminates false positive matches and potentially speeds up the search process. When no category is used, geocoding is performed against all supported categories. Not all geocode services support category . Including this parameter in the dictionary will overwrite the category parameter value if it was used already.Syntax { "locationType" : "rooftop", "sourceCountry" : "US", "category": "POI" } |
| f | The response format. The default response format is html .Values: html \| json |

## Response

When you submit a request, the service assigns a unique job ID for the transaction.

Syntax



```
{
  "jobId": "<unique job identifier>",
  "jobStatus": "<job status>"
}
```

After the initial request is submitted, you can use `jobId` to periodically check the status of the job and messages as described in [Checking job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, use `jobId` to retrieve the results. To track the status, you can make a request in the following form:



```
https://<analysis-url>/GeocodeFile/jobs/<jobId>
```

## Access results

When the status of the job request is `esriJobSucceded` , you can access the results of the analysis by making a request in the following form:



```
https://<analysis-url>/GeocodeFile/jobs/<jobId>/results/<output parameter name>?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| geocodeResult | geocodeResult can be a zipped CSV file, XLS file, or file geodatabase with the geocoded results. The result has properties for parameter name, data type, and value. The value contains the URL to download the zipped geocoded results. { "paramName": "geocodeResult", "dataType": "GPDataFile", "value": { "url": "https://<server name>/server/rest/directories/arcgisjobs/utilities/geocodingtools_gpserver/jde7cfd2836904c6bb7744f627e2ca1ad/scratch/output.zip" } } |
| geocodingStatistics | geocodingStatistics output JSON includes statistics about the batch geocoding job. The result has properties for parameter name, data type, and value. The value contains the JSON of percentages for matched, unmatched, and tied records in the batch geocoding job. It may also contain "Dropped Records", an additional list of ObjectIDs for the records that were unable to be processed. { "paramName": "geocodingStatistics", "dataType": "GPString", "value": { "Matched": "992 Matched (99.1%)", "Unmatched": "0 Unmatched (0.0%)", "Tied": "8 Tied (0.8%)" } } |