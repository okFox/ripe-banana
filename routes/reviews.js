
const { Router } = require('express');
const Review = require('../lib/models/Review');


module.exports = Router()
  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })

//get all with pagination
  .get('/', (req, res, next) => {

    const { page = 1, perPage = 25 } = req.query;
    Review
      .find()
      .sort({ rating: 1 })
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(reviews => res.send(reviews))
      .catch(next);
  })

// .get('/search', (req, res, next) => {
//   Review
//     .getAuthorWithPartialText(req.query.partialText)
//     .then(review => res.send(review))
//     .catch(next);
// })


  .get('/:id', (req, res, next) => {
    Review
      .findById(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });

  // .patch('/:id', (req, res, next) => {
  //   Review
  //     .findByIdAndUpdate(req.params.id, req.body, { new: true })
  //     .then(review => res.send(review))
  //     .catch(next);
  // })

  // .delete('/:id', (req, res, next) => {
  //   Review
  //     .findByIdandRemove(req.params.id)
  //     .then(review => res.send(review))
  //     .catch(next);
  // });
