const {response , request} = require('express'); ////agregando el response , me aseguro que res tenga el atributo status
const {Usuario} = require('../models');
const bcryptjs = require('bcryptjs')



const usuariosGet = async (req = request, res = response) => {
  
    const {limite = 5,desde = 0} = req.query; //cosas que mando por query string
    const query = {estado: true}

    //ejecuta 2 promesas al mismo tiempo , y no va a continuar hasta que ambas funcionen , si una da error , ambas daN error
    //uso desestructuracion
    const [ 
            total /*resultado PROMERSA 1*/ , 
            usuarios /*resultado PROMERSA 2*/
        ] = await Promise.all([

        //PROMESA 1:
        Usuario.countDocuments(query), //traigo solamente los usuarios con estado = true
        
        //PROMESA 2:
        Usuario.find(query) //traigo solamente los usuarios con estado = true
            .skip(Number(desde)) //Number() transforma en un numero lo que quiero
            .limit(Number(limite)) //Number() transforma en un numero lo que quiero
    ])
    res.json({
        total,
        usuarios
    })
  }

const usuarioPost = async(req, res = response) => {

   

    const {nombre , correo , password, rol} = req.body;
    const usuario = new Usuario({
        nombre , 
        correo , 
        password, 
        rol}); 

    
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync(); //genSaltSync que tan complicada quiero la encriptacion , por defecto es 10
    usuario.password = bcryptjs.hashSync(password,salt); //aca encripto la contraseña

    
    //guardar en DB
    await usuario.save(); //se espera hasta que save() devuelva algo

    
    res.json({
        usuario
    })
  }

const usuarioPut = async (req, res = response) =>  {

    const id = req.params.id //id -> es el id del usuario
    const {
            _id     ,  //del req.body , desestructuro el "_id"
            password,  //del req.body , desestructuro el "password"
            google ,   //del req.body , desestructuro el "google"
            ...resto   //del req.body , desestructuro los demas datos que no son  "password" , "google" y "_id"
    } = req.body

    
    if (password) { //si el password no esta vacio , es decir que el usuario quiere actualizar su password
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync(); //genSaltSync que tan complicada quiero la encriptacion , por defecto es 10
        
        //dentro de resto no existe password , con la linea de abajo hago que exista
        resto.password = bcryptjs.hashSync(password,salt); //aca encripto la contraseña
    }

    //esto me devuelve el usuario actualizado
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'put api - controlador',
        usuario
    })
  }

const usuarioDelete = async (req, res = response) => {
    const id = req.params.id //id -> es el id del usuario


    //cambio el estado a false del usuario
    const usuario = await Usuario.findByIdAndUpdate(id , {estado: false})
    const usuarioAutenticado = req.usuario //esto lo cargo en el middleware validar-jwt.js


    res.json({
        id,
        usuarioAutenticado
    })
  }

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}