const express = require('express');
const app = express();
const { sequelize } = require('./app/models/index'); 
const cors=require("cors");

// Setting
const PORT = process.env.PORT || 5000;

// Middleware
// Para poder rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// Rutas
app.use('/api', require('./app/routes'));

// Arrancamos el servidor
app.listen(PORT, function () {
    console.log(`La app ha arrancado en http://localhost:${PORT}`);

    sequelize.sync({ force: false }).then(() => {
        console.log("Se ha establecido la conexión");
    });

});

