//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



//.connect(url, callback)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error) {
    return console.log('Unable to connect to MongoDB server!!');
  }

  console.log('Connected to MongoDB server')
 
  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate(
  //   {_id: new ObjectID('5b7ecec472ff721b1f0394bf')}, 
  //   { $set: {text: 'meet the neighbors'}},
  //   { returnOriginal: false}
  // ).then((result) => console.log(result));

  //Try with Users table -  in the challenge use $inc to increase age by 1 year
  db.collection('Users').findOneAndUpdate(
      {_id: new ObjectID('5b7efb8572ff721b1f0394e4')},  //Obj - filter/criteria
      {$inc: {'age': 1}},  //2nd Parameter is and Object with changes to take place
      {returnOriginal: false } //last parameter is options.
  ).then((result) => {
    console.log(result);
  },
  (error) => {

  });

  //db.close(); //Will interupt deletions

});