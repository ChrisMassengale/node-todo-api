var mongoose = require('mongoose');


mongoose.Promise = global.Promise;  //Tells Mongoose to use global Promises


mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',  {

  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }

});

// var newTodo = new Todo({
//   text: 'Cook Dinner',
//   completed: false
// });

// newTodo.save().then((document) => {
//   console.log('Saved Todo',document);
// }, (error) => {
//   console.log('Unable to Save ToDo!')
// });

// var anotherTodo = new Todo({
//   text: 'Eat Dinner',
// });

// anotherTodo.save().then((document) => {
//   console.log('Saved Todo',document);
// }, (error) => {
//   console.log('Unable to Save ToDo!');
// });


var User = mongoose.model('Users', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var user = new User({
  email: 'chris@aol.com'
});

user.save().then((document) => {
  console.log('Saved User', document)
}, (error) => {
  console.log('Unable to Save User');
});