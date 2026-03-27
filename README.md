# Tracker de Habitos proyecto - Backend

## Instalación

//  se aseguro de instalar librerias de mongoose y express

```bash
npm install
```

## Ejecutar proyecto

```bash
npm run dev
```
// si la configuracion es correcta, deberia de mostrar en la terminal, servidor en puerto 5000
MongoDB conectado.. 

## Variables de entorno

// esto sirve para postman
Crear archivo `.env` en la raíz del backend:

```
PORT=5000
MONGO_URI= URL PROPORCIONADA POR MONGODB
```
Pruebas en POSTMAN

## Endpoints

### Crear hábito

POST /api/habits

### Obtener hábitos

GET /api/habits

### Actualizar hábito

PUT /api/habits/:id

### Eliminar hábito

DELETE /api/habits/:id

// Se pueden comprobar el POST, GET, PUT, DELETE en la base de datos de MONGODB ATLAS

# Backend - Semana 4 (Habit Tracker)

Este módulo implementa la lógica principal para el seguimiento de hábitos y la gestión de usuarios.

---

# Funcionalidades implementadas

## Lógica de rachas (streak)

* Incremento automático de racha si el hábito se cumple al día siguiente
* Reinicio de racha si se pierde continuidad
* Validación para evitar múltiples registros en el mismo día

---

## Endpoint "Done"

Permite marcar un hábito como completado:

```http
PUT /api/habits/:id/done
```

### Comportamiento:

* Si es la primera vez → `streak = 1`
* Si es el día siguiente → `streak + 1`
* Si pasaron varios días → `streak = 1`
* Si ya se completó hoy → no cambia

---

## Sistema de usuarios

### Registro

```http
POST /api/users/register
```

* Verifica si el usuario ya existe
* Encripta la contraseña usando **bcrypt**
* Guarda el usuario en la base de datos

---

### Login

```http
POST /api/users/login
```

* Busca usuario por email
* Compara contraseña con bcrypt
* Valida acceso

---

# Seguridad

* Contraseñas encriptadas con bcrypt
* No se almacenan contraseñas en texto plano

---

# Tecnologías utilizadas

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcrypt

---

# Estructura relevante

```id="bkend123"
controllers/
  habitController.js
  userController.js

models/
  Habit.js
  User.js

routes/
  habitRoutes.js
  userRoutes.js
```

---

# Objetivo cumplido

✔️ Implementación de lógica de rachas
✔️ Endpoint para marcar hábitos como completados
✔️ Registro de usuarios con hash
✔️ Login con validación segura

---

# Nota

La lógica del backend asegura consistencia en el seguimiento de hábitos y protege la información de los usuarios.

# Backend – Semana 5

## Descripción

En esta fase se implementó un sistema de autenticación y autorización utilizando JSON Web Tokens (JWT) almacenados en cookies. Se protegieron las rutas del backend mediante middleware y se integró el flujo completo de validación de sesión para controlar el acceso a los recursos.

---

## Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* cookie-parser
* cors

---

## Autenticación

El sistema utiliza JWT para manejar sesiones de usuario.

Flujo de autenticación:

1. El usuario inicia sesión con email y contraseña
2. El backend valida las credenciales
3. Se genera un JWT firmado
4. El token se guarda en una cookie httpOnly
5. El navegador envía automáticamente la cookie en cada request

---

## Middleware de autorización

Se implementó un middleware que protege las rutas del sistema.

Funcionalidad:

* Obtiene el token desde `req.cookies.token`
* Verifica el token con `jwt.verify`
* Si es válido, permite continuar
* Si no existe o es inválido, retorna error 401

Ejemplo de uso:

```js
router.get("/", authMiddleware, getHabits);
```

---

## Endpoints implementados

### Autenticación

* POST `/api/auth/login`
  Genera un JWT y lo guarda en una cookie

* POST `/api/auth/logout`
  Elimina la cookie del usuario

---

### Hábitos (rutas protegidas)

Todas requieren autenticación mediante middleware:

* GET `/api/habits`
* POST `/api/habits`
* PUT `/api/habits/:id`
* DELETE `/api/habits/:id`
* PUT `/api/habits/:id/done`

---

## Manejo de cookies

El token se almacena en una cookie con la siguiente configuración:

```js
res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: false
});
```

Esto evita que el token sea accesible desde JavaScript, mejorando la seguridad.

---

## Seguridad implementada

* Hash de contraseñas con bcrypt
* Uso de salt automático
* Tokens firmados con JWT
* Protección de rutas mediante middleware
* Cookies httpOnly

---

## Variables de entorno

```env
JWT_SECRET=tu_secreto
MONGO_URI=tu_uri
PORT=5000
```

---

## Ejecución

Instalar dependencias:

```bash
npm install
```

Ejecutar servidor:

```bash
npm run dev
```
