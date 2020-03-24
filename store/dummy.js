const db = {
    'user': [
        {id: '1', name: 'Leonardo', lastname: 'Benitez'},
    ]
};

async function list(table) {
    return db[table]
}
async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}
async function insert(table, data) {
    db[table].push(data);
}
async function deleteUser(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    insert,
    deleteUser
}