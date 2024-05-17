const permisos = {
    administrador: {
        "/lideres": true, // Permitir acceso a la ruta /lideres
        "/registroLider": true, // Permitir acceso a la ruta /estudiantes
        //"/estudiantes": true, // Permitir acceso a la ruta /estudiantes
        // ... Otros permisos para administrador
    },
    liderSemillero: {
        "/estudiantes": true, // Permitir acceso a la ruta /estudiantes
        // ... Otros permisos para líder de semillero
    },
    estudiante: {
        "/estudiantes": true, // Permitir acceso a la ruta /estudiantes
        // ... Otros permisos para estudiante
    },
};
