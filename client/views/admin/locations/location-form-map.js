Template.mapWidget = function () {

  var mapWidget = {
    init: function () {
      if (!$('#map').hasClass('leaflet-container')) {
        L.Icon.Default.imagePath = '/images'
        this.map = new L.Map('map').setView([51.505, -0.09], 13)
        this.mapLayer = L.tileLayer(AtlastInstance.mapUrl)
        this.map.addLayer(this.mapLayer)
        this.createLeafletDraw()
        this.map.addControl(this.drawControl)
        this.attachEvents()
      }
    },

    createLeafletDraw: function () {
      var values = AutoForm.getFormValues('location-edit-form')
      var jsonString = values.updateDoc.$set.geojson
      var GeoJSON

      this.drawnItems = new L.geoJson()


      if (jsonString) {
        GeoJSON = EJSON.parse(jsonString)
        this.drawnItems.addData(GeoJSON)
      }

      this.map.addLayer(this.drawnItems)
      this.drawControl = new L.Control.Draw()
    },

    attachEvents: function () {
      this.map.on('draw:created', function (e) {
        var type = e.layerType, layer = e.layer
        if (type === 'marker') {
          layer.bindPopup('A popup!')
        }
        mapWidget.drawnItems.addLayer(layer)
        mapWidget.saveObjectsIntoTextarea()
      })

      this.map.on('draw:edited', function (e) {
        var layers = e.layers
        var countOfEditedLayers = 0
        layers.eachLayer(function(layer) {
          countOfEditedLayers++
        })
      })
    },

    saveObjectsIntoTextarea: function () {
      var geoJSON = EJSON.stringify(this.drawnItems.toGeoJSON())
      $('[data-schema-key="geojson"]').val(geoJSON)
    }
  }

  mapWidget.init()
}
