const TABLE = 'auth';
const nanoid = require('nanoid');
const auth = require('../../../auth');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    async function login(email, password) {
        const data = await store.query(TABLE, { email: email });
        if (data.password === password) {
            // generate token
            return auth.sign(data);
        } else {
            throw new Error('information invalid');
        }
    }
    function list() {
        return store.list(TABLE);
    }
    function getId(id) {
        return store.get(TABLE, id);
    }
    function insert(body) {
        const auth = {
            id: nanoid(),
            email: body.email,
            password: body.password,
            user_id: body.user_id
        }
        return store.insert(TABLE, auth);
    }
    function deleteAuth(id) {
        return store.deleteElement(TABLE, id);
    }

    return {
        list,
        getId,
        insert,
        deleteAuth,
        login
    }
}