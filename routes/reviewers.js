
const { Router } = require('express');
const Reviewer = require('../lib/models/Reviewer');


module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

//get all with pagination
  .get('/', (req, res, next) => {

    const { page = 1, perPage = 25 } = req.query;
    Reviewer
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .then(Reviewer => res.send(Reviewer))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });

  // .delete('/:id', (req, res, next) => {
  //   Reviewer
  //     .findByIdAndDelete(req.params.id)
  //     .then(Reviewer => res.send(Reviewer))
  //     .catch(next);
  // });
  