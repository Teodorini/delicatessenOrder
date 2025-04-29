mongoose = require('mongoose'); 

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    }
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
    default: 'pendiente',
    enum: ['pendiente', 'enviado', 'entregado'],
  },
},
  { timestamps: true });

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;


