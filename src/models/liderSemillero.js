const mongoose = require("mongoose");

const liderSemilleroSchema = mongoose.Schema({

    nombreLiderSemillero: {
        type: String,
        require: true,
    },
    correo: {
        type: String,
        require: true,
    },
    semillero: {
        type: String,
        require: true,
    },
    facultad: {
        type: String,
        require: true,
    },
    estado: {
        type: Boolean,
        require: true,
    },
    fechaRegistro: {
        type: Date,
        require: true,
    },


});

module.exports = mongoose.model("LiderSemillero", liderSemilleroSchema);