const mongoose = require("mongoose"); // importando el componente mogoose
const bcrypt = require("bcrypt"); // importando el componente bcrypt


 //  Designar credenciales para perfil alumno


const perfilalumnoSchema = mongoose.Schema({
usuario: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  codigo: {
    type: Number,
    required: true,
  },
  cedula: {
    type: Date,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  }, 
});
perfilalumnoSchema.methods.encryptClave = async(clave) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(clave, salt);
};
module.exports = mongoose.model("Perfilalumno", perfilalumnoSchema);