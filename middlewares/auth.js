const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No se encontró token, autorización denegada' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Guardo datos del usuario en la request
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token no válido', error: error.message });
  }
};

module.exports = { isAuthenticated };
