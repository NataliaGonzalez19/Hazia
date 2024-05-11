const express = require("express");
const router = express.Router();
const liderSemilleroSchema = require("../models/liderSemillero"); //Nuevo lider

//Agregar verificacion de token

//Endpoint para Nuevo Lider de Semillero
router.post("/liderSemillero", (req, res) => {
    const lider = liderSemilleroSchema(req.body);
    lider
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Endpoint para Consultar todos los lideres de semillero
router.get("/liderSemillero", (req, res) => {
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
router.get("/liderSemillero/:id", (req, res) => {
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
router.put("/liderSemillero/:id", (req, res) => {
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
router.delete("/liderSemillero/:id", (req, res) => {
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