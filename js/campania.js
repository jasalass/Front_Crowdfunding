document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCampania");
    const mensaje = document.getElementById("mensajeCampania");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      mensaje.innerHTML = "";
  
      const titulo = document.getElementById("titulo").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();
      const meta = parseInt(document.getElementById("meta").value);
      const fechaLimite = document.getElementById("fechaLimite").value;
  
      const errores = [];
      if (!titulo) errores.push("El título es obligatorio.");
      if (!descripcion) errores.push("La descripción es obligatoria.");
      if (!meta || meta <= 0) errores.push("La meta debe ser un número mayor a 0.");
      if (!fechaLimite) errores.push("La fecha límite es obligatoria.");
  
      if (errores.length > 0) {
        mensaje.innerHTML = `<div class="alert alert-danger">${errores.map(e => `• ${e}`).join("<br>")}</div>`;
        return;
      }
  
      const datos = { titulo, descripcion, meta, fechaLimite };
  
      try {
        const token = localStorage.getItem("token");
  
        const res = await fetch("http://localhost:3000/api/campanias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(datos)
        });
  
        const result = await res.json();
  
        if (res.ok) {
          mensaje.innerHTML = `<div class="alert alert-success">✅ Campaña creada exitosamente.</div>`;
          form.reset();
        } else {
          mensaje.innerHTML = `<div class="alert alert-danger">❌ ${result.error || "Ocurrió un error"}</div>`;
        }
      } catch (error) {
        console.error(error);
        mensaje.innerHTML = `<div class="alert alert-danger">🚫 Error de conexión</div>`;
      }
    });
  });
  