const express = require('express');
const bodyParser = require('body-parser');
const errors = require('../network/errors');

const config = require('../config.js');
const user = require('./components/user/network');
const area = require('./components/area/network');
const auth = require('./components/auth/network');

const app = express();

app.use(bodyParser.json());

// ROUTES
app.use('/api/user', user);
app.use('/api/area', area);
app.use('/api/auth', auth);

// middleware errors
app.use(errors);

app.listen(config.api.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening http://localhost:${config.api.port}`);
});