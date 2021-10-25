const {response , request} = require('express'); ////agregando el response , me aseguro que res tenga el atributo status
const { Categoria } = require('../models');


const obtenerCategorias = async (req = request, res = response) => {
  
    const {limite = 5,desde = 0} = req.query; //cosas que mando por query string
    const query = {estado: true}

    //ejecuta 2 promesas al mismo tiempo , y no va a continuar hasta que ambas funcionen , si una da error , ambas daN error
    //uso desestructuracion
    const [ 
            total /*resultado PROMERSA 1*/ , 
            categorias /*resultado PROMERSA 2*/
        ] = await Promise.all([

        //PROMESA 1:
        Categoria.countDocuments(query), //traigo solamente las categorias con estado = true
        
        //PROMESA 2:
        Categoria.find(query) //traigo solamente las categorias con estado = true
            .populate('usuario','nombre') //el populate es para mostrar el usuario que cargo la categoria , que hace referencia a 'usuario' y dentro de 'usuario' a 'nombre'
            .skip(Number(desde)) //Number() transforma en un numero lo que quiero
            .limit(Number(limite)) //Number() transforma en un numero lo que quiero
    ])
    res.json({
        total,
        categorias
    })
  }
  
  
const obtenerCategoria = async (req, res = response) =>  {

    const id = req.params.id //id -> es el id de la categoria
    const categoria = await Categoria.findById(id) 
                      .populate('usuario','nombre');  //el populate es para mostrar el usuario que cargo la categoria , que hace referencia a 'usuario' y dentro de 'usuario' a 'nombre'

    res.json({
        categoria
    })
  }


const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase(); //me traigo el nombre del body (yo se que el nombre siempre viene)

    const categoriaDB = await Categoria.findOne({nombre}) //busco el nombre en la DB

    //valido si la categoria ya existe
    if( categoriaDB ) {
        return res.status(400).json({
            msg: 'La categoria ya existe'
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,

        //cuando ejecuto el middleware(validarJWT) del post , req ya tiene cargado el usuario
        //uso _id y no uid , porque _id es el nombre original del campo y uid es como lo muestro
        usuario: req.usuario._id 
    }

    const categoria = new Categoria(data);

    //guardar en DB
    categoria.save();

    //retorno
    res.status(201).json(categoria);


}

const actualizarCategoria = async (req,res=response) => {

    const {id} = req.params;
    const { 
            estado,         //desestructuro del body , sacando afuera el estado
            usuario,        //desestructuro del body , sacando afuera el usuario
            ...data         //desestructuro del body , dejando la categoria pero sin "estado" y sin "usuario"
    } = req.body


    data.nombre = data.nombre.toUpperCase(); //pongo en mayuscula el nombre de la data

    //dentro de data no existe usuario , con la linea de abajo hago que exista
    data.usuario = req.usuario._id;

    //{new: true} -> me devuelve el usuario actualizado
    const categoria = await Categoria.findByIdAndUpdate(id,data,{new: true});

    res.json({
        categoria
    })
}

const borrarCategoria = async(req,res = response) => {
    const {id} = req.params;

    //id,  {estado: false} ,   {new:true}   -> 1- que id de registro voy a actualizar , 2- que campo voy a actualizar 3- retorno de la actualizacion
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,  {estado: false} ,   {new:true}  )

    res.json ({
        categoriaBorrada
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}