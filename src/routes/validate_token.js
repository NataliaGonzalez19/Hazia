const jwt = require("jsonwebtoken"); //función para verificar que el token sea válido
const permisos = require("./permisos"); // Importar la estructura de permisos

//y si el usuario tiene permiso para acceder
//En el servidor se va a recibir así:
//access-token
const verifyToken = (req, res, next) => {
    // display its headers
    //console.log(req.headers)
    //console.log(JSON.parse(JSON.stringify(req.headers)).accesstoken);
    //const token = req.header("accesstoken");

    //const token = JSON.parse(JSON.stringify(req.headers)).accesstoken;
    const token = req.header('accessToken');
    const rol = req.header('rol');
    const rutaActual = req.header('rutaActual');

    //console.log(token)
    if (!token) {
        return res.status(401).json({
            error: "¡Lo sentimos!, pero no tienes permisos para acceder a esta ruta.",
        });
    }
    try {

        const rolUsuario = rol; // Extraer la propiedad 'rol' del payload

        if (!permisos[rolUsuario][rutaActual]) {
            return res.status(401).json({ message: "No tienes permisos para acceder a esta ruta" });
        }

        next(); // Si el token es correcto, se puede continuar

    } catch (error) {
        console.log('ERROR' + error)
        res.status(400).json({ error: "El token no es válido" });
    }
};
module.exports = verifyToken;