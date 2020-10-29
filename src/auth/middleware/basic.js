'use strict';

const base64 = require('base-64');
const users = require('../models/users-model');

module.exports = async (req, res , next) => {


  try{
    let authorization = req.headers.authorization;
    let encoded = authorization.split(' ')[1]
    let creds = base64.decode(encoded);
    let [username, password] = creds.split[":"];

    //get user instance from the model if we can
    let userRecord = await users.validateBasic(username, password);//this returns a promise

    req.token = userRecord.generateToken();

    // console.log({ authorization })
    // console.log({ encoded })
    // console.log({ creds })
    //console.log(username, password);


    // Look up the user by the username
    // compare the password sent against the password in the db
    // if it's good, send a token, if not, send an Error
    req.user = userRecord;

    next();
    //res.send('signin complete');

  } catch (err) {
    next("Invalid Login");
  }

}