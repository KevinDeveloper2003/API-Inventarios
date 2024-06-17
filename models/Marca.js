const mongoose = require('mongoose');

const MarcaSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: true
    },

    estado: {
        type: String, 
        required:true, 
        enum:['Activo', 'Inactivo']
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

module.exports = mongoose.model('Marca', MarcaSchema);