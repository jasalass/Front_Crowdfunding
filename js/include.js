function includeHTML(callback) {
  const includes = document.querySelectorAll('[data-include]');
  let pending = includes.length;

  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;
      })
      .catch(err => console.warn("No se pudo cargar:", file))
      .finally(() => {
        pending--;
        if (pending === 0 && typeof callback === "function") {
          callback();
        }
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML(inicializarNavbar);
});
