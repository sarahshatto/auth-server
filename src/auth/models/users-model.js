'use strict'; 

// dependencies needed: 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// define a secret: 
const secret = 'sauce';

// build a schema: rules for data to be entered in
const users = mongoose.Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true}
});

// encrypt the password.. this is called everytime before .save is called. 
users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
  console.log('the password is', this.password);
});

// creating a json web token 
users.methods.generateToken = function() {
  let token = jwt.sign({ username: this.username }, secret);
  return token;
};

// static --- this works without an instance/user record.generateToken()

//  Lookup the user by the username 
users.statics.validateBasic = async function (username, password) {
  let user = await this.findOne({ username: username });
  // console.log('found', user);
  // Compare the entered password sent against what we have in the db
  let isValid = await bcrypt.compare( password, user.password );

  if (isValid) {
    return user;
  } else {
    return undefined;
  }
  
}

module.exports = mongoose.model('users', users);
