var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //Tells Mongoose to use global Promises

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true 
});
mongoose.set('useCreateIndex', true);


module.exports = {mongoose};