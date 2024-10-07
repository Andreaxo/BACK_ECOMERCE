const productos = require('../models/productos')
const multer = require('multer');


let nanoid; // Declaramos una variable para almacenar el import de nanoid

// Cargar dinámicamente el módulo nanoid en el momento en que se necesite
(async () => {
  nanoid = (await import('nanoid')).nanoid;
})();

const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');  // Se va a guardar en esta carpeta
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${nanoid()}.${extension}`); // Usa nanoid para generar un identificador único para guardar la BD
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    },
};

// Pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Subir el archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            res.json({mensaje: error})
        }
        return next();
    })
}

// Agregar un producto

exports.nuevoProducto = async (req, res, next) => {
    const producto = new productos(req.body)

    try{
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se agrego un producto correctamente'})
    } catch (error){
        console.log(error);
        next();
    }
}


//Mostrar productos
exports.mostrarProductos = async(req,res, next) => {
    try {
        const productosN = await productos.find({});
        res.json(productosN);
    } catch (error) {
        console.log(error)
        next()
    }
}

//Mostrar producto por ID.
exports.mostrarProducto = async(req,res,next) => {
    const productoM = await productos.findById(req.params.idProducto);
    if(!productoM){
        res.json({mensaje: 'Este producto no existe'});
        next();
    }
    res.json(productoM)
}

//Actualizar elemento 
exports.actualizarProducto = async(req,res, next) => {
    try{    
        let nuevoProducto = req.body

        //Verificar si tiene una nueva imagen
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
            
        } else{
            let anteriorProducto = await productos.findById(req.params.idProducto);
            nuevoProducto.imagen = anteriorProducto.imagen;

        }
        let productoA = await productos.findByIdAndUpdate({_id: req.params.idCliente}, nuevoProducto, {
            new: true
        })

        res.json(productoA);

        } catch (error){
        console.log(error);
        next();
    }

}

// Eliminar un producto
exports.eliminarProducto = async(req, res, next) =>{
    try {
        await productos.findByIdAndDelete({_id: req.params.idProducto})
        res.json({mensaje: 'El producto ha sido eliminado'})
    } catch (error) {
        console.log(error)
        next();
    }
}