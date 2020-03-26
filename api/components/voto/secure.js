const auth = require('../../../auth')

module.exports = function checkAuth(action) {


    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                // verificar si tiene los permisos
                var owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;
            case 'access':
                // verificar si tiene los permisos
                auth.check.logged(req, next);
                next();
                break;
            case 'checktoken':
                // verificar el token (si esta o no logueado)
                auth.check.logged(req);
                next();
                break;
            default:
                next();
        }
    }

    return middleware;
}