const jwt = require('jsonwebtoken');

const valideJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token){
        return res.status(401).json({mesagge: 'Error no fue Autorizado'});
    }

    try {
        const payload = jwt.verify(token, '123456');
        req.payload = payload;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({mesagge: 'error de autorizacion, token no valido'});
    }
};

module.exports = {
    valideJWT
};