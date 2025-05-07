document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorExplorar");
  const mensaje = document.getElementById("mensajeExplorar");

  fetch("https://backend-crowdfunding-mzfl.onrender.com/api/campanias")
    .then(res => res.json())
    .then(campanias => {
      if (campanias.length === 0) {
        mensaje.innerHTML = `<div class="alert alert-warning">No hay campañas activas en este momento.</div>`;
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
              <p class="card-text">${c.descripcion.slice(0, 100)}...</p>
              <p><strong>Meta:</strong> $${c.meta.toLocaleString('es-CL')}</p>
              <div class="progress mb-2">
                <div class="progress-bar bg-success" style="width: ${progreso}%">${progreso}%</div>
              </div>
              <a href="campania.html?id=${c._id}" class="btn btn-primary btn-sm">Ver más / Aportar</a>
            </div>
          </div>
        `;

        contenedor.appendChild(col);
      });
    })
    .catch(err => {
      console.error("Error al cargar campañas:", err);
      mensaje.innerHTML = `<div class="alert alert-danger">Error al cargar campañas activas.</div>`;
    });
});
