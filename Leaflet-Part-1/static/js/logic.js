// debug
var bDebug = true;

// URL of the API endpoint to query
const USGS_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

if (bDebug) { console.log(USGS_URL); }

d3.json(USGS_URL).then((data) => {
    // test that the data loads
    if (bDebug) { console.log(data.features); }
});

