const parser = require("body-parser"); //parser transforma la respuesta en .json
const express = require('express');
const app = express();
const port = 3000;

const liderSemillero = require("./routes/liderSemilleroRoutes");
const authRoutes = require("./routes/authentication");
const administrador = require("./routes/administradorRoutes");

const mongoose = require("mongoose");
require('dotenv').config(); //dotenv para las variables de entorno

app.use(parser.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(parser.json()); // transforma los datos a formato JSON

//Gestión de las rutas usando el middleware
app.use("/api", liderSemillero); //Ruta hacia el modulo de lideres de semillero
app.use("/api", authRoutes); //Ruta hacia la validacion de usuarios
app.use("/api", administrador); //Ruta hacia la validacion de administrador
app.use(express.json());

//Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));
    
//Conexión al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

