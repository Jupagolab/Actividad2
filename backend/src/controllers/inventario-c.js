const producto = require('../models/inventario');

class InventarioController {
  guardarProducto = async (req, res) => {
    try {
      const { nombre, marca, tipo, volumen, cantidad, precio } = req.body;
      const nuevoProducto = new producto({ nombre, marca, tipo, volumen, cantidad, precio });
      await nuevoProducto.save();
      res.json({ mensaje: 'Producto guardado en el inventario con éxito' });
    } catch (err) {
      console.log(err);
      res.status(404).json({ mensaje: `Error: ${err} ` })
    }
  };
}

const inventario = new InventarioController();

module.exports = inventario;