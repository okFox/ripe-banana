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

module.exports = mongoose.model('Film', filmSchema);

// {
//     title: <title of film RS>,
//     studio: <studio _id RI>,
//     released: <4-digit year RN>,
//     cast: [{
//       role: <name of character S>,
//       actor: <actor _id RI>
//     }]
//   }
