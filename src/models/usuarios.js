const mongoose = require("mongoose"); // importando el componente mongoose
const bcrypt = require("bcrypt"); // importando el componente bcrypt

//Se crea el schema que tendra los datos de usuario
const usuariosSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    clave: {
        type: String,
        required: true,
    },
    cedula: {
        type: String,
        required: true,
    },
    fechaRegistro: {
        type: Date,
        required: true,
    },
    rol: {
        type: String, //1: Admin 2: Lider de Semillero 3: Estudiante
        required: true,
    },

});

//Funcion para la encriptacion de la contraseña
usuariosSchema.methods.encryptClave = async (clave) => {
    const salt = await bcrypt.genSalt(10); //El proceso de encriptacion se hara 10 veces
    return bcrypt.hash(clave, salt); //Retorna la contraseña encriptada
};

//Se exporta el modelo User a Mongo 
module.exports = mongoose.model("Usuarios", usuariosSchema);