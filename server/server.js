require('./config/config');

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//AUTENTICATE
app.get('/users/me', authenticate, (request, response) => {
  response.send(request.user)
});


//USERS
//POST /USERS   #CREATE
app.post('/users', (request, response) =>{
  var body = _.pick(request.body, ['email', 'password']);  //lodash pick property
  var user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken();;
    })
    .then((token)=>{
      response.header('x-auth', token).send(user);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

//GET /USERS   #INDEX
app.get('/users', (request, response) => {
  User.find()
    .then((users) => {
      response.status(200).send({users});
    })
    .catch((error) => {
      response.status(400).send(error)
    })
});

//DELETE /USERS  #DELETE
app.delete('/users/:id', (request, response) => {
  let id =  request.params.id;

  if (!ObjectID.isValid(id)) {
    return response.status(404).send('404 Not found');
  }

  User.findByIdAndDelete(id).then((deletedUser) => {
    if(!deletedUser) {
      return response.status(404).send('404 Not found');
    }

    response.status(200).send({todo: deletedUser});

  }).catch( (error) => {
    response.status(400).send('400 Error line 71');
  });

});


//TODOS
//POST /TODOS   #CREATE
app.post('/todos', (request, response) => {

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

//GET /TODOS    #INDEX
app.get('/todos', (request, response) => {
  Todo.find().then((todos)=>{
    response.send({todos});
  },(e)=>{
    response.status(400).send(e);
  })
});

//GET /TODOS/:id   #SHOW
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

//DELETE /TODOS/:id   #DESTROY
app.delete('/todos/:id', (request, response) => {
  var id = request.params.id;

  if (!ObjectID.isValid(id)) {
    return response.status(404).send('404 Not found (line 67)');
  }

  Todo.findByIdAndDelete(id).then((deletedTodo) => {
    if(!deletedTodo) {
      return response.status(404).send('404 Not found (Line 72)');
    }

    response.status(200).send({todo: deletedTodo});

  }).catch( (err) => {
    response.status(400).send('400 Error line 71');
  });
});

//PATCH /TODOS/:id   #UPDATE
app.patch('/todos/:id', (request, response) => {

  var id = request.params.id;
  var body = _.pick(request.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return response.status(404).send('404 Not found (line 67)');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({ _id: id}, {
    $set: body
  }, {new: true}).then( (todo) => {
    if (!todo) {
      return response.status(404).send('404 Not Found (line 105')
    }

    response.status(200).send({todo});
  }).catch((e) => {
    response.status(400).send('400 Error line')
  });
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
});

module.exports = {app};
