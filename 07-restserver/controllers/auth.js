const {response , request} = require('express'); ////agregando el response , me aseguro que res tenga el atributo status
const {Usuario} = require('../models');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req , res = response ) => {

    try
    {
        //desestructuro del body , el correo y el password
        const { correo , password } = req.body

        //verificar si el correo existe
        const usuario = await Usuario.findOne({correo}); //findOne -> busco uno solo
        if( !usuario ){ //si no existe usuario ...
            return res.status(400).json ({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

      
        //verificar si el usuario esta activo
        if( !usuario.estado ){ //si el usuario no esta activo
            return res.status(400).json ({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //verificar la contraseña sea valida
        const validPassword = bcryptjs.compareSync( password, usuario.password) //regresa un bool .... comparo si el pass del usuario de la DB y el que mandan por parametro sea el mismo
        if( !validPassword ) {
            return res.status(400).json ({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //generar el jwt
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}