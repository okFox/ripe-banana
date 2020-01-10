
const { Router } = require('express');
const Review = require('../lib/models/Review');
const { isLoggedIn, isAuthorized } = require('../lib/middleware/ensure-auth');


module.exports = Router()
  .post('/', isLoggedIn, isAuthorized,  (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })


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

  .get('/:id', (req, res, next) => {
    Review
      .findById(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });

