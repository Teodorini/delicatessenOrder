

const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roles');

// Rutas para los pedidos

router.post('/', isAuthenticated, pedidoController.crearPedido); // Crear un nuevo pedido
router.get('/', isAuthenticated, authorizeRole('admin'), pedidoController.obtenerPedidos); // Solo para administradores
router.get('/:id', isAuthenticated, pedidoController.obtenerPedidoPorId); // Obtener un pedido por ID
router.put('/:id', isAuthenticated, authorizeRole('admin'), pedidoController.actualizarPedido); // Solo para administradores
router.delete('/:id', isAuthenticated, authorizeRole('admin'), pedidoController.eliminarPedido); // Solo para administradores

module.exports = router;

