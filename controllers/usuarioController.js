

const Usuario = require('../models/usuario'); // Importa el modelo de Usuario
const bcrypt = require('bcryptjs'); // Necesario para comparar contraseñas en el login
const jwt = require('jsonwebtoken');

// Función para registrar un usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    usuario = new Usuario({
      nombre,
      email,
      password,
    });

    // Encriptar la contraseña antes de guardar
    usuario.password = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos
    await usuario.save();

    // Generar un JWT para el usuario
    const payload = {
      usuario: {
        id: usuario.id,
        rol: usuario.rol,
      },
    };

    // Enviar el token en la respuesta
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al registrar el usuario' });
  }
};

// Función para login de usuario
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
    }

    // Comparar las contraseñas
    const esCoincidente = await bcrypt.compare(password, usuario.password);

    if (!esCoincidente) {
      return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
    }

    // Generar el token JWT
    const payload = {
      usuario: {
        id: usuario.id,
        rol: usuario.rol
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error en el login' });
  }
};

// Función para obtener la información del usuario
exports.obtenerUsuario = async (req, res) => {
  try {
    // Obtén el usuario utilizando el ID del token en el request
    const usuario = await Usuario.findById(req.usuario.id);

    // Si no se encuentra al usuario, retorna un error 404
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Devuelve la información del usuario
    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
    });
  } catch (err) {
    // En caso de error, responde con un error 500
    console.error(err);
    res.status(500).json({ msg: 'Hubo un error al obtener el usuario' });
  }
};

