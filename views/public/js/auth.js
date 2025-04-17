

// Manejo de login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

//Validación de los campos 
  if (!email || !password) {
    return alert("Todos los campos son obligatorios");
  };

  const res = await fetch("/api/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  //Validación de estado HTTP antes de parsear la respuesta
  if (!res.ok) {
    const errorText = await res.text(); // Leer el mensaje de error del servidor
    throw new Error(errorText || "Error al iniciar sesión");
  }; 

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("nombre", data.nombre);
    localStorage.setItem("rol", data.rol)
    window.location.href = "/views/public/index.html";
  } else {
    alert(data.msg || "Error al iniciar sesión");
  }
});

// Manejo de registro
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/registro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("nombre", data.nombre);
    window.location.href = "/views/public/index.html";
  } else {
    alert(data.msg || "Error al registrarse");
  }
});

