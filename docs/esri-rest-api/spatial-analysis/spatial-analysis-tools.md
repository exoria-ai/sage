# Spatial analysis service

> Source: [/rest/services-reference/enterprise/spatial-analysis/overview/spatial-analysis-tools/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/overview/spatial-analysis-tools/)

The spatial analysis service contains tasks that allow you to perform common spatial analyses on your hosted data. The available tasks are described in [Job requests](/rest/services-reference/enterprise/tasks-overview/). These tasks are available as tools in Map Viewer and ArcGIS API for Python. These tasks allow you to perform analysis on hosted layers as well as other layers they have access to.

To learn more about accessing these tasks using Map Viewer, see the [Perform analysis](https://enterprise.arcgis.com/en/portal/latest/use/perform-analysis-mv.htm) help topic or [ArcGIS API for Python](https://enterprise.arcgis.com/en/portal/latest/administer/windows/scripting-with-the-arcgis-python-api.htm) documentation. In some cases, the Spatial Analysis REST API has more functionality that is not exposed in Map Viewer or ArcGIS API for Python.

Using these tools in ArcGIS Online Map Viewer consumes credits. For more information on credits, see [Understand credits for spatial analysis](https://doc.arcgis.com/en/arcgis-online/analyze/credits-analysis-mv.htm).

You can programmatically access the spatial analysis service in the following ways:

-   Use ArcGIS API for Python—This is the recommended way to access the services using Python.
-   Access the REST endpoints through Python—[Programmatically accessing analysis services](/rest/services-reference/enterprise/programmatically-accessing-analysis-services/) shows you how to access these services using Python. This is recommended to access capabilities that aren't exposed in ArcGIS API for Python.
-   Access the service using JavaScript—See [Introduction to spatial analysis](/javascript/latest/spatial-analysis/spatial-analysis-intro/) in the ArcGIS Maps SDK for JavaScript.

## Licensing

To use the analysis tasks, the administrator of your organization needs to grant you certain [privileges](https://enterprise.arcgis.com/en/portal/latest/administer/windows/roles.htm). To use any of the analysis tools, you will need the Spatial Analysis privilege. If the output of your task is a hosted feature service, as opposed to a feature collection, you also need the two following privileges:

-   Create, update, and delete content
-   Publish hosted features

These privileges are available with a Creator, Professional, or Professional Plus user type and a Publisher or Administrator role. If you do not have these privileges, the Spatial Analysis toolbox will not be available.

Certain tasks need additional privileges such as the Network Analysis and GeoEnrichment privileges. If the task requires additional privileges, they are listed in the task documentation.

## Common patterns

The tasks in the spatial analysis service all share the following common pattern:

-   One or more of their input parameters are features. These features can come from a feature service, map service, or in the form of a feature collection. See [Feature input](/rest/services-reference/enterprise/feature-input-1/) for more information.
-   All the spatial analysis tasks create new data, as described in [Feature output](/rest/services-reference/enterprise/feature-output-1/). How the data is returned is controlled by the `outputName` parameter.
-   All tasks have a `context` parameter which controls certain aspects of task run. The [context](/rest/services-reference/enterprise/spatial-reference/) parameter has two properties: extent and output spatial reference.
-   All tasks run asynchronously. That is, when you submit a request, a unique job identifier is returned, which you can use to track progress and retrieve results. See [Check job status](/rest/services-reference/enterprise/checking-job-status-1/) for more information.