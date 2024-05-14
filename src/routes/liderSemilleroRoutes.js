const express = require("express");
const router = express.Router();
const liderSemilleroSchema = require("../models/liderSemillero"); //Modelo de lider de semillero

//Agregar verificacion de token
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");


//Endpoint para crear un nuevo semillero
router.post("/liderSemilleros", verifyToken, (req, res) => {
    const lider = liderSemilleroSchema(req.body);
    lider
        .save()
        .then((data) => res.json(data)) //Promesa de la petición then si no me devuelve algo positivo pues el catch me muestra el error 
        .catch((error) => res.json({ message: error }));
});

//Endpoint para Consultar todos los semilleros
router.get("/liderSemilleros", verifyToken, (req, res) => {
    liderSemilleroSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endopoint para Consultar un semillero en especifico
router.get("/liderSemilleros/:id", verifyToken, (req, res) => {
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

//Endpoint para Modificar un lider de semillero usando el id
router.put("/liderSemilleros/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { nombreLiderSemillero, nombreUniversidad, facultad, estado, fechaRegistro } = req.body;
    liderSemilleroSchema
        .updateOne(
            { _id: id },
            {
                $set: { nombreLiderSemillero, nombreUniversidad, facultad, estado, fechaRegistro},
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
router.delete("/liderSemilleros/:id", verifyToken, (req, res) => {
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