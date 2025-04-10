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
  esAdmin: {// diferencia entre administradores y usuarios
    type: Boolean,
    default: false
  }
}, { timestamps: true });

//MiddLeware para hashear la contraseña antes de guardar el usuario
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  // Verificá si ya está hasheada (opcional)
  const isHashed = this.password.startsWith('$2b$');
  if (!isHashed) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

//Método para comparar contraseñas

usuarioSchema.methods.compararPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

//Crear y exportar el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;