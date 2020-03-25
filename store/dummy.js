const db = {
    'user': [
        { id: '1', name: 'Leonardo', lastname: 'Benitez', email: 'leo@gmail.com', password: '123456'},
    ],
    'area': [
        { id: '1', nameArea: 'Team player', description: 'area1' },
    ]
};

async function list(table) {
    return db[table] || [];
}
async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}
async function insert(table, data) {
    if (!db[table]) {
        db[table] = [];
    }
    db[table].push(data);
    console.log(data);
}
async function query(table, dataquery){
    let col = await list(table);
    let keys = Object.keys(dataquery);
    let key = keys[0];
    return col.filter(item => item[key] === dataquery[key])[0] || null;
}
async function deleteElement(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    insert,
    deleteElement,
    query
}