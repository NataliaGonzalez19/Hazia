const jwt = require('jsonwebtoken')
//función para verificar que el token sea válido
//y si el usuario tiene permiso para acceder
//En el servidor se va a recibir así:
//access-token

// Disposicion  y busqueda token vinculado tanto al estudiante y sus semilleros
const verifyToken = (req, res, next) => {
const token = req.header('access-token')
// 8 commit Ratificacion de que el codigo coincida
if (!token) return res.status(401).json
({ error: '¡Lo sentimos!, pero no tiene permisos para acceder a esta ruta.' })
try {
    router.post("/seed", async (req, res) => {
        // validaciones
        const { error } = perfilalumnoSchema.validate(req.body.codigo);
        if (error) return res.status(400).json({ error: error.details[0].message });
        //Buscando el usuario por su dirección de correo
        const perfilal = await perfilalumnoSchema.findOne({ codigo: req.body.codigo });
         //validando si no se encuentra
        if (!perfilal) return res.status(400).json({ error: "Perfil  no encontrado" });
        res.json({
         error: null,
        data: "Datos de alumno y token generado coinciden",
        
        });
        const verified = jwt.verify(token, process.env.SECRET)
req.user = verified
 next()
        });
    
 // Si en token es correcto, se puede continuar
} catch (error) {
res.status(400).json({ error: 'El token no es válido' })
}
}
module.exports = verifyToken;