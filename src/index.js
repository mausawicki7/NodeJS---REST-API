const express = require('express');
const app = express();

// Configuración del servidor
app.set('port', process.env.PORT || 3000); 

// Middlewares
app.use(express.json()); //Si recibimos un JSON, el modulo de express lo convierte automaticamente


// URLs
app.use(require('./routes/remitos'));

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});