<<<<<<< HEAD
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
router.get("/administradores , dsadasda ", verifyToken, (req, res) => {
    administradorSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Endopoint para Consultar administrador
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

=======
const express = require("express");
const router = express.Router();
const administradorSchema = require("../models/administrador"); //Modelo de administrador

//Agregar verificacion de token
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");


//Endpoint para Nuevo Administrador
router.post("/administradores", verifyToken, (req, res) => {
    const admin = administradorSchema(req.body);
    admin
        .save()
        .then((data) => res.json(data)) 
        .catch((error) => res.json({ message: error }));
});

//Endpoint para Consultar administradores
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

//Endpoint para Consultar administradores por ID
router.get("/administradores/:id", verifyToken, (req, res) => {
    administradorSchema
        .find()
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

//Endpoint para Eliminar administrador usando el id
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

>>>>>>> 1c54d764c4d7893269522516c539caea314a92a3
module.exports = router;