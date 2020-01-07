
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

//   .get('/search', (req, res, next) => {
//     Film
//       .getAuthorWithPartialText(req.query.partialText)
//       .then(film => res.send(film))
//       .catch(next);
//   })


  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .then(Film => res.send(Film))
      .catch(next);
  });

  // .patch('/:id', (req, res, next) => {
  //   Film
  //     .findByIdAndUpdate(req.params.id, req.body, { new: true })
  //     .then(film => res.send(film))
  //     .catch(next);
  // })

  // .delete('/:id', (req, res, next) => {
  //   Film
  //     .findByIdAndDelete(req.params.id)
  //     .then(Film => res.send(Film))
  //     .catch(next);
  // });
  