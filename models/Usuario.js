const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: true,
    },

    email: {
        type: String, 
        required:true, 
        unique:true,
    },
    estado: {
        type: String, 
        required:true, 
        enum:['Activo', 'Inactivo']
    },

    password:{
        type: String, 
        required: true,
    },

    rol: {
        type:String, 
        required: true, 
        enum:['Administrador', 'Docente']
    },

    fechaCreacion: {
        type: Date, 
        required:true,
    },

    fechaActualizacion: {
        type: Date, 
        required: true,
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);