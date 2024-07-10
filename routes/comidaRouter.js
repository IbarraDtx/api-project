const express = require('express');
const router = express.Router();
const comidaController = require('../controllers/comidaController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para buscar comidas por cualquier propiedad
router.get('/buscar', authMiddleware, comidaController.obtenerComidaPorPropiedades);

// Ruta para crear una nueva comida
router.post('/', authMiddleware, comidaController.crearComida);

// Ruta para obtener todas las comidas
router.get('/', authMiddleware, comidaController.obtenerComidas);

// Ruta para obtener una comida por nombre
router.get('/:nombre', authMiddleware, comidaController.obtenerComidaPorNombre);

// Ruta para eliminar una comida por cualquier propiedad
router.delete('/eliminar', authMiddleware, comidaController.eliminarComidaPorPropiedad);

// Ruta para actualizar una comida por cualquier propiedad
router.put('/actualizar', authMiddleware, comidaController.actualizarComidaPorPropiedad);

module.exports = router;
