const Producto = require('../models/producto');

//Crear un nuevo producto ( solo administradores)

exports.crearProducto = async(req, res) => {
    try {
        const {nombre, descripcion, precio, stock, imagen, categoria} = req.body;
        const nuevoProducto = new Producto({nombre, descripcion, precio, stock, imagen,categoria });
        await nuevoProducto.save();
        res.status(201).json({mensaje:'Producto creado correctamente'});

    } catch (error) {
        res.status(500).json({ mensaje: " Ha ocurrido un error al crear producto", error });
    };
};

//Obtener todos los productos
exports.obtenerProductos = async(req,res)=> {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
       res.status(500).json({mensaje:'Ocurrió un error al intentar obtener todos los productos', error}) 
    }
};

//Obtener un producto por ID
exports.obtenerProductoPorId = async(req, res)=>{
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ mensaje: 'Producto NO encontrado' });
        res.json(producto);
        
    } catch (error) {
        res.status(500).json({mensaje:'Error al obtener producto', error})
    };
};

//Actualizar un producto, solo para administradores

exports.actualizarProducto = async(req, res)=>{
   try {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
   if (!productoActualizado) return res.status(404).json({mensaje:'El producto No fue encontrado'});
   res.json({mensaje:'El producto ha sido Actualizado'});
    
   
} catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
   };
};

//Eliminar un producto, solo administradores

exports.eliminarProducto = async(req, res)=>{
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if(!productoEliminado)return res.status(404).json({mensaje:'Producto NO encontrado'});
        res.json({mensaje:'Producto eliminado correctamente'})
    } catch (error) {
        res.status(500).json({ mensaje: "Ha ocurrido un error al eliminar producto", error });
    };
};