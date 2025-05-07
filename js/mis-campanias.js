document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorMisCampanias");
  const mensaje = document.getElementById("mensajeMisCampanias");
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  let idParaEliminar = null;
  const modal = new bootstrap.Modal(document.getElementById("modalEliminar"));
  const btnConfirmar = document.getElementById("btnConfirmarEliminar");

  if (rol !== "creador") {
    mensaje.innerHTML = `<div class="alert alert-warning">Acceso denegado. Debes ser un creador autenticado.</div>`;
    return;
  }

  fetch("https://backend-crowdfunding-mzfl.onrender.com/api/campanias/mias", {
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
              <div class="progress mt-2 mb-3" role="progressbar">
                <div class="progress-bar bg-success" style="width: ${progreso}%">${progreso}%</div>
              </div>
              <button class="btn btn-danger btn-sm eliminar-campania" data-id="${c._id}">🗑️ Eliminar</button>
            </div>
          </div>
        `;

        contenedor.appendChild(col);
      });

      // Listeners para todos los botones eliminar
      document.querySelectorAll(".eliminar-campania").forEach(btn => {
        btn.addEventListener("click", () => {
          idParaEliminar = btn.dataset.id;
          modal.show();
        });
      });

      btnConfirmar.addEventListener("click", async () => {
        if (!idParaEliminar) return;

        try {
          const res = await fetch(`https://backend-crowdfunding-mzfl.onrender.com/api/campanias/${idParaEliminar}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = await res.json();

          if (res.ok) {
            modal.hide();
            location.reload();
          } else {
            alert("Error: " + (data.error || "No se pudo eliminar la campaña."));
          }
        } catch (err) {
          console.error("Error al eliminar:", err);
          alert("Error al conectar con el servidor.");
        }
      });
    })
    .catch(err => {
      console.error(err);
      mensaje.innerHTML = `<div class="alert alert-danger">Error al cargar tus campañas.</div>`;
    });
});
