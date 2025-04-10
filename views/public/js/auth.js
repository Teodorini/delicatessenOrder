
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
  
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        try {
          const res = await fetch("/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
  
          const text = await res.text();
  
          if (!res.ok) {
            try {
              const data = JSON.parse(text);
              alert(data.mensaje || "Error al iniciar sesión.");
            } catch {
              alert("Error inesperado en el servidor.");
            }
            return;
          }
  
          const data = JSON.parse(text);
          localStorage.setItem("token", data.token);
          localStorage.setItem("nombre", data.nombre || "");
          alert("Inicio de sesión exitoso");
          loginForm.reset();
          window.location.href = "/index.html";
  
        } catch (error) {
          console.error("Error al iniciar sesión", error);
          alert("Ocurrió un error al iniciar sesión");
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        try {
          const res = await fetch("/api/usuarios/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, password }),
          });
  
          const text = await res.text();
  
          if (!res.ok) {
            try {
              const data = JSON.parse(text);
              alert(data.mensaje || "Error al registrarse.");
            } catch {
              alert("Error inesperado en el servidor.");
            }
            return;
          }
  
          alert("Usuario registrado con éxito. Iniciá sesión ahora.");
          registerForm.reset();
          window.location.href = "/login.html";
  
        } catch (error) {
          console.error("Error al registrar", error);
          alert("Ocurrió un error al registrar el usuario");
        }
      });
    }
  });
  