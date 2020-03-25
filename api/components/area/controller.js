const TABLE = 'area';
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
        const area = {
            id: nanoid(),
            nameArea: body.nameArea,
            description: body.description
        }
        return store.insert(TABLE, area);
    }
    function deleteArea(id) {
        return store.deleteElement(TABLE, id);
    }

    return {
        list,
        getId,
        insert,
        deleteArea
    }
}