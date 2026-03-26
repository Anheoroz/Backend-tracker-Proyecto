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

