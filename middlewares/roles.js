const authorizeRole = () => {
  return (req, res, next) => {
    if (!req.usuario || !req.usuario.esAdmin) {
      return res.status(403).json({ mensaje: 'Acceso denegado: se requieren permisos de administrador' });
    }
    next();
  };
};

module.exports = { authorizeRole };



