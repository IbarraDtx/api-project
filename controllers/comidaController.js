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

  exports.eliminarComida = async (req, res) => {
    try{
      const nombreNormalizado = req.params.nombre.toLowerCase();
      const comida = await Comida.findOne({ nombre: nombreNormalizado });
      if(!comida) return res.status(404).json({ message: "Comida no encontrada"});

      await comida.remove();
      res.status(200).json({ message: "Comida eliminada"})
      } catch (err){
      res.status(500).json({ message: err.message});
    }
  };

  exports.actualizarComida = async (req, res) => {
    try {
      const nombreNormalizado = req.params.nombre.toLowerCase();
      const comida = await Comida.findOne({ nombre: nombreNormalizado});
      if(!comida) return res.status(404).json({ message: "Comida no encontrada"});

      comida.nombre = req.body.nombre ? req.body.nombre.toLowerCase() : comida.nombre;
      comida.tipo = req.body.tipo || comida.tipo;
      comida.ingredientes = req.body.ingredientes || comida.ingredientes;
      comida.precio = req.body.precio || comida.precio;
      comida.descripcion = req.body.descripcion || comida.descripcion;
      comida.origen = req.body.origen || comida.origen;

      const comidaActualizada = await comida.save();
      res.status(200).json({ comidaActualizada });
    } catch (err) {
      res.status(400).json({ message: err.message})
    }
  };

