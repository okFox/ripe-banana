const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/studios', require('../routes/studios'));
app.use('/api/v1/actors', require('../routes/actors'));
app.use('/api/v1/reviewers', require('../routes/reviewers'));
app.use('/api/v1/films', require('../routes/films'));
app.use('/api/v1/reviews', require('../routes/reviews'));
app.use('/api/v1/auth', require('../routes/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));
// app.use(require('./middleware/ensure-auth').isLoggedIn);
// app.use(require('./middleware/ensure-auth').isAdmin);
// app.post('*', require('../lib/middleware/ensure-auth'));

module.exports = app;
