const express = require('express');
const router = express.Router();
const clientesController = require('../controller/clientesController');
const productosController = require('../controller/productosController');


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


    /* Productos */

    //Agregar un nuevo cliente
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);

    //Ver todos los productos
    router.get('/productos', productosController.mostrarProductos);

    // Mostrar producto por ID
    router.get('/productos/:idProducto', productosController.mostrarProducto)

    //Actualizar producto
    router.put('/productos/:idCliente', productosController.subirArchivo, productosController.actualizarProducto)

    // Eliminar producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    
    return router;
}