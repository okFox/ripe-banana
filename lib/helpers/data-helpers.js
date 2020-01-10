require('dotenv').config();
const app = require('../app');
const request = require('supertest');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');
const Studio = require('../models/Studio');
const Film = require('../models/Film');
const Actor = require('../models/Actor');
const User = require('../models/User');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed({ reviewer: 5, review: 25, studio: 5, film: 25, actor: 25  });
});

const userAgent = request.agent(app);

beforeEach(() => {
  User.create({ email: 'testuser@test.com', password: 'password', role: 'user' });
  return userAgent
    .post('/api/v1/auth/login')
    .send({ email: 'testuser@test.com', password: 'password', role: 'user' });
});
const adminAgent = request.agent(app);
beforeEach(() => {
  User.create({ email: 'testadmin@test.com', password: 'password', role: 'admin' });
  return adminAgent
    .post('/api/v1/auth/login')
    .send({ email: 'testadmin@test.com', password: 'password', role: 'admin' });
});
const reviewerAgent = request.agent(app);
beforeEach(() => {
  User.create({ email: 'testreviewer@test.com', password: 'password', role: 'reviewer' });
  return reviewerAgent
    .post('/api/v1/auth/login')
    .send({ email: 'testreviewer@test.com', password: 'password', role: 'reviewer' });
});


afterAll(() => {
  return mongoose.connection.close();
});

const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: () => Model.findOne().then(prepare),
    [`get${modelName}s`]: () => Model.find().then(docs => docs.map(prepare))
  };
};

module.exports = {
  ...createGetters(Reviewer),
  ...createGetters(Review),
  ...createGetters(Studio),
  ...createGetters(Actor),
  ...createGetters(Film),
  userAgent,
  adminAgent,
  reviewerAgent
  
};
