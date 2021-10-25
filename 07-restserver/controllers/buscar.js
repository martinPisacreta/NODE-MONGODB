const {response , request} = require('express'); ////agregando el response , me aseguro que res tenga el atributo status
const {ObjectId} = require('mongoose').Types;
const {Usuario,Categoria,Producto} = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]


const buscarUsuarios = async(termino = '',res = response) => {
    const esMongoID = ObjectId.isValid(termino) //si es ID de mongo retorna true , sino false
    if( esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario ? [usuario] : [])
        })
    }

    //creo expresion regular
    const regexp = new RegExp(termino , 'i') //esto seria como un like %termino%
    
    //busco que el nombre del usuario sea igual al termino
    const usuarios = await Usuario.find({
        $or : [ {nombre: regexp} , {correo: regexp} ], //esto es un OR pero en mongo
        $and: [ {estado: true}] //esto es un AND pero en mongo
    })

    return res.json({
        results: usuarios
    })

}

const buscarCategorias = async(termino = '',res = response) => {
    const esMongoID = ObjectId.isValid(termino) //si es ID de mongo retorna true , sino false
    if( esMongoID) {
        const categoria = await Categoria.findById(termino)
                          .populate('usuario','nombre')
        return res.json({
            results: (categoria ? [categoria] : [])
        })
    }

    //creo expresion regular
    const regexp = new RegExp(termino , 'i') //esto seria como un like %termino%
    
    //busco que el nombre del categoria sea igual al termino
    const categorias = await Categoria.find({nombre: regexp , estado: true})
                       .populate('usuario','nombre')

    return res.json({
        results: categorias
    })

}

const buscarProductos = async(termino = '',res = response) => {
    const esMongoID = ObjectId.isValid(termino) //si es ID de mongo retorna true , sino false
    if( esMongoID) {
        const producto = await Producto.findById(termino)
                         .populate('categoria','nombre')
        return res.json({
            results: (producto ? [producto] : [])
        })
    }

    //creo expresion regular
    const regexp = new RegExp(termino , 'i') //esto seria como un like %termino%
    
    //busco que el nombre de producto sea igual al termino
    const productos = await Producto.find({nombre: regexp , estado: true})
                      .populate('categoria','nombre')
    return res.json({
        results: productos
    })

}

const buscar = async (req , res = response ) => {
    
    const {coleccion, termino} = req.params;

     //si el colecccion (que viene por parametro) NO incluye el coleccionesPermitidas .. pongo alerta
    if( !coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: 'Debe especificar una coleccion permitida'
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res);
        break;
        case 'categorias':
            buscarCategorias(termino,res);
        break;
        case 'productos':
            buscarProductos(termino,res);
        break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
        break;
    }

  
}

module.exports = {
    buscar
}