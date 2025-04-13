// const express = require('express');
// const router = express.Router();
// const usuarioController = require('../controllers/usuarioController');
// const { isAuthenticated } = require('../middlewares/auth');
// const { authorizeRole } = require('../middlewares/roles');

// //Rutas para usuarios
// router.post('/registro', usuarioController.registrarUsuario);
// router.post('/login', usuarioController.loginUsuario);
// router.get('/', isAuthenticated, authorizeRole('admin'), usuarioController.obtenerUsuario); //solo para administradores

// module.exports = router;
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roles');

// Rutas para los productos

// Crear producto (solo para administradores)
router.post('/', isAuthenticated, authorizeRole('admin'), productoController.crearProducto);

// Obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Obtener un producto por ID
router.get('/:id', productoController.obtenerProductoPorId);

// Actualizar producto (solo para administradores)
router.put('/:id', isAuthenticated, authorizeRole('admin'), productoController.actualizarProducto);

// Eliminar producto (solo para administradores)
router.delete('/:id', isAuthenticated, authorizeRole('admin'), productoController.eliminarProducto);

module.exports = router;
