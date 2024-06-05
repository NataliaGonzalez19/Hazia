const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router(); //manejador de rutas de express
const usuariosSchema = require("../models/usuarios");
const semilleroSchema = require("../models/semillero");
const jwt = require("jsonwebtoken");
const verifyToken = require("./validate_token");

//Revisar esta forma de autenticarse https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
router.post("/signup", async (req, res) => {
    const { nombre, correo, clave, cedula } = req.body;

    const moment = require('moment');
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    const estudiante = new usuariosSchema({
        nombre: nombre,
        correo: correo,
        clave: clave,
        cedula: cedula,
        rol: 3, //El rol para Estudiante sera el numero 3 en Mongo
        fechaRegistro: fechaActual, //Obtener la fecha y la hora de registro del estudiante
    });
    estudiante.clave = await estudiante.encryptClave(estudiante.clave);
    await estudiante.save(); //save es un método de mongoose para guardar datos en MongoDB //segundo parámetro: un texto que hace que el código generado sea único //tercer parámetro: tiempo de expiración (en segundos, 24 horas en segundos)
    //primer parámetro: payload - un dato que se agrega para generar el token
    res.json({
        auth: true,
        estudiante,
    });

    console.log('Registro de nuevo estudiante');

});

//inicio de sesión
router.post("/login", async (req, res) => {
    // validaciones
    const { error } = usuariosSchema.validate(req.body.correo, req.body.clave);
    if (error) return res.status(400).json({ error: error.details[0].message });
    //Buscando el usuario por su dirección de correo
    const user = await usuariosSchema.findOne({ correo: req.body.correo });

    //validando si no se encuentra
    if (!user)
        return res.status(400).json({ error: "Usuario o clave incorrectos" });

    //Transformando la contraseña a su valor original para
    //compararla con la clave que se ingresa en el inicio de sesión
    const validPassword = await bcrypt.compare(req.body.clave, user.clave);
    let accessToken = null;
    if (!validPassword) {
        return res.status(400).json({ error: "Usuario o clave incorrectos" });
    } else {
        const expiresIn = 24 * 60 * 60;
        accessToken = jwt.sign(
            { id: user.id },
            process.env.SECRET, {
            expiresIn: expiresIn
        });

        /*res.json({
        id: user._id,
        usuario: user.usuario,
        correo: user.correo,
        clave: user.clave,
        accessToken: accessToken,
        expiresIn: expiresIn,
        });*/
        res.json({ accessToken,
            rol: user.rol
        });
    }
});

//POST para registro de Administradores
router.post("/registroAdministrador", /*verifyToken,*/ async (req, res) => {
    const { nombre, correo, clave, cedula } = req.body;

    const moment = require('moment');
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    const admin = new usuariosSchema({
        nombre: nombre,
        correo: correo,
        clave: clave,
        cedula: cedula,
        rol: 1, //El rol para lider sera el numero 2 en Mongo
        fechaRegistro: fechaActual, //Obtener la fecha y hora de registro del lider
    });

    admin.clave = await admin.encryptClave(admin.clave);
    await admin.save(); //save es un método de mongoose para guardar datos en MongoDB //segundo parámetro: un texto que hace que el código generado sea único //tercer parámetro: tiempo de expiración (en segundos, 24 horas en segundos)
    //primer parámetro: payload - un dato que se agrega para generar el token
    res.json({
        auth: true,
        admin,
    });
});

//POST para registro de lideres de Semillero
router.post("/registroLider", /*verifyToken,*/ async (req, res) => {
    const { nombre, correo, clave, cedula } = req.body;

    const moment = require('moment');
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    const lider = new usuariosSchema({
        nombre: nombre,
        correo: correo,
        clave: clave,
        cedula: cedula,
        rol: 2, //El rol para lider sera el numero 2 en Mongo
        fechaCreacion: fechaActual, //Obtener la fecha y hora de registro del lider
    });

    lider.clave = await lider.encryptClave(lider.clave);
    await lider.save(); //save es un método de mongoose para guardar datos en MongoDB //segundo parámetro: un texto que hace que el código generado sea único //tercer parámetro: tiempo de expiración (en segundos, 24 horas en segundos)
    //primer parámetro: payload - un dato que se agrega para generar el token
    res.json({
        auth: true,
        lider,
    });
});

//Consultar los Administradores que existen
router.get("/administradores", /*verifyToken,*/ async (req, res) => {

    // Buscar todos los líderes de semillero
    const admins = await usuariosSchema.find({ rol: 1 });
    res.json(admins);

});


//Consultar los lideres de semilleros que existen
router.get("/lideres", /*verifyToken,*/ async (req, res) => {

    // Buscar todos los líderes de semillero
    const lideres = await usuariosSchema.find({ rol: 2 });
    res.json(lideres);

});

//Consultar la informacion de solo un lider de semillero
router.get("/liderID/:id", /*verifyToken,*/ async (req, res) => {

    // Buscar al lider de semillero
    const idLider = req.params.id;
    const lider = await usuariosSchema.findOne({ _id: idLider, rol: 2 });

    if (!lider) {
        return res.status(404).json({ message: "Líder no encontrado" });
    }

    res.json(lider);
});

//Actualizar la informacion sobre un lider
router.put("/actualizarLider/:id", /*verifyToken,*/ async (req, res) => {

    //Obtener fecha y hora actual de la actualizacion
    const moment = require('moment');
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    const idLider = req.params.id;
    const lider = await usuariosSchema.findOne({ _id: idLider, rol: 2 });

    if (!lider) {
        return res.status(404).json({ message: "Líder no encontrado" });
    }

    try {

        const { nombre, correo, clave, cedula } = req.body;

        // Validar datos de entrada (formato, restricciones, etc.)

        await usuariosSchema.updateOne(
            { _id: idLider },
            {
                $set: {
                    nombre,
                    correo,
                    clave,
                    cedula,
                    rol: 2,
                    fechaRegistro: fechaActual,
                },
            }
        );

        res.json({ message: "Líder actualizado correctamente" });

    } catch (error) {
        res.json({ message: error });
        res.status(500).json({ message: "Error al actualizar el líder" });
    }

});

//Actualizar la informacion sobre un admin
router.put("/actualizarAdministrador/:id", /*verifyToken,*/ async (req, res) => {

    //Obtener fecha y hora actual de la actualizacion
    const moment = require('moment');
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    const idAdmin = req.params.id;
    const admin = await usuariosSchema.findOne({ _id: idAdmin, rol: 1 });

    if (!admin) {
        return res.status(404).json({ message: "Administrador no encontrado" });
    }

    try {

        const { nombre, correo, clave, cedula } = req.body;

        // Validar datos de entrada (formato, restricciones, etc.)

        await usuariosSchema.updateOne(
            { _id: idAdmin },
            {
                $set: {
                    nombre,
                    correo,
                    clave,
                    cedula,
                    rol: 1,
                    fechaRegistro: fechaActual,
                },
            }
        );

        res.json({ message: "Administrador actualizado correctamente" });

    } catch (error) {
        res.json({ message: error });
        res.status(500).json({ message: "Error al actualizar el Administrador" });
    }

});

//Actualizar los datos de un estudiante
router.put("/actualizarEstudiante/:id", /*verifyToken,*/ async (req, res) => {

    //Obtener fecha y hora actual de la actualizacion
    const moment = require('moment');
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    const idEstudiante = req.params.id;
    const estudiante = await usuariosSchema.findOne({ _id: idEstudiante, rol: 3 });

    if (!estudiante) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    try {

        const { nombre, correo, clave, cedula } = req.body;

        // Validar datos de entrada (formato, restricciones, etc.)

        await usuariosSchema.updateOne(
            { _id: idEstudiante },
            {
                $set: {
                    nombre,
                    correo,
                    clave,
                    cedula,
                    rol: 3,
                    fechaRegistro: fechaActual,
                },
            }
        );

        res.json({ message: "Estudiante actualizado correctamente" });

    } catch (error) {
        res.json({ message: error });
        res.status(500).json({ message: "Error al actualizar el Estudiante" });
    }

});

//Eliminar un lider de semillero
router.delete("/eliminarLider/:id", /*verifyToken,*/ async (req, res) => {

    const idLider = req.params.id;
    const lider = await usuariosSchema.findOne({ _id: idLider, rol: 2 });

    if (!lider) {
        return res.status(404).json({ message: "Líder no encontrado" });
    }

    try {

        // Validar datos de entrada (formato, restricciones, etc.)

        await usuariosSchema.findByIdAndDelete(
            { _id: idLider },
        );

        res.json({ message: "Se elimino el líder correctamente." });

    } catch (error) {
        res.json({ message: error });
        res.status(500).json({ message: "Error al eliminar el líder" });
    }
});

//Eliminar un estudiante
router.delete("/eliminarEstudiante/:id", /*verifyToken,*/ async (req, res) => {

    const idEstudiante = req.params.id;
    const estudiante = await usuariosSchema.findOne({ _id: idLider, rol: 3 });

    if (!estudiante) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    try {

        // Validar datos de entrada (formato, restricciones, etc.)

        await usuariosSchema.findByIdAndDelete(
            { _id: idEstudiante },
        );

        res.json({ message: "Se elimino el estudiante correctamente." });

    } catch (error) {
        res.json({ message: error });
        res.status(500).json({ message: "Error al eliminar el estudiante" });
    }
});

module.exports = router;