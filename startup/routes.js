const express = require('express');
const candidates = require('../routes/candidates');
const users = require('../routes/users');
const auth = require('../routes/auth');
const votes = require('../routes/votes');

/*
const users = require('../routes/users');
const auth = require('../routes/auth');

const error = require('../middleware/error');
*/

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/candidates', candidates);
  app.use('/api/users', users);
  app.use('/api/votes', votes);


  
 // app.use('/api/users', users);
  app.use('/api/auth', auth);

 // app.use(error);
}