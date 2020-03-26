const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');

const router = express.Router();
const controller = require('./index');

// Routes
router.get('/', secure('access'), list);
router.get('/:id', secure('access'), get);
router.post('/', secure('access'), insert);
router.delete('/:id', secure('access'), deleteUser);

// Internal functions
function list(req, res, next) {
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
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
function insert(req, res, next) {
    controller.insert(req.body)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}
function deleteUser(req, res, next) {
    controller.deleteUser(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}
module.exports = router;