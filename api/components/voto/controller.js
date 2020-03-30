const nanoid = require('nanoid');
const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const moment = require('moment');
const boom = require('@hapi/boom');
const TABLE_USER = 'user';
const TABLE = 'voto';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }
    function listUserVotos() {
        const date = new Date();
        const primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
        const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const date1 = `${date.getFullYear()}-${date.getMonth()+1}-${primerDia.getDate()}`;
        const date2 = `${date.getFullYear()}-${date.getMonth()+1}-${ultimoDia.getDate()}`;
        // obtiene la lista de votos de cada usuario por la fecha actual(todo el mes de dicha fecha)
        return store.listUserVotos(TABLE, date1, date2);
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
        if (voto.iduser !== voto.iduservoto) {
            // obtenemos el ultimo voto que realizo (iduservoto) a dicho usuario (iduser)
            const lastUserVoto = await store.lastElement(TABLE, voto.iduser, voto.iduservoto);
            //const lastUserVoto = await store.lastElement(TABLE, '111', '11');
            const element = lastUserVoto[0];
            const hoy = moment();
            if (!element) {
                await store.insert(TABLE, voto);
                return { message: 'Su voto ha sido registrado' };
            }
            const dateVoto = moment(element.fecha);
            // verifica que puede votar una vez al mes
            if (hoy.format("MM") > dateVoto.format("MM")) {
                await store.insert(TABLE, voto);
                return { message: 'Su voto ha sido registrado' }
            } else {
                return boom.notAcceptable('No puedes votar mas de una vez en el mes');
            }
        } else {
            return boom.notAcceptable('No se puede votar asi mismo');
        }
    }
    function betweenDateNumVotos(date1, date2) {
        return store.listBetweenDateVotos(date1, date2);
    }
    function listEmpleadosVotosForArea(idarea, date1, date2) {
        return store.listVotosForArea(idarea, date1, date2);
    }

    function deleteAuth(id) {
        return store.deleteElement(TABLE, id);
    }

    return {
        getId,
        votar,
        deleteAuth,
        listUserVotos,
        betweenDateNumVotos,
        listEmpleadosVotosForArea
    }
}