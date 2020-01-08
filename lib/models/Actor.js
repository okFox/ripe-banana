const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: Date,
  pob: String
});

actorSchema.methods.addFilms = async function() {
  const filmsObj = JSON.parse(JSON.stringify(this));
  filmsObj.films = await this.model('Film')
    .find({ 'cast.0.actor': this._id });
  return filmsObj;
  
};

module.exports = mongoose.model('Actor', actorSchema);
