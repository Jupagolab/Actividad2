const express = require('express');
const router = express.Router();
const inventarioC = require('../controllers/inventario-c');

//POST
router.post('/', (req, res) => {
  inventarioC.guardarProducto(req, res);
});


module.exports = router;