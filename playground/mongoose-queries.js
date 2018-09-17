const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
//var id = '5ba00bdf28ab7e9d1774411f'; // valid at time of creation
//var id = '6ba00bdf28ab7e9d1774411f'; //doesn't exist
// var id = '5ba00bdf28ab7e9d1774411f1'; //totally invalid


var userId = '5b7f0d66cb33f66e831e9d9b';

User.findById(userId).then((user)=>{
  if (!user) {
    return console.log('User Not fucking found douchebag');
  }
  console.log("User:", JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
// if (!ObjectID.isValid(id)) {
//   console.log('FUCKING BAD ID');
// }
// Todo.find().then((allTodos) => { 
//   console.log('All Todos:', allTodos);
// });

// Todo.find({
//   _id: id  //OKAY IN MONGOOSE
// }).then((specificTodos) => { 
//   console.log('Todos:', specificTodos);
// });

// Todo.findOne({
//   _id: id  //OKAY IN MONGOOSE
// }).then((todo) => { 
//   console.log('Todo:', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo by ID:', todo);
// }).catch((e) => console.log(e));

