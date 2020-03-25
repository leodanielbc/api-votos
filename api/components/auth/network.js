const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.post('/login', login);

// Internal functions
function login(req, res, next) {
    controller.login(req.body.email, req.body.password)
        .then((data) => {
            delete data.user.password;
            response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;