const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const encriptarContrasena = require('./bcrypt');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (token){
    try {
      const decoded = jwt.verify(token, SECRET);

      req.usuario = decoded.usuario;
      next();
    } catch (err) {
      res.status(401).json({ mensaje: 'token incorrecto' });
    }
  }
}

module.exports = verificarToken;