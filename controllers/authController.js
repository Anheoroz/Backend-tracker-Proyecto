const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "Usuario ya existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();

  res.json({ msg: "Usuario registrado" });
};

const login = async (req, res) => {
const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Usuario no existe" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Password incorrecto" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
  httpOnly: true,
  secure: isProduction, 
  sameSite: isProduction ? "none" : "lax",
  });

  res.json({ msg: "Login exitoso" });
};


const logout = (req, res) => {
const isProduction = process.env.NODE_ENV === "production";
  // Se usan las mismas opciones que en res.cookie para asegurar borrado correcto.
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.json({ msg: "Logout exitoso" });
};

module.exports = {
  register,
  login,
  logout
};