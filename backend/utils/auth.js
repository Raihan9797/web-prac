const jwt = require('jsonwebtoken');
const connection = require('./connection');

const JWT_SECRET = process.env.JWT_SECRET || 'helloiamsecret';

const encode_jwt = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
}

const decode_jwt = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

const auth_jwt = (req, res, next) => {
    const access_token = req.headers.access_token;
    const {username} = decode_jwt(access_token);
    connection.query('SELECT username FROM customer WHERE username=?', [username], (err, rows, fields) => {
        if (err) throw err;
        if (rows.length > 0) {
            const verify_username = rows[0].username;
            if (verify_username === username) {
                next();
            } else {
                return res.json({error: "This should not be here"});
            }
        } else {
            return res.json({error: "Unauthorized"})
        }
    });
};

module.exports = {
    encode_jwt: encode_jwt,
    decode_jwt: decode_jwt,
    auth_jwt: auth_jwt
}