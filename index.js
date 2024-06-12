const express = require('express');
require ('./db/mongoDB_Connection');
const cors = require ('cors');
require ('dotenv').config();
const authRoutes = require('./router/auth');
const estadoEquipoRoutes = require('./router/estadoEquipo');
const inventarioRoutes = require('./router/inventario');
const marcaRoutes = require('./router/marca');
const tipoEquipoRoutes = require('./router/tipoEquipo');
const usuarioRoutes = require('./router/usuario');

const app = express();
app.use(express.json());

app.use(cors());

async function main() {
    await app.listen(process.env.PORT);
    console.log(`server en puerto ${process.env.PORT}, felicidades`);
}

app.get('/', (req, res) => {
    res.send('felicidades');
})

app.use('/auth', authRoutes); 
app.use('/estadoEquipo', estadoEquipoRoutes); 
app.use('/inventario', inventarioRoutes); 
app.use('/marca', marcaRoutes); 
app.use('/tipoEquipo', tipoEquipoRoutes); 
app.use('/usuario', usuarioRoutes);

main();