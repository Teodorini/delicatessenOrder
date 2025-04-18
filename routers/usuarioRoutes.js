const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { isAuthenticated } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/roles');

// RUTA PARA REGISTRAR USUARIO
router.post('/registro', usuarioController.registrarUsuario); 

// RUTA PARA LOGIN DE USUARIO
router.post('/login', usuarioController.loginUsuario); 

router.get('/', isAuthenticated, authorizeRole('admin'), usuarioController.obtenerUsuario);

module.exports = router;
