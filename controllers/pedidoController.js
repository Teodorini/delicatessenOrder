
const Pedido = require('../models/pedido');
const Producto = require('../models/producto');

// Obtener todos los pedidos
exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('usuario productos'); // Asegúrate de que los datos de usuario y productos se traigan también
    res.json(pedidos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al obtener los pedidos' });
  }
};

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  const { usuario, productos, total } = req.body;

  if (!usuario || !productos || !total) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {

    // Validar que los productos existan
    const productosEnBD = await Producto.find({ _id: { $in: productos } });
    if (productosEnBD.length !== productos.length) {
      return res.status(400).json({ msg: 'Uno o más productos no existen' });
    };

    const pedido = new Pedido({
      usuario,
      productos,
      total,
    });

    await pedido.save();
    res.status(201).json(pedido);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al crear el pedido' });
  }
};

// Obtener un solo pedido por ID
exports.obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate('usuario productos');

    if (!pedido) {
      return res.status(404).json({ msg: 'Pedido no encontrado' });
    }

    res.json(pedido);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al obtener el pedido' });
  }
};

// Actualizar un pedido
exports.actualizarPedido = async (req, res) => {
  const { estado } = req.body;

  try {
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!pedido) {
      return res.status(404).json({ msg: 'Pedido no encontrado' });
    }

    res.json(pedido);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al actualizar el pedido' });
  }
};

// Eliminar un pedido
exports.eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);

    if (!pedido) {
      return res.status(404).json({ msg: 'Pedido no encontrado' });
    }

    res.json({ msg: 'Pedido eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al eliminar el pedido' });
  }
};
