function inicializarNavbar() {
    const rol = localStorage.getItem("rol");
    const nombre = localStorage.getItem("nombre") || "";
    const navbar = document.getElementById("navbarContenido");
  
    if (!navbar) return;
 
    const base = window.location.pathname.endsWith("index.html") ? "views/" : "./";

    console.log("ROL DETECTADO:", rol);
  
    if (rol === "creador") {
      navbar.innerHTML = `
        <span class="text-white align-self-center">Hola, ${nombre}</span>
        <a href="${base}creador-home.html" class="btn btn-outline-light">Inicio</a>
        <button class="btn btn-danger" onclick="cerrarSesion()">Cerrar sesión</button>
      `;
    } else if (rol === "usuario") {
      navbar.innerHTML = `
        <span class="text-white align-self-center">Hola, ${nombre}</span>
        <a href="${base}usuario-home.html" class="btn btn-outline-light">Inicio</a>
        <button class="btn btn-danger" onclick="cerrarSesion()">Cerrar sesión</button>
      `;
    } else {
      // VISITANTE
      navbar.innerHTML = `
        <a href="${base}login.html" class="btn btn-outline-light">Iniciar sesión</a>
        <a href="${base}registro.html" class="btn btn-primary">Registrarse</a>
      `;
    }
  }
  
  function cerrarSesion() {
    localStorage.clear();
    window.location.href = "/index.html";
  }
  