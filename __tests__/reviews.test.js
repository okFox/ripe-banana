
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');


describe('review routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });


  let film;
  let studio;
  let actor;
  let review;
  let Reviews = [];
  let reviewer;

  beforeEach(async() => { 
    reviewer = await Reviewer.create({
      name: 'Bob Phonic',
      company: 'Amazon Verified Customer'
    });
    
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

    review = await Review.create({   
      rating: 1,
      reviewer: reviewer._id,
      review: 'OMG that sucked',
      film: film._id
    });
    
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 1,
        reviewer: reviewer._id,
        review: 'OMG that sucked',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 1,
          reviewer: expect.any(String),
          review: 'OMG that sucked',
          film: expect.any(String),
          __v: 0
        });

      });
  });

  it('gets an review by id', () => {
    return request(app)
      .get(`/api/v1/reviews/${review.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 1,
          reviewer: expect.any(String),
          review: 'OMG that sucked',
          film: expect.any(String),
          __v: 0
        });
      });

  });

  it('get all reviews', async() => {

    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        Reviews.forEach(review => {
          expect(res.body).toContain({
            _id: review._id.toString(),
            name: review.name,
          });
        });
      });
  });
});

