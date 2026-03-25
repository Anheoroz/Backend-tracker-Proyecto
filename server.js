const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

// rutas  de la api 

const habitRoutes = require("./routes/habitRoutes");
app.use("/api/habits", habitRoutes);

app.get("/", (req, res) => {
  res.send("API prueba");
});

app.listen(5000, () => {
  console.log("Servidor en puerto 5000");
});

