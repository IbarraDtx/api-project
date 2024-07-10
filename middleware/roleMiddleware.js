const Usuario = require('../models/usuario');

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const usuario = await Usuario.findById(req.userId);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      if (usuario.role !== requiredRole) {
        return res.status(403).json({ message: 'Permisos insuficientes' });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: 'Error al verificar los permisos' });
    }
  };
};

module.exports = roleMiddleware;
