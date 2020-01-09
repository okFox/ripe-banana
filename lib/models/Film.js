const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {                                                             
    type: Number,
    min: 1000,
    max: 9999,
    required: true 
  },
  cast: [{
    role: String,
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]

});
filmSchema.methods.addReviews = async function() {
  const reviewsObj = JSON.parse(JSON.stringify(this));
  reviewsObj.reviews = await this.model('Review')
    .find({ film: this._id });
  return reviewsObj;
};

module.exports = mongoose.model('Film', filmSchema);


