'use strict';

// // dependencies
const express = require('express');
const router = require('./router.js');
// const base64 = require('base64');
const app = express();

// // global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Brings in everything you have defined in router.js
app.use(router);



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