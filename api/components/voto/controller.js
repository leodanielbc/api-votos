const TABLE = 'voto';
const nanoid = require('nanoid');
const auth = require('../../../auth');
const bcrypt = require('bcrypt');
TABLE_USER = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }
    function listUserVotos() {
        return store.listUserVotos(TABLE_USER);
    }
    function getId(id) {
        return store.listUserIdVotos(TABLE, id);
    }
    async function votar(body) {
        const date = new Date();
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const voto = {
            id: nanoid(),
            comentario: body.comentario,
            fecha: `${year}-${month}-${day}`,
            iduservoto: body.iduservoto,
            iduser: body.iduser
        }
        // obtenemos el ultimo voto del usuario
        const lastUserVoto = await store.lastElement(TABLE, voto.iduser);
        const element = await store.query(TABLE, {iduser: lastUserVoto[0].id})
        console.log('ok');
        console.log(element);
        //return store.insert(TABLE, voto);
    }
    function deleteAuth(id) {
        return store.deleteElement(TABLE, id);
    }

    return {
        getId,
        votar,
        deleteAuth,
        listUserVotos
    }
}