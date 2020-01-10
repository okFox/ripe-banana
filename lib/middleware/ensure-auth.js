const User = require('../models/User');

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.session;
  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};

const isAdmin = (req, res, next) => {

  const token = req.cookies.session;
  User
    .findByToken(token)
    .then(user => {
      if(user.role !== 'admin')
        throw new Error ('Not an admin');
      req.user = user;
      next();
    })
    .catch(next);
};
const isAuthorized = (req, res, next) => {
  const token = req.cookies.session;
  User
    .findByToken(token)
    .then(user => {

      if(user.role !== 'admin' &&
        user.role !== 'reviewer')
        throw new Error ('Not authorized');
      req.user = user;
      next();
    })
    .catch(next);
};

module.exports = {
  isLoggedIn,
  isAdmin,
  isAuthorized
};
