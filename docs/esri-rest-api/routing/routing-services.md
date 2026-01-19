# Overview of routing service

> Source: [/rest/services-reference/enterprise/routing/routing-services/](https://developers.arcgis.com/rest/services-reference/enterprise/routing/routing-services/)

Routing services allow you to perform analysis on transportation networks, such as finding the best route across a city, finding the closest emergency vehicle or facility, identifying a service area around a location, or servicing a set of orders with a fleet of vehicles. If you have used [ArcGIS Pro](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/what-is-network-analyst-.htm) to perform analysis on a street network, routing services allow you to perform similar analysis using web services running on your ArcGIS Server site.

There are eight types of analysis that can be performed using the routing services. Each type is available as a service and can be accessed using a unique REST endpoint for the service.

### Route service

The Route service can be used to find the best way to get from one location to another or to visit several locations.

The best route can be the quickest route for a given time of day considering the traffic conditions during that time, or it can be the shortest route that minimizes the travel distance. The Route service can also find the best route that visits each stop during permitted time windows you specify. If you have more than two stops to visit, the best route can be determined for the fixed order of locations you specify. This is called a simple route. Alternatively, the Route service can determine the best sequence in which to visit the locations (the traveling salesman problem). This is called an optimized route.

### Closest facility service

Finding the closest hospital to an accident, the closest police cars to a crime scene, and the closest store to a customer's address are examples of problems that can be solved using the Closest facility service.

When finding the closest facilities, you can specify how many to find and whether the direction of travel is toward or away from them. Once you've found the closest facilities, you can display the best route to or from them and include the travel time, travel distance, and driving directions to each facility.

The service can use current traffic conditions when determining the best routes. You can also specify an impedance cutoff beyond which the service will not search for a facility. For instance, you can set up a Closest facility service to search for hospitals within a 15-minute drive time of the site of an accident. Any hospitals that take longer than 15 minutes to reach will not be included in the results. The hospitals are referred to as facilities, and the accident is referred to as an incident. The service allows you to perform multiple closest facility analyses simultaneously. This means you can have multiple incidents and find the closest facility or facilities to each incident.

### Service area service

With the Service area service, you can find the area that can be reached from the input location within a given travel time or travel distance. A service area is the area that encompasses all streets that can be accessed within a given distance or travel time from one or more locations, referred to as facilities. Service areas are generally used to visualize and measure the accessibility of facilities.

For example, a three-minute drive-time polygon around a grocery store can determine which residents can reach the store within three minutes and are thus more likely to shop there. The service can also create multiple concentric service areas around one or more facilities that can show how accessibility changes with an increase in travel time or travel distance. It can be used, for example, to determine how many hospitals are within 5-, 10-, and 15-minute drive times of schools. When creating service areas based on travel times, the service can use traffic data, which can influence the area that can be reached during different times of the day.

### Vehicle routing problem service

Vehicle Routing Problem service can be used in determining the most effective routes for a set of vehicles that need to visit a set of locations. It creates the overall minimum transportation cost.

Various organizations service orders with a fleet of vehicles. For example, a large furniture store might use several trucks to deliver furniture to homes. A specialized grease recycling company might route trucks from a facility to pick up used grease from restaurants. A health department might schedule daily inspection visits for each of its health inspectors. The problem that is common to these examples is the fleet routing. Each organization needs to determine which orders (homes, restaurants, or inspection sites) should be serviced by each route (truck or inspector) and in what sequence the orders should be visited. The primary goal is to best service the orders and minimize the overall operating cost for the fleet of vehicles. The fleet routing service can be used to determine solutions for such complex fleet management tasks. In addition, the service can solve more specific problems because numerous options are available, such as matching vehicle capacities with order quantities, providing a high level of customer service by honoring any time windows on orders, giving breaks to drivers, and pairing orders so they are serviced by the same route.

Consider an example of delivering goods to grocery stores from a central warehouse location. A fleet of three trucks is available at the warehouse. The warehouse operates only within a certain time window—from 8:00 a.m. to 5:00 p.m.—during which all trucks must return back to the warehouse. Each truck has a capacity of 15,000 pounds, which limits the amount of goods it can carry. Each store has a demand for a specific amount of goods (in pounds) that needs to be delivered, and each store has time windows that confine when deliveries should be made. Furthermore, the driver can work only eight hours per day, requires a break for lunch, and is paid for the amount of time spent on driving and servicing the stores. The service can be used to determine an itinerary for each route such that the deliveries can be made while honoring all the vehicle and order requirements and minimizing the total time spent on a particular route by the driver.

### Location-allocation service

Location-allocation helps you choose which facilities from a set of facilities to operate based on their potential interaction with demand points.

Location-allocation can help you answer questions like the following:

-   Given a set of existing fire stations, which site for a new fire station would provide the best response times for the community?
-   If a retail company has to downsize, which stores should it close to maintain the most overall demand?
-   Where should a factory be built to minimize the distance to distribution centers?

In these examples, facilities would represent the fire stations, retail stores, and factories; demand points would represent buildings, customers, and distribution centers.

The objective may be to minimize the overall distance between demand points and facilities, maximize the number of demand points covered within a certain distance of facilities, maximize an apportioned amount of demand that decays with increasing distance from a facility, or maximize the amount of demand captured in an environment of friendly and competing facilities.

### Travel cost matrix service

Use the travel cost matrix service to create an origin-destination (OD) cost matrix from multiple origins to multiple destinations. A travel cost matrix is a table that contains the cost, such as the travel time or travel distance, from every origin to every destination. It also ranks the destinations that each origin connects to in ascending order based on the minimum cost required to travel from that origin to each destination. When generating a travel cost matrix, you can specify the maximum number of destinations to find for each origin and the maximum time or distance to travel when searching for destinations.

The results from the travel cost matrix service often become input for other spatial analyses when the cost to travel on the street network is more appropriate than straight-line cost. For example, predicting the movement of people in a city is better modeled with costs based on street networks, since people tend to travel on roads and pedestrian paths.

The travel time, distance, or both for each origin-destination pair is stored in the output matrix (default) or as part of the attributes of the output lines, which can have no shapes or a straight-line shape. Even though the lines are straight, they always store the travel time and travel distance based on the street network, not based on Euclidean distance.

### Last mile delivery service

The Last Mile Delivery service is a use case specific Vehicle Routing Problem (VRP) algorithm designed for a fleet of vehicles that are delivering packages to the final customers.

For example, this can be used for a single distribution center or store delivering to the final customer location and can be quite dense delivering to a few customers on most streets, but it is not intended to visit every house on every street.

Delivery companies need to determine which orders (package delivery location) should be serviced by each route (delivery vehicle and driver) and in what sequence the orders should be visited. The primary goal is to best service the orders by producing geographically clustered routes so the drivers can easily deliver to everyone and minimize the overall operating cost for the fleet of vehicles.

The Network Analyst Route service finds the best route for a single vehicle to visit many stops where as the Last Mile Delivery service and the Vehicle Routing Problem service both find the best routes for a fleet of vehicles to service many orders. The Vehicle Routing Problem service has lots of flexibility and can model many different constraints but the algorithm is also limited by this flexibility. The Last Mile Delivery service supports a subset of the constraints, but for the ones it does support, it can provide a better quality and higher performing algorithm.

### Snap to roads service

The Snap to Roads service can be used to snap a series of GPS track points to the underlying roads. You can return just the snapped points, or lines representing the roads that were traversed. In addition to the geometry, you can have the service return attributes of the roads like the posted speed limit and length in case you need this to perform route adherence.

## Request types

A routing service can support direct request and job request. The type of request made defines how the application using the service interacts with the service and gets the result. When making a direct request, the application must wait for the request to finish and get the results. This type of request is well-suited for requests that complete quickly (under 10 seconds). When using the job request, the client must periodically check whether the service has finished execution and, once completed, get the result. While the service is executing, the application is available to do other things. This type of request is well-suited for requests that take a long time to complete because it allows you to continue to interact with the application while the results are generated. Another advantage of the job request for long running requests is that the application does not need to keep a connection open with the web server in your ArcGIS Server site while the request is being processed. This can prevent web server timeouts that can occur with long-running direct requests.

A routing service for an analysis type supports the same functionality regardless of the request type. However, the request URL and the parameter names supported by the service are different based on the request type. Certain network analysis types support both direct and job request while some support only job request.

The table below summarizes the execution mode available for each analysis type and links to detailed API reference for the routing services.

#### Execution modes for various routing services

| Analysis type | Direct request | Job request |
|---|---|---|
| Route | YesLearn more about the direct request | YesLearn more about the job request |
| Closest facility routing | YesLearn more about the direct request | YesLearn more about the job request |
| Service area | YesLearn more about the direct request | YesLearn more about the job request |
| Vehicle routing problem | YesLearn more about the direct request | YesLearn more about the job request |
| Location-Allocation | No | YesLearn more about the job request |
| Travel cost matrix | YesLearn more about the direct request | YesLearn more about the job request |
| Last mile delivery | No | YesLearn more about the job request |
| Snap to roads | Yes | NoLearn more about the direct request |

## Publish routing services

To use the routing services from their REST endpoints, you must first publish the services to an ArcGIS Server site in your ArcGIS Enterprise deployment. The routing services need a [network dataset](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/what-is-network-dataset-.htm) that defines the data model for your transportation network on which the analysis is performed. Once you have a network dataset, you can publish the routing services to an ArcGIS Server site.

Learn more about [Publish Routing Services](https://enterprise.arcgis.com/en/server/latest/publish-services/windows/publish-routing-services.htm).