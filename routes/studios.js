
const { Router } = require('express');
const Studio = require('../lib/models/Studio');


module.exports = Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

//get all with pagination
  .get('/', (req, res, next) => {

    const { page = 1, perPage = 25 } = req.query;
    Studio
      .find()
      .select({ name: true })
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(studios => res.send(studios))
      .catch(next);
  })


  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(studios => studios.addFilms())
      .then(Studio => res.send(Studio))
      .catch(next);
  });

  // .patch('/:id', (req, res, next) => {
  //   Studio
  //     .findByIdAndUpdate(req.params.id, req.body, { new: true })
  //     .then(studio => res.send(studio))
  //     .catch(next);
  // })

  // .delete('/:id', (req, res, next) => {
  //   Studio
  //     .findByIdAndDelete(req.params.id)
  //     .then(Studio => res.send(Studio))
  //     .catch(next);
  // });
  