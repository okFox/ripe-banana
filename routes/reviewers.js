
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
  .delete('/:id', async(req, res, next) => {
    const reviewer = await Reviewer.findById(req.params.id);
    try {
      const reviews = await reviewer.getReviews();
      if(reviews.length) {
        res.send('Cannot delete, there are associated reviews');
        //throw new Error('Cannot delete, there are associated reviews');
      } else {
        const deletedReviewer = await Reviewer.findByIdAndDelete(req.params.id);
        res.send(deletedReviewer);
      }
    }
    catch(err) {
      console.log(err); // eslint-disable-line no-console
      next(err);
    }

  });


