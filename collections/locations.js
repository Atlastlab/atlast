var Schemas = {}

Locations = new Mongo.Collection("locations")

var locationSchema = {
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  description: {
    type: String,
    label: "Description",
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
}

if (1 == 1) {
  locationSchema['images'] = {
    type: String,
    label: 'Images',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
      }
    }
  }
}

Schemas.Location = new SimpleSchema(locationSchema)

Locations.attachSchema(Schemas.Location)
