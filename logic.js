var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;



// Create the createMap function
var myMap = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12
});

// Create the tile layer that will be the background of our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


// Create a baseMaps object to hold the lightmap layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

// Create an overlayMaps object to hold the bikeStations layer
var bikeStations = L.layerGroup(bikeStations);

// Create the map object with options
var baseMaps = {
  "streetMap": streetmap
};

var overlayMaps = {
  "bikeStations": bikeStations
};

// Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


var link = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(link, function (data) {
  console.log(data)
  data.data.stations.forEach(function (station) {
    L.marker([station.lat, station.lon], {
      stroke: false,
      fillOpacity: 0.1,
      color: "blue",
      fillColor: "white"

    }).bindPopup("<h1>" + station.name + "</h1> <hr> <h2>" + " Capacity: " + station.capacity + "</h2>")

      .addTo(myMap)
  })
});
