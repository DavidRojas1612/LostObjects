const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb+srv://david-crm_11:dhciwXdhXm8w9yC@crmstack-6hfqx.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true }
);

module.exports = mongoose;
