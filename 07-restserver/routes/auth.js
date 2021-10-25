const { Router } = require('express')
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

//POST
//api/auth/login
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),  //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  el email tiene que tener el formato correcto , si esta OK , sigue con el de abajo , sino sale
    check('password','El password es obligatorio').not().isEmpty(), //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  el password es obligatorio , si esta OK , sigue con el de abajo , sino sale
    validarCampos //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  si algun check falla , no sigue y si no falla  va a ejecutar el controlador usuarioPost

], login );


module.exports = router