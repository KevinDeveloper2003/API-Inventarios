const { Router } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const {ingresarJWT} = require('../helpers/jwt');

const router = Router();

router.post('/', [
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),

], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).send('Lo sentimos, Usuario no encontrado');
        }


        //Validacion de contrasenias
        const esIgual = bcrypt.compareSync(req.body.password, usuario.password);
        if (!esIgual) { 
            return res.status(400).json({ mensaje: 'Lo sentimos, Usuario no encontrado' });
        }


// token JWT

const token = ingresarJWT(usuario)  ;

        res.json({
            _id: usuario._id, nombre: usuario. nombre,
            rol: usuario.rol, email: usuario. email, acces_token: token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Lo sentimos, Error interno del servidor' });
    }
});
    module.exports = router;