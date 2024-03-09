// debug
var bDebug = true;

// URL of the API endpoint to query
const USGS_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// This requires an access token from mapbox.com as the API_KEY to work

if (bDebug) { console.log(USGS_URL); }

d3.json(USGS_URL).then((data) => {
    // test that the data loads
    if (bDebug) { console.log(data.features); }

    processFeatures(data.features);
});

// Determine sizes for each markers on the map
function size(magnitude) {
    return magnitude * 40000;
}

// Loop thru the features and create one marker for each place object
function colors(magnitude) {
    var color = "";
    if (magnitude <= 1) {
        return color = "#83FF00";
    }
    else if (magnitude <= 2) {
        return color = "#FFEC00";
    }
    else if (magnitude <= 3) {
        return color = "#ffbf00";
    }
    else if (magnitude <= 4) {
        return color = "#ff8000";
    }
    else if (magnitude <= 5) {
        return color = "#FF4600";
    }
    else if (magnitude > 5) {
        return color = "#FF0000";
    }
    else {
        return color = "#ff00bf";
    }
}

function processFeatures(data) {

    if (bDebug) {
        // Check on coordinates and magnitude data 
        console.log(data[0].geometry.coordinates[1]);
        console.log(data[0].geometry.coordinates[0]);
        console.log(data[0].properties.mag);
    }

    // Define a function that will show the information for each feature
    function onFeatureDisplay(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
            "<hr> <p> Earthquake Magnitude: " + feature.properties.mag + "</p>"
        )
    }

    var earthquakeData = L.geoJSON(data, {

        onEachFeature: onFeatureDisplay,

        // Create a GeoJSON layer containing the features array on the earthquakeData object
        // Run the onEachFeature function once for each piece of data in the array
        pointToLayer: function (feature, coordinates) {
            // Determine Marker Colors, Size, and Opacity for each earthquake.
            var geoMarkers = {
                radius: size(feature.properties.mag),
                fillColor: colors(feature.properties.mag),
                fillOpacity: 0.30,
                stroke: true,
                weight: 1
            }
            return L.circle(coordinates, geoMarkers);
        }
    });


    createMap(earthquakeData)
}

function createMap(earthquakeData) {

    // Define streetmap layer
    var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });


    var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Outdoor Map": streetMap,
        "Grayscale Map": grayscaleMap,
        "Dark Map": darkMap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakeData
    };


    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var displayMap = L.map("map", {
        center: [
            20.09, 95.71
        ],
        zoom: 3,
        layers: [streetMap, earthquakeData]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(displayMap);


  // Create a legend to display info about our map
  var legend = L.control({ 
    position: 'bottomright' 
  });

  // When the layer control is added, insert a div with the class of "info legend"
  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        magnitude = [0, 1, 2, 3, 4, 5];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitude.length; i++) {
      div.innerHTML +=
        '<span style="background:' + colors(magnitude[i] + 1) + '"></span> ' +
        magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }

    return div;
  };

  // Add the info legend to the map.
  legend.addTo(displayMap);
}