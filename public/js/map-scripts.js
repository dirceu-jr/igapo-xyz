var
  initial_center = [-23.3463044, -51.1417142],
  maxZoom = 17,
  common_attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  ;

var watercolor = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
  maxZoom: 16,
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
});

var terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
  maxZoom: 16,
  attribution: common_attribution
});

var toner = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  maxZoom: 16,
  attribution: common_attribution
});

// var rgb = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
// });

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
  "Terrain": terrain,
  "Toner": toner,
  "Watercolor": watercolor,
  // "RGB": rgb,
};

L.control.layers(baseMaps).addTo(map);
L.control.attribution({ prefix: '<a href="https://leafletjs.com/">Leaflet</a>' }).addTo(map);
L.control.scale({ position: 'topleft' }).addTo(map);

var popup_options = { closeButton: false, closeOnClick: false, closeOnEscapeKey: false };
var animation_timeout = 6000;

function start_animation() {
  L.popup(popup_options)
    .setLatLng(initial_center)
    .setContent("<div class='popup'>Ambiental</div>")
    .openOn(map);

  setTimeout(function () {
    var construction_center = [-23.3322167, -51.173735];

    map.flyTo(construction_center);

    L.popup(popup_options)
      .setLatLng(construction_center)
      .setContent("<div class='popup'>Construção</div>")
      .openOn(map);

    setTimeout(function () {
      var agro_center = [-23.337771, -51.200775];

      map.flyTo(agro_center, 15);

      L.popup(popup_options)
        .setLatLng(agro_center)
        .setContent("<div class='popup'>Agro</div>")
        .openOn(map);

      setTimeout(function () {
        var services_center = [-23.3683204, -51.0079171];

        map.flyTo(services_center, 13);

        L.popup(popup_options)
          .setLatLng(services_center)
          .setContent("<div class='popup'>Serviços</div>")
          .openOn(map);

        setTimeout(function () {
          map.flyTo(initial_center, 16);
          start_animation();
        }, animation_timeout);
      }, animation_timeout);
    }, animation_timeout);
  }, animation_timeout);
}

start_animation();
