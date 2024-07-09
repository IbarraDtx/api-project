const express = require('express');
const router = express.Router();
const comidaController = require('../controllers/comidaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/buscar', comidaController.obtenerComidaPorPropiedades);

// Ruta para crear una nueva comida
router.post('/', authMiddleware, comidaController.crearComida);

// Ruta para obtener todas las comidas
router.get('/', authMiddleware, comidaController.obtenerComidas);

//Ruta para obtener la comida por nombre
router.get('/:nombre', authMiddleware, comidaController.obtenerComidaPorNombre);

//Ruta para eliminar una de las comidas
router.delete('/:nombre', authMiddleware, comidaController.eliminarComida);

//Ruta para actualiazr la comida por nombre
router.put('/:nombre', authMiddleware, comidaController.actualizarComida)

module.exports = router;
