# Uploads

> Source: [/rest/services-reference/enterprise/uploads/](https://developers.arcgis.com/rest/services-reference/enterprise/uploads/)

**URL:**: https://<root>/<serviceName>/<serviceType>/uploads

**Methods:**: GET

**Required Capability:**: GP and Mobile Service: Uploads, Image Service: Edit or Uploads, Feature Service: Create or Update, Geodata Service: Replication

**Version Introduced:**: 10.1

## Description

The `uploads` resource is the parent resource for upload related operations and resources. This resource is available only if the service or an extension supports the upload capability. For feature and image services, the upload capability is enabled when editing is turned on. For mobile and geoprocessing services, the upload capability can be explicitly enabled or disabled at publish time. For a geodata service, the upload capability is enabled when replication is turned on. If upload is enabled for a service, it is recommended that you secure the service to allow only authenticated users access to this capability.

Individual items can be uploaded using the [`upload`](/rest/services-reference/enterprise/upload/) operation.

To upload a large file, the file can be split into multiple parts. The item must be registered first using the [`register`](/rest/services-reference/enterprise/register/) operation, and uploaded in parts using the [`uploadPart`](/rest/services-reference/enterprise/upload-part/) operation. Once parts of an item are uploaded, the [`commit`](/rest/services-reference/enterprise/commit/) operation can be used to complete the upload of that item.

## Limiting upload file size and file types

The acceptable file types that can be uploaded and the file size are limited by the service or its extension properties `AllowedUploadFileTypes` and `MaxUploadFileSize`.

By default, each service or its extension has a predefined list of allowed file types and a maximum file size. This limit also applies to files uploaded using feature service add or update attachment operations. By default, ArcGIS Server imposes a 2 GB limit on the maximum size of file that can be uploaded. When uploading a single file, this is the maximum allowed size for that file. When a file is uploaded in parts, this is the maximum allowed size for the committed file.

ArcGIS Server also imposes a limit on the file types that can be uploaded. The file types allowed vary for each service type. By default, the most commonly used file extensions for that service type are allowed. If the file type (extension) does not match an allowed type when uploading a single file, the upload will fail. Similarly, the [`register`](/rest/services-reference/enterprise/register/) operation will fail if the extension specified for the `itemName` is not an allowed type.

You can modify the `AllowedUploadFileTypes` and `MaxUploadFileSize` properties for a service or service extension using the ArcGIS Server Administrator Directory as follows:

1.  Log in to ArcGIS Server Administrator Directory: `https://<host>:<port>/<instance>/admin` .
2.  Browse to the service: `https://<host>:<port>/<instance>/admin/services/<servicename>.<ServiceType>`.
3.  The HTML view of the service lists the default values for `Max upload file size` and `Allowed upload file types`. Note the default properties.
4.  Edit the service.
5.  Update the `maxUploadFileSize` property with a maximum allowed size in megabytes (MB).
6.  Update the `allowedUploadFileTypes` property by specifying a comma separated list of file extensions (for example, jpg, png, tif).
7.  Save the edits.

All uploaded items are subject to the cleanup interval set in the System directory by the server administrator. Additionally, the administrator can explicitly delete uploaded items as soon as they become available in the uploaded items list in the Administrator Directory.

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. This resource supports html output only.Values: html |

## Example usage



```
https://sampleserver6.arcgisonline.com/arcgis/rest/services/DamageAssessment/FeatureServer/uploads/upload
```