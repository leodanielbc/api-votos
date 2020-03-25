const TABLE = 'auth';
const nanoid = require('nanoid');
const auth = require('../../../auth');
const bcrypt = require('bcrypt');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    async function login(email, password) {
        const data = await store.query(TABLE, { email: email });
        if (data == null) {
            throw error('Login Error: Unauthorized', 401);
        }
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    // generar token
                    const token = auth.sign({ ...data });
                    return { token: token, user: data }
                } else {
                    throw error('Invalid: Unauthorized', 401);
                }
            }).catch((err) => {
                throw error('Login Error: ' + err.message, 401);
            });
    }
    function list() {
        return store.list(TABLE);
    }
    function getId(id) {
        return store.get(TABLE, id);
    }
    async function insert(body) {
        const auth = {
            id: nanoid(),
            email: body.email,
            password: await bcrypt.hash(body.password, 5),
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