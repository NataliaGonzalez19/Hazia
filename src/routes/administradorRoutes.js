const express = require("express");
const router = express.Router();
const liderSemilleroSchema = require("../models/administrador"); //Nuevo lider

//Agregar verificacion de token
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");


//Endpoint para Nuevo Administrador
router.post("/administradores", verifyToken, (req, res) => {
    const lider = liderSemilleroSchema(req.body);
    lider
        .save()
        .then((data) => res.json(data)) 
        .catch((error) => res.json({ message: error }));
});

//Endpoint para Consultar administrador
router.get("/administradores", verifyToken, (req, res) => {
    administradorSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endopoint para Consultar un administrador
router.get("/administradores/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    administradorSchema
        .findOne({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endpoint para Modificar un administrador usando el id
router.put("/administradores/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { nombreSemillero, descripcion, liderSemillero, fechaCreacion, estado, participantes} = req.body;
    administradorSchema
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

//Endpoint para Eliminar un administrador usando el id
router.delete("/administradores/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    administradorSchema
        .findByIdAndDelete({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

module.exports = router;