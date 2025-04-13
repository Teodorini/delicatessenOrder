const express = require('express');
const router = express.Router();

// Importación de las rutas de cada entidad
const productoRoutes = require('./productoRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const pedidoRoutes = require('./pedidoRoutes');

// Montar las rutas sin el prefijo /api
router.use('/productos', productoRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/pedidos', pedidoRoutes);

// Ruta para verificar que el servidor está funcionando
router.get('/', (req, res) => {
  res.send('Bienvenidos a DELICATESSENORDER');
});

module.exports = router;

