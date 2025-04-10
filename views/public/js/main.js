const API_URL = 'http://localhost:3000/api'; // Asegúrate de que esto coincida con tu backend

// Solo usuarios logueados accedan a producto y pedido
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para ver esta página");
      window.location.href = "login.html";
    }
  });
  

// Cargar productos
document.addEventListener('DOMContentLoaded', () => {
  const productosContainer = document.getElementById('productos-lista');
  if (productosContainer) cargarProductos(productosContainer);
});

// Función para obtener productos desde el backend
async function cargarProductos(container) {
  try {
    const res = await fetch(`${API_URL}/productos`);
    const productos = await res.json();

    productos.forEach(prod => {
      const col = document.createElement('div');
      col.className = 'col';

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${prod.imagen || './images/default.png'}" class="card-img-top" alt="${prod.nombre}">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">${prod.descripcion}</p>
            <p class="card-text fw-bold">$${prod.precio.toFixed(2)}</p>
            <button class="btn btn-primary" onclick="realizarPedido('${prod._id}', '${prod.nombre}', ${prod.precio})">Hacer pedido</button>
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  } catch (error) {
    console.error('Error al cargar productos:', error);
    container.innerHTML = '<p class="text-danger">No se pudieron cargar los productos.</p>';
  }
}

// Función para enviar un pedido
async function realizarPedido(productoId, productoNombre, precio) {
  const nombreCliente = prompt(`Ingrese su nombre para pedir "${productoNombre}":`);
  if (!nombreCliente) return alert('Debes ingresar un nombre.');

  const pedido = {
    cliente: nombreCliente,
    productoId,
    estado: 'pendiente',
    fecha: new Date(),
    precio
  };

  try {
    const res = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });

    const data = await res.json();
    alert(`¡Pedido realizado! ID: ${data._id}`);
  } catch (error) {
    console.error('Error al hacer el pedido:', error);
    alert('Hubo un error al realizar el pedido.');
  }
}
