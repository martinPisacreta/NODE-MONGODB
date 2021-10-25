const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const {Usuario} = require('../models');

const validarJWT = async (req = request,res = response,next) => {
    const token = req.header('x-token');
    
    //si no viene el token ... voy a tirar el error....
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRET_KEY); //verifico si el jwt es valido
        
        //busco si existe el usuario
        const usuario = await Usuario.findById(uid); 

        if( !usuario ){ //si no exite el usuario...
            return  res.status(401).json({
                msg: 'Usuario no existe en DB'
            })
        }


        //verificar si el uid tiene estado: true
        if( !usuario.estado ){ //si el usuario no esta activo , no puede autenticarse....
           return  res.status(401).json({
                msg: 'Token no valido - estado'
            })
        }

        

        req.usuario = usuario;  //dentro de req no existe usuario , con la linea esta hago que exista      

    
        next(); //si llega hasta aca , sigue con lo proximo
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
 


}

module.exports = {
    validarJWT
}