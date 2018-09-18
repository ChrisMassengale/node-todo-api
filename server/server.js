var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.port || 3000;

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

//individual Todo -->  GET /todo/:id
app.get('/todos/:id', (request, response) => {
    var id = request.params.id;

    //IsValid
    //false - 404 - send back empty
    if (!ObjectID.isValid(id)) {
      return response.status(404).send('404 Not Found (Line 45)');
    }
 
    Todo.findById(id).then((todo)=>{
        if (!todo) {
          return response.status(404).send('404 Not Found (Line 50)');
        }
        response.status(200).send({todo});
      }).catch((e) => {
        response.status(400).send('400 Error (Line 54)');
      });
    //findById
      //success - send todo
      // if no todo - send back 404 with empth body
      //fail = 400 - send empty body back empty
});


app.listen(port, () => {
  console.log(`started on port ${port}`);
});

module.exports = {app};
