Template.map.rendered = function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGllbGtva2VlIiwiYSI6Ilk5QUppQXMifQ.A-pV1_4Mx4p_o94_QYGM6Q';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json', //stylesheet location
    center: [52, 5],
    zoom: 6
  })

  map.on('style.load', function() {
    var query = Locations.find()

    query.observe({
      added: function (location) {
        var geojson = EJSON.parse(location.geojson)

        if (geojson) {

          map.addSource(location._id, {
            "type": "geojson",
            "data": geojson
          })

          map.addLayer({
            "id": location._id,
            "type": "symbol",
            "source": location._id,
            "layout": {
              "icon-image": "{marker-symbol}-12",
              "text-field": "{title}",
              "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
              "text-offset": [0, 0.6],
              "text-anchor": "top"
            },
            "paint": {
              "text-size": 12
            }
          })

        }
      }
    })
  })
}
