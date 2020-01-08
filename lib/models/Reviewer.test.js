const Reviewer = require('./Reviewer');


describe('reviewer model', () => {
  it('has a required name', () => {
    const reviewer = new Reviewer({

      company: 'Amazon Verified Customer'
    });
  
    const { errors } = reviewer.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');

  });
  it('has a required company', () => {
    const reviewer = new Reviewer({
      name: 'Bob Phonic',

    });
  
    const { errors } = reviewer.validateSync();
    expect(errors.company.message).toEqual('Path `company` is required.');
  });

});
