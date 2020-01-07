const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: String,
    state: String,
    country: String
  }
});

//GETTER function to return only id and name

module.exports = mongoose.model('Studio', studioSchema);
