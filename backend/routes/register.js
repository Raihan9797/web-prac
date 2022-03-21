var express = require('express');
var router = express.Router();
const mysql = require('mysql');


/* GET users listing. */
router.post('/', function(req, res, next) {
    let user_name = req.body.username;
    let passw = req.body.password;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'paultho',
        database: 'prac'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });

    connection.query('INSERT INTO customer(username, password) VALUES (?, ?)', [user_name, passw], (err, rows, fields) => {
        if (err) {
            res.send('User already exists!');
        } else {
            res.send('user with username: ' + user_name + ' and password: ' + passw + ' has been successfully inserted');
        }
    });

    connection.end();
});

module.exports = router;