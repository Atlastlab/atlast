var Schemas = {}

Locations = new Mongo.Collection("locations")

Schemas.Location = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  geojson: {
    type: String,
    label: "GeoJSON",
    autoform: {
      afFieldInput: {
        type: "leaflet-draw"
      }
    }
  }
})

Locations.attachSchema(Schemas.Location)
