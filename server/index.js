require('dotenv').config();
const express = require('express');
const conn = require('./database/connection');
const cors = require('cors');
const _parser = require('body-parser');
const app = express();
const port = 4000 || process.env.PORT;


//middlewares
app.use(cors());
app.use(_parser.urlencoded({ extended: true }));
app.use(_parser.json());

//Rutas de los controladores
const _afiRoute = require('../routes/afiliados.routes');
const _usuRoute = require('../routes/usuarios.routes');
const _eveRoute = require('../routes/eventos.routes');
app.use('/api/v1', [_afiRoute, _usuRoute, _eveRoute]);

app.listen(port, () => {
    conn;
    console.log(`http://localhost:${port}/api/v1/`);
});