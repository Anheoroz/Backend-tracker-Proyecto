const express = require("express");
const router = express.Router();

const { login, logout, register } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
console.log("authRoutes cargado");

router.post("/logout", (req, res) => {
  console.log("logout ruta directa");
  res.json({ msg: "ok" });
});

module.exports = router;