const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '30d',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Error al crear token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generateJWT,
};