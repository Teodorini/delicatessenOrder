const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Registrar un usuario nuevo

exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, esAdmin } = req.body;

        //Validación de email, si esta o no registrado
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El email ingresado ya está en uso' });
        };

        // Hashear la contraseña
        //const hashedPassword = await bcrypt.hash(password, 10);

        //Creación de Usuario
        const nuevoUsuario = new Usuario({ nombre, email, password, esAdmin });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Ha ocurrido un error al registrar usuario', error })
    };
};

//Iniciar sesión
exports.loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Buscar usuario

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'El usuario solicitado no fue encontrado' })
        };

        //Comparar contraseña
        const esCorrecto = await usuario.compararPassword(password);
        if (!esCorrecto) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        };

        //Generar token
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email, esAdmin: usuario.esAdmin
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ mensaje: 'Inicio de sesión exitoso', token });

    } catch (error) {
        res.status(500).json({ mensaje: 'Ha ocurrido un error al iniciar sesión', error })
    };
};

//Obtener todos los usuiarios, esto es solo para administradores

exports.obtenerUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error });
    };
};