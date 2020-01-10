
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');

const { getFilm, getFilms, adminAgent }  = require('../lib/helpers/data-helpers');


describe('film routes', () => {
 
  it('can create a new film', async() => {

    const film = await getFilm();
    delete film._id;

    return adminAgent
      .post('/api/v1/films')
      .send(film)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining(film));
      });
  });

  it('gets an film by id', async() => {
    const film = await getFilm();
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining({ _id: film._id }));
      });

  });

  it('get all Films', async() => {
    const films = await getFilms();
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          expect(res.body).toContainEqual(film);
        });
      });
  });
});

