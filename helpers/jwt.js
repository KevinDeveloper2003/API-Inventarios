const jwt = require('jsonwebtoken');

const ingresarJWT = (usuario) => {

    const payload = {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password,
        rol: usuario.rol,
        estado: usuario.estado 
    };
    const token = jwt.sign(payload, '654321', {expiresIn: '1h'});
    return token;
};

module.exports = {
    ingresarJWT
};