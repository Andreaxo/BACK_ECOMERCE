const Cliente = require('../models/clientes')

// Agregar un nuevo cliente

exports.nuevoCliente = async(req,res) => {
    const cliente = new Cliente(req.body)
    try {
        //Almacenamiento de los datos
        await cliente.save();
        res.json({mensaje: 'Se agregó un nuevo cliente'})
    } catch (error) {
        console.log(error);
    }
}

exports.actualizarCliente = async(req,res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate({_id: req.params.idCliente}, req.body, {new: true});
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
        
    }
}

exports.mostrarCliente = async(req, res) => {
    const cliente = new Cliente(req.body)
    try {
        const cliente = await Cliente.find({});
        res.json(cliente);
    } catch (error) {
        console.log(error);

        
    }
}

exports.eliminarCliente = async(req,res) => {

    try {
        const cliente = await Cliente.deleteOne({_id: req.params.idCliente}, req.body);
        res.json({mensaje: 'Ha sido eliminado exitosamente'})
    } catch (error) {
        console.log(error);
    }
}

// exports.actualizarCliente = async(req,res) => {
//     const cliente = await Cliente.findById(req.params.idCliente);
    
//     if(!cliente){
//         res.json({mensaje: 'El cliente no existe'});
//         next();
//     }
// }
