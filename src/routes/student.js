const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router(); //manejador de rutas de express
const perfilalumnoSchema = require("../models/perfilalumno");


//  definir los parametros de autenticacion y encriptacion de la clave del perfil estudiante


//Revisar esta forma de autenticarse https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
router.post("/register", async (req, res) => {
  const { usuario, correo ,codigo , cedula , clave } = req.body;
  const perfilalumno = new perfilalumnoSchema({
    usuario: usuario,
    correo: correo,
    codigo: codigo,
    cedula: cedula,
    clave: clave,
        });
        perfilalumno.clave = await perfilalumno.encryptClave(perfilalumno.clave);
        await perfilalumno.save(); //save es un método de mongoose para guardar datos en MongoDB //segundo parámetro: un texto que hace que el código generado sea único //tercer parámetro: tiempo de expiración (en segundos, 24 horas en segundos)
        //único //tercer parámetro: tiempo de expiración (en segundos, 24 horas en segundos)
//primer parámetro: payload - un dato que se agrega para generar el token
const token = jwt.sign({ id: perfilalumno._id }, process.env.SECRET, {
expiresIn: 60 * 60 * 24, //un día en segundos
});
res.json({
auth: true,
token,
});


  //  Validador inicio de sesion "Access estudiante"


//inicio de sesión

router.post("/access", async (req, res) => {
    // validaciones
    const { error } = perfilalumnoSchema.validate(req.body.codigo, req.body.clave);
    if (error) return res.status(400).json({ error: error.details[0].message });
    //Buscando el usuario por su dirección de correo
    const perfilalumno = await perfilalumnoSchema.findOne({ codigo: req.body.codigo });
    //validando si no se encuentra
    if (!perfilalumno) return res.status(400).json({ error: "Usuario no encontrado" });
    //Transformando la contraseña a su valor original para 
    //compararla con la clave que se ingresa en el inicio de sesión
    const validPassword = await bcrypt.compare(req.body.clave, perfilalumno.clave);
    if (!validPassword)
    return res.status(400).json({ error: "Clave no válida" });
    res.json({
    error: null,
    data: "Bienvenido alumno(a)"
     });
    });
    

});
module.exports = router;