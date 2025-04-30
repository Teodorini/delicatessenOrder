# 🌟 **DelicatessenOrder - Sistema de Pedidos** 🌟

DelicatessenOrder es una aplicación web para gestionar pedidos en una fiambrería. Permite a los usuarios realizar pedidos de productos como picadas y a los administradores gestionar los productos, usuarios y pedidos.

---

## 🚀 **Tecnologías utilizadas**

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **CORS**
- **dotenv**

---

## 🔧 **Estructura del Proyecto**

### 📁 Backend

- `app.js`: Punto de entrada de la app.
- `routers/`: Define rutas para productos, usuarios y pedidos.
- `controllers/`: Lógica de negocio.
- `models/`: Modelos de MongoDB.
- `middlewares/`: Autenticación y roles.
- `config/db.js`: Conexión a la base de datos.

### 📁 Frontend (en `views/public/`)

- `index.html`, `producto.html`, `login.html`, `register.html`, `pedido.html`
- `js/`: Scripts con lógica del cliente.
- `css/`: Estilos visuales.
- `imagen/`: Imágenes como el banner.

---

## 📦 **Instalación del proyecto**

### 1. Clonar el repositorio

```bash
git clone https://github.com/Teodorini/delicatessenOrder.git
cd delicatessenOrder

2. Instalar dependencias
npm install

3. Crear archivo .env
# Puerto en el que se va a ejecutar
PORT=3000

# URI de conexión a MongoDB 
MONGO_URI=mongodb://127.0.0.1:27017/delicatessenOrder

# Clave secreta para firmar los tokens JWT
JWT_SECRET=TU_CLAVE_SECRETA_AQUI

⚠️ Importante: Cada persona debe configurar su propia clave secreta en local para que el sistema de autenticación JWT funcione correctamente.

4. Ejecutá el servidor:

Podés iniciar el servidor de dos formas:

npm start
node app.js


👥 Funcionalidades principales
Usuarios
Registro de cuenta

Inicio de sesión con autenticación JWT

Visualización de perfil (autenticado)

Productos
Visualización de productos

Agregar productos (admin)

Modificar y eliminar productos (admin)

Pedidos
Selección de productos y envío de pedido

Visualización de estado del pedido

Administración de pedidos (cambiar estado: pendiente → enviado → entregado)


🔒 Autenticación con JWT
El sistema usa tokens JWT para proteger las rutas. Los usuarios deben iniciar sesión para acceder a funciones como:

Ver perfil

Crear pedidos

Administrar productos o pedidos

🎨 Interfaz
HTML + CSS + Bootstrap

Formularios funcionales para login, registro, pedidos y productos

Carga dinámica de productos desde el backend


📦 Autoras:

Kaira Abreu
Mariana Teodorini

Repositorio original: https://github.com/Teodorini/delicatessenOrder


