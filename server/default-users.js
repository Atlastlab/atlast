var users = [
  {
    name:"Henk Jansen",
    password: 'password',
    email:"daniel.beeke+henk@gmail.com",
    roles:[]
  },
  {
    name:"Root",
    password:"root",
    email:"root@atlastlab.com",
    roles:['admin']
  }
]

_.each(users, function (user) {
  var id

  if (Meteor.users.find({ "emails.address" : user.email }).count() === 0) {
    id = Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }
  }

})
