
const { Router } = require('express');
const Film = require('../lib/models/Film');


module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

//get all with pagination
  .get('/', (req, res, next) => {

    const { page = 1, perPage = 25 } = req.query;
    Film
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(films => res.send(films))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('studio', 'name')
      .populate('cast.actor', 'name')
      .then(film => film.addReviews())
      .then(film => res.send(film))
      .catch(next);
  });
