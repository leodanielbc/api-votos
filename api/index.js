const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');
const user = require('./components/user/network');

const app = express();

app.use(bodyParser.json());

// ROUTES
app.use('/api/user', user);

app.listen(config.api.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening http://localhost:${config.api.port}`);
});