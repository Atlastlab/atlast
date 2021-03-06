Router.configure({
  layoutTemplate: 'adminLayout'
})

Router.route('/', function () {
  this.layout('AppLayout')
  this.render('Home', {
  })
}, {
  title: 'Home',
  name: 'home'
})

Router.route('/admin', function () {
  this.render('admin', {
  })
}, {
  title: 'Admin',
  name: 'admin',
  parent: 'home'
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
  title: 'Locations',
  name: 'locations',
  parent: 'admin'
})

Router.route('/locations/:_id', function () {
  this.layout('AppLayout')

  this.render('location-view', {
    data: {
      location: Locations.findOne({_id: this.params._id})
    }
  })
}, {
  title: 'View location',
  name: 'location.view',
  parent: 'home'
})

Router.route('/admin/locations/add', function () {
  this.render('location-add')
}, {
  title: 'Add location',
  name: 'location.add',
  parent: 'locations'
})


Router.route('/admin/locations/:_id/edit', {
  loadingTemplate: 'loading',
  waitOn: function () {
     return [Meteor.subscribe('images')]
  },
  action: function () {
    this.render('location-edit', {
      data: {
        location: Locations.findOne({_id: this.params._id})
      }
    })
  },
  title: 'Edit location',
  name: 'location.edit',
  parent: 'locations'
})

Router.configure({
  onAfterAction: function() {
    $('.location-view').removeClass('slide-down')
  }
});
