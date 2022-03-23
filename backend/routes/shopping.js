var express = require('express');
var router = express.Router();
const auth = require('../utils/auth');
const connection = require('../utils/connection');
const mysql = require('mysql2/promise');

router.get('/get_categories', function(req, res, next) {
    connection.query('SELECT * FROM category', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/get_products', async function(req, res, next) {
    // connection.query('SELECT * FROM product', (err, rows, fields) => {
    //     if (err) throw err;
    //     res.json(rows);
    // });
    const con = await mysql.createConnection({host:'localhost', user: 'root', password:'paultho', database: 'prac'});
    const [rows, fields] = await con.execute('SELECT * FROM product');
    res.json(rows);
});

router.get('/get_cart', auth.auth_jwt, async function(req, res, next)  {
    const access_token = req.headers.access_token;
    const {username} = auth.decode_jwt(access_token);
    const con = await mysql.createConnection({host:'localhost', user: 'root', password:'paultho', database: 'prac'});
    const [rows, fields] = await con.execute('SELECT id FROM customer WHERE username=?', [username]);
    if (rows.length === 0) {
        return res.status(401).json({error: 'This should not be here'});
    }
    const cust_id = rows[0].id;
    const [orders, _] = await con.execute('SELECT id FROM order_ WHERE customer_id=? AND status="Pending"', [cust_id]);
    if (orders.length === 0) {
        return res.json([]);
    }
    const ord_id = orders[0].id;
    const [cart, __] = await con.execute('SELECT * FROM orderitem WHERE order_id=?', [ord_id]);
    res.json(cart);
});

router.post('/add_item', auth.auth_jwt, async function(req, res, next) {
    const access_token = req.headers.access_token;
    const {username} = auth.decode_jwt(access_token);
    const {product_id, product_qty} = req.body;
    const con = await mysql.createConnection({host:'localhost', user: 'root', password:'paultho', database: 'prac'});
    const [rows, fields] = await con.execute('SELECT id FROM customer WHERE username=?', [username]);
    if (rows.length === 0) {
        return res.status(401).json({error: 'This should not be here'});
    }
    const cust_id = rows[0].id;
    const [orders, _] = await con.execute('SELECT id FROM order_ WHERE customer_id=? AND status="Pending"', [cust_id]);
    if (orders.length === 0) {
        const[orders, _] = await con.execute('INSERT INTO order_(customer_id, status) VALUES (?, "Pending"); SELECT id FROM order_ WHERE customer_id=? AND status="Pending"', [cust_id, cust_id]);
    }
    const ord_id = orders[0].id;
    const [price, __] = await con.execute('SELECT price FROM product WHERE id=?', [product_id]);
    await con.execute('INSERT INTO orderitem(product_id, order_id, product_qty, total_price) VALUES (?, ?, ?, ?)', [product_id, ord_id, product_qty, parseInt(price[0].price)*product_qty]);
    res.status(200).json({response: "Added " + product_id + "x" + product_qty + " to cart"});
});

router.post('/remove_item', auth.auth_jwt, async function(req, res, next) {
    const access_token = req.headers.access_token;
    const {username} = auth.decode_jwt(access_token);
    const {product_id} = req.body;
    const con = await mysql.createConnection({host:'localhost', user: 'root', password:'paultho', database: 'prac'});
    const sql = 'SELECT order_.id FROM customer INNER JOIN order_ ON customer.id = order_.customer_id WHERE order_.status="Pending" AND username=?';
    const [orders, _] = await con.execute(sql, [username]);
    const ord_id = orders[0].id;
    await con.execute("DELETE FROM orderitem WHERE product_id=? AND order_id=?", [product_id, ord_id]);
    res.status(200).json({response: "Removed " + product_id + " form cart"});
});

router.put('/checkout', auth.auth_jwt, async function(req, res, next) {
    const access_token = req.headers.access_token;
    const {username} = auth.decode_jwt(access_token);
    const con = await mysql.createConnection({host:'localhost', user: 'root', password:'paultho', database: 'prac'});
    const sql = 'SELECT order_.id FROM customer INNER JOIN order_ ON customer.id = order_.customer_id WHERE order_.status="Pending" AND username=?';
    const [orders, _] = await con.execute(sql, [username]);
    const ord_id = orders[0].id;
    await con.execute("UPDATE order_ SET status='Success' WHERE id=?", [ord_id]);
    res.status(200).json({response: "Checked out cart for " + username});
});

module.exports = router;