const mysql = require('mysql2');

const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'prac'
});

module.exports = connection;