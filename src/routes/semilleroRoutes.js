const express = require("express");
const router = express.Router();
const semilleroSchema = require("../models/semillero"); //Modelo de semilleros
const usuariosSchema = require("../models/usuarios"); //Modelo de semilleros

//Agregar verificacion de token
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");


//Registrar un nuevo semillero (solo lo puede hacer el ADMIN)
router.post("/registroSemillero", /*verifyToken,*/ async (req, res) => {
    const { codigo, liderSemillero, nombreSemillero, descripcion, facultad } = req.body;

    const moment = require('moment');
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    const semillero = new semilleroSchema({
        codigo: codigo,
        liderSemillero: liderSemillero,
        nombreSemillero: nombreSemillero,
        descripcion: descripcion,
        facultad: facultad, //El rol para lider sera el numero 2 en Mongo
        fechaRegistro: fechaActual, //Obtener la fecha y hora de registro del lider
    });

    await semillero.save(); //save es un método de mongoose para guardar datos en MongoDB //segundo parámetro: un texto que hace que el código generado sea único //tercer parámetro: tiempo de expiración (en segundos, 24 horas en segundos)
    //primer parámetro: payload - un dato que se agrega para generar el token
    res.json({
        auth: true,
        semillero,
    });
});

//Metodo Post para realizar el registro de un estudiante en un semillero
router.put("/semilleros/:id/estudiantes", /*verifyToken,*/ async (req, res) => {

    const idSemillero = req.params.id;
    const semillero = await semilleroSchema.findOne({ _id: idSemillero });

    if (!semillero) {
        return res.status(404).json({ message: "Semillero no encontrado" });
    }

    const { correo } = req.body;
    const estudianteEncontrado = await usuariosSchema.findOne({ correo, rol: 3 });

    if (!estudianteEncontrado) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    if (estudianteEncontrado.rol !== 3) {
        return res.status(400).json({ message: "El usuario no es un estudiante" });
    }


    const idEstudiante = estudianteEncontrado._id;

    semilleroSchema
        .updateOne({ _id: idSemillero }, {
            $addToSet: { integrantes: idEstudiante }
        })
        .then((data) => res.json(data))
        .catch((error) => {
            res.json({ message: error });
        });

    /*const nombreEstudiante = estudianteEncontrado.nombre;
    const cedulaEstudiante = estudianteEncontrado.cedula;
    const nombreSemillero = semillero.nombreSemillero;*/

    /*const nuevoEstudiante = {
        idEstudiante: idEstudiante,
        nombre: nombreEstudiante,
        correo,
        cedula: cedulaEstudiante,
        semillero: nombreSemillero,
    };*/

    // Guardar el estudiante encontrado (opcional)
    //await nuevoEstudiante.save();

    /*const participantesExistentes = semillero.integrantes;
    participantesExistentes.push(idEstudiante);

    await semillero.updateOne({
        integrantes: participantesExistentes,
    });

    res.json({ message: "Estudiante registrado correctamente" });*/
});

//Actualizar un integrante de un semillero
router.put("/semilleros/:id/estudiantes/:idEstudiante", /*verifyToken,*/ async (req, res) => {
    
    // Obtener fecha y hora actual de la actualización
    const moment = require('moment');
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    // Obtener ID del semillero y del estudiante a actualizar
    const idSemillero = req.params.id;
    const idEstudiante = req.params.idEstudiante;

    // Buscar el estudiante a actualizar
    const estudianteEncontrado = await usuariosSchema.findOne({ _id: idEstudiante, rol: 3 });

    // Verificar si el estudiante existe
    if (!estudianteEncontrado) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    // Validar datos de entrada (formato, restricciones, etc.)
    const { nombre, correo, clave, cedula } = req.body;

    // Validar datos de entrada (formato, restricciones, etc.)

    // Actualizar la información del estudiante en la colección `usuarios`
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

    // Buscar el semillero al que pertenece el estudiante
    const semillero = await semilleroSchema.findOne({ _id: idSemillero });

    // Verificar si el semillero existe
    if (!semillero) {
        return res.status(404).json({ message: "Semillero no encontrado" });
    }

    // Obtener el array de participantes del semillero
    const participantesExistentes = semillero.integrantes;

    // Actualizar el array de participantes del semillero
    const indiceEstudiante = participantesExistentes.findIndex(integrantes => integrantes.idEstudiante === idEstudiante);

    if (indiceEstudiante !== -1) {
        participantesExistentes[indiceEstudiante] = {
            idEstudiante: idEstudiante,
            nombre,
            correo,
            cedula,
            semillero: idSemillero,
        };
    } else {
        participantesExistentes.push({
            idEstudiante: idEstudiante,
            nombre,
            correo,
            cedula,
            semillero: idSemillero,
        });
    }

    // Guardar los cambios en el semillero
    await semilleroSchema.updateOne(
        { _id: idSemillero },
        {
            integrantes: participantesExistentes,
        }
    );

    // Enviar respuesta de éxito
    res.json({ message: "Estudiante actualizado correctamente" });
});

//Consultar todos los semilleros
router.get("/semilleros", verifyToken, (req, res) => {
    semilleroSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Consultar un semillero en especifico
router.get("/semilleros/:id", /*verifyToken,*/(req, res) => {
    semilleroSchema
        .findOne( {_id: req.params.id } )
        .populate({
            path: 'integrantes',
            select: 'nombre correo'
        })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Actualizar un semillero en especifico (Solo lo podran hacer tanto el ADMIN como el LIDER DE SEMILLERO)
router.put("/actualizarSemilleros/:id", /*verifyToken,*/(req, res) => {

    //Actualizacion de la fecha y la hora de edicion del registro
    const moment = require('moment');
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');

    const { id } = req.params;
    const { codigo, liderSemillero, nombreSemillero, descripcion, facultad } = req.body;

    semilleroSchema
        .updateOne(
            { _id: id },
            {
                $set: {
                    codigo,
                    liderSemillero,
                    nombreSemillero,
                    descripcion,
                    facultad,
                    fechaCreacion: fechaActual,
                },
            }
        )
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Eliminar un semillero en especifico (Solo lo podran utilizar el rol de ADMIN y de LIDER DE SEMILLERO)
router.delete("/eliminarSemilleros/:id", /*verifyToken,*/(req, res) => {
    const { id } = req.params;

    semilleroSchema
        .findByIdAndDelete({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

module.exports = router;