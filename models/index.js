const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Cargar variables de entorno desde .env
dotenv.config();

// Configuración de la conexión a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(" Conexión exitosa a MongoDB!!!");
    } catch (error) {
        console.error("Ooops!!! Error al conectar a MongoDB:", error.message);
        process.exit(1); // Detener la ejecución si hay un error crítico
    }
};

// Exportar la conexión
module.exports = connectDB;