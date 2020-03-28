const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

// coneccion
let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }

    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    });
}
handleCon();

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, [data], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}
function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE ${table} SET ? WHERE id=?`,
            [data, data.id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM ${table}`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
    });
}
function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM ${table} WHERE id='${id}'`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
    });
}

function deleteElement(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM ${table} WHERE id='${id}'`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
    });
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        });
    });
}
function queryList(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res || null);
        });
    });
}

function listUserJoinArea(table) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT u.*, a.* FROM ${table} u INNER JOIN (SELECT id AS areaId, codeArea, nameArea FROM area) a ON u.idarea=a.areaId`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
    });
}
async function userjoinrol(idUser){
    let tableUser = 'user';
    let tableRol = 'rol';
    let tableIntermedia = 'user_rol'
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT u.*, i.*, r.* FROM ${tableUser} u
            INNER JOIN (SELECT * FROM ${tableIntermedia}) i
            ON u.id=i.user_id
            INNER JOIN (SELECT * FROM ${tableRol}) r
            ON i.rol_id = r.id
            WHERE u.id='${idUser}'`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
    });
}
function listUserVotos(table) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT DISTINCT u.*,
            (SELECT COUNT(*) FROM voto WHERE iduser=u.id) AS numberVotos FROM user u`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
    });
}
function listUserIdVotos(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT u.*,
            (SELECT COUNT(*) FROM voto WHERE iduser=u.id) AS numberVotos FROM user u
            WHERE u.id='${id}'`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
    });
}
function lastElement(table, iduser, iduservoto) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM ${table} WHERE iduser='${iduser}'
            AND fecha = (SELECT MAX(fecha) FROM ${table} WHERE iduservoto='${iduservoto}')`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
    });
}

module.exports = {
    list,
    insert,
    get,
    update,
    deleteElement,
    query,
    queryList,
    listUserJoinArea,
    userjoinrol,
    listUserVotos,
    listUserIdVotos,
    lastElement
}