var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'paultho',
    database: 'prac'
});

let solution = 0;

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM category', (err, rows, fields) => {
    if (err) throw err;
    solution = rows[0].name;
    console.log('The solution is: ', rows[0].name)
});

connection.end();



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('the solution is: ' + solution);
});

module.exports = router;