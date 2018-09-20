const jwt = require('jsonwebtoken');
var validator = require('validator')
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});


userSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();

  console.log(`tokenInit: ${token}`)

  user.tokens.push({
    access,
    token
  })
  user.save().then(() => {
    console.log(`tokenreturned: ${token}`)
    return token;
  });
};

module.exports = {userSchema};