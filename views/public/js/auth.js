// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      const mensajeLogin = document.getElementById("mensajeLogin");
      mensajeLogin.className = "alert alert-success mt-3";
      mensajeLogin.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";

      localStorage.setItem("token", data.token);
      localStorage.setItem("nombre", data.nombre);
      localStorage.setItem("usuarioId", data.usuarioId);
      localStorage.setItem("esAdmin", data.esAdmin);

      setTimeout(() => {
        window.location.href = "/index.html";
      }, 2000);
    } else {
      alert(data.mensaje || "Error al iniciar sesión");
    }
  } catch (error) {
    alert("Error de conexión. Intenta nuevamente.");
    console.error("Error en el login:", error);
  }
});

// Registro
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const rolSeleccionado = document.getElementById("rol").value;

  const esAdmin = rolSeleccionado === "admin";

  try {
    const res = await fetch("/usuarios/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, esAdmin })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Usuario registrado con éxito. Ahora podés iniciar sesión.");
      window.location.href = "/login.html";
    } else {
      alert(data.mensaje || "Error al registrarse");
    }
  } catch (error) {
    alert("Error de conexión. Intenta nuevamente.");
    console.error("Error en el registro:", error);
  }
});
