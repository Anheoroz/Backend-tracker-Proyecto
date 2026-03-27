const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require ("cors")
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const habitRoutes = require("./routes/habitRoutes");
const authRoutes = require("./routes/authRoutes");

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


// rutas  de la api 
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/habits", habitRoutes);


app.get("/", (req, res) => {  
  res.send("API prueba");
});


app.listen(5000, () => {     // servidor en donde corre mi backend
  console.log("Servidor en puerto 5000");
});



