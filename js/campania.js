document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const info = document.getElementById("infoCampania");
  const form = document.getElementById("formAporte");
  const montoInput = document.getElementById("monto");
  const mensaje = document.getElementById("mensajeAporte");
  const token = localStorage.getItem("token");

  if (!id || !info || !form || !montoInput) {
    console.warn("Elementos clave no encontrados en el DOM.");
    return;
  }

  // Obtener datos de la campaña
  try {
    const res = await fetch(`https://backend-crowdfunding-mzfl.onrender.com/api/campanias/${id}`);
    const campania = await res.json();

    if (!res.ok || !campania._id) {
      info.innerHTML = `<div class="alert alert-danger">No se pudo cargar la campaña.</div>`;
      return;
    }

    info.innerHTML = `
      <h2>${campania.titulo}</h2>
      <p>${campania.descripcion}</p>
      <p><strong>Meta:</strong> $${(campania.meta || 0).toLocaleString('es-CL')}</p>
      <p><strong>Recaudado:</strong> $${(campania.recaudado || 0).toLocaleString('es-CL')}</p>
      <p><strong>Fecha límite:</strong> ${new Date(campania.fechaLimite).toLocaleDateString()}</p>
    `;
  } catch (error) {
    console.error("Error al obtener campaña:", error);
    info.innerHTML = `<div class="alert alert-danger">No se pudo cargar la campaña.</div>`;
  }

  // Enviar aporte
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const monto = parseInt(montoInput.value, 10);

    if (!token) {
      mensaje.innerHTML = `<div class="alert alert-warning">Debes iniciar sesión para aportar.</div>`;
      return;
    }

    if (!monto || monto < 1000) {
      mensaje.innerHTML = `<div class="alert alert-danger">El monto mínimo es $1.000.</div>`;
      return;
    }

    try {
      const res = await fetch("https://backend-crowdfunding-mzfl.onrender.com/api/aportes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          monto,
          campaniaId: id
        })
      });

      const data = await res.json();

      if (res.ok) {
        mensaje.innerHTML = `<div class="alert alert-success">¡Gracias por tu aporte!</div>`;
        form.reset();
      } else {
        mensaje.innerHTML = `<div class="alert alert-danger">${data.error || 'No se pudo registrar el aporte.'}</div>`;
      }
    } catch (err) {
      console.error("Error al enviar aporte:", err);
      mensaje.innerHTML = `<div class="alert alert-danger">Error al conectar con el servidor.</div>`;
    }
  });
});
