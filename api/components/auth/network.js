const express = require('express');

const router = express.Router();
const controller = require('./index');

// Routes
router.post('/login', login);

// Internal functions
function login(req, res, next) {
    controller.login(req.body.email, req.body.password)
        .then((data) => {
            res.status(200).json({
                status: 200,
                message: 'success auth',
                body: data
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                message: 'Error Information'
            });
        });
}

module.exports = router;