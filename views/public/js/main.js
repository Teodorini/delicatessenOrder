const API_URL = 'http://localhost:3000'; 

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
    if (!res.ok) {
      throw new Error('No se pudo obtener los productos');
    }
    const productos = await res.json();

    productos.forEach(prod => {
      const col = document.createElement('div');
      col.className = 'col';

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
         <img src="${prod.imagen || '/public/imagen/banner.jpg'}" class="card-img-top" alt="${prod.nombre}">

          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">${prod.descripcion}</p>
            <p class="card-text fw-bold">$${prod.precio.toFixed(2)}</p>
            <button class="btn btn-primary" onclick="realizarPedido('${prod._id}', ${prod.precio})">Hacer pedido</button>
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
async function realizarPedido(productoId, precio) {
  const token = localStorage.getItem("token");
  const usuarioId = localStorage.getItem("usuarioId");
 

  if (!token || !usuarioId) {
    alert("Debes estar logueado para hacer un pedido.");
    return;
  }

  try {
   

    const pedido = {
      usuario: usuarioId,
      productos:  [{ producto: productoId, cantidad: 1 }],
      total: precio,
      estado: 'pendiente'
    };

    const respuesta = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pedido)
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      alert(`¡Pedido realizado! ID: ${data._id}`);
    } else {
      alert(data.msg || "Error al hacer el pedido.");
    }

  } catch (error) {
    console.error('Error al hacer el pedido:', error);
    alert('Hubo un error al realizar el pedido.');
  }
}





