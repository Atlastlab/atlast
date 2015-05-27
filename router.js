Router.route('/', function () {
  this.render('Home', {
  })
}, {
  name: 'home'
})

Router.route('/admin/locations', function () {
  this.render('locations', {
    data: {
      locations: function () {
        return Locations.find()
      }
    }
  })
}, {
  name: 'locations'
})

Router.route('/admin/locations/add', function () {
  this.render('location-add')
}, {
  name: 'location.add'
})

Router.route('/admin/locations/:_id/edit', function () {
  this.render('location-edit', {
    data: {
      location: Locations.findOne({_id: this.params._id})
    }
  })
}, {
  name: 'location.edit'
})
