Template.map.rendered = function () {

  window.addEventListener("deviceorientation", function (event) {
    map.setBearing(event.alpha)
  }, true)

  mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGllbGtva2VlIiwiYSI6Ilk5QUppQXMifQ.A-pV1_4Mx4p_o94_QYGM6Q'

  map = new mapboxgl.Map({
    container: 'map',
    style: mapStyle,
    center: [52, 5],
    zoom: 6,
    hash: true
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
  })

  map.on('click', function(e) {
    map.featuresAt(e.point, {radius: 20}, function(err, features) {
      if (err) throw err

      if (features[0] && features[0].layer.id) {
        var path = '/locations/' + features[0].layer.id

        if (path != window.location.pathname) {

          var goOn = function () {
            if ($('.location-view').length) {
              $('.location-view').addClass('slide-down').one('transitionend', function () {
                Router.go(path)
              })
            }
            else {
              Router.go(path)
            }
          }

          if ($(window).scrollTop() != 0) {
            $('html, body').animate({
              scrollTop: 0
            }, 300, function () {
              goOn()
            })
          }
          else {
            goOn()
          }
        }
      }
    })
  })

}
