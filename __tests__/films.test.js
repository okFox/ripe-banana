
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');


describe('film routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });


  let film;
  let Films = [];
  let studio;
  let actor;

  beforeEach(async() => { 
    studio = await Studio.create({
      name: 'Sony',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      }
    });

    actor = await Actor.create({   
      name: 'Elroy McKinney',
      dob: '1926-09-26',
      pob: 'Switzerland'
    });

    film = await Film.create({
      title: 'Hackers', 
      studio: studio._id,
      released: 1995,
      cast: [{ role: 'ZeroCool', actor: actor._id }]
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Hackers', 
        studio: studio._id,
        released: 1995,
        cast: [{ role: 'ZeroCool', actor: actor._id }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Hackers', 
          studio: expect.any(String),
          released: 1995,
          cast: [{ _id: expect.any(String), role: 'ZeroCool', actor: expect.any(String) }],
          __v: 0
        });

      });
  });

  it('gets an film by id', () => {
    return request(app)
      .get(`/api/v1/films/${film.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Hackers', 
          studio: expect.any(String),
          released: 1995,
          cast: [{ _id: expect.any(String), role: 'ZeroCool', actor: expect.any(String) }],
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



});

