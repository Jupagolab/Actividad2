const usuarios = require('../models/usuarios');
const { SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UsuarioController {
  crearUsuario = async (req, res) => {
    try {
      const { usuario, nombre, correo, clave, rol } = req.body;
      
      // Encriptar la contraseña
      const claveEncriptada = await bcrypt.hash(clave, 10);
      req.body.clave = claveEncriptada;

      const nuevoUsuario = new usuarios({ usuario, nombre, correo, clave, rol });
      await nuevoUsuario.save();

      // Crear un token para el nuevo usuario
      const token = jwt.sign({ 'usuario': usuario }, SECRET, { expiresIn: '1h' });

      res.json({ 'token': token, mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: `Error en el servidor: ${error}` });
    }
  }
}

const usuario = new UsuarioController;

module.exports = usuario;