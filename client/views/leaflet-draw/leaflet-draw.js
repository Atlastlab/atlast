AutoForm.addInputType("leaflet-draw", {
  template: "leafletDraw",
  valueOut: function () {
    return this.val()
  }
})

Template.leafletDraw.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts)
    return atts
  }
})

Template.leafletDraw.rendered = function () {
  var that = this
  var $input = this.$('input')
  var data = this.data
  var id = $input.attr('id')
  var mapId = id + '-map'
  var GeoJSON

  this.$('.map').attr('id', mapId)

  L.Icon.Default.imagePath = '/images'
  this.map = new L.Map(mapId).setView([52, 5], 7)
  this.mapLayer = L.tileLayer(AtlastInstance.mapUrl)
  this.map.addLayer(this.mapLayer)
  this.drawnItems = new L.geoJson()

  this.map.addLayer(this.drawnItems)
  this.drawControl = new L.Control.Draw({
    position: 'topright',
    draw: {
      polyline: false,
      polygon: false,
      circle: false,
      rectangle: false
    },
    edit: {
      featureGroup: this.drawnItems,
      remove: true
    }
  });

  this.map.addControl(this.drawControl)

  this.map.on('draw:created', function (e) {
    var type = e.layerType, layer = e.layer
    that.drawnItems.addLayer(layer)
    var geoJSON = EJSON.stringify(that.drawnItems.toGeoJSON())
    that.$('input').val(geoJSON)
  })

  this.autorun(function () {
    var data = Template.currentData()

    if (data.value && !GeoJSON) {
      GeoJSON = EJSON.parse(data.value)

      if (GeoJSON) {
        that.drawnItems.addData(GeoJSON)
      }
    }
  })
}

Template.leafletDraw.destroyed = function () {
  this.$('.map').remove()
};
