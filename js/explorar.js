document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedorCampanias");
    const mensaje = document.getElementById("mensajeExplorar");
  
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
  
    if (rol !== "usuario") {
      mensaje.innerHTML = `<div class="alert alert-warning">Solo los usuarios autenticados pueden aportar.</div>`;
      return;
    }
  
    fetch("http://localhost:3000/api/campanias")
      .then(res => res.json())
      .then(campanias => {
        if (campanias.length === 0) {
          mensaje.innerHTML = `<div class="alert alert-info">No hay campañas disponibles por ahora.</div>`;
          return;
        }
  
        campanias.forEach(c => {
          const col = document.createElement("div");
          col.className = "col-md-6 col-lg-4";
  
          const id = c._id || c.id || ""; // usa el campo real que devuelva tu backend
  
          col.innerHTML = `
            <div class="card h-100 shadow-sm">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${c.titulo}</h5>
                <p class="card-text">${c.descripcion}</p>
                <p><strong>Meta:</strong> $${c.meta.toLocaleString('es-CL')}</p>
                <p><strong>Fecha límite:</strong> ${new Date(c.fechaLimite).toLocaleDateString()}</p>
  
                <form class="mt-auto aporte-form" data-id="${id}">
                  <div class="input-group mt-2">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" placeholder="Monto" required min="1000" />
                    <button type="submit" class="btn btn-primary">Aportar</button>
                  </div>
                </form>
                <div class="respuesta-aporte mt-2"></div>
              </div>
            </div>
          `;
  
          contenedor.appendChild(col);
        });
  
        // Escuchar todos los formularios de aporte
        document.querySelectorAll(".aporte-form").forEach(form => {
          form.addEventListener("submit", async (e) => {
            e.preventDefault();
  
            const campaniaId = form.getAttribute("data-id");
            const input = form.querySelector("input");
            const monto = parseInt(input.value);
            const respuesta = form.nextElementSibling;
  
            respuesta.innerHTML = "";
  
            if (!monto || monto < 1000) {
              respuesta.innerHTML = `<div class="text-danger">💸 El aporte debe ser mínimo $1.000</div>`;
              return;
            }
  
            try {
              const res = await fetch("http://localhost:3000/api/aportes", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ campaniaId, monto })
              });
  
              const data = await res.json();
  
              if (res.ok) {
                respuesta.innerHTML = `<div class="text-success">✅ ¡Gracias por tu aporte!</div>`;
                input.value = "";
              } else {
                respuesta.innerHTML = `<div class="text-danger">❌ ${data.error || "Error al aportar"}</div>`;
              }
            } catch (err) {
              console.error(err);
              respuesta.innerHTML = `<div class="text-danger">🚫 Error de conexión</div>`;
            }
          });
        });
      })
      .catch(err => {
        console.error(err);
        mensaje.innerHTML = `<div class="alert alert-danger">🚫 Error al cargar campañas.</div>`;
      });
  });
  