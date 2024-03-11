# Leaflet Challenge

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualise their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualise USGS data that will allow them to better educate the public and other government organisations (and hopefully secure more funding) on issues facing our planet.

## Deliverables

I've used https://mapbox.com in the project and an API key is required which doesn't cost money but requires an API_KEY which is in the config.js of each Leaflet-Part folder. The public key is free to use. This does use the https://openstreetmap.com maps.

**Part 1: Create the Earthquake Visualisation**

This part is in the Leaflet-Part-1 folder in the repository and is completely self-contained.

* A GEOJSON file is loaded from the USGS.GOV website using the D3 library.
* The file is then processed and displayed on an OpenStreetMap map using the Mapbox API using the Leaflet library.
* There are there are controls for zoom and to choose the different layers to display on the map.
* There is a legend to see the various magnitudes of the of the earthquakes.

![Image of world map showing various earthquakes](/images/map-1.png "Map of part 1 of the challenge")

The following shows what happens when an earthquake area is clicked:

![Image of world map showing what happens when an earthquake area is clicked](/images/map-1-click.png "Map of part 1 of the challenge")

**Part 2: Gather and Plot More Data (Optional with no extra points earning)**

This part is in the Leaflet-Part-2 folder in the repository and is completely self-contained.

* A copy of part 1.
* Loaded a GEOJSON taken from https://github.com/fraxen/tectonicplates showing the tectonic plates
* Added an option to change the visibility of the layer.

![Image of world map showing various earthquakes](/images/map-2.png "Map of part 2 of the challenge")

The following shows what happens when an tectonic plate area is clicked:

![Image of world map showing what happens when an earthquake area is clicked](/images/map-2-click.png "Map of part 1 of the challenge")

---
Student Tyson Horsewell
