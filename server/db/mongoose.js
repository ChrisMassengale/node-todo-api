var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //Tells Mongoose to use global Promises

mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};