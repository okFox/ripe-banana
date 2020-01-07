
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');


describe('film routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });


  let film;
  let Films = [];

  beforeEach(async() => {
    film = await Film.create({   
      studio: objectId,
      released: 1995,
      cast: [{ role: 'ZeroCool', actor: objectId }]
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new film', () => {
    return request(app)
      .post('/api/v1/Films')
      .send({
        name: 'Ingrid Bergman',
        dob: '1926-09-26',
        pob: 'Switzerland'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Ingrid Bergman',
          dob: '1926-09-26T00:00:00.000Z',
          pob: 'Switzerland',
          __v: 0
        });

      });
  });

  it('gets an film by id', () => {
    return request(app)
      .get(`/api/v1/Films/${film.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Ingrid Bergman',
          dob: '1926-09-26T00:00:00.000Z',
          pob: 'Switzerland',
          __v: 0
        });
      });

  });



  it('get all Films', async() => {

    return request(app)
      .get('/api/v1/Films')
      .then(res => {
        Films.forEach(film => {
          expect(res.body).toContain({
            _id: film._id.toString(),
            name: film.name,
          });
        });
      });
  });


  it('updates an film', () => {
    return request(app)
      .patch(`/api/v1/Films/${film.id}`)
      .send({ name: 'Ingmar' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Ingmar',
          dob: '1926-09-26T00:00:00.000Z',
          pob: 'Switzerland',
          __v: 0
        });
      });
  });

  it('deletes an film', () => {
    return request(app)
      .delete(`/api/v1/Films/${film.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Ingrid Bergman',
          dob: '1926-09-26T00:00:00.000Z',
          pob: 'Switzerland',
          __v: 0
        });
      });
  });
});

