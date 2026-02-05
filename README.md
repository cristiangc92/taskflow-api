# TaskFlow API 🚀

API REST desarrollada con **Node.js, Express y PostgreSQL**, orientada a la gestión de proyectos y tareas, con autenticación mediante **JWT** y deploy en producción.

Este proyecto forma parte de un sistema **Full Stack**, donde el backend expone endpoints seguros para ser consumidos por un frontend independiente.

---

## 🧩 Funcionalidades

- Registro y login de usuarios
- Autenticación con JSON Web Tokens (JWT)
- Rutas protegidas mediante middleware
- CRUD de proyectos
- CRUD de tareas asociadas a proyectos
- Relación Usuario → Proyectos → Tareas
- Deploy en producción con base de datos PostgreSQL

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **PostgreSQL**
- **pg**
- **bcrypt**
- **jsonwebtoken**
- **Render** (deploy backend + database)

---

## 🌍 Deploy

API en producción:
https://taskflow-api-pztk.onrender.com


---

## 🔐 Autenticación

La API utiliza **JWT** para proteger las rutas.

### Header requerido:

Authorization: Bearer < TOKEN >

El token se obtiene al iniciar sesión.

---

## 📌 Endpoints principales

### 🔑 Auth

#### Registrar usuario
```bash
POST /api/auth/register
```

Body:
```json
{
  "name": "Cristian",
  "email": "cristian@test.com",
  "password": "123456"
}
```

#### Login
```bash
POST /api/auth/login
```

Body:
```json
{
  "email": "cristian@test.com",
  "password": "123456"
}
```

Respuesta:
```json
{
  "token": "JWT_TOKEN"
}
```

## 👤 Usuarios (ruta protegida)
```bash
GET /api/users
```

## 📁 Proyectos
#### Obtener proyectos del usuario
```bash
GET /api/projects
```

#### Crear proyecto
```bash
POST /api/projects
```

Body:
```json
{
  "name": "Mi proyecto",
  "description": "Descripción del proyecto"
}
```

#### Obtener proyecto por ID (incluye tareas)
```bash
GET /api/projects/:id
```

## ✅ Tareas
#### Obtener tareas por proyecto
```bash
GET /api/tasks/project/:projectId
```

#### Crear tarea
```bash
POST /api/tasks/project/:projectId
```

Body:
```json
{
  "title": "Diseñar UI",
  "description": "Wireframes y estructura",
  "status": "todo"
}
```

#### Actualizar tarea
```bash
PUT /api/tasks/:id
```

#### Eliminar tarea
```bash
DELETE /api/tasks/:id
```

## ⚙️ Variables de entorno
#### Archivo .env (no versionado):

PORT=3000

DATABASE_URL=postgresql://user:password@host:5432/dbname

JWT_SECRET=clave_secreta_segura

NODE_ENV=production

## ▶️ Ejecutar en local
1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Configurar .env
4. Ejecutar:
```bash
npm run dev
```

## 📌 Notas
- El backend está diseñado para ser consumido por un frontend separado
- El proyecto continúa en desarrollo como sistema Full Stack

## 👨‍💻 Autor
Cristian Gabriel Cacciolatti
📧 cristiangc92@gmail.com
💻 https://portfolio-cristian-cacciolatti.vercel.app/