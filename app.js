const express = require('express');
const app = express();
const port = 4000;

app.get("/", (req, res) => {
    res.json({message: "Aplicación funcionando correctamente"})
})

app.listen(port, () => {
    console.log(`Aplicación corriendo en el puerto ${port}`)
})