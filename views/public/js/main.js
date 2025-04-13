document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  try {
    const res = await fetch("/productos", {
      headers: {
        "x-auth-token": token
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error al cargar productos:", errorData);
      alert(errorData.msg || "No se pudieron obtener los productos");
      throw new Error(errorData.msg ||"No se pudieron obtener los productos");
    }

    const productos = await res.json();
    const contenedor = document.getElementById("productos");

    if (!contenedor) {
      console.warn("No se encontró un contenedor con id 'productos'");
      return;
    }

    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.className = "card m-2";
      card.style.width = "18rem";
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="card-text">Precio: $${producto.precio}</p>
          <button class="btn btn-primary agregar-producto" data-id="${producto._id}" data-precio="${producto.precio}">
            Agregar al pedido
          </button>
        </div>
      `;
      contenedor.appendChild(card);
    });

    const carrito = [];
    let total = 0;
    const totalPedido = document.getElementById("total");

    contenedor.addEventListener("click", (e) => {
      if (e.target.classList.contains("agregar-producto")) {
        const id = e.target.getAttribute("data-id");
        const precio = parseFloat(e.target.getAttribute("data-precio"));
        carrito.push(id);
        total += precio;
        if (totalPedido) {
          totalPedido.textContent = `Total: $${total.toFixed(2)}`;
        }
      }
    });

    const btnHacerPedido = document.getElementById("hacer-pedido");
    if (btnHacerPedido) {
      btnHacerPedido.addEventListener("click", async () => {
        if (carrito.length === 0) {
          alert("Agregá productos al pedido");
          return;
        }

        const res = await fetch("/pedidos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token":token
          },
          body: JSON.stringify({
            productos: carrito,
            total: total
          })
        });

        const data = await res.json();

        if (res.ok) {
          alert("Pedido realizado con éxito");
          window.location.reload();
        } else {
          alert(data.msg || "Error al realizar el pedido");
        }
      });
    } else {
      console.warn("No se encontró el botón con id 'hacer-pedido'");
    }
  } catch (err) {
    console.error("Error al cargar productos:", err);
    alert("Hubo un error al cargar los productos");
  }
});




