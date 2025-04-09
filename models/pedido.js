const mongoose = require('mongoose');

//Definición de esquema de pedidos
const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia al modelo Usuario
    required: true
  },
  productos: [{

    producto:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto', // Referencia al modelo Producto
      required: true
    },
    cantidad:{
      type:Number,
      required: true,
      min:1
    }
  }],
  // fechaPedido: {
  //   type: Date,
  //   default: Date.now
  // },
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Enviado', 'Entregado'],
    default: 'Pendiente'
  }
}, { timestamps: true });

// Crear y exportar el modelo
const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;