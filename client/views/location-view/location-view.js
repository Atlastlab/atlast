Template.locationView.rendered = function () {
  setTimeout(function () {
    $('.location-view').removeClass('slide-down')
  }, 100)
}

Template.locationView.events({
  "click .close-location-view": function (event, template) {

    var goOn = function () {
      $('.location-view').addClass('slide-down').one('transitionend', function () {
        Router.go('/')
      })
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

    return false

  }
})
