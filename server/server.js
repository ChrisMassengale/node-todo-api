var mongoose = require('mongoose');


mongoose.Promise = global.Promise;  //Tells Mongoose to use global Promises


mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',  {

  text: {
    type: String

  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
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

var anotherTodo = new Todo({
  text: 'Make a little love',
  completed: true,
  completedAt: Date.now()
});

anotherTodo.save().then((document) => {
  console.log('Saved Todo',document);
}, (error) => {
  console.log('Unable to Save ToDo!')
});

//save something new