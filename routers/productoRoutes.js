const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roles');

// Rutas para los productos

// ESTA ES PÚBLICA (no requiere autenticación)
router.get('/', productoController.obtenerProductos);

// TODAS ESTAS REQUIEREN AUTENTICACIÓN Y ROL DE ADMIN
router.post('/', isAuthenticated, authorizeRole('admin'), productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);
router.put('/:id', isAuthenticated, authorizeRole('admin'), productoController.actualizarProducto);
router.delete('/:id', isAuthenticated, authorizeRole('admin'), productoController.eliminarProducto);



module.exports = router;
