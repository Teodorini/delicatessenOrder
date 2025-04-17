require('dotenv').config(); // CARGA LAS VARIABLES DE ENTORNO

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // CONEXIÓN A LA BASE DE DATOS
const productoRoutes = require('./routers/productoRoutes');
const usuarioRoutes = require('./routers/usuarioRoutes');
const pedidoRoutes = require('./routers/pedidoRoutes');
const path = require('path');

const app = express();

// CONECTAR A MONGODB
connectDB();

// MIDDLEWARE PARA PARSEAR JSON
app.use(cors());
app.use(express.json());

// RUTAS
app.use('/api', require('./routers/index'));

// SERVIR INDEX.HTML COMO PÁGINA PRINCIPAL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'public', 'index.html'));
});

// RUTA API
app.use('/api', require('./routers/index'));

// SERVIR ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname,'views/public')));

// Manejo de errore, Se agrego por si no se encuentra las rutas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// PUERTO DESDE .ENV O 3000 POR DEFECTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
});


