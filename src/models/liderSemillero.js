const mongoose = require("mongoose");

const liderSemilleroSchema = mongoose.Schema({

    nombreLiderSemillero: {
        type: String,
        require: true,
    },
    correo: {
        type: String,
        require: false,
    },
    semillero: {
        type: String,
        require: false,
    },
    facultad: {
        type: String,
        require: false,
    },
    estado: {
        type: Boolean,
        require: false,
    },
    fechaRegistro: {
        type: Date,
        require: false,
    },


});

module.exports = mongoose.model("LiderSemillero", liderSemilleroSchema);