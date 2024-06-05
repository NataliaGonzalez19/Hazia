const permisos = {
    1: {

        "/registroAdministrador": true,
        "/registroLider": true,
        "/registroSemillero": true,

        "/administradores": true,
        "/lideres": true, // Permitir acceso a la ruta /lideres
        "/liderID/:id": true,

        "/actualizarLider/:id": true,
        "/actualizarAdministrador/:id": true,
        "/actualizarEstudiante/:id": true,

        "/eliminarLider/:id": true,
        "/eliminarEstudiante/:id": true,
        "/eliminarSemilleros/:id": true,

        "/login": true,

        "/semilleros/:id/estudiantes": true,
        "/semilleros/:id/estudiantes/:idEstudiante": true,
        '/semilleros': true,
        "/semilleros/:id": true,
        // ... Otros permisos para administrador
    },
    2: {

        "/semilleros/:id": true,

        "/actualizarSemilleros/:id": true,
        
        "/eliminarLider/:id": true,
        "/eliminarSemilleros/:id": true,
        "/eliminarEstudiante/:id": true,
        // ... Otros permisos para líder de semillero

    },
    3: {

        "/signup": true,
        "/login": true,

        "/semilleros/:id": true,

        "/eliminarEstudiante/:id": true,
        // ... Otros permisos para estudiante

    },
};
