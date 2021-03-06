const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const store = require('../store/mysql');

const secret = config.jwt.secret;
const boom = require('@hapi/boom');


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
            throw error('No tienes permisos', 401);
        }
    },
    logged: function (req, next) {
        const decoded = decodeHeader(req, next);
        store.userjoinrol(decoded.user_id).then((data) => {
            let userValid = data.filter(item => item.namerol === 'admin');
            console.log(data);
            if (userValid.length === 0) {
                next(boom.unauthorized());
            }
            if (userValid[0].namerol !== 'admin') {
                next(boom.unauthorized());
            }
        });
    },
    logged_employee: function (req, next) {
        const decoded = decodeHeader(req, next);
        store.userjoinrol(decoded.user_id).then((data) => {
            let userValidEmployee = data.filter(item => item.namerol === 'employee');
            let userValidAdmin = data.filter(item => item.namerol === 'admin');

            // console.log(data);
            if (userValidAdmin.length === 0 && userValidEmployee.length === 0) {
                next(boom.unauthorized());
            }
            if (userValidEmployee.length > 0) {
                return;
            } else if (userValidAdmin.length > 0) {
                return;
            } else {
                next(boom.unauthorized());
            }
        });
    },
}

function getToken(auth, next) {
    if (!auth) {
        //throw error('Token no definido', 401);
        next(boom.unauthorized('Token no definido'));
    }

    if (auth.indexOf('Bearer ') === -1) {
        // throw error('Token: Formato invalido', 401);
        next(boom.unauthorized('Token: formato invalido'));
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req, next) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization, next);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
};