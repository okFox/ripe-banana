
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
// const Actor = require('../lib/models/Actor');
const { getActor, getActors }  = require('../lib/helpers/data-helpers');

describe('actor routes', () => {

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

  it('gets an actor by id', async() => {
    const actor = await getActor();

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: actor._id,
          name: actor.name,
          dob: actor.dob,
          pob: actor.pob,
          films: expect.any(Array),
          __v: 0
        });
      });
  });



  it('get all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => expect(res.body)
          .toContainEqual({ _id: actor._id, name: actor.name }));
      });
  });

});

