
const Actor = require('./Actor');


describe('Actor model', () => {
  it('has a required name', () => {
    const actor = new Actor({
        

      dob: '1926-09-26',
      pob: 'Switzerland'
    });
  
    const { errors } = actor.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

});
