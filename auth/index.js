const jwt = require('jsonwebtoken');
const config = require('../config');


// firmar el token
function sign(data) {
    //return jwt.sign(data, secret, { expiresIn: '15m' });
    return jwt.sign(data, 'secret');
}

module.exports = {
    sign
};