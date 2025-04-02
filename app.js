const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Para parsear el cuerpo de las peticiones
const cors = require('cors'); // Habilitar CORS para las peticiones desde Postman
const router = require('./routers'); // Importamos las rutas definidas

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Para parsear JSON
app.use(cors()); // Habilitar CORS para acceso desde otros orígenes

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost/delicatessenOrder', { // Usamos una base de datos local para pruebas
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.log('Error de conexión a MongoDB: ', err));

// Usar las rutas definidas
app.use('/api', router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});