document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCrearCampania");
  
    if (!form) {
      console.warn("Formulario no encontrado");
      return;
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const token = localStorage.getItem("token");
  
      const titulo = document.getElementById("titulo").value;
      const descripcion = document.getElementById("descripcion").value;
      const meta = document.getElementById("meta").value;
      const fechaLimite = document.getElementById("fechaLimite").value;
  
      try {
        const res = await fetch("https://backend-crowdfunding-mzfl.onrender.com/api/campanias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            titulo,
            descripcion,
            meta,
            fechaLimite
          })
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert("Campaña creada exitosamente");
          window.location.href = "mis-campanias.html";
        } else {
          alert("Error al crear campaña: " + (data.error || "Error desconocido"));
        }
      } catch (error) {
        console.error("Error al crear campaña:", error);
        alert("Error de red al crear la campaña");
      }
    });
  });
  