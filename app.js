const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 4000;
const comidaRouter = require("./routes/comidaRouter")

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(morgan('dev'));

app.use('/api', comidaRouter)

app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(port, () => {
    console.log(`Aplicación corriendo en el puerto ${port}`)
})