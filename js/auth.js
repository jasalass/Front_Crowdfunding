
// Lógica de Registro
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const mensaje = document.getElementById("mensajeRegistro");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Limpiar mensajes anteriores
      mensaje.innerHTML = "";
  
      // Capturar datos
      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const contrasena = document.getElementById("contrasena").value;
      const rol = document.getElementById("rol").value;
  
      // Validación frontend básica
      if (!nombre || !correo || !contrasena || !rol) {
        mensaje.innerHTML = `<div class="alert alert-danger">⚠️ Todos los campos son obligatorios.</div>`;
        return;
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mensaje.innerHTML = `<div class="alert alert-warning">⚠️ El correo no es válido.</div>`;
        return;
      }
  
      if (contrasena.length < 6) {
        mensaje.innerHTML = `<div class="alert alert-warning">⚠️ La contraseña debe tener al menos 6 caracteres.</div>`;
        return;
      }
  
      // Datos validados
      const datos = { nombre, correo, contrasena, rol };
  
      try {
        const res = await fetch("http://localhost:3000/api/registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datos)
        });
  
        const respuesta = await res.json();
  
        if (res.ok) {
          mensaje.innerHTML = `<div class="alert alert-success">✅ ${respuesta.mensaje || "Registro exitoso. Redirigiendo..."}</div>`;
          form.reset();
          setTimeout(() => {
            window.location.href = "login.html";
          }, 2000);
        } else {
          mensaje.innerHTML = `<div class="alert alert-danger">❌ ${respuesta.error || "Error al registrarse"}</div>`;
        }
      } catch (error) {
        mensaje.innerHTML = `<div class="alert alert-danger">🚫 Error de conexión con el servidor</div>`;
        console.error("Error:", error);
      }
    });
  });


//Lógica de Login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const mensajeLogin = document.getElementById("mensajeLogin");
  
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        mensajeLogin.innerHTML = "";
  
        const correo = document.getElementById("correoLogin").value.trim();
        const contrasena = document.getElementById("contrasenaLogin").value;
  
        if (!correo || !contrasena) {
            let errores = [];
          
            if (!correo) errores.push("El correo es obligatorio.");
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
              errores.push("El correo no tiene un formato válido.");
          
            if (!contrasena) errores.push("La contraseña es obligatoria.");
          
            mensajeLogin.innerHTML = `<div class="alert alert-danger">${errores.map(e => `• ${e}`).join("<br>")}</div>`;
            return;
          }
          
  
        try {
          const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contrasena })
          });
  
          const data = await res.json();
  
          if (res.ok) {
            // Guardar token y rol en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("nombre", data.nombre);
  
            mensajeLogin.innerHTML = `<div class="alert alert-success">✅ Bienvenido. Redirigiendo...</div>`;
  
            // Redirigir según el rol
            setTimeout(() => {
              if (data.rol === "creador") {
                window.location.href = "creador-home.html";
              } else if (data.rol === "usuario") {
                window.location.href = "usuario-home.html";
              } else {
                mensajeLogin.innerHTML = `<div class="alert alert-danger">⚠️ Rol desconocido</div>`;
              }
            }, 1500);
          } else {
            mensajeLogin.innerHTML = `<div class="alert alert-danger">❌ ${data.error || "Credenciales inválidas"}</div>`;
          }
        } catch (error) {
          console.error(error);
          mensajeLogin.innerHTML = `<div class="alert alert-danger">🚫 Error de conexión con el servidor</div>`;
        }
      });
    }
  });
  

  