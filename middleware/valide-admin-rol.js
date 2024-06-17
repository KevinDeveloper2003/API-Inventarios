const jwt = require('jsonwebtoken');

const valideRolAdmin = (req, res, next) => {
    if (req.payload.rol != 'Administrador') {
        return res.status(401).json({message: 'Error Unauthorized'});
    }
    next();

};

module.exports = {valideRolAdmin};