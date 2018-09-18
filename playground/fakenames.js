const faker = require('faker');


var randomName = faker.name.findName();
var randomEmail = faker.internet.email()
var randomStreet = faker.address.streetAddress();
var randomCity = faker.address.city();
var randomState = faker.address.state();
var randomZip = faker.address.zipCode();

console.log(randomName);

console.log(randomEmail);


console.log(randomStreet);
console.log(randomCity + ', ' + randomState + ' ' + randomZip);
