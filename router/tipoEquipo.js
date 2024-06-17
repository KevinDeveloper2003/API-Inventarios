const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validationResult, check } = require('express-validator');
const { valideJWT } = require('../middleware/valide-jwt');
const { valideRolAdmin } = require('../middleware/valide-admin-rol');

const router = Router();


// metodo para aniadir un nuevo tipo de equipo a la base de datos (validado)
router.post('/', [valideJWT, valideRolAdmin], [
  check('nombre', 'invalid.nombre').not().isEmpty(),
  check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])

], async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }


    let tipoEquipo = new TipoEquipo();
    tipoEquipo.nombre = req.body.nombre;
    tipoEquipo.estado = req.body.estado;


    tipoEquipo.fechaCreacion = new Date();
    tipoEquipo.fechaActualizacion = new Date();

    // Guarda el tipoEquipo en la base de datos
    tipoEquipo = await tipoEquipo.save();


    res.send(tipoEquipo);

  } catch (error) {
    console.error(error);
    res.status(500).send('Lo Sentimos, Ocurrió un error');
  }
});

// Ruta para obtener todos los tipoEquipos
router.get('/', [valideJWT, valideRolAdmin], async function (req, res) {
  try {
    const tipoEquipos = await TipoEquipo.find();
    res.send(tipoEquipos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Lo Sentimos, Ocurrió un error');
  }
});


// metodo para actualizar un tipo de equipo validado
router.put('/:tipoEquipoId', [valideJWT, valideRolAdmin], async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaje: errors.array() });
    }

    let tipoEquipo = await tipoEquipo.findById(req.params.tipoEquipoId);

    if (!tipoEquipo) {
      return res.status(400).send('Lo sentimos, TipoEquipo no existe');
    }

    tipoEquipo.nombre = req.body.nombre;
    tipoEquipo.estado = req.body.estado;
    tipoEquipo.fechaActualizacion = new Date();

    tipoEquipo = await tipoEquipo.save();

    res.send(tipoEquipo);

  } catch (error) {
    console.log(error);
    res.status(500).send('Los Sentimos, Ocurrió un error');
  }

});


// metodo para borrar un tipo de equipo
router.delete('/:deleteId', [valideJWT, valideRolAdmin], async (req, res) => {
  try {
    const tipoEquipo = await TipoEquipo.findByIdAndDelete(req.params.deleteId);

    if (!tipoEquipo) {
      return res.status(400).send('Lo Sentimos, TipoEquipo no existe');
    }

    res.send(tipoEquipo);
  } catch (error) {
    console.log(error);
    res.status(500).send('Lo sentimos, Ocurrió un error');
  }
});

module.exports = router;
