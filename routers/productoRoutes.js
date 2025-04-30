const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roles');

router.get('/', productoController.obtenerProductos); // Pública

// TODAS ESTAS REQUIEREN AUTENTICACIÓN Y ROL DE ADMIN
router.post('/', isAuthenticated, authorizeRole('admin'), productoController.crearProducto);
router.get('/:id', productoController.obtenerProductoPorId); // Pública
router.put('/:id', isAuthenticated, authorizeRole('admin'), productoController.actualizarProducto);
router.delete('/:id', isAuthenticated, authorizeRole('admin'), productoController.eliminarProducto);



module.exports = router;
