const express = require('express');
const router = express.Router();

//Importación de las rutas de cada entidad

const usuarioRoutes = require('./usuarioRoutes');
const productoRoutes = require('./productoRoutes');
const pedidoRoutes = require('./pedidoRoutes');


//Rutas principales

router.use('/api/usuarios', usuarioRoutes);
router.use('/api/productos', productoRoutes);
router.use('/api/pedidos', pedidoRoutes);

//Ruta para verificar que el servidor está funcionando
router.get('/', (req, res) => {
    res.send('Bienvenidos a DELICATESSENORDER')
});

module.exports = router;