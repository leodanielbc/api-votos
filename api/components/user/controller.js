const TABLE = 'user';
const nanoid = require('nanoid');
const auth = require('../auth')

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    function list() {
        return store.list(TABLE);
    }
    function getId(id) {
        return store.get(TABLE, id);
    }
    function insert(body) {
        const user = {
            id: nanoid(),
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            password: body.password,
            idarea: body.idarea
        }
        const authdata = {
            email: user.email,
            password: user.password,
            user_id: user.id
        }
        auth.insert(authdata);
        return store.insert(TABLE, user);
    }
    function deleteUser(id) {
        return store.deleteElement(TABLE, id);
    }

    return {
        list,
        getId,
        insert,
        deleteUser
    }
}