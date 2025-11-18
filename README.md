# 📚 BiblioSoft - Frontend

Sistema de gestión de biblioteca para la Universidad del Valle

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow.svg)]()

## 📋 Descripción

Aplicación web moderna desarrollada con React y Vite que proporciona una interfaz intuitiva para la gestión de libros, usuarios y préstamos de la biblioteca universitaria. Incluye autenticación, gestión de roles y un diseño responsivo.

---

## 🚀 Características Principales

### ✅ Módulos Implementados

- **🔐 Autenticación**
  - Login con validaciones
  - Registro de usuarios
  - Recuperación de contraseña por email
  - Restablecimiento de contraseña
  - Cambio de contraseña
  - Protección de rutas

- **👨‍💼 Panel de Administrador**
  - Dashboard administrativo
  - Agregar nuevos libros
  - Buscar usuarios por código
  - Gestión completa de libros

- **👤 Panel de Usuario**
  - Dashboard de usuario
  - Búsqueda de libros
  - Consulta de disponibilidad

- **📖 Gestión de Libros**
  - Formulario de agregar libros
  - Listado de libros
  - Búsqueda avanzada
  - Validaciones en tiempo real

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 19.1.1 | Librería UI |
| **Vite** | 7.1.7 | Build tool y dev server |
| **React Router DOM** | 7.9.5 | Enrutamiento SPA |
| **Axios** | 1.13.2 | Cliente HTTP |
| **React Icons** | 5.5.0 | Iconos |
| **ESLint** | 9.36.0 | Linter |

---

## 📦 Estructura del Proyecto

```
BiblioSoft-Front/
├── public/                        # Archivos estáticos
│   └── background.jpg            # Imagen de fondo
│
├── src/
│   ├── main.jsx                  # Punto de entrada
│   ├── App.jsx                   # Componente raíz con rutas
│   ├── App.css                   # Estilos globales
│   ├── index.css                 # Estilos base
│   │
│   ├── assets/                   # Recursos estáticos
│   │
│   ├── components/               # Componentes reutilizables
│   │   ├── LibroForm.jsx         # Formulario de libros
│   │   ├── LibroList.jsx         # Listado de libros
│   │   │
│   │   ├── AddBook/              # ✨ Nuevo módulo
│   │   │   ├── AddBookForm.jsx   # Formulario agregar libro
│   │   │   └── AddBookForm.css
│   │   │
│   │   ├── Login/
│   │   │   ├── LoginForm.jsx
│   │   │   └── LoginForm.css
│   │   │
│   │   ├── Register/
│   │   │   ├── RegisterForm.jsx
│   │   │   └── RegisterForm.css
│   │   │
│   │   ├── ForgotPassword/
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ForgotPassword.css
│   │   │
│   │   ├── ResetPassword/
│   │   │   ├── ResetPassword.jsx
│   │   │   └── ResetPassword.css
│   │   │
│   │   └── ChangePassword/
│   │       ├── ChangePassword.jsx
│   │       ├── ChangePassword.css
│   │       ├── ChangePasswordForm.jsx
│   │       └── ChangePasswordForm.css
│   │
│   ├── pages/                    # Páginas/Vistas
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   │
│   │   ├── Register/
│   │   │   ├── Register.jsx
│   │   │   └── Register.css
│   │   │
│   │   ├── ForgotPassword/
│   │   │   ├── Forgot.jsx
│   │   │   └── Forgot.css
│   │   │
│   │   ├── ResetPassword/
│   │   │   ├── Reset.jsx
│   │   │   └── Reset.css
│   │   │
│   │   ├── ChangePassword/
│   │   │   ├── ChangePassword.jsx
│   │   │   └── ChangePassword.css
│   │   │
│   │   ├── AdminDashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AdminDashboard.css
│   │   │
│   │   ├── UserDashboard/
│   │   │   ├── UserDashboard.jsx
│   │   │   └── UserDashboard.css
│   │   │
│   │   ├── AddBook/              # ✨ Nuevo
│   │   │   ├── AddBook.jsx
│   │   │   └── AddBook.css
│   │   │
│   │   ├── Buscar/
│   │   │   ├── Buscar.jsx
│   │   │   └── Buscar.css
│   │   │
│   │   └── BuscarPorCodigo/
│   │       ├── BuscarPorCodigo.jsx
│   │       └── BuscarPorCodigo.css
│   │
│   ├── services/                 # Servicios API
│   │   └── LibroService.js       # Servicio de libros
│   │
│   ├── utils/                    # Utilidades
│   │   └── auth.js               # Helpers de autenticación
│   │
│   └── styles/                   # Estilos compartidos
│       └── dashboard.css
│
├── .eslintrc.js                  # Configuración ESLint
├── vite.config.js                # Configuración Vite
├── package.json                  # Dependencias
└── README.md                     # Este archivo
```

---

## 🔧 Requisitos Previos

- **Node.js** v18 o superior
- **npm** o **yarn**
- **Backend** corriendo en `http://localhost:8080`

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd BiblioSoft-Front
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno (opcional)

Si necesitas cambiar la URL del backend, edita `src/services/LibroService.js`:

```javascript
const API_URL = "http://localhost:8080/api/book";
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en: `http://localhost:5173`

### 5. Compilar para producción

```bash
npm run build
# o
yarn build
```

Los archivos compilados estarán en la carpeta `dist/`.

---

## 🗺️ Rutas de la Aplicación

| Ruta | Componente | Acceso | Descripción |
|------|-----------|--------|-------------|
| `/` | Login | Público | Página de inicio de sesión |
| `/register` | Register | Público | Registro de usuarios |
| `/forgot-password` | Forgot | Público | Recuperar contraseña |
| `/reset-password` | Reset | Público | Restablecer contraseña |
| `/admin` | AdminDashboard | Admin | Panel de administrador |
| `/dashboard-user` | UserDashboard | Usuario | Panel de usuario |
| `/add-book` | AddBook | Admin | Agregar nuevo libro |
| `/search-user` | BuscarPorCodigo | Admin | Buscar usuario |
| `/buscar` | Buscar | Usuario | Buscar libros |
| `/change-password` | ChangePassword | Autenticado | Cambiar contraseña |

---

## 📡 Servicios API

### LibroService (`src/services/LibroService.js`)

```javascript
// Obtener todos los libros
getAllBooks()

// Guardar un nuevo libro
saveBook(book)

// Editar un libro existente
editBook(book)

// Eliminar un libro
deleteBook(id)

// Buscar libros por query
buscarLibros(query)
```

**Ejemplo de uso:**

```javascript
import LibroService from '../services/LibroService';

// Obtener todos los libros
LibroService.getAllBooks()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Agregar un libro
const nuevoLibro = {
  titulo: "Don Quijote",
  autor: "TeKvrA",
  anio: 2024,
  editorial: "Editorial UV"
};

LibroService.saveBook(nuevoLibro)
  .then(response => {
    console.log('Libro guardado:', response.data);
  });
```

---

## 🎨 Estilos y Diseño

### Paleta de Colores

- **Primario:** `rgb(114, 0, 0)` (Rojo oscuro)
- **Secundario:** `white`
- **Fondo:** Imagen de fondo con overlay
- **Acentos:** Transparencias y sombras

### Componentes Estilizados

- Formularios con bordes redondeados (`border-radius: 40px`)
- Inputs con iconos de React Icons
- Botones con efectos hover y transiciones
- Mensajes de error/éxito animados
- Diseño responsivo

---

## 🔐 Autenticación Local

El sistema usa `localStorage` para mantener la sesión:

```javascript
// Guardar token y datos
localStorage.setItem('token', token);
localStorage.setItem('role', role);
localStorage.setItem('username', username);

// Obtener datos
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

// Cerrar sesión
localStorage.removeItem('token');
localStorage.removeItem('role');
localStorage.removeItem('username');
```

### Utilidad de Autenticación (`src/utils/auth.js`)

```javascript
import { logout } from '../utils/auth';

// Cerrar sesión
logout(); // Limpia localStorage y redirige
```

---

## ✅ Validaciones del Frontend

### Login
- Username: obligatorio, máx. 10 caracteres
- Password: regex de seguridad

### Registro
- Firstname/Lastname: obligatorios
- Email: formato válido
- Code: único, obligatorio
- Password: mín. 8 caracteres, mayúscula, minúscula, número, carácter especial

### Agregar Libro
- Título: obligatorio, máx. 50 caracteres
- Autor: obligatorio, máx. 70 caracteres
- Año: número válido, no mayor al año actual
- Editorial: obligatoria, máx. 70 caracteres

---

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview

# Linting
npm run lint
```

---

## 🌐 Integración con Backend

El frontend se comunica con el backend usando Axios. Asegúrate de que:

1. El backend esté corriendo en `http://localhost:8080`
2. CORS esté configurado para `http://localhost:5173`
3. Los endpoints coincidan con los del backend

---

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (< 600px)
- 📱 Tablets (600px - 1024px)
- 💻 Desktop (> 1024px)

---

## 🐛 Debugging

### Modo de desarrollo con logs
Los componentes incluyen `console.log()` para debugging. Para producción, elimina estos logs.

### React DevTools
Instala la extensión de React DevTools para debugging avanzado.

---

## 📚 Próximas Funcionalidades

- [ ] Módulo de préstamos completo
- [ ] Edición de libros desde el dashboard
- [ ] Listado con paginación
- [ ] Filtros avanzados de búsqueda
- [ ] Notificaciones en tiempo real
- [ ] Dark mode
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios y de integración
- [ ] PWA (Progressive Web App)

---

## 🚀 Despliegue

### Netlify / Vercel

```bash
npm run build
# Sube la carpeta dist/
```

### Variables de entorno en producción

Crea un archivo `.env`:

```env
VITE_API_URL=https://tu-backend.com/api
```

Usa en el código:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

---

## 👥 Autores

**Equipo de Desarrollo - Universidad del Valle**
- Sebastian Santacurz
- Jean Lopez
- Angel Lopez
- Camilo Lopez

---

## 📄 Licencia

Este proyecto está en desarrollo como parte de un proyecto académico de la Universidad del Valle.

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.

---

**Desarrollado con ❤️ para la Universidad del Valle** 🎓
