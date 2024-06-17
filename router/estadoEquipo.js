const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo'); 
const { validationResult, check } = require('express-validator');
const {valideJWT} = require('../middleware/valide-jwt');
const {valideRolAdmin} = require('../middleware/valide-admin-rol');

const router = Router();

router.post('/',[valideJWT, valideRolAdmin], [
  check('nombre', 'invalid.nombre').not().isEmpty(),
  check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])

], async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() }); 
    }

    
    let estadoEquipo = new EstadoEquipo(); 
    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;


    estadoEquipo.fechaCreacion = new Date();
    estadoEquipo.fechaActualizacion = new Date();

    // Guarda el estadoEquipo en la base de datos
    estadoEquipo = await estadoEquipo.save();

    
    res.send(estadoEquipo);

  } catch (error) {
    console.error(error);
    res.status(500).send('Lo sentimos, ocurrio un error');
  }
});

// Ruta para obtener todos los estadoEquipos
router.get('/', [valideJWT, valideRolAdmin], async function (req, res) {
  try {
    const estadoEquipos = await EstadoEquipo.find();
    res.send(estadoEquipos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Lo sentimos, Ocurrió un error');
  }
});

router.put('/:estadoEquipoId', [valideJWT, valideRolAdmin], [
  check('nombre', 'invalid.nombre').not().isEmpty(),
  check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])
], async function (req, res) {
  try {
    // validar la Peticion usando ExpressValidator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaje: errors.array() }); 
    }

    // buscar estadoEquipo por ID
    let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

    // verificar si estadoEquipo existe
    if (!estadoEquipo) {
      return res.status(400).send('Estado equipo no existe');
    }

    // Actualizar Estado Equipo
    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaActualizacion = new Date();

    // guardar la Actualizacion en la base de datos
    estadoEquipo = await estadoEquipo.save();

    // enviar la respuesta de estado equipo a la BD
    res.send(estadoEquipo);

  } catch (error) {
     console.error(error);
    res.status(500).send('Lo sentimos, Ocurrió un error');
  }
});

router.delete('/:deleteId', [valideJWT, valideRolAdmin], async (req, res) => {
  try {
    const estadoEquipo = await EstadoEquipo.findByIdAndDelete(req.params.deleteId);

    if (!estadoEquipo) {
      return res.status(400).send('estadoEquipo no existe');
    }

    res.send(estadoEquipo);

  } catch (error) {
    console.log(error);
    res.status(500).send('Lo sentimos, Ocurrió un error');
  }
});



module.exports = router;