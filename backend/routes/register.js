var express = require('express');
var router = express.Router();
const connection = require('../utils/connection');


/* GET users listing. */
router.post('/', function(req, res, next) {
    let user_name = req.body.username;
    let passw = req.body.password;

    connection.query('INSERT INTO customer(username, password) VALUES (?, ?)', [user_name, passw], (err, rows, fields) => {
        if (err) {
            res.send('User already exists!');
        } else {
            res.send('user with username: ' + user_name + ' and password: ' + passw + ' has been successfully inserted');
        }
    });

});

module.exports = router;