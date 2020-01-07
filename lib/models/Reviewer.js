const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }

});
reviewerSchema.methods.getReviews = function() {
  return this.model('Review')
    .find({ reviewer: this._id });
};
module.exports = mongoose.model('Reviewer', reviewerSchema);

