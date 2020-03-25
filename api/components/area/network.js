const express = require('express');

const router = express.Router();
const controller = require('./index');

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', insert);
router.delete('/:id', deleteArea);

// Internal functions
function list(req, res, next) {
    controller.list()
        .then((lista) => {
            res.status(200).json({
                status: 200,
                message: 'area listed',
                body: lista
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                message: 'Error'
            });
        });
}
function get(req, res, next) {
    controller.getId(req.params.id)
        .then((area) => {
            res.status(200).json({
                status: 200,
                message: 'get area',
                body: area
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                message: 'Error'
            });
        });
}
function insert(req, res, next) {
    controller.insert(req.body)
        .then((area) => {
            res.status(200).json({
                status: 200,
                message: 'success insert',
                body: area
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                message: 'Error'
            });
        });
}
function deleteArea(req, res, next) {
    controller.deleteArea(req.params.id)
        .then((area) => {
            res.status(200).json({
                status: 200,
                message: 'success deleted'
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                message: 'Error'
            });
        });
}
module.exports = router;