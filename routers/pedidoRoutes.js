const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");

// Rutas para pedidos
router.post("/", pedidoController.crearPedido);
router.get("/", pedidoController.obtenerPedidos);  // Solo admin
router.get("/:id", pedidoController.obtenerPedidoPorId);
router.put("/:id", pedidoController.actualizarPedido);  // Solo admin
router.delete("/:id", pedidoController.eliminarPedido);  // Solo admin

module.exports = router;
