# TodoList

Aplicación web full stack para crear, consultar, editar, completar y eliminar tareas persistidas en PostgreSQL.

## Tecnologías

- Frontend: React, Vite, JavaScript, JSX, CSS normal y Fetch API.
- Backend: Node.js, Express.js, Sequelize, PostgreSQL, dotenv, cors, helmet y morgan.
- Módulos JavaScript con ES Modules.

## Estructura general

```text
todolist/
├── backend/
│   ├── config/
│   ├── migrations/
│   ├── scripts/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── app.js
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── features/tasks/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
├── AGENTS.md
└── README.md
```

## Requisitos previos

- Node.js 18 o superior.
- npm.
- PostgreSQL ejecutándose en `localhost:5432`.
- Un usuario de PostgreSQL con permisos para conectarse y crear la base de datos, o la base creada manualmente.

## Configuración de variables de entorno

El backend utiliza `backend/.env`. Ese archivo no debe subirse al repositorio.

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todolist
DB_USER=postgres
DB_PASSWORD=your_password
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Para preparar el archivo de referencia:

```bash
copy backend\.env.example backend\.env
```

Después, completá `DB_PASSWORD` con la contraseña local correspondiente. En frontend se puede configurar `frontend/.env` a partir de `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
```

El frontend también utiliza esa URL como valor predeterminado cuando no existe el archivo local.

## Instalación y ejecución

En una terminal, ejecutá exactamente:

```bash
cd backend
npm install
npm run db:create
npm run db:migrate
npm run dev
```

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La interfaz queda disponible normalmente en `http://localhost:5173` y la API en `http://localhost:3000`.

## Base de datos

El comando `npm run db:create` se conecta inicialmente a la base administrativa `postgres`, comprueba si existe `todolist` y solamente la crea cuando hace falta.

La migración se ejecuta con:

```bash
cd backend
npm run db:migrate
```

Para deshacer la última migración:

```bash
npm run db:migrate:undo
```

La migración crea la tabla `tasks` con las columnas `id`, `name`, `description`, `completed`, `created_at` y `updated_at`.

## API

Todos los endpoints usan la ruta base `/api` y respuestas JSON con `success`, `data` o `error`, excepto `DELETE`, que responde `204` sin contenido.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/health` | Comprueba que la API funciona. |
| `GET` | `/api/tasks` | Lista las tareas desde la más reciente. |
| `GET` | `/api/tasks/:id` | Consulta una tarea individual. |
| `POST` | `/api/tasks` | Crea una tarea. |
| `PUT` | `/api/tasks/:id` | Actualiza una tarea. |
| `DELETE` | `/api/tasks/:id` | Elimina una tarea existente. |

Ejemplo de creación:

```bash
curl -X POST http://localhost:3000/api/tasks ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Preparar presentación\",\"description\":\"Revisar el material y preparar las diapositivas.\"}"
```

Ejemplo de respuesta exitosa:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Preparar presentación",
    "description": "Revisar el material y preparar las diapositivas.",
    "completed": false,
    "createdAt": "2026-08-04T18:00:00.000Z",
    "updatedAt": "2026-08-04T18:00:00.000Z"
  }
}
```

## Validaciones

- El nombre es obligatorio, se recorta y admite hasta 120 caracteres.
- La descripción es obligatoria, se recorta y admite hasta 2000 caracteres.
- `completed` es un booleano y comienza en `false`.
- El identificador debe ser un entero positivo.
- Las validaciones se aplican en frontend, backend y modelo Sequelize.

## Uso de la interfaz

- `+ Agregar tarea` abre el formulario en un modal.
- El checkbox marca una tarea como realizada y guarda el cambio en PostgreSQL.
- `Editar` abre el mismo modal con los datos existentes.
- `Eliminar` solicita confirmación antes de borrar.

## Posibles errores de conexión a PostgreSQL

- Si aparece `ECONNREFUSED`, iniciá el servicio de PostgreSQL y verificá `DB_HOST` y `DB_PORT`.
- Si aparece un error de autenticación, verificá `DB_USER` y `DB_PASSWORD` en `backend/.env`.
- Si el usuario no puede crear bases de datos, otorgale el permiso desde una sesión administrativa:

```sql
ALTER USER postgres CREATEDB;
```

- También se puede crear la base manualmente desde `psql`:

```sql
CREATE DATABASE todolist;
```

Después de corregir la conexión, ejecutá nuevamente `npm run db:create` y `npm run db:migrate` desde `backend`.
