const Comida = require('../models/comida');

  exports.crearComida = async (req, res) => {
    const nombreNormalizado = req.body.nombre.toLowerCase();
    const comida = new Comida({
      nombre: nombreNormalizado,
      tipo: req.body.tipo,
      ingredientes: req.body.ingredientes,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
      origen: req.body.origen
    });
    try {
      const nuevaComida = await comida.save();
      res.status(201).json(nuevaComida);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  exports.obtenerComidas = async (req, res) => {
    try {
      const comidas = await Comida.find();
      res.status(200).json(comidas);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.obtenerComidaPorNombre = async (req, res) => {
    try {
      const nombreNormalizado = req.params.nombre.toLowerCase();
      const comida = await Comida.findOne({ nombre: nombreNormalizado });
      if (!comida) return res.status(404).json({ message: "Comida no encontrada" });
      res.status(200).json(comida);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.eliminarComidaPorPropiedad = async (req, res) => {
  try {
    const { propiedad, valor } = req.query;

    if (!propiedad || !valor) {
      return res.status(400).json({ message: 'Se requieren propiedad y valor para eliminar la comida' });
    }

    const query = {};

    if (propiedad === 'precio') {
      query[propiedad] = parseFloat(valor); 
    } else {
      query[propiedad] = valor; 
    }

    const comida = await Comida.findOne(query);
    if (!comida) {
      return res.status(404).json({ message: 'Comida no encontrada' });
    }

    await comida.remove();
    res.status(200).json({ message: 'Comida eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.actualizarComidaPorPropiedad = async (req, res) => {
  try {
    const { propiedad, valor } = req.query;

    if (!propiedad || !valor) {
      return res.status(400).json({ message: 'Se requieren propiedad y valor para actualizar la comida' });
    }

    const query = {};
    query[propiedad] = valor;

    const comida = await Comida.findOne(query);
    if (!comida) {
      return res.status(404).json({ message: 'Comida no encontrada' });
    }

    if (req.body.nombre) comida.nombre = req.body.nombre.toLowerCase();
    if (req.body.tipo) comida.tipo = req.body.tipo;
    if (req.body.ingredientes) comida.ingredientes = req.body.ingredientes;
    if (req.body.precio) comida.precio = req.body.precio;
    if (req.body.descripcion) comida.descripcion = req.body.descripcion;
    if (req.body.origen) comida.origen = req.body.origen;

    const comidaActualizada = await comida.save();
    res.status(200).json({ comida: comidaActualizada });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


  exports.obtenerComidaPorPropiedades = async (req, res) => {
    try {
      const query = {};
      const { nombre, tipo, ingredientes, precio, descripcion, origen } = req.query;
  
      if (nombre) query.nombre = new RegExp(nombre, 'i'); 
      if (tipo) query.tipo = new RegExp(tipo, 'i');
      if (ingredientes) query.ingredientes = { $in: ingredientes.split(',').map(ing => new RegExp(ing, 'i')) };
      if (precio) query.precio = precio;
      if (descripcion) query.descripcion = new RegExp(descripcion, 'i');
      if (origen) query.origen = new RegExp(origen, 'i');
  
      const comidas = await Comida.find(query);
      if (comidas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron comidas' });
      }
      res.json(comidas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
