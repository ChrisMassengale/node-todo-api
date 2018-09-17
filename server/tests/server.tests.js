const request = require('supertest');
const expect = require('expect');


const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const todos = [{text: "Todo1"},{text: "Todo2"},{text: "Todo3"},{text: "Todo4"},{text: "Todo5"}]
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