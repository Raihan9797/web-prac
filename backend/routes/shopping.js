var express = require('express');
var router = express.Router();
const auth = require('../utils/auth');
const connection = require('../utils/connection');

router.get('/get_categories', function(req, res, next) {
    connection.query('SELECT * FROM category', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/get_products', function(req, res, next) {
    connection.query('SELECT * FROM product', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
});

// router.get('/get_cart', auth.auth_jwt, function(req, res, next)  {
//     connection.query()
// });

module.exports = router;