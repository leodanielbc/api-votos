exports.success = function (req, res, message, status) {
    let statusCode = status || 200;
    let statusMessage = message || '';

    res.status(status).send({
        status: status,
        body: message
    });
}

exports.error = function (req, res, message, status) {
    let statusCode = status || 500;
    let statusMessage = message || 'Internal Server Error';

    res.status(statusCode).send({
        status: status,
        body: message
    });
}