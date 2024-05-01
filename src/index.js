/*'use strict';
const http = require('http');
const server = http.createServer(function(req, res) {
    res.writeHead(200, {'content-type' : 'text/plain' });
    res.end(':)');
});
server.listen(5000);*/

/*const express = require('express')
const app = express()
const port = 3000

//Estructura base de app.get
//app.get ('/', () => {})

app.get ('/', (req, res) => {
    res.send('¡Hola Mundo!, esto no es una página 😎')
})

app.listen (port, () => {
    console.log('La aplicacion se esta ejecutando por el puerto ' + port)
})*/
const parser = require("body-parser"); //parser transforma la respuesta en .json
const express = require('express');
const app = express();
const port = 3000;
const proyectosRoutes = require("./routes/proyectosRoutes");
const mongoose = require("mongoose");
require('dotenv').config(); //dotenv para las variables de entorno

app.use(parser.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(parser.json()); // transforma los datos a formato JSON

//Gestión de las rutas usando el middleware
app.use("/api", proyectosRoutes);
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

