const express = require("express");
const router = express.Router();
const semilleroSchema = require("../models/semillero"); //Modelo de semillero

//Agregar verificacion de token
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");


//Endpoint para crear un nuevo semillero
router.post("/semilleros", /*verifyToken,*/ (req, res) => {
    const lider = semilleroSchema(req.body);
    lider
        .save()
        .then((data) => res.json(data)) //Promesa de la petición then si no me devuelve algo positivo pues el catch me muestra el error 
        .catch((error) => res.json({ message: error }));
});

//Endpoint para Consultar todos los semilleros
router.get("/semilleros", /*verifyToken,*/ (req, res) => {
    semilleroSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endopoint para Consultar un semillero en especifico
router.get("/semilleros/:id", /*verifyToken,*/ (req, res) => {
    const { id } = req.params;
    semilleroSchema
        .findOne({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endpoint para Modificar un semillero
router.put("/semilleros/:id", /*verifyToken,*/ (req, res) => {
    const { id } = req.params;
    const { nombreSemillero, descripcion, liderSemillero, fechaCreacion, estado, participantes} = req.body;
    semilleroSchema
        .updateOne(
            { _id: id },
            {
                $set: { nombreSemillero, descripcion, liderSemillero, fechaCreacion, estado, participantes},
            }
        )
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endpoint para Eliminar un semillero
router.delete("/semilleros/:id", /*verifyToken,*/ (req, res) => {
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