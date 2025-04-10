const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const { isAuthenticated } = require("../middlewares/auth");
const { authorizeRole } = require("../middlewares/roles");

// Rutas para pedidos
router.post("/",isAuthenticated, pedidoController.crearPedido);
router.get("/",isAuthenticated, authorizeRole('admin'),pedidoController.obtenerPedidos);  // Solo admin
router.get("/:id", isAuthenticated, pedidoController.obtenerPedidoPorId);
router.put("/:id", isAuthenticated, authorizeRole('admin'), pedidoController.actualizarPedido);  // Solo admin
router.delete("/:id", isAuthenticated, authorizeRole('admin'), pedidoController.eliminarPedido);  // Solo admin

module.exports = router;
