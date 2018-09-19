const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const todos = [ {_id: new ObjectID(), text: "Todo1"},
                {_id: new ObjectID(), text: "Todo2"},
                {_id: new ObjectID(), text: "Todo3"},
                {_id: new ObjectID(), text: "Todo4"},
                {_id: new ObjectID(), text: "Todo5"}];
beforeEach((done) => {
  Todo.remove({}).then(() => {        //Removes todos
      return Todo.insertMany(todos);  //Add five todos - otherwise the GET /todos doesn't work great.
  }).then(() => done());  
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Most Recent Todo';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((response) => {
        expect(response.body.text).toBe(text);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(6);
          expect(todos[5].text).toBe(text);
          done();
        }).catch((error) => done(error));
      });
  });

  it('should not create a new todo with invalid body data',(done) => {
    
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end ((error, response) => {
        if(error){
          return done(error);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(5);
          done()
        }).catch((error) => done(error));
      });
  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((response) => {
        expect(response.body.todos.length).toBe(5);
      })
      .end(done);
  });
});



describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    var myTodo = todos[0]._id.toHexString()
    request(app)
      .get(`/todos/${myTodo}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if invalid ObjectID', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if not found', (done) => {
    var hexId = new ObjectID().toHexString(); //no record

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });  
});

describe('DELETE /todos/:id', () => {
  it('should return deleted doc', (done) => {
    var hexId = todos[1]._id.toHexString()
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.todo._id).toBe(hexId);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((error) => {done(error)});
      });
  });

  it('should return a 404 if invalid ObjectID', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if not found', (done) => {
    var hexId = new ObjectID().toHexString(); //no record

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });  
});