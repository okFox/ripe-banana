const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { isLoggedIn, isAdmin } = require('../lib/middleware/ensure-auth');

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/reviews', require('../routes/reviews'));
app.use('/api/v1/auth', require('../routes/auth'));


// protect all POST, PUT, PATCH routes below
app.use((req, res, next) => {
  if(['POST', 'PUT', 'PATCH'].includes(req.method)){
    const isAdminNext = (err) => {
      if(err)
        return next(err);
      isAdmin(req, res, next);
    };
    isLoggedIn(req, res, isAdminNext);
  }
  else next();
});

app.use('/api/v1/studios', require('../routes/studios'));
app.use('/api/v1/actors', require('../routes/actors'));
app.use('/api/v1/reviewers', require('../routes/reviewers'));
app.use('/api/v1/films', require('../routes/films'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;
