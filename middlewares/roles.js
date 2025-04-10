

exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ mensaje: 'Usuario no autenticado' });
        }

        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado' });
        }

        next();
    };
};



