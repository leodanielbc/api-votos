const TABLE = 'user';
const nanoid = require('nanoid');

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
            email: body.email
        }
        return store.insert(TABLE, user);
    }
    function deleteUser(id) {
        return store.deleteUser(TABLE, id);
    }

    return {
        list,
        getId,
        insert,
        deleteUser
    }
}