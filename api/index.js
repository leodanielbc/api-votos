const express = require('express');
const bodyParser = require('body-parser');
const errors = require('../network/errors');

const config = require('../config.js');
const user = require('./components/user/network');
const area = require('./components/area/network');
const auth = require('./components/auth/network');
const rol = require('./components/rol/network');
const voto = require('./components/voto/network');

const app = express();

app.use(bodyParser.json());

// ROUTES
app.use('/api/user', user);
app.use('/api/area', area);
app.use('/api/auth', auth);
app.use('/api/rol', rol);
app.use('/api/voto', voto);

// middleware errors
app.use(errors);

app.listen(config.api.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening http://localhost:${config.api.port}`);
});