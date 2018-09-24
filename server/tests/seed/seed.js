const {ObjectID} = require('mongodb');

const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const todos = [ {_id: new ObjectID(), text: "Todo1"},
                {_id: new ObjectID(), text: "Todo2"},
                {_id: new ObjectID(), text: "Todo3", completed: true, completedAt: 333},
                {_id: new ObjectID(), text: "Todo4"},
                {_id: new ObjectID(), text: "Todo5"}];

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
                _id: userOneID, 
                email: 'andrew@example.com',
                password: 'userOnePass',
                tokens: [{
                  access: 'auth',
                  token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
                }]
              },{
                _id: userTwoID, 
                email: 'jen@example.com',
                password: 'userTwoPass'
              }]

const populateTodos = (done) => {
  Todo.deleteMany({}).then(() => {        //Removes todos
      return Todo.insertMany(todos);  //Add five todos - otherwise the GET /todos doesn't work great.
  }).then(() => done());  
};

const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    Promise.all([userOne, userTwo]).then(() => {
      done();
    })
  })
}

module.exports = {todos, populateTodos, users, populateUsers};