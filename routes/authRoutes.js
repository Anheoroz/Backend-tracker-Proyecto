const express = require("express");
const router = express.Router();

const { login, logout, register } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
// Debe usar el controlador real para limpiar la cookie de sesion. Aqui me dio problema para limpiar cookies
router.post("/logout", logout);
module.exports = router;