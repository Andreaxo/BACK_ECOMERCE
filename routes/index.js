const express = require('express');
const router = express.Router();
const clientesController = require('../controller/clientesController');


module.exports = function(){
    /* Clientes */
    


    //Agregar un nuevo cliente
    router.post('/clientes', clientesController.nuevoCliente)    

    //Actualizar clientes
    router.put('/clientes/:idCliente', clientesController.actualizarCliente)

    //Mostrar clientes
    router.get('/clientes/ver', clientesController.mostrarCliente)

    //Eliminar clientes
    router.delete('/clientes/:idCliente', clientesController.eliminarCliente)
    return router;
}