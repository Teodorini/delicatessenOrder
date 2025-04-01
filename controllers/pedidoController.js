const Pedido = require('../models/pedido');

//Crear un nuevo pedido

exports.crearPedido = async(req, res)=>{
    try {
        const {usuario, productos, total} = req.body;

        const nuevoPedido = new Pedido({usuario, productos, total});
        await nuevoPedido.save();

        res.status(201).json({mensaje:'El pedido ha sido creado correctamente', nuevoPedido});

    } catch (error) {
        res.status(500).json({ mensaje: "Ha ocurrido un error al crear pedido", error });
    };
};

//Obtener todos los pedidos, solo para administradores

exports.obtenerPedidos = async (req, res)=>{
    try {
        const pedidos = await Pedido.find().populate("usuario", "nombre email").populate("productos.producto", "nombre precio");
        res.json(pedidos)
    } catch (error) {
        res.status(500).json({mensaje:'Ocurrió un error al intentar obtener pedidos', error})
    };
};

//Obtener un pedido por ID

exports.obtenerPedidoPorId = async(req,res)=>{
    try {
        const pedido = await Pedido.findById(req.params.id).populate("usuario", "nombre email").populate("productos.producto", "nombre precio");
        if (!pedido) return res.status(404).json({ mensaje: "Pedido no encontrado" });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ mensaje: "Ocurrió un error al obtener pedido", error }); 
    };
};

// Actualizar estado del pedido, solo administradores

exports.actualizarPedido = async (req, res) => {
    try {
      const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!pedidoActualizado) return res.status(404).json({ mensaje: "Pedido no encontrado" });
      res.json({ mensaje: "Pedido actualizado", pedidoActualizado });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar pedido", error });
    };
  };
  
  // Eliminar un pedido, solo administradores
  
  exports.eliminarPedido = async (req, res) => {
    try {
      const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
      if (!pedidoEliminado) return res.status(404).json({ mensaje: "Pedido no encontrado" });
      res.json({ mensaje: "Pedido eliminado" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar pedido", error });
    }
  };