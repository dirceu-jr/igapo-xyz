// vilinha
var
  initial_center = [-25.4152895, -49.1974916]
;

// MapTiler layer
var maptiler = L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=uGUO4ZzGQ9RxDI5Peixt', {
  tileSize: 512,
  zoomOffset: -1,
  minZoom: 3,
  maxZoom: 19,
  attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
  crossOrigin: true
});

// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
  center: initial_center,
  zoom: 11,
  zoomControl: false,
  attributionControl: false,
  layers: [maptiler]
});

L.control.attribution({ prefix: '<a href="https://leafletjs.com/">Leaflet</a>' }).addTo(map);
L.control.scale({ position: 'topleft' }).addTo(map);

// first station
var marker1 = L.marker([-25.4159248, -49.2068979]).addTo(map);
marker1.bindPopup("<div id='pop1'>Carregando...</div>", {
  minWidth: 240
});

marker1.on("popupopen", function() {
  $.ajax({
    url: "https://api.purpleair.com/v1/sensors/165563",
    method: 'GET',
    headers: {
      "X-API-Key": "72D9911B-46F6-11EF-95CB-42010A80000E"
    },
    success: function (data) {
      var celsius = (data.sensor.temperature - 32) * 5 / 9;
      $("#pop1").html(
        "<strong>Estação de Qualidade do Ar (" + data.sensor.name + " - " + data.sensor.model + ")</strong><br>" +
        "Humidade: " + data.sensor.humidity + "<br>" +
        "Pressão: " + data.sensor.pressure + "<br>" +
        "Temperatura: " + celsius.toFixed(1) + "°<br>" +
        "PM1.0: " + data.sensor["pm1.0"] + "<br>" +
        "PM2.5: " + data.sensor["pm2.5"] + "<br>" +
        "PM10.0: " + data.sensor["pm10.0"]
      );
    }
  });
  
});

// grey icon
var greyIcon = new L.Icon({
  iconUrl: "../images/marker-icon-2x-grey.png",
  shadowUrl: "../images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// planed stations
// Av. Maringa
var marker2 = L.marker([-25.4323968, -49.1933856], { icon: greyIcon }).addTo(map);
marker2.bindPopup("<div id='pop2'><strong>Futura Estação de Qualidade do Ar</strong></div>", {
  minWidth: 240
});

// Eco Barreira
var marker3 = L.marker([-25.3589904, -49.2238211], { icon: greyIcon }).addTo(map);
marker3.bindPopup("<div id='pop3'><strong>Futura Estação de Qualidade da Água</strong></div>", {
  minWidth: 240
});

// Lago Igapó Água
var marker4 = L.marker([-23.3274784, -51.171983], { icon: greyIcon }).addTo(map);
marker4.bindPopup("<div id='pop4'><strong>Futura Estação de Qualidade da Água</strong></div>", {
  minWidth: 240
});

// Lago Igapó Ar
var marker5 = L.marker([-23.3307082, -51.1703002], { icon: greyIcon }).addTo(map);
marker5.bindPopup("<div id='pop5'><strong>Futura Estação de Qualidade do Ar</strong></div>", {
  minWidth: 240
});

// Av. das Maritacas
var marker6 = L.marker([-23.284992, -51.109484], { icon: greyIcon }).addTo(map);
marker6.bindPopup("<div id='pop5'><strong>Futura Estação de Qualidade da Água</strong></div>", {
  minWidth: 240
});
