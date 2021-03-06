const express = require('express');
const response = require('../../../network/response');
const secure = require('./secure');

const router = express.Router();
const controller = require('./index');

// Routes
router.get('/',secure('access'), list);
router.get('/:id', secure('access'), get);
router.post('/', secure('access'), insert);
router.delete('/:id', secure('access'), deleteArea);

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
        .then((area) => {
            response.success(req, res, area, 200);
        })
        .catch(next);
}
function insert(req, res, next) {
    controller.insert(req.body)
        .then((area) => {
            response.success(req, res, area, 200);
        })
        .catch(next);
}
function deleteArea(req, res, next) {
    controller.deleteArea(req.params.id)
        .then((area) => {
            response.success(req, res, area, 200);
        })
        .catch(next);
}
module.exports = router;