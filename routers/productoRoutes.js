const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roles');

//Rutas para los productos

router.post('/',isAuthenticated, authorizeRole('admin'), productoController.crearProducto); // solo para administradores
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);
router.put('/:id',isAuthenticated, authorizeRole('admin'), productoController.actualizarProducto);//solo para administradores
router.delete('/:id',isAuthenticated,authorizeRole('admin'), productoController.eliminarProducto);//solo para administradores

module.exports = router;