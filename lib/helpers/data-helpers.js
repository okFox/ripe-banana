require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');
const Studio = require('../models/Studio');
const Film = require('../models/Film');
const Actor = require('../models/Actor');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed({ reviewer: 5, review: 25, studio: 5, film: 25, actor: 25  });
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

};
