const Studio = require('../lib/models/Studio');



async() => {
  studio = await Studio.create({
    name: 'Sony',
    address: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    }
  });
};
