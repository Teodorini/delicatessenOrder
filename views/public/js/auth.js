

// Manejo de login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  const res = await fetch("/api/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("nombre", data.nombre);
    window.location.href = "/views/public/index.html";
  } else {
    alert(data.msg || "Error al iniciar sesión");
  }
});

// Manejo de registro
document.getElementById("register-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre-register").value;
  const email = document.getElementById("email-register").value;
  const password = document.getElementById("password-register").value;

  const res = await fetch("/usuarios/registro", {
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

  