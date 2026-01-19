# Job requests

> Source: [/rest/services-reference/enterprise/spatial-analysis/tasks/tasks-overview/](https://developers.arcgis.com/rest/services-reference/enterprise/spatial-analysis/tasks/tasks-overview/)

The Spatial analysis service contains a number of tasks that you can access and use in your applications. These tasks are arranged below into categories; the categories match those that appear in the **Analysis** pane in Map Viewer. The categories are simply logical groupings and do not affect how you access or use the tasks in any way.

#### Tasks that summarize data

| Tool name | Description |
|---|---|
| Aggregate Points | The Aggregate Points task works with a layer of point features and a layer of polygon features or bins. It first identifies which points fall within each polygon's area. After identifying this point-in-polygon spatial relationship, statistics for all points in the polygon are calculated and assigned to the area. The most basic statistic is the number of points within the polygon (count), but you can get other statistics as well. |
| Join Features | The Join Features task works with two layers and joins the attributes from one feature to another based on spatial and attribute relationships. |
| Summarize Center and Dispersion | The Summarize Center and Dispersion task finds central features and directional distributions. |
| Summarize Within | The Summarize Within task finds the point, line, or polygon features (or portions of these features) that are within the boundaries of polygons in another layer. |
| Summarize Nearby | The Summarize Nearby task finds features that are within a specified distance of features in the input layer. Distance can be measured as a straight-line distance or by a specified travel mode. Statistics are then calculated for the nearby features. |

#### Tasks that find locations

| Tool name | Description |
|---|---|
| Choose Best Facilities | The Choose Best Facilities task finds the set of facilities that will best serve demand from surrounding areas.Facilities might be public institutions that offer a service, such as fire stations, schools, or libraries, or they might be commercial ones such as drug stores or distribution centers for a parcel delivery service. Demand represents the need for a service that the facilities can meet. Demand is associated with point locations, with each location representing a given amount of demand. |
| Create Viewshed | The Create Viewshed task identifies visible areas based on the observer locations you provide. The results are areas where the observers can see the observed objects (and the observed objects can see the observers). |
| Create Watersheds | The Create Watersheds task determines the watershed, or upstream contributing area, for each point in your analysis layer. For example, suppose you have point features representing locations of waterborne contamination, and you want to find the likely sources of the contamination. Since the source of the contamination must be somewhere within the watershed upstream of the point, you would use this tool to define the watersheds containing the sources of the contaminant. |
| Derive New Locations | The Derive New Locations task creates new features from the input layers that meet a query you specify. A query is made up of one or more expressions. There are two types of expressions: attribute and spatial. An example of an attribute expression is that a parcel must be vacant, which is an attribute of the Parcels layer (where STATUS = 'VACANT'). An example of a spatial expression is that the parcel must also be within a certain distance of a river (Parcels within a distance of 0.75 Miles from Rivers). |
| Find Centroids | The Find Centroids task finds and generates points from the representative center (centroid) of each input multipoint, line, or area feature. Finding the centroid of a feature is common for many analytical workflows in which the resulting points can then be used in other analytic workflows. |
| Find Existing Locations | The Find Existing Locations task selects features in the input layer that meet a specified query. A query is composed of one or more expressions. There are two types of expressions: attribute and spatial. An example of an attribute expression is a parcel must be vacant, which is an attribute of the Parcels layer (where STATUS = 'VACANT'). An example of a spatial expression is the parcel must also be within a certain distance of a river (Parcels within a distance of 0.75 Miles from Rivers). |
| Find Similar Locations | The Find Similar Locations task measures the similarity of candidate locations to one or more reference locations. |
| Trace Downstream | The Trace Downstream task determines the trace, or flow path, in a downstream direction from the points in your analysis layer. |

#### Tasks that enrich data

| Tool name | Description |
|---|---|
| Enrich Layer | The Enrich Layer task enriches your data by getting facts about the people, places, and businesses that surround your data locations. |

#### Tasks that analyze patterns

| Tool name | Description |
|---|---|
| Calculate Composite Index | The Calculate Composite Index task combines multiple numeric variables to create a single index. |
| Calculate Density | The Calculate Density task creates a density map from point or line features by spreading known quantities of some phenomenon (represented as attributes of the points or lines) across the map. The result is a layer of areas classified from least dense to most dense. |
| Find Hot Spots | The Find Hot Spots task analyzes point data (such as crime incidents, traffic accidents, or trees) or field values associated with points or area features (such as the number of people in each census tract or the total sales for retail stores). It finds statistically significant spatial clusters of high values (hot spots) and low values (cold spots). For point data when no field is specified, hot spots are locations with lots of points and cold spots are locations with very few points. |
| Find Outliers | The Find Outliers task analyzes point data (such as crime incidents, traffic accidents, or trees) or field values associated with points or area features (such as the number of people in each census tract or the total sales for retail stores). It finds statistically significant spatial clusters of high values and low values and statistically significant high or low spatial outliers within those clusters. |
| Find Point Clusters | The Find Point Clusters` task finds clusters of point features within surrounding noise based on their spatial distribution. |
| Interpolate Points | The Interpolate Points task allows you to predict values at new locations based on measurements from a collection of points. The task takes point data with values at each point and returns areas classified by predicted values. |

#### Tasks that use proximity

| Tool name | Description |
|---|---|
| Connect Origins to Destinations | The Connect Origins to Destinations task measures the travel time or distance between pairs of points. |
| Create Buffers | The Create Buffers task creates polygons that cover a given distance from a point, line, or polygon feature. Buffers are typically used to create areas that can be further analyzed using a tool such as Overlay Layers. |
| Create Drive-Time Areas | The Create Drive-Time Areas task creates areas that can be reached within a given drive time or drive distance. |
| Create Threshold Areas | The Create Threshold Areas task creates rings or drive-time areas based on the value for a threshold variable such as population, income, or any demographic variable. |
| Find Nearest | The Find Nearest task measures the straight-line distance, driving distance, or driving time from features in the analysis layer to features in the near layer, and copies the nearest features in the near layer to a new layer. Connecting lines showing the measured path are returned as well. Find Nearest also reports the measurement and relative rank of each nearest feature. There are options to limit the number of nearest features to find or the search range in which to find them. |
| Plan Routes | The Plan Routes task determines how to efficiently divide tasks among a mobile workforce. |

#### Tasks that manage data

| Tool name | Description |
|---|---|
| Extract Data | The Extract Data task is used to extract data from one or more layers within a given extent. The extracted data format can be CSV, KML, a file geodatabase, or a shapefile. File geodatabases and shapefiles are added to a .zip file that can be downloaded. |
| Dissolve Boundaries | The Dissolve Boundaries task finds polygons that overlap or share a common boundary and merges them together to form a single polygon. |
| Field Calculator | The Field Calculator task updates values in one or more fields based on an expression you provide. The fields to update can be existing fields or a new fields that you create as part of the task request. The expression can use values from other fields. The result of this task is a new layer with all the fields from the input layer as well as any new fields you create. Field values are updated according to the expressions you provide. |
| Generate Tessellations | The Generate Tessellations task creates tessellations, or bins, determined by a specified extent, shape, and size. |
| Merge Layers | The Merge Layers task copies features from two layers into a new layer. The layers to be merged must all contain the same feature types (points, lines, or polygons). You can control how the fields from the input layers are joined and copied. |
| Overlay Layers | The Overlay Layers task combines two or more layers into a single layer. You can think of overlay as peering through a stack of maps and creating a single map containing all the information from the stack. Before the advent of GIS, cartographers would manually copy maps onto clear acetate sheets, overlay the sheets on a light table, and hand draw a new map from the overlaid data. Overlay is more than a merging of line work; all the attributes of the features in the overlay are carried through to the final product. Overlay is used to answer one of the most basic questions of geography: What is on top of what? |