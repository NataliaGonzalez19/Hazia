const parser = require("body-parser"); //parser transforma la respuesta en .json
const express = require('express');
const app = express();
const port = 3000;

const authRoutes = require("./routes/authentication");
//const liderSemillero = require("./routes/liderSemilleroRoutes");
//const administrador = require("./routes/administradorRoutes");
//const studentRoutes = require("./routes/student");
//const seedRoutes = require("./routes/seeds");
//const generatePDF = require("./routes/generatePDF");

const mongoose = require("mongoose");
require('dotenv').config(); //dotenv para las variables de entorno

app.use(parser.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(parser.json()); // transforma los datos a formato JSON

//Gestión de las rutas usando el middleware
app.use("/api", authRoutes);
app.use(express.json());

//app.use("/api", seedRoutes);
//app.use("/api", liderSemillero); //Ruta hacia el modulo de lideres de semillero
//app.use("/api", administrador); //Ruta hacia la validacion de administrador

//Definir el endpoint para generar y descargar el PDF
/*app.get("/api/pdf/download", async (req, res) => {
    try {
      const filename = await generatePDF();
      res.download(filename); // Envía el archivo como respuesta
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      res.status(500).json({ message: 'Error al generar el PDF' });
    }
  });*/


//Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));
    
//Conexión al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});