const express = require('express');
require ('./db/mongoDB_Connection');
const cors = require ('cors');
require ('dotenv').config();

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

app.use('/usuario', require('./router/usuario')); 
app.use('/marca', require('./router/marca')); 
app.use('/estado-equipo', require('./router/estadoEquipo')); 
app.use('/tipo-equipo', require('./router/tipoEquipo')); 
app.use('/inventario', require('./router/inventario')); 
app.use('/auth', require('./router/auth'));

main();