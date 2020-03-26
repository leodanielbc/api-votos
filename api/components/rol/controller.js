const TABLE = 'rol';
const nanoid = require('nanoid');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }
    function list() {
        return store.list(TABLE);
    }
    function getId(id) {
        return store.get(TABLE, id);
    }
    async function insert(body) {
        const rol = {
            id: nanoid(),
            namerol: body.namerol,
            description: body.description
        }
        return store.insert(TABLE, rol);
    }
    function deleteRol(id) {
        return store.deleteElement(TABLE, id);
    }

    function addRolUser(user, rol) {
        return store.insert('user_'+ TABLE , {
            rol_id: rol,
            user_id: user,
        });
    }

    return {
        list,
        getId,
        insert,
        deleteRol,
        addRolUser
    }
}