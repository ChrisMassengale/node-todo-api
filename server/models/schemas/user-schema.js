const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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


userSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, 
      (error, salt) => {
        bcrypt.hash(user.password, salt, 
          (err, hash) => {
            user.password = hash;
            next()
          }
        )
      })
  } else {
    next();
  }
});

userSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({email})
    .then((user) => {
      if(!user) {
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (error , result) => {
          if (result) {
            resolve(user);
          } else {
            reject();
          }
        })
      });
    }) //if not found, ask to login: If found, confirm password
}

userSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

userSchema.statics.findByToken = function(token){
  var User = this;  //statics use capital, as this is method for the 'Model' not a 
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET) //secret (or salt currently hardcoded)
    
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
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

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