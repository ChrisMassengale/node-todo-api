//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



//.connect(url, callback)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error) {
    return console.log('Unable to connect to MongoDB server!!');
  }

  console.log('Connected to MongoDB server')
 
  //findOneAndUpdate
  db.collection('Todos').findOneAndUpdate(
    {_id: new ObjectID('5b7ecec472ff721b1f0394bf')}, 
    { $set: {text: 'meet the neighbors'}},
    { returnOriginal: false}
  ).then((result) => console.log(result));

  //db.close(); //Will interupt deletions

});