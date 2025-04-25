const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
     
       console.log('MongoDB conectado con éxito');
  } catch (error) {
    console.error(`Error al conectar con MongoDB: ${error.message}`);
    process.exit(1); // Detiene el proceso si la conexión falla
  }
};

module.exports = connectDB;


