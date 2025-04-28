

const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roles');

// Crear un nuevo pedido (cualquiera logueado puede)
router.post('/', isAuthenticated, pedidoController.crearPedido);

// Obtener pedidos (admin ve todos, usuario normal ve sus pedidos)
router.get('/', isAuthenticated, pedidoController.obtenerPedidos);

// Obtener pedido por ID (cualquiera logueado puede ver su propio pedido)
router.get('/:id', isAuthenticated, pedidoController.obtenerPedidoPorId);

// Actualizar pedido (solo admin)
router.put('/:id', isAuthenticated, authorizeRole('admin'), pedidoController.actualizarPedido);

// Eliminar pedido (solo admin)
router.delete('/:id', isAuthenticated, authorizeRole('admin'), pedidoController.eliminarPedido);

module.exports = router;

