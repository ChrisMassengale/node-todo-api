var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//create todos
app.post('/todos', (request, response) => {
  //console.log("TEXT:", request.body);

  var todo = new Todo({
    text: request.body.text,
  });

  todo.save().then((document) => {
    response.send(document);
  },
  (error) => {
    response.status(400).send(error);
  });
});

//list todos
app.get('/todos', (request, response) => {
  Todo.find().then((todos)=>{
    response.send({todos});
  },(e)=>{
    response.status(400).send(e);
  })
});

app.listen(3000, () => {
  console.log('started on port 3000');
});

module.exports = {app};
