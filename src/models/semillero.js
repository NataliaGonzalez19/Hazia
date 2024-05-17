const mongoose = require("mongoose");

const semilleroSchema = mongoose.Schema({

    codigo: {
        type: String,
        required: true,
    },
    liderSemillero: {
        type: String,
        require: true,
    },
    nombreSemillero: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        require: true,
    },
    fechaCreacion: {
        type: Date,
        require: true,
    },
    facultad: {
        type: String,
        require: true,
    },
    participantes: {
        type: String,
        require: true,
    },
    
});

module.exports = mongoose.model("Semilleros", semilleroSchema);