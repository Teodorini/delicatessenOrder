// Manejo de login

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log('Formulario de registro enviado:', { email, password });

  try {
    const res = await fetch("/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log('Respuesta del servidor en login:', data);

    if (res.ok) {
      
      const mensajeLogin = document.getElementById("mensajeLogin");
      mensajeLogin.className = "alert alert-success mt-3"; // estilo verde
      mensajeLogin.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";
      
      // Guardamos el token, el nombre y el _id del usuario en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("nombre", data.nombre);
      localStorage.setItem("usuarioId", data.usuarioId); // Guardamos el _id del usuario
      
      // Espera 2 segundos antes de redirigir
      setTimeout(() => {
      window.location.href = "/index.html";
    }, 2000);

    } else {
      alert(data.msg || "Error al iniciar sesión");
    }
  } catch (error) {
    alert("Error en la conexión. Intenta nuevamente.");
    console.error("Error en el login:", error);
  }
});

// Manejo de registro
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const rolSeleccionado = document.getElementById("rol").value;

  // Determinar si el usuario es admin
  const esAdmin = rolSeleccionado === "admin";

  try {
    const res = await fetch("/usuarios/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, esAdmin })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Usuario registrado con éxito. Iniciá sesión ahora.");
      window.location.href = "/login.html";
    } else {
      alert(data.mensaje || "Error al registrarse");
    }
  } catch (error) {
    alert("Error de conexión. Intenta nuevamente.");
    console.error("Error en el registro:", error);
  }
});

