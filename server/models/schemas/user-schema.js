const jwt = require('jsonwebtoken');
const _ = require('lodash');
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

userSchema.statics.findByToken = function(token){
  var User = this;  //statics use capital, as this is method for the 'Model' not a 
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123') //secret (or salt currently hardcoded)
  } catch(e) {
      return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

userSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

userSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();

  user.tokens.push({
    access,
    token
  })

  var tempToken = user.save().then(() => {
    return token;
  });
  return tempToken;
};

module.exports = {userSchema};