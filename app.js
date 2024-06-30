const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const comidaRouter = require("./routes/comidaRouter");
const authRouter = require("./routes/authRouter");

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

mongoose.set('strictQuery', true);

// Puerto
const port = process.env.PORT || 4000;

// Conectar a MongoDB
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/comidas', comidaRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});
