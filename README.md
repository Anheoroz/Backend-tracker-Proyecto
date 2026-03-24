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
