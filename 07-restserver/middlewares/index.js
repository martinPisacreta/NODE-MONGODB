const validarCampos = require ('../middlewares/validar-campos');
const validarJWT  = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos, //exporto todo lo que exporte validarCampos , por eso los "..."
    ...validarJWT,    //exporto todo lo que exporte validarJWT , por eso los "..."
    ...validarRoles   //exporto todo lo que exporte validarRoles , por eso los "..."
}