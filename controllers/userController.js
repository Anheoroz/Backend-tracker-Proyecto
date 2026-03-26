const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
    const { email, password } = req.body;

    // Verificar si ya existe
    const userExists = await User.findOne({ email });

    if (userExists) {
    return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
    email,
    password: hashedPassword
    });

    await user.save();

    res.json({ msg: "Usuario registrado correctamente" });

    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {

    try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
    return res.status(400).json({ msg: "Usuario no existe" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
    return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    res.json({ msg: "Login exitoso" });

    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

module.exports = {registerUser, loginUser};