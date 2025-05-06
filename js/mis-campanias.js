document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedorMisCampanias");
    const mensaje = document.getElementById("mensajeMisCampanias");
  
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
  
    if (rol !== "creador") {
      mensaje.innerHTML = `<div class="alert alert-warning">Acceso denegado. Debes ser un creador autenticado.</div>`;
      return;
    }
  
    fetch("http://localhost:3000/api/mis-campanias", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(campanias => {
        if (campanias.length === 0) {
          mensaje.innerHTML = `<div class="alert alert-info">Aún no has creado campañas.</div>`;
          return;
        }
  
        campanias.forEach(c => {
          const col = document.createElement("div");
          col.className = "col-md-6 col-lg-4";
  
          const progreso = ((c.recaudado / c.meta) * 100).toFixed(1);
  
          col.innerHTML = `
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <h5 class="card-title">${c.titulo}</h5>
                <p class="card-text">${c.descripcion}</p>
                <p class="mb-1"><strong>Meta:</strong> $${c.meta.toLocaleString('es-CL')}</p>
                <p class="mb-1"><strong>Recaudado:</strong> $${c.recaudado.toLocaleString('es-CL')}</p>
                <p class="mb-1"><strong>Fecha límite:</strong> ${new Date(c.fechaLimite).toLocaleDateString()}</p>
  
                <div class="progress mt-3" role="progressbar">
                  <div class="progress-bar bg-success" style="width: ${progreso}%">
                    ${progreso}%
                  </div>
                </div>
              </div>
            </div>
          `;
  
          contenedor.appendChild(col);
        });
      })
      .catch(err => {
        console.error(err);
        mensaje.innerHTML = `<div class="alert alert-danger">Error al cargar tus campañas.</div>`;
      });
  });
  