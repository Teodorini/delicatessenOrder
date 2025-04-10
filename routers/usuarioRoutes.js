const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roles');

//Rutas para usuarios
router.post('/registro', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/', isAuthenticated, authorizeRole('admin'), usuarioController.obtenerUsuario); //solo para administradores

module.exports = router;