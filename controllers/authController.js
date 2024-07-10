const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

exports.registrar = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const nuevoUsuario = new Usuario({ username, password, role });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await Usuario.findOne({ username });
    if (!usuario || !(await usuario.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
