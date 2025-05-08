# 📱 CrowdfundApp - Frontend

Interfaz web del sistema de financiamiento colaborativo **CrowdfundApp**, construida con HTML, CSS, Bootstrap y JavaScript puro.

Permite a creadores gestionar campañas y a usuarios aportar de forma segura y simple.

---

## 🌐 Enlaces importantes

- 🔴 Sitio en producción (Netlify): [https://crowdfunding-demo.netlify.app](https://crowdfunding-demo.netlify.app)  
- ⚙️ Repositorio del backend (Render + MongoDB): [https://github.com/jasalass/Backend_Crowdfunding](https://github.com/jasalass/Backend_Crowdfunding)

---

## 🔍 Funcionalidades principales

- Autenticación de usuarios con JWT
- Registro e inicio de sesión
- Creación de campañas con meta, descripción y fecha límite
- Exploración de campañas activas
- Aportes con validación
- Navbar dinámico según el rol
- Diseño responsive con Bootstrap

---

## 📁 Estructura del proyecto

```
FRONT_CROWDFUNDING/
├── components/
│   ├── footer.html
│   └── navbar.html
├── css/
│   └── estilo.css
├── img/
├── js/
│   ├── auth.js
│   ├── campania.js
│   ├── config.js
│   ├── crear-campania.js
│   ├── explorar.js
│   ├── include.js
│   ├── mis-campanias.js
│   └── navbar.js
├── views/
│   ├── creador-home.html
│   ├── crear-campania.html
│   ├── explorar.html
│   ├── login.html
│   ├── mis-campanias.html
│   ├── registro.html
│   └── usuario-home.html
├── 404.html
├── index.html
└── README.md
```

---

## ⚙️ Configuración para desarrollo

1. Clona este repositorio:

```bash
git clone https://github.com/jasalass/Front_Crowdfunding
```

2. Abre `index.html` con Live Server o sube a Netlify.

3. Asegúrate de configurar correctamente la URL del backend en `js/config.js`:

```js
export const API_URL = "https://backend-crowdfunding-mzfl.onrender.com/api";
```

---

## ✅ Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Brave)
- Backend desplegado y funcional (ver enlace arriba)

---

## 🧠 Notas técnicas

- Se usa `localStorage` para guardar el token y el rol del usuario.
- Navbar y footer se cargan con `include.js` para mantener DRY el HTML.
- Los formularios manejan validaciones básicas en el frontend.

---

## 👨‍💻 Autor

Desarrollado por **Juan Salas** — 2025

