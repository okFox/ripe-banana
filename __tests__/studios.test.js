
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');


describe('studio routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });


  let studio;
  let studios = [];

  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Sony',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      }
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Sony',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        } })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Sony',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
          },
          __v: 0
        });

      });
  });

  it('gets an studio by id', () => {
    return request(app)
      .get(`/api/v1/studios/${studio.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Sony',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
          },
          __v: 0
        });
      });

  });



  it('get all studios', async() => {

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContain({
            _id: studio._id.toString(),
            name: studio.name,
          });
        });
      });
  });


  it('updates an studio', () => {
    return request(app)
      .patch(`/api/v1/studios/${studio.id}`)
      .send({ name: 'Disney' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Disney',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
          },
          __v: 0
        });
      });
  });

  it('deletes an studio', () => {
    return request(app)
      .delete(`/api/v1/studios/${studio.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Sony',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
          },
          __v: 0
        });
      });
  });
});

