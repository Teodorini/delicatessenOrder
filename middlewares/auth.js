const jwt = require('jsonwebtoken');


// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  // Verifica si el token está presente en el encabezado de la solicitud
  const authHeader = req.headers.authorization;
  

  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    
    return res.status(401).json({ msg: 'No se encontró token, autorización denegada' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Agrega la información del usuario al request
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido', error });
  }
};

module.exports = { isAuthenticated };
