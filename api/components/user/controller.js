const TABLE = 'user';
const nanoid = require('nanoid');
const auth = require('../auth');
const rol = require('../rol')

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }
    function list() {
        // return store.list(TABLE);
        return store.listUserJoinArea(TABLE);
    }
    function getId(id) {
        return store.get(TABLE, id);
    }
    async function insert(body) {
        const user = {
            id: nanoid(),
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            idarea: body.idarea
        }
        await store.insert(TABLE, user);
        await auth.insert({
            email: user.email,
            password: body.password,
            user_id: user.id
        });
        return rol.addRolUser(user.id, body.idrol);
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