const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'paultho',
    database: 'prac'
});

module.exports = connection;