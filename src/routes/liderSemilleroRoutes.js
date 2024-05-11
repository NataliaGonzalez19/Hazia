const express = require("express");
const router = express.Router();
const liderSemilleroSchema = require("../models/liderSemillero"); //Nuevo lider

//Agregar verificacion de token
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");


//Endpoint para Nuevo Lider de Semillero
router.post("/lideres", verifyToken, (req, res) => {
    const lider = liderSemilleroSchema(req.body);
    lider
        .save()
        .then((data) => res.json(data)) //Promesa de la petición then si no me devuelve algo positivo pues el catch me muestra el error 
        .catch((error) => res.json({ message: error }));
});

//Endpoint para Consultar todos los lideres de semillero
router.get("/lideres", verifyToken, (req, res) => {
    liderSemilleroSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endopoint para Consultar un lider de Semillero
router.get("/lideres/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    liderSemilleroSchema
        .findOne({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endpoint para Modificar un lider usando el id
router.put("/lideres/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { nombreLiderSemillero, correo, semillero, facultad, estado, fechaRegistro} = req.body;
    liderSemilleroSchema
        .updateOne(
            { _id: id },
            {
                $set: { nombreLiderSemillero, correo, semillero, facultad, estado, fechaRegistro},
            }
        )
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endpoint para Eliminar un lider usando el id
router.delete("/lideres/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    liderSemilleroSchema
        .findByIdAndDelete({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

module.exports = router;