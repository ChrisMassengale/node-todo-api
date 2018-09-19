const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
//var id = '5ba00bdf28ab7e9d1774411f'; // valid at time of creation
//var id = '6ba00bdf28ab7e9d1774411f'; //doesn't exist
// var id = '5ba00bdf28ab7e9d1774411f1'; //totally invalid

//NOTE: .remove deprecated now is deleteOne or DeleteMany
// Todo.remove({}).then((result) => {
//   console.log(result);
// }); //Note: Deprecated use deleteOne, deleteMany or bulkWRit

//Todo.findByIdAndRemove, now findByIdAndDelete
// Todo.findByIdAndDelete
// });

//Todo.findOneAndRemove, no findOneAndDelete
Todo.findOneAndRemove({text: "Todo3"}).then((todo) => {
  console.log(todo)
});

//deletes anything that has /Todo/
Todo.deleteMany({text: /Todo/}).then((result) => {
  console.log(result)
});
