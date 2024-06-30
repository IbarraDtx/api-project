const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComidaSchema = new Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  ingredientes: { type: [String], required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  origen: { type: String, required: true }
});

module.exports = mongoose.model('Comida', ComidaSchema);
