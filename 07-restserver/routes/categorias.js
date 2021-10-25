const { Router, response } = require('express')
const {check} = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria , actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Obtener todas las categorias
router.get('/' , obtenerCategorias);

//Obtener una categoria por id
router.get('/:id' , [
    check('id','No es una id valido de MONGO').isMongoId(),  //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  si el ID es un ID de mongo  sigue con el de abajo , sino sale
    check('id').custom( id  /*este id hace referencia al id que carga el usuario*/ => existeCategoriaPorId(id)), //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  el id debe existir en la base de datos , si esta OK , sigue con el de abajo , sino sale
    validarCampos //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  si algun check falla , no sigue y si no falla  va a ejecutar el controlador obtenerCategoria
] , obtenerCategoria);

//Crear categoria
router.post('/' , [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(), 
    validarCampos //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  si algun check falla , no sigue y si no falla  va a ejecutar el controlador crearCategoria
] , crearCategoria);

//Actualizar registro por id
router.put('/:id' , [
    validarJWT,
    check('id','No es una id valido de MONGO').isMongoId(),  //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  si el ID es un ID de mongo  sigue con el de abajo , sino sale
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( id  /*este id hace referencia al id que carga el usuario*/ => existeCategoriaPorId(id)), //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  el id debe existir en la base de datos , si esta OK , sigue con el de abajo , sino sale
    validarCampos
],actualizarCategoria);

//Borrar una categoria
router.delete('/:id' , [
    validarJWT,
    esAdminRole,
    check('id','No es una id valido de MONGO').isMongoId(),  //ESTA LINEA ES UN MIDDLEWARES EXISTENTE .... PROPOSITO :  si el ID es un ID de mongo  sigue con el de abajo , sino sale
    check('id').custom( id  /*este id hace referencia al id que carga el usuario*/ => existeCategoriaPorId(id)), //ESTA LINEA ES UN MIDDLEWARES CREADO POR MI .... PROPOSITO :  el id debe existir en la base de datos , si esta OK , sigue con el de abajo , sino sale
    validarCampos
] ,borrarCategoria);



module.exports = router