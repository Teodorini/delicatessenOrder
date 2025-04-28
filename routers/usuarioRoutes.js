const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roles');

// Rutas de autenticación
router.post('/registro', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);

// Ruta protegida: solo admins pueden ver usuarios
router.get('/', isAuthenticated, authorizeRole(), usuarioController.obtenerUsuarios);

module.exports = router;

