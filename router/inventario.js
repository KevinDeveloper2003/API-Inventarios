const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validationResult, check } = require('express-validator');
const {valideJWT} = require('../middleware/valide-jwt');
const {valideRolAdmin} = require('../middleware/valide-admin-rol');

const router = Router();

// metodo para aniadir un inventario validado
router.post('/',[valideJWT, valideRolAdmin], [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('fechaCompra', 'invalid.fechaCompra').not().isEmpty(),
    check('precio', 'invalid.precio').not().not().isEmpty().isFloat({ min: 0 }),
    check('marca', 'invalid.marca').not().isEmpty(),
    check('usuario', 'invalid.usuario').not().isEmpty(),
    check('tipoEquipo', 'invalid.tipoEquipo').not().isEmpty(),
    check('estadoEquipo', 'invalid.estadoEquipo').not().isEmpty()
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
// chekamos si existe un inventario
        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
        if (existeInventarioPorSerial) {
            return res.status(400).send('serial ya existe para otro equipo');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id; //
        inventario.marca = req.body.marca._id; //
        inventario.estadoEquipo = req.body.estadoEquipo._id; //
        inventario.tipoEquipo = req.body.tipoEquipo._id; //
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        // Guarda el inventario en la base de datos
        inventario = await inventario.save();
        res.send(inventario);

    } catch (error) {
        console.error(error);
        res.status(500).send('Lo sentimos, ocurrio un error');
    }
});

// Ruta para obtener todos los inventarios
router.get('/', valideJWT,  async function (req, res) {
    try {
        const inventarios = await Inventario.find().populate([
            {
                path: 'usuario',
                select: 'nombre email estado'
            },
            {
                path: 'marca',
                select: 'nombre estado'
            },
            {
                path: 'estadoEquipo',
                select: 'nombre estado'
            },
            {
                path: 'tipoEquipo',
                select: 'nombre estado'}
            ]); 

        res.send(inventarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Lo sentimos, Ocurrió un error');
    }
});


// metodo para actualizar un inventario
router.put('/:inventarioId', [valideJWT, valideRolAdmin], async function (req, res) { 
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return res.status(400).json({mensaje: errors.array()});
      }
  
      let inventario = await Inventario.findById(req.params.inventarioId);
      if(!inventario){
          return res.status(400).send('Inventario no existe');
      }
  
      inventario.serial = req.body.serial;
      inventario.modelo = req.body.modelo;
      inventario.descripcion = req.body.descripcion;
      inventario.color = req.body.color;
      inventario.foto = req.body.foto;
      inventario.fechaCompra = req.body.fechaCompra;
      inventario.precio = req.body.precio;
      inventario.usuario = req.body.usuario._id; 
      inventario.marca = req.body.marca._id; 
      inventario.estadoEquipo = req.body.estadoEquipo._id; 
      inventario.tipoEquipo = req.body.tipoEquipo._id; 
      inventario.fechaActualizacion = new Date();
  
      inventario = await inventario.save();
  
      res.send(inventario);
  
    } catch (error) {
      console.log(error);
      res.status(500).send('Lo sentimos, Ocurrió un error');
    }
  
  });

  // metodo para eliminar el inventario
  router.delete('/:deleteId', [valideJWT, valideRolAdmin], async (req, res) => {
    try {
      const inventario = await Inventario.findByIdAndDelete(req.params.deleteId);
  
      if (!inventario) {
        return res.status(400).send('inventario no existe');
      }
  
      res.send(inventario);
    } catch (error) {
      console.log(error);
      res.status(500).send('Lo sentimos, Ocurrió un error');
    }
  });





module.exports = router;
