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
router.put('/:id', isAuthenticated, authorizeRole('admin'), productoController.actualizarProducto);
router.delete('/:id', isAuthenticated, authorizeRole('admin'), productoController.eliminarProducto);

router.get('/:id', productoController.obtenerProductoPorId);


module.exports = router;
