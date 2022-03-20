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

    connection.query('SELECT * FROM category', (err, rows, fields) => {
        if (err) {
            res.send('')
        }
        solution = rows[1].name;
        console.log('The solution is: ', rows[0].name)
    });

    connection.end();
    res.send('username: ' + user_name + "\npassword: " + passw);
});

module.exports = router;