Meteor.publish(null, function () {
  return Locations.find()
})

Meteor.publish('images', function() {
  return Images.find()
})
