const express = require("express");
const router = express.Router();
const semilleroSchema = require("../models/semillero"); //Modelo de semilleros

//Agregar verificacion de token
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");


//Endpoint para Nuevo semillero
router.post("/semilleros", verifyToken, (req, res) => {
    const semillero = semilleroSchema(req.body);
    semillero
        .save()
        .then((data) => res.json(data)) 
        .catch((error) => res.json({ message: error }));
});

//Endpoint para Consultar semilleros
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

//Endpoint para Consultar semillero por ID
router.get("/semilleros/:id", verifyToken, (req, res) => {
    semilleroSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});


//Endpoint para Modificar un semillero usando el id
router.put("/semilleros/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { nombreSemillero, descripcion, liderSemillero, fechaCreacion, estado, participantes } = req.body;
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

//Endpoint para Eliminar administrador usando el id
router.delete("/semilleros/:id", verifyToken, (req, res) => {
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