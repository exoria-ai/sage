# General information

> Source: [/rest/services-reference/enterprise/gp-overview/](https://developers.arcgis.com/rest/services-reference/enterprise/gp-overview/)

Geoprocessing is a fundamental part of enterprise GIS operations. Geoprocessing provides GIS users with data analysis, data management, and data conversion tools.

A geoprocessing service is a collection of published tools that perform tasks necessary for manipulating and analyzing geographic information across a wide range of disciplines. Each tool performs one or more operations, such as projecting a dataset from one map projection to another, adding fields to a table, or creating buffer zones around features. A tool accepts input (such as feature sets, tables, and property values), runs operations using the input data, and generates output for presentation in a map or further processing by the client. Tools can be run synchronously (in sequence) or asynchronously. A synchronous geoprocessing service performs best when a task takes only a few seconds; an asynchronous geoprocessing service is suitable for long-running tasks.

Use a geoprocessing service to do the following:

-   List available tools and their input and output properties.
-   Run a task synchronously.
-   Submit a job to a task asynchronously.
-   Get job details, including job status.
-   Display results using a map service.
-   Display results using a hosted feature service.
-   Retrieve results for further processing by a client.

Many GIS tasks involve the repetition of work, and this creates the need for a framework to provide automation of workflows. Geoprocessing services address this by using a model to combine a series of operations in a sequence and exposing the model as a tool.

A geoprocessing service can contain one or more tools that use input data from a client application, process it, and return output in the form of features, maps, reports, files, or services. These tools are first authored and run in ArcGIS Pro, typically as a custom model or script tool, or a tool from a Python toolbox, before being shared to ArcGIS Server. To publish a geoprocessing service from ArcGIS Pro to a stand-alone ArcGIS Server, see [Share your geoprocessing service](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/publishing-geoprocessing-service-in-arcgis-pro.htm). To publish a web tool with a geoprocessing service from ArcGIS Pro to ArcGIS Enterprise, see [Share your web tool](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/share-analysis/publishing-web-tools-in-arcgis-pro.htm).

Each task of a geoprocessing service includes operations that return results after a task is successfully completed. The supported operations are as follows:

-   `execute` — Use when `executionType` is synchronous. A client must wait for the results.
-   `submitJob` — Use when `executionType` is asynchronous. A client can do other things while waiting for the task to complete.

## Service structure

A geoprocessing service is a resource that can be accessed through a URL. The URL format for a geoprocessing service is `https://organization.example.com/<context>/rest/services/<Service Name>/GPServer`, for example, `https://organization.example.com/<context>/rest/services/BufferPoints/GPServer`.

A [geoprocessing service](/rest/services-reference/enterprise/gp-service/) has properties including **Service Description**, **JSON Schema**, **Tasks**, **Execution Type**, **Result Map Server Name**, **MaximumRecords**, and **Child Resources**. The [geoprocessing tasks](/rest/services-reference/enterprise/gp-task/) that are published in a geoprocessing service are also child resources.

A geoprocessing service does not include operations, but in an asynchronous geoprocessing service, tasks support the [`submitJob`](/rest/services-reference/enterprise/submit-gp-job/) and [`cancel`](/rest/services-reference/enterprise/cancel-gp-job/) job operations. In a synchronous geoprocessing job, tasks support the [`execute`](/rest/services-reference/enterprise/execute-gp-task/) operation.

The tasks in a geoprocessing service inherit the **Execution Type** and **Result Map Server** properties and include additional properties such as **Description** and **Parameters**.

The properties of the service and the task are determined by the publisher of the service and cannot be modified by clients. However, an administrator can [edit some service properties](https://enterprise.arcgis.com/en/server/latest/publish-services/windows/editing-service-properties-in-manager.htm) using Server Manager.

The figure below shows the hierarchy of geoprocessing REST resources:

![Geoprocessing REST service hierarchy](/rest/services-reference/enterprise/static/a12289843843fb88e09c93d39020e925/3ebb1/GUID-A95B5737-9BBE-44C9-BED8-C2F914B06B56-web.png)

## Input and output

Most geoprocessing tasks have both inputs and outputs. There are slight differences between the handling of input and output by geoprocessing services.

### Input

For both synchronous and asynchronous geoprocessing services, the input of a task should follow the syntax based on the [data type](/rest/services-reference/enterprise/gp-data-types/) of a parameter.

### Output

For synchronous geoprocessing services, the result is given directly once the `execute` operation completes.

For asynchronous geoprocessing services, the result must be accessed through the [`GP Result`](/rest/services-reference/enterprise/gp-result/) resource after the `submitJob` operation.

## Secured services

To use a secured geoprocessing service, a [token](https://enterprise.arcgis.com/en/server/latest/administer/windows/accessing-arcgis-token-secured-web-services.htm) must be passed with the `submitJob` or `execute` operation as an additional parameter. A sample GET request is `https://organization.example.com/<context>/rest/services/LandUseReport/GPServer/LandUse/submitJob?Area_of_Interest=testArea&f=json&token=myToken`.

When you use URLs to reference a secured map service, feature service or image service as an input, a token is also required for that input URL, regardless of whether the geoprocessing service is secured or public. An exception is when the secured geoprocessing service is on the same server as the secured input services.

The following is an example of accessing secured web layers as an input:



```
{
    "url":"https://organization.example.com/<context>/rest/services/Hosted/<ServiceName>/FeatureServer/0",
    "token":"sample-token"
}
```

You can also use the following syntax for a secured map service, a feature service, or an image service input.

The following is an alternative example of accessing secured web layers as an input:



```
{
    "url":"https://organization.example.com/<context>/rest/services/<serviceName>/ImageServer?token=sample-token"
}
```

## Schedule a service

Starting at ArcGIS Enterprise 11.2, you can schedule a geoprocessing service on a hosted server from your federated portal's ArcGIS Portal Directory REST API. This geoprocessing service can be any geoprocessing service, including the system **Spatial Analysis Tools**. You cannot schedule a service if you have a stand-alone ArcGIS Server.

If you are a publisher on your portal, you must own the web tool item to schedule a geoprocessing service. To schedule web tool items that a publisher can access but does not own the publisher must request ownership transfer from the original owner of the web tool item. Administrators can schedule any geoprocessing service on all federated servers. You cannot schedule a geoprocessing service on a server that is not federated with your portal, even though that service is accessible to you. If you are using a customized role, you must have the Content-Create, update, and delete; Content-Publish hosted feature layers; and Content and Analysis-Standard Feature Analysis privileges.

Before scheduling a geoprocessing service, ensure that the service is functional with the parameter you will be using. Otherwise, five consecutive failed runs of a scheduled task will automatically disable the task, resulting in no further runs from that task.

To schedule a service, submit a [`createTask`](/rest/users-groups-and-items/create-new-scheduled-task.htm) request in the ArcGIS Portal Directory REST API. Once a task has been successfully scheduled, you can access it through the [`tasks`](/rest/users-groups-and-items/all-user-scheduled-tasks.htm) resource, and the processing status through the [`runs`](/rest/users-groups-and-items/runs-for-task.htm) resource. You can also [update](/rest/users-groups-and-items/edit-existing-task.htm), [disable](/rest/users-groups-and-items/disable-task.htm), [enable](/rest/users-groups-and-items/enable-task.htm), and [delete](/rest/users-groups-and-items/delete-task.htm) a task you created.

When you try to use output feature service, you will need to [overwrite an output feature service](/rest/services-reference/enterprise/submit-gp-job/#output-feature-service-name). You must ensure that an existing hosted feature service is available to overwrite, and set the `overwrite` value of `itemProperties` to `true` for the [`esri_out_feature_service_name`](/rest/services-reference/enterprise/submit-gp-job/) parameter.

To check preset limits about scheduling a geoprocessing service, see [limits (system)](/rest/enterprise-administration/portal/limits-system-.htm). If you want to adjust any of these limits, see [update (system limits)](/rest/enterprise-administration/portal/update-system-limits-.htm). You cannot store more than 50 runs per task even if you try to update the `TaskRunHistoryCount`.