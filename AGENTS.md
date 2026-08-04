# AGENTS.md

## Proyecto

Este repositorio contiene una aplicación web TodoList.

La aplicación debe permitir:

* Crear tareas.
* Listar tareas.
* Ver una tarea.
* Editar tareas.
* Marcar tareas como realizadas mediante un checkbox.
* Eliminar tareas con confirmación previa.
* Mostrar nombre, descripción y fecha de creación.

No agregar funcionalidades fuera del alcance solicitado.

## Stack

### Frontend

* React.
* Vite.
* JavaScript.
* JSX.
* CSS normal.
* Fetch API.

### Backend

* Node.js.
* Express.js.
* JavaScript.
* ES Modules.
* Sequelize ORM.
* PostgreSQL.
* dotenv.

Usar `import` y `export` en el código de la aplicación.

Los archivos `.cjs` de configuración, el archivo `.sequelizerc` y las migraciones pueden utilizar CommonJS únicamente por compatibilidad con `sequelize-cli`.

No utilizar CommonJS en el código de la aplicación, TypeScript, SQLite ni otro ORM.

## Base de datos

La aplicación utiliza PostgreSQL mediante Sequelize.

Configuración local:

```text
Base de datos: todolist
Usuario: postgres
Host: localhost
Puerto: 5432
```

La contraseña y las demás credenciales deben almacenarse únicamente en:

```text
backend/.env
```

Variables esperadas:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todolist
DB_USER=postgres
DB_PASSWORD=your_password
```

El archivo `.env` no debe subirse al repositorio.

Debe existir un `.env.example` sin credenciales reales.

## Arquitectura

Estructura principal:

```text
todolist/
├── frontend/
├── backend/
├── .opencode/
│   └── skills/
├── AGENTS.md
├── README.md
└── .gitignore
```

Flujo del backend:

```text
Ruta
→ Controlador
→ Servicio
→ Repositorio
→ Modelo Sequelize
→ PostgreSQL
```

Mantener separadas las responsabilidades.

## Frontend

Organizar la funcionalidad de tareas dentro de:

```text
frontend/src/features/tasks/
├── components/
├── services/
└── utils/
```

Reglas:

* Centralizar las peticiones en `taskApi.js`.
* Utilizar `VITE_API_URL`.
* Validar nombre y descripción.
* Mostrar carga, errores y estados vacíos.
* Evitar envíos duplicados.
* Actualizar la interfaz sin recargar la página.
* Utilizar HTML semántico y botones reales.

## Backend

Organizar el módulo de tareas dentro de:

```text
backend/src/modules/tasks/
├── task.model.js
├── task.routes.js
├── task.controller.js
├── task.service.js
├── task.repository.js
└── task.validation.js
```

Responsabilidades:

* Las rutas definen endpoints.
* Los controladores manejan HTTP.
* Los servicios contienen reglas de negocio.
* Los repositorios acceden a Sequelize.
* Los modelos definen la estructura de datos.
* Las validaciones controlan los datos de entrada.

Los controladores y servicios no deben acceder directamente al modelo Sequelize.

## Sequelize

La conexión debe centralizarse en:

```text
backend/src/config/database.js
```

Utilizar una única instancia de Sequelize.

Usar migraciones para crear o modificar tablas.

No utilizar `sequelize.sync({ force: true })` como mecanismo habitual.

## API

Ruta base:

```text
/api/tasks
```

Endpoints:

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

Utilizar códigos HTTP correctos y respuestas JSON consistentes.

## Seguridad

* Validar todos los datos recibidos.
* Configurar CORS para el frontend esperado.
* No exponer errores internos de Sequelize o PostgreSQL.
* No incluir credenciales en el código.
* No utilizar `dangerouslySetInnerHTML`.
* Mantener `.env` fuera de Git.

## Restricciones

No agregar sin autorización:

* Autenticación.
* Usuarios o roles.
* Categorías o prioridades.
* Fechas de vencimiento.
* Redux.
* Tailwind.
* Docker.
* Microservicios.

No dejar código incompleto, placeholders ni comentarios `TODO`.

## Forma de trabajo

Antes de modificar:

1. Leer este archivo.
2. Revisar la estructura existente.
3. Identificar las capas afectadas.
4. Evitar cambios fuera del alcance.

Después de modificar:

1. Verificar frontend y backend.
2. Comprobar PostgreSQL.
3. Revisar validaciones y errores.
4. Ejecutar las pruebas disponibles.
5. Actualizar la documentación.

Una funcionalidad se considera terminada cuando funciona desde React hasta PostgreSQL y respeta esta arquitectura.
