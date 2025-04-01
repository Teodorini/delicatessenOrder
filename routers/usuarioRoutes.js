const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//Rutas para usuarios
router.post('/registro', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/',usuarioController.obtenerUsuario); //solo para administradores

module.exports = router;