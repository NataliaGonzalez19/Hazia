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
    integrantes: {
        type: Array,
        required: true,
        of: {
            type: Object,
            required: true,
            properties: {
                nombre: {
                    type: String,
                    required: true,
                },
                correo: {
                    type: String,
                    required: true,
                },
                cedula: {
                    type: String,
                    required: true,
                },
                semillero: {
                    type:String,
                    required: true,
                }
            },
        },
    },


});

module.exports = mongoose.model("Semilleros", semilleroSchema);