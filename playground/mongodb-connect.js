//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// Object Destructuring Example - ES 6
// var user = {name: 'Andrew', age: 25}
// var {name} = user;
// console.log(name);

//.connect(url, callback)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {//if use Mongo 3.o must use 'client' instead of 'db' in callback function
  if(error) {
    return console.log('Unable to connect to MongoDB server!!');
  }

  console.log('Connected to MongoDB server')
  //const db = client.db('TodoApp');  //ADD (for Mongo V3)>  

  // db.collection('Todos').insertOne({
  //   text: 'Something to Do',
  //   completed: false
  // } , (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert todo', error)
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Chris',
    age: 51,
    location: 'Rehoboth Beach, DE'
  }, (error, result) =>{
    if(error) {
      return console.log("Unable to Add a User", error);
    }

    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined, 2));
  });

  db.close(); //client.close()  //Use teh client.close() for MongoDb v3

});