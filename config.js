require('dotenv').config();

module.exports = {
    dev: process.env.NODE_ENV !== 'production',
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB
    }
}