
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');


describe('reviewer routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });


  let reviewer;
  let reviewers = [];

  beforeEach(async() => {
    reviewer = await Reviewer.create({
      name: 'Bob Phonic',
      company: 'Amazon Verified Customer'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Bob Phonic',
        company: 'Amazon Verified Customer'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Bob Phonic',
          company: 'Amazon Verified Customer',
          __v: 0
        });
      });
  });

  it('gets an reviewer by id', () => {
    return request(app)
      .get(`/api/v1/reviewers/${reviewer.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Bob Phonic',
          company: 'Amazon Verified Customer',
          reviews: expect.any(Array),
          __v: 0
        });
      });

  });



  it('get all reviewers', async() => {

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers.forEach(reviewer => {
          expect(res.body).toContain({
            _id: reviewer._id.toString(),
            name: reviewer.name,
          });
        });
      });
  });


  // it('updates an reviewer', () => {
  //   return request(app)
  //     .patch(`/api/v1/reviewers/${reviewer.id}`)
  //     .send({ name: 'Corey' })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         name: 'Corey',
  //         company: 'Amazon Verified Customer',
  //         __v: 0
  //       });
  //     });
  // });

  // it('deletes an reviewer', () => {
  //   return request(app)
  //     .delete(`/api/v1/reviewers/${reviewer.id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         name: 'Bob Phonic',
  //         company: 'Amazon Verified Customer',
  //         __v: 0
  //       });
  //     });
  // });
});

