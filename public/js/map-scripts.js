var
  initial_center = [-23.3463044, -51.1417142]
;

var rgb = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var google = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  maxZoom: 21,
  attribution: 'Google Maps'
});

// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
  center: initial_center,
  zoom: 16,
  zoomControl: false,
  attributionControl: false,
  layers: [google]
});

var baseMaps = {
  "Google Maps": google,
  "RGB": rgb,
};

L.control.layers(baseMaps).addTo(map);
L.control.attribution({ prefix: '<a href="https://leafletjs.com/">Leaflet</a>' }).addTo(map);
L.control.scale({ position: 'topleft' }).addTo(map);

var popup_options = { closeButton: false, closeOnClick: false, closeOnEscapeKey: false };
