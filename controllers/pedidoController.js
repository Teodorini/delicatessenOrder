

const Pedido = require('../models/pedido');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  try {
    const { usuario, productos, estado } = req.body;

    // Validación
    if (!usuario || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ mensaje: "Faltan campos requeridos o productos inválidos" });
    }

    // Verificar existencia del usuario
    const usuarioExistente = await Usuario.findById(usuario);
    if (!usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario no existe" });
    }

    // Cálculo del total del pedido
    let total = 0;
    const productosConCantidad = await Promise.all(
      productos.map(async (item) => {
        const producto = await Producto.findById(item.producto);
        if (!producto || item.cantidad <= 0) return null;

        total += producto.precio * item.cantidad;

        return {
          producto: item.producto,
          cantidad: item.cantidad
        };
      })
    );

    const productosValidos = productosConCantidad.filter(p => p !== null);

    if (productosValidos.length === 0) {
      return res.status(400).json({ mensaje: "Ningún producto válido en el pedido" });
    }

    // Crear y guardar el pedido
    const nuevoPedido = new Pedido({
      usuario,
      productos: productosValidos,
      total,
      estado: estado || 'pendiente'
    });

    await nuevoPedido.save();

    res.status(201).json({
      mensaje: 'El pedido ha sido creado correctamente',
      pedido: nuevoPedido
    });

  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ mensaje: "Ha ocurrido un error al crear el pedido", error: error.message });
  }
};

// Obtener todos los pedidos (admin = todos, usuario = sus propios)
exports.obtenerPedidos = async (req, res) => {
  try {
    const filtro = req.usuario.esAdmin
      ? {} // sin filtro, trae todo
      : { usuario: req.usuario.id }; // trae solo los pedidos del usuario autenticado

    const pedidos = await Pedido.find(filtro)
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio");

    res.json(pedidos);

  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ mensaje: 'Ocurrió un error al obtener los pedidos', error });
  }
};

// Obtener pedido por ID
exports.obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio");

    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    // Seguridad adicional: evitar que usuarios comunes vean pedidos ajenos
    if (!req.usuario.esAdmin && pedido.usuario._id.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No tienes permiso para ver este pedido" });
    }

    res.json(pedido);

  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    res.status(500).json({ mensaje: "Error al obtener el pedido", error });
  }
};

// Actualizar estado del pedido (solo admins)
exports.actualizarPedido = async (req, res) => {
  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!pedidoActualizado) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    res.json({
      mensaje: "Pedido actualizado correctamente",
      pedido: pedidoActualizado
    });

  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    res.status(500).json({ mensaje: "Error al actualizar el pedido", error });
  }
};

// Eliminar pedido (solo admins)
exports.eliminarPedido = async (req, res) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);

    if (!pedidoEliminado) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    res.json({ mensaje: "Pedido eliminado correctamente" });

  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    res.status(500).json({ mensaje: "Error al eliminar el pedido", error });
  }
};
