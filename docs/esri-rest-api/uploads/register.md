# Register

> Source: [/rest/services-reference/enterprise/register/](https://developers.arcgis.com/rest/services-reference/enterprise/register/)

**URL:**: https://<root>/<serviceName>/<serviceType>/uploads/register

**Methods:**: POST

**Required Capability:**: Uploads (Image service requires Edit)

**Version Introduced:**: 10.0

## Description

This operation registers an item that will be uploaded in multiple parts. Once an item is registered parts of the item must be uploaded using the [uploadPart](/rest/services-reference/enterprise/upload-part/) operation. Once all parts are uploaded, the [commit](/rest/services-reference/enterprise/commit/) operation must be used to complete the upload of that item.

See [limiting Upload file size and file types](/rest/services-reference/enterprise/uploads/) to learn more about default file size and file type limitations imposed for uploads.

Users can provide arguments to the register operation as query parameters. The parameter details are provided in the parameters table below.

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html.Values: html \| json |
| itemName | A name for the item to be registered. |
| description | An optional description for the registered item. |

## Example usage: Register an item



```
https://sampleserver6.arcgisonline.com/arcgis/rest/services/CommercialDamageAssessment/FeatureServer/uploads/register
```

## JSON Response syntax



```
{
    "success": <true|false>,
    "item": {
        "itemID": "<itemID>",
        "itemName": "<itemName>",
        "description": "<description>",
        "date": <date>,
        "committed": <false>
    }
}
```

## JSON Response example



```
{
    "success": true,
    "item": {
        "itemID": "ib740c7bb-e5d0-4156-9cea-12fa7d3a472c",
        "itemName": "LakeTahoeImage",
        "description": "Lake Tahoe",
        "date": 1246060800000,
        "committed": false
    }
}
```