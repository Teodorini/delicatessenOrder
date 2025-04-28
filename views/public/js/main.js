const API_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert('Debes iniciar sesión para ver tus pedidos.');
    return window.location.href = 'login.html';
  }

  cargarPedidos(token);
});

// Cargar pedidos desde el servidor
async function cargarPedidos(token) {
  const container = document.getElementById('pedidos-lista');

  // Spinner de carga
  container.innerHTML = `
    <div class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-2">Cargando pedidos...</p>
    </div>
  `;

  try {
    const res = await fetch(`${API_URL}/pedidos`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const pedidos = await res.json();
    if (!res.ok) throw new Error(pedidos.mensaje || 'Error al obtener pedidos');

    if (pedidosFiltrados.length === 0) {
      container.innerHTML = `
        <div class="mensaje-vacio">
          <i class="bi bi-clipboard-x"></i>
          ¡Aún no has hecho ningún pedido!
        </div>
      `;
      return;
    }
    

    container.innerHTML = '';

    const esAdmin = localStorage.getItem("esAdmin") === 'true';

    pedidos.forEach(pedido => {
      const productosHTML = pedido.productos.map(p =>
        `<li>${p.producto?.nombre || 'Producto eliminado'} (Cantidad: ${p.cantidad})</li>`
      ).join('');

      const card = document.createElement('div');
      card.className = 'col';

      card.innerHTML = `
        <div class="card shadow-sm mb-3">
          <div class="card-body">
            <h5 class="card-title">Pedido #${pedido._id.slice(-6)}</h5>
            <p><strong>Cliente:</strong> ${pedido.usuario?.nombre || 'Desconocido'} (${pedido.usuario?.email || ''})</p>
            <p><strong>Total:</strong> $${pedido.total}</p>
            <p><strong>Estado:</strong> ${pedido.estado}</p>
            <ul>${productosHTML}</ul>

            ${esAdmin ? `
              <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-sm btn-warning" onclick="actualizarEstado('${pedido._id}')">Actualizar Estado</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarPedido('${pedido._id}')">Eliminar</button>
              </div>
            ` : ''}
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error al cargar pedidos:', error);
    container.innerHTML = `<p class="text-danger">No se pudieron cargar los pedidos: ${error.message}</p>`;
  }
}

// Actualizar estado del pedido (solo admin)
async function actualizarEstado(pedidoId) {
  const token = localStorage.getItem("token");
  const nuevoEstado = prompt('Nuevo estado: pendiente, enviado o entregado')?.toLowerCase();

  const estadosValidos = ['pendiente', 'enviado', 'entregado'];
  if (!estadosValidos.includes(nuevoEstado)) {
    return alert('Estado inválido. Opciones: pendiente, enviado, entregado');
  }

  try {
    const res = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ estado: nuevoEstado })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.mensaje || 'Error al actualizar');

    alert('Pedido actualizado correctamente');
    location.reload();

  } catch (error) {
    console.error('Error actualizando pedido:', error);
    alert(`Error al actualizar: ${error.message}`);
  }
}

// Eliminar pedido (solo admin)
async function eliminarPedido(pedidoId) {
  const token = localStorage.getItem("token");
  if (!confirm('¿Estás seguro de que deseas eliminar este pedido?')) return;

  try {
    const res = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.mensaje || 'Error al eliminar');

    alert('Pedido eliminado exitosamente');
    location.reload();

  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    alert(`Error al eliminar: ${error.message}`);
  }
}

// Cargar productos en el select del modal
document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("productoSelect");
  if (!select) return;

  try {
    const res = await fetch(`${API_URL}/productos`);
    const productos = await res.json();

    productos.forEach(prod => {
      const option = document.createElement("option");
      option.value = prod._id;
      option.textContent = `${prod.nombre} - $${prod.precio}`;
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Error cargando productos:", err);
  }
});

// Enviar nuevo pedido
document.getElementById("formNuevoPedido")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const usuarioId = localStorage.getItem("usuarioId");

  const productoId = document.getElementById("productoSelect").value;
  const cantidad = parseInt(document.getElementById("cantidadInput").value);

  try {
    const res = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        usuario: usuarioId,
        productos: [{ producto: productoId, cantidad }],
        total: 0,
        estado: 'pendiente'
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Pedido creado exitosamente");
      location.reload();
    } else {
      alert(data.mensaje || "Error al crear pedido");
    }
  } catch (error) {
    console.error("Error al crear pedido:", error);
    alert("Error al enviar el pedido");
  }
});

// Botón de logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'login.html';
});



