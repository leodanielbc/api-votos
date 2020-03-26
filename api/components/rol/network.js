const express = require('express');
const secure = require('./secure');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', secure('access'), list);
router.get('/:id', secure('access'), get);
router.post('/', secure('access'), insert);
router.delete('/:id', secure('access'), deleteRol);

// Internal functions
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
        .then((rol) => {
            response.success(req, res, rol, 200);
        })
        .catch(next);
}
function insert(req, res, next) {
    controller.insert(req.body)
        .then((rol) => {
            response.success(req, res, rol, 200);
        })
        .catch(next);
}
function deleteRol(req, res, next) {
    controller.deleteRol(req.params.id)
        .then((rol) => {
            response.success(req, res, rol, 200);
        })
        .catch(next);
}

module.exports = router;