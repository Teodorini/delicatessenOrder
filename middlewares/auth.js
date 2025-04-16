const jwt = require('jsonwebtoken');
// const config = require('../config/config.json');

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  // Verifica si el token está presente en el encabezado de la solicitud
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ msg: 'No se encontró token, autorización denegada' });
  }

  try {
    // Verifica el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Agrega la información del usuario al request
    req.usuario = decoded.usuario;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = { isAuthenticated };
