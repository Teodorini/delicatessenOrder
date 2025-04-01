const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

//Rutas para los productos

router.post('/', productoController.crearProducto); // solo para administradores
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);
router.put('/:id', productoController.actualizarProducto);//solo para administradores
router.delete('/:id', productoController.eliminarProducto);//solo para administradores

module.exports = router;