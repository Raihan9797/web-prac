const mysql = require('mysql2');

const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'paultho',
    database: 'prac'
});

module.exports = connection;