var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const auth = require('../utils/auth');
const connection = require('../utils/connection');


/* GET users listing. */
router.post('/', function(req, res, next) {
    let user_name = req.body.username;
    let passw = req.body.password;

    connection.query('SELECT username,password FROM customer WHERE username=? AND password=?', [user_name, passw], (err, rows, fields) => {
        if (err) throw err;
        if (rows.length > 0) {
            const verify_username = rows[0].username;
            const verify_password = rows[0].password;
            if (verify_username === user_name && verify_password === passw) {
                const token = auth.encode_jwt(user_name);
                res.json({token: token});
            } else {
                res.json({error: "This should not be here"});
            }
        } else {
            res.json({error: "User does not exist!"})
        }
    });
});

module.exports = router;