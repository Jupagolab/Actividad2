const express = require('express');
const router = express.Router();
const usuariosC = require('../controllers/usuarios-c');

// ---------------------  POST  --------------------
// REGISTRAR USUARIO
router.post('/registrar', (req, res)=>{
  usuariosC.crearUsuario(req, res);
})


module.exports = router;