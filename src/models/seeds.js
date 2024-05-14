//Definir datos de semillero

const mongoose = require("mongoose"); // importando el componente mogoose
const seedsSchema = mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
    },
    nombrecompleto: {
        type: String,
        required: true,
    },
    facultad: {
        type: String,
        required: true,
    },
    programa: {
        type: String,
        required: true,
    },
    semestre: {
        type: Number,
        required: true,
    },
    
});
module.exports = mongoose.model("Seeds", seedsSchema);