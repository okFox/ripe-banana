
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');


describe('actor routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });


  let actor;
  let actors = [];

  beforeEach(async() => {
    actor = await Actor.create({   
      name: 'Ingrid Bergman',
      dob: '1926-09-26',
      pob: 'Switzerland'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new actor', () => {
    return request(app)
      .post('/api/v1/actors')
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

  it('gets an actor by id', () => {
    return request(app)
      .get(`/api/v1/actors/${actor.id}`)
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



  it('get all actors', async() => {

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContain({
            _id: actor._id.toString(),
            name: actor.name,
          });
        });
      });
  });


  it('updates an actor', () => {
    return request(app)
      .patch(`/api/v1/actors/${actor.id}`)
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

  it('deletes an actor', () => {
    return request(app)
      .delete(`/api/v1/actors/${actor.id}`)
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

