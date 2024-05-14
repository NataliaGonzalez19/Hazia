const express = require("express");
const router = express.Router(); //manejador de rutas de express
const semilleroSchema = require("../models/seeds");
const verifyToken = require('./student_token');

// 5 Commit peticiones de semilleros y datos de registro

//Nuevo Evento Post (Create)
router.post("/seeds", (req, res) => {
    const seed = semilleroSchema(req.body);
    seed
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Lectura Evento Get (Read)

router.get("/seeds", verifyToken , (req, res) => {
    ;
    semilleroSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.get("/seeds/:id", (req, res) => {
    const { id } = req.params;
    semilleroSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Actualizar Evento Put (Update)

router.put("/seeds/:id", (req, res) => {
    const { id } = req.params;
    const { código, 
        nombrecompleto,
        facultad,    
        programa, 
        semestre } = req.body;
    eventSchema
        .updateOne({ _id: id }, {
            $set: { código, 
                nombrecompleto,
                facultad,    
                programa, 
                semestre}
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Eliminar Evento Delete (Delete)

router.delete("/seeds/:id", (req, res) => {
    const { id } = req.params;
    semilleroSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});


module.exports = router;