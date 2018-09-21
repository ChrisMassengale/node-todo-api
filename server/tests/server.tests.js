const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed')
const {User} = require('./../models/user');

beforeEach(populateUsers);
beforeEach(populateTodos);

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
    var myTodo = todos[0]._id.toHexString();
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

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {

    //Get an id from a todo
    //know if starts as true, and swap to false or visa/versa
    //confirm that the complete flag has changed, and if it goes to true, then confirm both that it is true && that completedAT is not null
    // and visa versa if changed to false, then completed should be false, and completedAt should be null

    let hexId = todos[1]._id.toHexString();
    let updatedText = "Updated Text"

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: updatedText,
        completed: true
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.todo.text).toBe(updatedText);
        expect(response.body.todo.completed).toBe(true);
        expect(response.body.todo.completedAt).toBeA('number');

        let d = new Date()
        let formattedDate = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString();
        
        let cad = new Date(response.body.todo.completedAt);
        
        let formattedCompletedAtDate = cad.getFullYear().toString() + cad.getMonth().toString() + cad.getDate().toString();

        expect(formattedCompletedAtDate).toBe(formattedDate);
      })
      .end(done)
  });

  it('should clear completedAt if the todo is not completed', (done) => {

    //Get an id from a todo
    //know if starts as true, and swap to false or visa/versa
    //confirm that the complete flag has changed, and if it goes to true, then confirm both that it is true && that completedAT is not null
    // and visa versa if changed to false, then completed should be false, and completedAt should be null

    let hexId = todos[2]._id.toHexString();
    let updatedText = "Updated Text"

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: updatedText,
        completed: false
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.todo.text).toBe(updatedText);
        expect(response.body.todo.completed).toBe(false);
        expect(response.body.todo.completedAt).toBe(null);

      })
      .end(done)
  });


});