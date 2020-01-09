
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');

const { getReview, getReviews }  = require('../lib/helpers/data-helpers');


describe('review routes', () => {
  
  it('can create a new review', async() => {
    const review = await getReview();
    delete review._id;

    return request(app)
      .post('/api/v1/reviews')
      .send(review)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining(review));

      });
  });

  it('gets an review by id', async() => {
    const review = await getReview();
    return request(app)
      .get(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining({ _id: review._id }));
      });

  });

  it('get all reviews', async() => {
    const reviews = await getReviews();
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        reviews.forEach(review => {
          expect(res.body).toContainEqual(review);
        });
      });
  });
});

