

exports.authorizeRole = () => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ mensaje: 'Usuario no autenticado' });
        }

        // Verifica si el usuario tiene permisos de administrador
        if (!req.user.esAdmin) {
            return res.status(403).json({ mensaje: 'Acceso denegado: se requieren permisos de administrador' });
        }

        next();
    };
};


