const mongoose = require('mongoose');
// const Reviewer = require('../models/Reviewer');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {                                                             
    type: String,
    maxlength: 140,
    required: true 
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }

});

module.exports = mongoose.model('Review', reviewSchema);



// {
//     rating: <rating number 1-5 RN>,
//     reviewer: <review _id RI>
//     review: <review-text, max-length 140 chars RS>,
//     film: <film-id RI>
//   }
