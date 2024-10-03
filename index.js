const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Creamos el server
const app = express();

//Configurar mongoDB
const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/restapis')
        //      {
        //     useNewUrlParser: True, //Es para quitar errores de versiones
        //     useUnifiedTopology: True // Forma más eficiente de conectar la BD
        // });
        console.log('Conexion exitosa a MongoDB')
    }
    catch(error){
        console.log('Error al conectar ', error)
    }
}

//Habilitar el body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Conectar MongoRegay
connectDB();

//Agregamos las rutas
app.use('/', routes());



//Puerto del server
app.listen(3000);

