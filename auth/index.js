const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;


// firmar el token
function sign(data) {
    //return jwt.sign(data, secret, { expiresIn: '15m' });
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}
const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        // comprobar si es o no propio
        if (decoded.id !== owner) {
            throw error('No puedes actualizar, no tienes permisos', 401);
        }
    },
    logged: function (req) {
        // eslint-disable-next-line no-unused-vars
        const decoded = decodeHeader(req);
    }
}

function getToken(auth) {
    if (!auth) {
        throw error('Token no definido', 401);

    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Token: Formato invalido', 401);
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
};