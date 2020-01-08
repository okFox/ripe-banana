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

reviewerSchema.statics.deleteByIdIfNoReviews = function(id) {
  return Promise.all([
    this.findById(id),
    this.model('Review').find({ reviewer: id })
  ])
    .then(([reviewer, reviews]) => {
      if(reviews.length) {
        return 'Cannot delete, reviewer has associated reviews.';
      } else {
        return this.findByIdAndDelete(reviewer._id);
      }
    });
};

reviewerSchema.methods.addReviews = async function() {
  const reviewsObj = JSON.parse(JSON.stringify(this));
  reviewsObj.reviews = await this.model('Review')
    .find({ reviewer: this._id });
  return reviewsObj;
};


module.exports = mongoose.model('Reviewer', reviewerSchema);

