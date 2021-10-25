const {validationResult} = require('express-validator')

const validarCampos = (req , res , next) => {
     //verifico si hay algun error
     const errors = validationResult(req);
     if( !errors.isEmpty()   ) { // si hay errores....
         return res.status(400).json(errors) //salgo de la funcion
     }

     next(); //si llega hasta aca , sigue con lo proximo
 
}

module.exports = {
    validarCampos
}