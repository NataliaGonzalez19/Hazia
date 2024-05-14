const mongoose = require("mongoose");

const semilleroSchema = mongoose.Schema({

    nombreSemillero: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        require: true,
    },
    liderSemillero: {
        type: String,
        require: true,
    },
    fechaCreacion: {
        type: Date,
        require: true,
    },
    estado: {
        type: Boolean,
        require: true,
    },
    participantes: {
        type: Date,
        require: true,
    },
    
});

module.exports = mongoose.model("Semilleros", semilleroSchema);