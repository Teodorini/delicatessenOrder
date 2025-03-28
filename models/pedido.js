const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia al modelo Usuario
    required: true
  },
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto', // Referencia al modelo Producto
    required: true
  }],
  fechaPedido: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'enviado', 'entregado'],
    default: 'pendiente'
  }
}, { timestamps: true });

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;