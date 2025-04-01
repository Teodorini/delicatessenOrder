const mongoose = require('mongoose'); // Importamos mongoose para manejar la base de datos MongoDB

// Definimos el esquema del producto
const productoSchema = new mongoose.Schema({
  nombre: {
    type: String, // Tipo de dato: String (texto)
    required: true // Campo obligatorio
  },
  descripcion: {
    type: String, // Tipo de dato: String (opcional)
    required: true
  },
  precio: {
    type: Number, // Tipo de dato: Número
    required: true // Campo obligatorio
  },
  stock: {
    type: Number, // Tipo de dato: Número (cantidad disponible)
    required: true, // Campo obligatorio
    min: 0// valor minimo requerido
  },
  imagen: {
    type: String,
    default: 'default.jpg'
  },
  categoria: {
    type: String,
    required: true
  }
}, { timestamps: true }); // timestamps agrega automáticamente 'createdAt' y 'updatedAt'

// Creamos el modelo 'Producto' basado en el esquema definido
const Producto = mongoose.model('Producto', productoSchema);

// Exportamos el modelo para usarlo en otras partes del proyecto
module.exports = Producto;