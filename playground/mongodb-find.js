//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



//.connect(url, callback)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error) {
    return console.log('Unable to connect to MongoDB server!!');
  }

  console.log('Connected to MongoDB server')
 
  db.collection('Todos').find({_id: new ObjectID('5b7ec15b72ff721b1f039497')}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('Unable to fetch todos', error)
  });

  db.collection('Todos').find().count().then((count) => {
    console.log(`There are ${count} Todos`); 
  }, (error) => {
    console.log('Unable to fetch todos', error)
  });

  db.collection('Users').find({name: 'Chris'}).toArray().then((docs)=>{
    console.log(`Chris\'s ${docs.length} todos`);
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
      console.log('Unable to access Users Documents', error)
  });

  //db.close(); 

});