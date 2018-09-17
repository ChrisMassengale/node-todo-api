var mongoose = require('mongoose');
var {todoSchema} = require('./schemas/todo-schema')

var Todo = mongoose.model('Todo',  todoSchema);

module.exports = {Todo};