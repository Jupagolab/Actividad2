const bcrypt = require('bcrypt');

const encriptarContrasena = async (contrasena) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(contrasena, salt);
  return hash;
};

module.exports = encriptarContrasena;