const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importamos bcrypt para encriptar la contraseña

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // El email debe ser único
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

// Encriptar la contraseña antes de guardar el usuario
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Si la contraseña no fue modificada, no hace nada
  this.password = await bcrypt.hash(this.password, 10); // Encriptamos la contraseña con bcrypt
  next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;