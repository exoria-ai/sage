# Upload

> Source: [/rest/services-reference/enterprise/upload/](https://developers.arcgis.com/rest/services-reference/enterprise/upload/)

**URL:**: https://<root>/<serviceName>/<serviceType>/uploads/upload

**Methods:**: POST

**Required Capability:**: Uploads

**Version Introduced:**: 10.0

## Description

This operation uploads an item to the server. Each uploaded item is identified by a unique itemID. Since this request uploads a file, it must be a multi-part request as per [IETF RFC1867](https://www.rfc-editor.org/rfc/rfc1867.txt).

See [limiting Upload file size and file types](/rest/services-reference/enterprise/uploads/) to learn more about default file size and file type limitations imposed for uploads.

All uploaded items are subjected to the deletion rules set on the upload directory by the administrator of the server. Additionally, the administrator can explicitly delete an item as each uploaded item shows up in the list of all the uploaded items in Site Directory.

Users can provide arguments to the upload operation as query parameters. The parameter details are provided in the parameters table below.

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html.Values: html \| json |
| file | The file to be uploaded. |
| description | An optional description for the uploaded item. |

## Example usage: Upload a file



```
https://sampleserver6.arcgisonline.com/arcgis/rest/services/DamageAssessment/FeatureServer/uploads/upload
```

The input parameter file to this operation is a file.

## JSON Response syntax



```
{
    "success": <true|false>,
    "item": {
        "itemID": "<itemID>",
        "itemName": "<itemName>",
        "description": "<description>",
        "date": <date>,
        "committed": <true|false>
    }
}
```

## JSON Response example



```
{
    "success": true,
    "item": {
        "itemID": "ib740c7bb-e5d0-4156-9cea-12fa7d3a472c",
        "itemName": "lake.tif",
        "description": "Lake Tahoe",
        "date": 1246060800000,
        "committed": true
    }
}
```