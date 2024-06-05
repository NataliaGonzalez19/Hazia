const mongoose = require("mongoose");
const usuarios = require("./usuarios");

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
    integrantes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios'}]
});

module.exports = mongoose.model("Semilleros", semilleroSchema);