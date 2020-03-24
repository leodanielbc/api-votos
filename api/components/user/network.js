const express = require('express');

const router = express.Router();
const controller = require('./index');

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', insert);
router.delete('/:id', deleteUser);

// Internal functions
function list(req, res, next) {
    controller.list()
        .then((lista) => {
            res.status(200).json({
                status: 200,
                message: 'user listed',
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
        .then((user) => {
            res.status(200).json({
                status: 200,
                message: 'get user',
                body: user
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
        .then((user) => {
            res.status(200).json({
                status: 200,
                message: 'success insert',
                body: user
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                message: 'Error'
            });
        });
}
function deleteUser(req, res, next) {
    controller.deleteUser(req.params.id)
        .then((user) => {
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