---

name: task-crud-development
description: Implementa y corrige el CRUD de tareas del proyecto TodoList usando React, Express, Sequelize y PostgreSQL.
compatibility: OpenCode y agentes compatibles con Agent Skills
metadata:
  project: todolist
  category: full-stack
  stack: react-vite-express-sequelize-postgresql
----------------------------------------------

# Task CRUD Development

## Cuándo usar

Usar esta skill para trabajar en:

* Creación de tareas.
* Listado de tareas.
* Consulta individual.
* Edición de tareas.
* Eliminación con confirmación.
* Validaciones.
* Modelo Sequelize `Task`.
* Endpoints `/api/tasks`.
* Persistencia en PostgreSQL.
* Componentes y estilos relacionados con las tareas.

`AGENTS.md` tiene prioridad sobre esta skill.

## Arquitectura

### Frontend

```text
src/features/tasks/
├── components/
│   ├── TaskCard/
│   ├── TaskDetails/
│   ├── TaskForm/
│   └── TaskList/
├── services/
│   └── taskApi.js
└── utils/
    └── taskValidation.js
```

### Backend

```text
src/modules/tasks/
├── task.model.js
├── task.routes.js
├── task.controller.js
├── task.service.js
├── task.repository.js
└── task.validation.js
```

Flujo obligatorio del backend:

```text
Ruta
→ Controlador
→ Servicio
→ Repositorio
→ Modelo Sequelize
→ PostgreSQL
```

Mantener separadas la interfaz, la lógica de negocio y el acceso a datos.

## Diseño de interfaz

* Crear una interfaz simple, limpia y responsiva.
* Usar React, JavaScript y CSS normal.
* No utilizar librerías de componentes ni frameworks CSS.
* Mantener una jerarquía visual clara entre formulario, listado y detalle.
* El formulario debe solicitar nombre y descripción.
* Cada tarea debe mostrar nombre, descripción y fecha de creación.
* Las acciones de ver, editar y eliminar deben ser visibles y comprensibles.
* Solicitar confirmación antes de eliminar una tarea.
* Mostrar estados de carga, error y lista vacía.
* Deshabilitar acciones mientras una petición esté en proceso.
* Mostrar mensajes claros después de crear, editar o eliminar.
* Usar etiquetas accesibles, botones semánticos y foco visible.
* Permitir navegación mediante teclado.
* Mantener los estilos separados de la lógica de los componentes.
* Adaptar la interfaz para dispositivos móviles y escritorio.

## Modelo Task

Tabla:

```text
tasks
```

Campos:

* `id`
* `name`
* `description`
* `createdAt`
* `updatedAt`

Reglas:

* `id` autogenerado.
* `name` obligatorio, con un máximo de 150 caracteres.
* `description` obligatoria, con un máximo de 2000 caracteres.
* Utilizar los timestamps de Sequelize.
* No aceptar identificadores ni fechas enviados desde el frontend.
* No agregar campos nuevos sin autorización.

## Operaciones

### Crear

* Solicitar nombre y descripción.
* Validar los datos y aplicar `trim`.
* Crear la tarea mediante el repositorio.
* Devolver el código `201`.
* Agregar la tarea a la interfaz sin recargar la página.

### Listar

* Obtener las tareas desde PostgreSQL.
* Ordenarlas desde la más reciente.
* Mostrar estado de carga, error o lista vacía.
* No utilizar datos simulados cuando la API esté disponible.

### Consultar

* Validar el identificador antes de consultar.
* Devolver `404` si la tarea no existe.
* Mostrar nombre, descripción, fecha de creación y fecha de actualización.

### Editar

* Precargar los datos actuales.
* Validar nombre y descripción.
* Mantener `createdAt`.
* Permitir que Sequelize actualice `updatedAt`.
* Devolver el código `200`.
* Actualizar la interfaz sin recargar la página.

### Eliminar

* Mostrar una confirmación antes de eliminar.
* No enviar la petición si el usuario cancela.
* Deshabilitar la acción durante la petición.
* Eliminar la tarea mediante el repositorio.
* Devolver el código `204`.
* Mantener la tarea visible si ocurre un error.

## Validaciones

### Nombre

* Debe ser texto.
* Es obligatorio.
* No puede contener solamente espacios.
* Debe tener un máximo de 150 caracteres.

### Descripción

* Debe ser texto.
* Es obligatoria.
* No puede contener solamente espacios.
* Debe tener un máximo de 2000 caracteres.

### Identificador

* Debe ser un número entero positivo.
* Debe rechazarse antes de consultar la base de datos si es inválido.

Validar los datos tanto en el frontend como en el backend.

Las validaciones del modelo Sequelize complementan las validaciones de entrada, pero no las reemplazan.

## Sequelize

Utilizar una única instancia de Sequelize configurada en:

```text
src/config/database.js
```

El repositorio debe utilizar el modelo Sequelize.

Los controladores y servicios no deben acceder directamente al modelo.

Utilizar migraciones para crear o modificar la tabla.

Configuración esperada:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todolist
DB_USER=postgres
DB_PASSWORD=your_password
```

No escribir credenciales directamente en el código.

El archivo `.env` no debe incluirse en el repositorio.

Mantener un archivo `.env.example` sin datos sensibles.

## API

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

Códigos principales:

```text
200  Consulta o actualización correcta
201  Creación correcta
204  Eliminación correcta
400  Datos inválidos
404  Tarea inexistente
500  Error inesperado
```

Las respuestas con contenido deben utilizar JSON.

No exponer mensajes internos de Sequelize, PostgreSQL ni trazas de errores.

## Proceso de trabajo

1. Leer `AGENTS.md`.
2. Revisar los archivos existentes antes de modificar.
3. Modificar la migración o el modelo si corresponde.
4. Modificar el repositorio.
5. Modificar el servicio.
6. Modificar el controlador y la ruta.
7. Actualizar `taskApi.js`.
8. Actualizar los componentes React.
9. Actualizar los estilos necesarios.
10. Verificar validaciones, carga y errores.
11. Actualizar la documentación afectada.

No crear archivos o capas adicionales sin una necesidad concreta.

## Verificaciones

Comprobar:

* Creación con datos válidos.
* Rechazo de campos vacíos.
* Rechazo de valores con solamente espacios.
* Rechazo de valores que superen los límites.
* Listado y estado vacío.
* Consulta de una tarea inexistente.
* Edición correcta.
* Conservación de `createdAt`.
* Actualización de `updatedAt`.
* Confirmación y cancelación de eliminación.
* Manejo de errores del backend.
* Estados de carga en la interfaz.
* Ausencia de recargas de página.
* Diseño responsivo.
* Navegación mediante teclado.
* Ausencia de credenciales en el repositorio.

## Restricciones

No agregar sin autorización:

* Usuarios o autenticación.
* Categorías o prioridades.
* Estado de tarea completada.
* Fechas de vencimiento.
* Redux.
* TypeScript.
* Tailwind CSS.
* Librerías de componentes.
* Otro ORM.
* Otra base de datos.

No dejar código incompleto, placeholders, datos simulados innecesarios ni comentarios `TODO`.
