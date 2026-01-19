# Analyze Geocode Input

> Source: [/rest/services-reference/enterprise/analyze-geocode-input/](https://developers.arcgis.com/rest/services-reference/enterprise/analyze-geocode-input/)

**URL:**: https://<geocodeservice-url>/analyze-geocode-input

**Methods:**: GET

**Version Introduced:**: 10.5

The `AnalyzeGeocodeInput` task takes in a geocode input (either a table or file of addresses) and returns an output JSON that includes a suggested field mapping. It supports CSV, XLS, or table input. The table can be from a big data file share or from a feature service. The task generates a suggested field mapping based on the input fields and the geocode service candidate fields and returns it in a `geocodeParameters` JSON. This `geocodeParameters` JSON output is the first input to the [Batch Geocode](/rest/services-reference/enterprise/batch-geocode/) tool. The output `geocodeParameters` JSON also includes field info (`name` , `length` , and `type` ) as well as additional information that helps the BatchGeocode tool parse the input file or table.

## Request URL



```
https://<analysis url>/AnalyzeGeocodeInput/submitJob
```

## Request parameters

| Parameter | Description |
|---|---|
| geocodeServiceURL(Required) | The REST URL of the geocode service that you want to geocode your addresses and places against. The URL must end in geocodeServer . This can be a utility service or a locator that is anonymously accessible. The geocode service must be configured to allow batch geocoding. For more information, see Configure the portal to geocode addresses. |
| inputTable(Optional) | Syntax: The input table specification must include the following:A URL to an input tableA service token to access the tableNote that if the table is a hosted table on the same portal, serviceToken is not required.Example inputTable={"url":"<table url>","serviceToken":"<token>"} |
| inputFileItem(Optional) | Syntax: The input file should be a portal item. Input the itemid of the item in the portal. The format of the item in the portal can be in one of the following formats:Comma-separated values file (.csv )Microsoft Excel worksheets (.xls and .xlsx files)Example inputFileItem={"itemid":"<itemid of file>"} |
| columnNames(Optional) | Instead of providing inputTable or inputFileItem , you can provide columnNames . columnNames is required if there is no header row in the inputTable or inputFileItem . columnNames should be separated by commas.Example columnNames=address,city,state,zip |
| inputFileParameters(Optional) | Enter a JSON that contains information about how to parse the file. If you are using inputTable instead of inputFileItem as input, you can leave this parameter blank. You can leave any of the values in the JSON blank ("") if they do not apply to the file.Values can be the following:fileType —Enter CSV or XLS for the file format of inputFileItem .headerRowExists —Enter true if your file has a header row, false if it does not.columnDelimiter —Enter SPACE , TAB , COMMA , PIPE , or SEMICOLON .textQualifier —Enter either SINGLE_QUOTE or DOUBLE_QUOTE .Example inputFileParameters={"fileType":"xlsx","headerRowExists":"true","columnDelimiter":"","textQualifier":""} |
| locale(Optional) | Enter the two-letter en or four-letter ar-il specific locale if geocodeInput is in a language other than English. For more information about localization and specific language codes, see localization |
| context(Optional) | The Context parameter contains the following additional settings that affect task operation:Extent (extent)—A bounding box that defines the analysis area. Only input features that intersect the bounding box will be analyzed.Output spatial reference (outSR)—The output features will be projected into the output spatial reference.Syntax: { "extent" : {extent}, "outSR" : {spatial reference} } |

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
https://<analysis url>/AnalyzeGeocodeInput/jobs/<jobId>
```

## Access results

When the status of the job request is `esriJobSucceded` , you can access the results of the analysis by making a request in the following form:



```
https://<analysis url>/AnalyzeGeocodeInput/jobs/<jobId>/results/<output parameter name>?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| geocodeParameters | geocodeParameters is a JSON that contains information about the file, field info, and a suggested field mapping.Example {"url": "https://<analysis url>/AnalyzeGeocodeInput/jobs/<jobId>/results/geocodeParameters"}The result contains the geocodeParameters JSON, which is the first input into the BatchGeocode tool. { "paramName": "geocodeParameters", "dataType": "GPString", "value": { "field_info": "[('ObjectID', 'TEXT', 255), ('Address', 'TEXT', 255)]", "column_names": "", "file_type": "xlsx", "column_delimiter": "", "text_qualifier": "", "field_mapping": "[['ObjectID', 'OBJECTID'], ['Address', 'Address']]", "header_row_exists": true } } |