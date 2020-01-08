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

studioSchema.methods.addFilms = async function() {
  const filmsObj = JSON.parse(JSON.stringify(this));
  filmsObj.films = await this.model('Film')
    .find({ studio: this._id });
  return filmsObj;
};

module.exports = mongoose.model('Studio', studioSchema);
