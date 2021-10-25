const { response, request } = require('express');


//a esta funcion llegamos despues de validarJWT , por ende ya tengo cargado el usuario en req.usuario
const esAdminRole = (req,res = response,next ) => {

    if( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }
    const {rol , nombre} = req.usuario;
    if(rol !== 'ADMIN_ROL') {
        return res.status(500).json({
            msg: 'El usuario no es administrador'
        })
    }

    
    next();
}

//a esta funcion llegamos despues de validarJWT , por ende ya tengo cargado el usuario en req.usuario
//...roles -> contiene el array que le estoy enviando desde routes/usuarios.js -> 'ADMIN_ROL','USER_ROL'
const tieneRol = ( ...roles ) => {

    //agrego esto del return , porque yo debo devolver algo asi...
    return (req,res = response,next) => {

        //como esta funcion viene despues de validarJWT , valido de que este verificado el usuario
        if( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        //si el roles (que viene por parametro) NO incluye el rol del usuario .. pongo alerta
        if( !roles.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
    

        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRol
}