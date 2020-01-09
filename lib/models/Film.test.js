const Film = require('./Film');
const objectId = require('mongoose').Types.objectId;

describe('film model', () => {
  it('has a required title', () => {
    const film = new Film({
      studio: objectId,
      released: 1995,
      cast: [{ role: 'ZeroCool', actor: objectId }]
    });
    
    const { errors } = film.validateSync();
    expect(errors.title.message).toEqual('Path `title` is required.');
  
  });
  it('has a required studio', () => {
    const film = new Film({
      title: 'Hackers',
      released: 1995,
      cast: [{ role: 'ZeroCool', actor: objectId }]
    });
    
    const { errors } = film.validateSync();
    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });
  it('has a required release year', () => {
    const film = new Film({
      title: 'Hackers',
      studio: objectId,
      cast: [{ role: 'ZeroCool', actor: objectId }]
    });
    
    const { errors } = film.validateSync();
    expect(errors.released.message).toEqual('Path `released` is required.');
  });
  it('has a 4 digit release year', () => {
    const film = new Film({
      title: 'Hackers',
      studio: objectId,
      released: 11995,
      cast: [{ role: 'ZeroCool', actor: objectId }]
    });
    
    const { errors } = film.validateSync();
    expect(errors.released.message).toEqual('Path `released` (11995) is more than maximum allowed value (9999).');
  });
  it('has actor ID in cast', () => {
    const film = new Film({
      title: 'Hackers',
      studio: objectId,
      released: 11995,
      cast: [{ role: 'ZeroCool', actor: 'ddddd' }]
    });
    
    const { errors } = film.validateSync();
    expect(errors['cast.0.actor'].message).toEqual('Cast to ObjectID failed for value "ddddd" at path "actor"');
  });
  
  
});
