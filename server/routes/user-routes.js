//create user
app.post('/users', (request, response) =>{
  var body = _.pick(request.body, ['email', 'password']);  //lodash pick property

  var user = new User(body);
  
  user.save()
    .then(() => {
      return user.generateAuthToken();;
      //response.send(user);
    })
    .then((token)=>{
      //console.log(`tokenB: ${token}`)
      response.header('x-auth', token).send(user);
    })
    .catch((error) => {
      response.status(400).send(error)
    });
});

//GET /users  #INDEX
app.get('/users', (request, response) => {
  User.find()
    .then((users) => {
      response.status(200).send({users});
    })
    .catch((error) => {
      response.status(400).send(error)
    })
});

//DELETE /users  #DELETE
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
