AutoForm.addHooks(['location-add-form', 'location-edit-form'], {
  onSuccess: function(){
    Router.go('locations')
  }
})
