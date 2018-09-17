//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



//.connect(url, callback)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error) {
    return console.log('Unable to connect to MongoDB server!!');
  }

  console.log('Connected to MongoDB server')
 
  //deleteMany
  // db.collection('Todos').deleteMany({text: "Eat Lunch"}).then((result) => {
  //   console.log(result);
  // },(error) => {

  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: "Eat Lunch"}).then((result) => {
  //   console.log(result);
  // }, (error) => {

  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
  //   console.log(result);
  // }, (error) => {

  // });

  //Challenge -- 
  // --DELETE all records with name: Chris
  // --DELETE one by ID

  //deleteMany
  // db.collection('Users').deleteMany({name: 'Chris'}).then((result) => {
  //   console.log(result);
  // }, (error) => {

  // });

  //deleteOne (use _ID)
  // db.collection('Users').deleteOne({_id: new ObjectID('5b7ebf48015957751eb45550')}).then((result) => {
  //   console.log(result);
  // }, (error) =>{

  // });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5b804e2bda64789f31a39390')}).then((result) => {
    console.log(result);
  }, (error) =>{
    console.log('Unable to delete!');
  });

  //db.close(); //Will interupt deletions

});