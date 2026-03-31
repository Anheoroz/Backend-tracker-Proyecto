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

const isProduction = process.env.NODE_ENV === "production";

app.use(cors({
  origin: isProduction
    ? "https://frontend-tracker-proyecto-1ysll2pzm-anheorozs-projects.vercel.app/"
    : "http://localhost:3000",
  credentials: true
}));

app.options("*", cors());

// rutas  de la api 
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/habits", habitRoutes);


app.get("/", (req, res) => {  
  res.send("API prueba");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});



