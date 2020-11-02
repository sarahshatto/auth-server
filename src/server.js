'use strict';

// // dependencies
const express = require('express');
const router = require('./router.js');
const todov1 = require('./todo-routes-v1.js');
const todov2 = require('./todo-routes-v2.js');
// const base64 = require('base64');
const app = express();


// // global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Brings in everything you have defined in router.js
app.use(router);

// Add the todo routes for v1 and v2
app.use('/app/v1', todov1);
app.use('/app/v2', todov2);

// Error handler -last express route
app.use((error, req, res, next) => {
  res.status(500).send(error)
});

app.use ('*', (req, res, next) => {
  res.status(404).send('not found'); 
});

module.exports = {
  app,
  start: (port) => app.listen(port, console.log('up on', port))
};