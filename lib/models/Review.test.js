const Review = require('./Review');
const objectId = require('mongoose').Types.objectId;

describe('review model', () => {
  it('has a required reviewer', () => {
    const review = new Review({
      rating: 3,
      review: 'OMG that sucked',
      film: objectId

    });
    
    const { errors } = review.validateSync();
    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
  
  });
  it('has a required rating', () => {
    const review = new Review({
      name: 'Ghost Dad',
      reviewer: objectId,
      review: 'OMG that sucked',
      film: objectId
    });
    
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });
  it('has a required rating of 1-5', () => {
    const review = new Review({
      name: 'Ghost Dad',
      rating: 6,
      reviewer: objectId,
      review: 'OMG that sucked',
      film: objectId
    });
    
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
  });

  it('has a required film', () => {
    const review = new Review({
      name: 'Ghost Dad',
      rating: 6,
      reviewer: objectId,
      review: 'OMG that sucked'
    });
    
    const { errors } = review.validateSync();
    expect(errors.film.message).toEqual('Path `film` is required.');
  });
  
});
