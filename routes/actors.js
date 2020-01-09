
const { Router } = require('express');
const Actor = require('../lib/models/Actor');


module.exports = Router()
  .post('/', (req, res, next) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })

//get all with pagination
  .get('/', (req, res, next) => {

    const { page = 1, perPage = 25 } = req.query;
    Actor
      .find()
      .select({ name: true })
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(actors => res.send(actors))
      .catch(next);
  })


  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .then(actors => actors.addFilms())
      .then(Actor => res.send(Actor))
      .catch(next);
  });

