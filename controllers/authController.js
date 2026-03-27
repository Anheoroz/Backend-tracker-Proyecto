const User = require("../models/user");
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

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  res.json({ msg: "Login exitoso" });
};

const logout = (req, res) => {
  console.log("logout ejecutado");
  console.log("res:", res); 

  res.clearCookie("token");
  res.json({ msg: "Logout exitoso" });
};

module.exports = {
  register,
  login,
  logout
};