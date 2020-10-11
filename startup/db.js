//const winston = require('winston');
const mongoose = require('mongoose');
//const config = require('config');

module.exports = function() {
    // const db = config.get('db');
    const db = "mongodb://localhost:27017";
  mongoose.connect(db,{useNewUrlParser: true ,useUnifiedTopology: true,autoIndex: true,  })
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err) => console.log(`ERROR BDD  ${err}...`));
}