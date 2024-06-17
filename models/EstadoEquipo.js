const mongoose = require('mongoose');

const EstadoEquipoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },

    estado: {
        type: String, 
        required: true,
        enum:['Activo', 'Inactivo']
    },

    fechaCreacion: {
        type: Date, 
        required: true,
        default: Date.now,
    },

    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

module.exports = mongoose.model('EstadoEquipo', EstadoEquipoSchema);