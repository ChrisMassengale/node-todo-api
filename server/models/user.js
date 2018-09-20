var mongoose = require('mongoose');

var {userSchema} = require('./schemas/user-schema')

var User = mongoose.model('Users', userSchema);

module.exports = {User};

