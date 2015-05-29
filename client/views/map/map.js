Template.map.rendered = function () {

  mapboxgl.util.getJSON('https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json', function (err, style) {
    if (err) throw err

    style.layers.forEach(function(layer) {
      // layer.interactive = true;
    })

    mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGllbGtva2VlIiwiYSI6Ilk5QUppQXMifQ.A-pV1_4Mx4p_o94_QYGM6Q';
    var map = new mapboxgl.Map({
      container: 'map',
      style: style,
      center: [52, 5],
      zoom: 6,
      hash: true
    })

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
            "interactive": true,
            "source": location._id,
            "layout": {
              "line-join": "round",
              "line-cap": "round",
              "icon-image": "heart-12",
              "text-field": location.title,
              "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
              "text-offset": [0, 0.6],
              "text-anchor": "top"
            },
            "paint": {
              "line-color": "#888",
              "line-width": 8,
              "text-size": 12,
            }
          })

        }
      }
    })

    map.on('click', function(e) {
        map.featuresAt(e.point, {radius: 5}, function(err, features) {
            if (err) throw err
            console.log(JSON.stringify(features, null, 2))
        })
    })
  })
}
