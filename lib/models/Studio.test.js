
const Studio = require('./Studio');


describe('Studio model', () => {
  it('has a required name', () => {
    const studio = new Studio({

      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      }
    });
  
    const { errors } = studio.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

});

