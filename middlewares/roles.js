// Middleware para verificar el rol del usuario
const authorizeRole = (role) => {
    return (req, res, next) => {
      // Verifica si el usuario tiene el rol correcto
      if (req.usuario.rol !== role) {
        return res.status(403).json({ msg: 'Acceso denegado: Permisos insuficientes' });
      }
      next();
    };
  };
  
  module.exports = { authorizeRole };
  


