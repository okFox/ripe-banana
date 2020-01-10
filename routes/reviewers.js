
const { Router } = require('express');
const Reviewer = require('../lib/models/Reviewer');
// const ensureAuth = require('../lib/middleware/ensure-auth');



module.exports = Router()
  .post('/',   (req, res, next) => {
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
      .select({ name: true, company: true })
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .then(reviewer => reviewer.addReviews())
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .delete('/:id',  async(req, res, next) => {
    Reviewer
      .deleteByIdIfNoReviews(req.params.id)
      .then(deletedReviewer => res.send(deletedReviewer))
      .catch(next);
  });


