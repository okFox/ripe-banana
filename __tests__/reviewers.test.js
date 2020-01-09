
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');

const { getReviewers, getReviewer }  = require('../lib/helpers/data-helpers');

describe('reviewer routes', () => {
  
  it('can create a new reviewer', async() => {
    const reviewer = await getReviewer();
    delete reviewer._id;

    return request(app)
      .post('/api/v1/reviewers')
      .send(reviewer)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining(reviewer));
      });
  });

  it('gets an reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining({ _id: reviewer._id }));
      });

  });

  it('get all reviewers', async() => {
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers.forEach(reviewer => {
          delete reviewer.__v;
          expect(res.body).toContainEqual(reviewer);
        });
      });
  });

});

