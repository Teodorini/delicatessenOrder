// Middleware para verificar el rol del usuario
const authorizeRole = (...roles) => {
    return (req, res, next) => {
      // Verifica si el usuario tiene el rol correcto
      if (!req.user) {
        return res.status(401).json({ mensaje: 'Acceso denegado: Permisos insuficientes' });
      }
      
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado' });
  };

  next();
  };
};
  
  module.exports = { authorizeRole };
  


