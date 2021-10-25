const {response , request} = require('express'); ////agregando el response , me aseguro que res tenga el atributo status
const { Producto } = require('../models');


const obtenerProductos = async (req = request, res = response) => {
  
    const {limite = 5,desde = 0} = req.query; //cosas que mando por query string
    const query = {estado: true}

    //ejecuta 2 promesas al mismo tiempo , y no va a continuar hasta que ambas funcionen , si una da error , ambas daN error
    //uso desestructuracion
    const [ 
            total /*resultado PROMERSA 1*/ , 
            productos /*resultado PROMERSA 2*/
        ] = await Promise.all([

        //PROMESA 1:
        Producto.countDocuments(query), //traigo solamente los productos con estado = true
        
        //PROMESA 2:
        Producto.find(query) //traigo solamente las productos con estado = true
            .populate('usuario','nombre') //el populate es para mostrar el usuario que cargo el producto , que hace referencia a 'usuario' y dentro de 'usuario' a 'nombre'
            .populate('categoria','nombre') //el populate es para mostrar la categoria del producto , que hace referencia a 'categoria' y dentro de 'categoria' a 'nombre'
            .skip(Number(desde)) //Number() transforma en un numero lo que quiero
            .limit(Number(limite)) //Number() transforma en un numero lo que quiero
    ])
    res.json({
        total,
        productos
    })
  }
  
  
const obtenerProducto = async (req, res = response) =>  {

    const id = req.params.id //id -> es el id del producto
    const producto = await Producto.findById(id) 
                      .populate('usuario','nombre')  //el populate es para mostrar el usuario que cargo el producto , que hace referencia a 'usuario' y dentro de 'usuario' a 'nombre'
                      .populate('categoria','nombre') //el populate es para mostrar la categoria del producto , que hace referencia a 'categoria' y dentro de 'categoria' a 'nombre'
    res.json({
        producto
    })
  }


const crearProducto = async (req, res = response) => {
    
    const {estado , usuario , ...body} = req.body;

    const productoDB = await Producto.findOne({nombre : req.body.nombre}) //busco el nombre en la DB

    //valido si el producto ya existe
    if( productoDB ) {
        return res.status(400).json({
            msg: 'El producto ya existe'
        })
    }

    
    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id 
    }

    const producto = new Producto(data);

    //guardar en DB
    producto.save();

    //retorno
    res.status(201).json(producto);


}

const actualizarProducto = async (req,res=response) => {

    const {id} = req.params;
    const { 
            estado,         //desestructuro del body , sacando afuera el estado
            usuario,        //desestructuro del body , sacando afuera el usuario
            ...data         //desestructuro del body , dejando la producto pero sin "estado" y sin "usuario"
    } = req.body


    if( data.nombre ){
        data.nombre = data.nombre.toUpperCase(); //pongo en mayuscula el nombre de la data
    }

    //dentro de data no existe usuario , con la linea de abajo hago que exista
    data.usuario = req.usuario._id;

    //{new: true} -> me devuelve el usuario actualizado
    const producto = await Producto.findByIdAndUpdate(id,data,{new: true});

    res.json({
        producto
    })
}

const borrarProducto = async(req,res = response) => {
    const {id} = req.params;

    //id,  {estado: false} ,   {new:true}   -> 1- que id de registro voy a actualizar , 2- que campo voy a actualizar 3- retorno de la actualizacion
    const productoBorrada = await Producto.findByIdAndUpdate(id,  {estado: false} ,   {new:true}  )

    res.json ({
        productoBorrada
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}