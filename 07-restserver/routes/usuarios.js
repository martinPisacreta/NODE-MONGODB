const { Router } = require('express')
const {check} = require('express-validator');


const {
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRol
} = require('../middlewares');


const { esRoleValido , correoExiste , existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet , 
        usuarioPost , 
        usuarioPut , 
        usuarioDelete } = require('../controllers/usuarios');




const router = Router();

//GET
router.get('/', usuariosGet );

//POST -> SE RELACIONA CON INSERT
router.post('/', [
  check('nombre','El nombre es obligatorio').not().isEmpty(), //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO : no tiene que estar vacio el nombre , si esta OK , sigue con el de abajo , sino sale
  check('password','El password debe ser mas de 6 letras').isLength({min: 6}), //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  el pass tiene que ser mayor a 6 letras , si esta OK , sigue con el de abajo , sino sale
  
  //check('correo','El valor ingresado no tiene el formato de correo').isEmail(), //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  el email tiene que tener el formato correcto , si esta OK , sigue con el de abajo , sino sale
  check('correo').custom( correo /*este correo hace referencia al correo que carga el usuario*/ => correoExiste(correo)), //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  el correo no debe existir en la base de datos , si esta OK , sigue con el de abajo , sino sale
  
  //check('rol','No es un rol valido').isIn(['ADMIN_ROL','USER_ROL']), //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  el rol debe existir en el array , si esta OK , sigue con el de abajo , sino sale
  check('rol').custom( rol /*este rol hace referencia al rol que carga el usuario*/ => esRoleValido(rol)), //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  el rol debe existir en la base de datps , si esta OK , sigue con el de abajo , sino sale
  
  validarCampos //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  si algun check falla , no sigue y si no falla  va a ejecutar el controlador usuarioPost
 ] , usuarioPost );


//PUT -> SE RELACIONA CON UPDATE 
router.put('/:id', [
        check('id','No es una id valido de MONGO').isMongoId(),  //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  si el ID es un ID de mongo  sigue con el de abajo , sino sale
        check('id').custom( id  /*este id hace referencia al id que carga el usuario*/ => existeUsuarioPorId(id)), //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  el id debe existir en la base de datos , si esta OK , sigue con el de abajo , sino sale
        check('rol').custom( rol /*este rol hace referencia al rol que carga el usuario*/ => esRoleValido(rol)), //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  el rol debe existir en la base de datos , si esta OK , sigue con el de abajo , sino sale
        validarCampos //ESTA LINEA ES UN MIDDLEWARES .... PROPOSITO :  si algun check falla , no sigue y si no falla  va a ejecutar el controlador usuarioPut
],usuarioPut  );

//DELETE -> SE RELACIONA CON DELETE
router.delete('/:id', [
        validarJWT, //ESTA LINEA ES UN MIDDLEWARES .... PROPOSITO :  verifica la autenticacion por jwt
        //esAdminRole, //ESTA LINEA ES UN MIDDLEWARES .... PROPOSITO :  verificar que el usuario sea ADMIN_ROL
        tieneRol('ADMIN_ROL','USER_ROL'), //ESTA LINEA ES UN MIDDLEWARES .... PROPOSITO :  verificar que el usuario sea ADMIN_ROL o USER_ROL
        check('id','No es una id valido de MONGO').isMongoId(),  //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  si el ID es un ID de mongo  sigue con el de abajo , sino sale
        check('id').custom( id  /*este id hace referencia al id que carga el usuario*/ => existeUsuarioPorId(id)), //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  el id debe existir en la base de datos , si esta OK , sigue con el de abajo , sino sale
        validarCampos //ESTA LINEA ES UN MIDDLEWARES .... PROPOSITO :  si algun check falla , no sigue y si no falla  va a ejecutar el controlador usuarioDelete
] , usuarioDelete );


module.exports = router;