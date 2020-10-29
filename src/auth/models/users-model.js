'use strict'; 

// this will be a module

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = "sauce";

// build a schema
const users = mongoose.Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true}
})

// encrypt the password
users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
  console.log('the password is', this.password)
});

// create a json web token 
users.methods.generateToken = async function() {
  let token = jwt.sign({ username: this.username }, secret)
  return token;
}

// static --- this works without an instance/user record.generateToken()

//  Lookup the user by the username 
users.statics.validateBasic = function (username, password) {
  let user = await this.findOne({ username: username });
  // console.log('found', user);
  // Compare the entered password sent against what we have in the db
  let isValid = await bcrypt.compare( password, user.password )

  if (isValid) {return user};
  else {return undefined}
  return isValid;
}

module.exports = mongoose.model('users', users);

// 'use strict';

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const secret = "sauce";

// const users = mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true }
// })

// users.pre('save', async function () {
//   this.password = await bcrypt.hash(this.password, 5);
//   console.log('The password is', this.password);
// });

// // Works with an instance, ie. userRecord.generateToken()
// users.methods.generateToken = function () {
//   let token = jwt.sign({ username: this.username }, secret)
//   return token;
// }

// // Works without an instance, ie. users.validateBasic()
// users.statics.validateBasic = async function (username, password) {

//   // Look up the user by the username
//   let user = await this.findOne({ username: username });

//   // Compare of the password sent against the password in the db
//   let isValid = await bcrypt.compare(password, user.password)

//   if (isValid) { return user; }
//   else { return undefined; }

// }

// module.exports = mongoose.model('users', users);

//////////////////////////////////

// 'use strict';

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const secret = "sauce";

// const users = mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true }
// })

// users.pre('save', async function () {
//   this.password = await bcrypt.hash(this.password, 5);
//   console.log('The password is', this.password);
// });

// // Works with an instance, ie. userRecord.generateToken()
// users.methods.generateToken = function () {
//   let token = jwt.sign({ username: this.username }, secret)
//   return token;
// }

// // Works without an instance, ie. users.validateBasic()
// users.statics.validateBasic = async function (username, password) {

//   // Look up the user by the username
//   let user = await this.findOne({ username: username });

//   // Compare of the password sent against the password in the db
//   let isValid = await bcrypt.compare(password, user.password)

//   if (isValid) { return user; }
//   else { return undefined; }

// }

// module.exports = mongoose.model('users', users);