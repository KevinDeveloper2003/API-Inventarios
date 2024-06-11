const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo'); 
const { validationResult, check } = require('express-validator');
const {validarJWT} = require('../middleware/validar-jwt');
const {validarRolAdmin} = require('../middleware/validar-rol-admin');

const router = Router();

router.post('/',[validarJWT, validarRolAdmin], [
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
    res.status(500).send('ocurrio un error');
  }
});

// Ruta para obtener todos los estados de Equipos
router.get('/', [validarJWT, validarRolAdmin], async function (req, res) {
  try {
    const estadoEquipos = await EstadoEquipo.find();
    res.send(estadoEquipos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrió un error');
  }
});

router.put('/:estadoEquipoId', [validarJWT, validarRolAdmin], [
  check('nombre', 'invalid.nombre').not().isEmpty(),
  check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])
], async function (req, res) {
  try {
    // Validar la expresion usando express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaje: errors.array() }); 
    }

    // buscar el Estado de Equipo por su ID
    let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

    // rectificar si estadoequipo existe
    if (!estadoEquipo) {
      return res.status(400).send('Estado equipo no existe');
    }

    // Actualizar las propiedades de estado equipo
    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaActualizacion = new Date();

    // guaradar el nuevo estado equipo actualizado en la BD
    estadoEquipo = await estadoEquipo.save();

    // enviar el estadoequipo actualizado como una respuesta
    res.send(estadoEquipo);

  } catch (error) {
     console.error(error);
    res.status(500).send('Ocurrió un error');
  }
});

//borrar el estadoEquipo
router.delete('/:deleteId', [validarJWT, validarRolAdmin], async (req, res) => {
  try {
    const estadoEquipo = await EstadoEquipo.findByIdAndDelete(req.params.deleteId);

    if (!estadoEquipo) {
      return res.status(400).send('estadoEquipo no existe');
    }

    // enviar el estadoequipo actualizado como una respuesta
    res.send(estadoEquipo);

  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrió un error');
  }
});



module.exports = router;