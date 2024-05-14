const mongoose = require("mongoose");

const administradorSchema = mongoose.Schema({

    nombreAdmin: {
        type: String,
        require: true,
    },
    edad: {
        type: String,
        require: true,
    },
    fechaRegistro: {
        type: Date,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
    },
    cargo: {
        type: String,
        require: true,
    },

    
});

module.exports = mongoose.model("Admnistradores", administradorSchema);