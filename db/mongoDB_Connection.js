const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env .MONGO_CONNECTION);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('base de datos conectada con exito a mongodb');
});