const chance = require('chance').Chance();
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');
const Studio = require('../models/Studio');
const Film = require('../models/Film');
const Actor = require('../models/Actor');

module.exports = async({ reviewer = 5, review = 25, studio = 5, film = 25, actor = 25 } = {}) => {
  
  const reviewers = await Reviewer.create([...Array(reviewer)].map(() => ({
    name: chance.name(),
    company: chance.animal()
  })));

  const actors = await Actor.create([...Array(actor)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  })));

  const studios = await Studio.create([...Array(studio)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const films = await Film.create([...Array(film)].map(() => ({
    title: chance.name(),
    studio: chance.pickone(studios.map(studio => studio._id)),
    released: chance.integer({ min: 1000, max: 9999 }),
    cast: [{
      role: chance.name(),
      actor: chance.pickone(actors.map(actor => actor._id))
    }]
  })));

  await Review.create([...Array(review)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers.map(reviewer => reviewer._id)),
    review: chance.string({ length: 140 }),
    film: chance.pickone(films.map(film => film._id))
  })));

};

