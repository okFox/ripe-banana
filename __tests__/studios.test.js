
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const { getStudio, getStudios }  = require('../lib/helpers/data-helpers');


describe('studio routes', () => {
  

  it('can create a new studio', async() => {
    const studio = await getStudio();
    delete studio._id;

    return request(app)
      .post('/api/v1/studios')
      .send(studio)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining(studio));

      });
  });

  it('gets an studio by id', async() => {
    const studio = await getStudio();

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining({ _id: studio._id }));
      });
  });



  it('get all studios', async() => {
    const studios = await getStudios();
  
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          delete studio.__v;
          delete studio.address;
          expect(res.body).toContainEqual(studio);
        });
      });
  });
});

