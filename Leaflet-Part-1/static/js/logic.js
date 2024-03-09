// debug
var bDebug = true;

// URL of the API endpoint to query
const USGS_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

if (bDebug) { console.log(USGS_URL); }

d3.json(USGS_URL).then((data) => {
    // test that the data loads
    if (bDebug) { console.log(data.features); }

    processFeatures(data.features);
});

function processFeatures(data) {

    if (bDebug) {
        // Check on coordinates and magnitude data 
        console.log(data[0].geometry.coordinates[1]);
        console.log(data[0].geometry.coordinates[0]);
        console.log(data[0].properties.mag);
    }


    createMap(data)
}

function createMap(data) {

    // Define streetmap layer
    var outdoormap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [outdoormap]
    });
}