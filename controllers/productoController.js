
const Producto = require('../models/producto');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    
    if (productos.length === 0) {
      return res.status(404).json({ msg: 'No hay productos disponibles' }); 
    }
    
    res.status(200).json(productos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al obtener los productos' });
  }
};

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al obtener el producto' });
  }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  const { nombre, precio, stock, descripcion } = req.body;

  if (!nombre || !precio || !stock) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {
    const producto = new Producto({
      nombre,
      precio,
      stock,
      descripcion,
    });

    await producto.save();
    res.status(201).json(producto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al crear el producto' });
  }
};

// Actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
  const { nombre, precio, stock, descripcion } = req.body;

  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, precio, stock, descripcion },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al actualizar el producto' });
  }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    res.json({ msg: 'Producto eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al eliminar el producto' });
  }
};

