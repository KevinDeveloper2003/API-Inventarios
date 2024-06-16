const jwt = require('jsonwebtoken');

const valideRoplAdmin = (req, res, next) => {
    if (req.payload.rol != 'administrador') {
        return res.status(401).json({message: 'Error Unauthorized'});
    }
    next();

};

module.exports = {
    valideRoplAdmin
};