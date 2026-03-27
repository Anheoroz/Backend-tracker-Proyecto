const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
const token = req.cookies.token;

    if (!token) {
    return res.status(401).json({ msg: "No autorizado" });
    }

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
    } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
    }
    };

module.exports = { authMiddleware };