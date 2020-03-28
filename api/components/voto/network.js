const express = require('express');
const secure = require('./secure');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.post('/', secure('accessemployee'), votar);
router.get('/', secure('access'), list);
router.get('/:id', secure('access'), get);

// Internal functions
function votar(req, res, next) {
    controller.votar(req.body)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}
function list(req, res, next) {
    controller.listUserVotos(req.body.email, req.body.password)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}
function get(req, res, next) {
    controller.getId(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}


module.exports = router;