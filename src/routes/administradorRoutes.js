const express = require("express");
const router = express.Router();
const administradorSchema = require("../models/administrador"); //Modelo de administrador
const semilleroSchema = require("../models/semillero"); //Modelo de semillero
const liderSemilleroSchema = require("../models/liderSemillero"); //Modelo de lider de semilero

//Agregar verificacion de token
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");


//Endpoint para Nuevo Administrador
router.post("/administradores", /*verifyToken,*/ (req, res) => {
    const admin = administradorSchema(req.body);
    admin
        .save()
        .then((data) => res.json(data)) 
        .catch((error) => res.json({ message: error }));
});

//Endpoint para nuevo Semillero
router.post("/semilleros", /*verifyToken,*/ (req, res) => {
    const semillero = semilleroSchema(req.body);
    semillero
        .save()
        .then((data) => res.json(data)) 
        .catch((error) => res.json({ message: error }));
});


//EndPoint para nuevo Lider de semillero
router.post("/liderSemilleros", /*verifyToken,*/ (req, res) => {
    const lider = liderSemilleroSchema(req.body);
    lider
        .save()
        .then((data) => res.json(data)) 
        .catch((error) => res.json({ message: error }));
});


//Endpoint para Consultar administrador
router.get("/administradores", /*verifyToken,*/ (req, res) => {
    administradorSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endpoint para Consultar semilleros
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


//Endpoint para Consultar lideres de semilleros
router.get("/liderSemilleros", /*verifyToken,*/ (req, res) => {
    liderSemilleroSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endopoint para Consultar semilleros por ID
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

//Endpoint para consultar lider de semillero por ID
router.get("/liderSemilleros/:id", /*verifyToken,*/ (req, res) => {
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

//Endpoint para Modificar un administrador usando el id
router.put("/administradores/:id", /*verifyToken,*/ (req, res) => {
    const { id } = req.params;
    const { nombreAdmin, edad, fechaRegistro, isAdmin, cargo } = req.body;
    administradorSchema
        .updateOne(
            { _id: id },
            {
                $set: { nombreAdmin, edad, fechaRegistro, isAdmin, cargo},
            }
        )
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endpoint para Modificar un semillero usando el id
router.put("/semilleros/:id", /*verifyToken,*/ (req, res) => {
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

//Endpoint para Modificar un lider de semillero usando el id
router.put("/liderSemilleros/:id", /*verifyToken,*/ (req, res) => {
    const { id } = req.params;
    const { nombreLiderSemillero, nombreUniversidad, facultad, estado, fechaRegistro } = req.body;
    semilleroSchema
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

//Endpoint para Eliminar administrador usando el id
router.delete("/administradores/:id", /*verifyToken,*/ (req, res) => {
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

//Endpoint para Eliminar semillero usando el id
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

//Endpoint para Eliminar lider de semillero usando el id
router.delete("/liderSemillero/:id", /*verifyToken,*/ (req, res) => {
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