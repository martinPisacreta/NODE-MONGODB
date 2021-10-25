const { Router, response } = require('express')
const {check} = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto , actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId, productoExiste } = require('../helpers/db-validators');
const { validarJWT, esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Obtener todas las productos
router.get('/' , obtenerProductos);

//Obtener una producto por id
router.get('/:id' , [
    check('id','No es una id valido de MONGO').isMongoId(), 
    check('id').custom( id   => existeProductoPorId(id)), 
    validarCampos
] , obtenerProducto);

//Crear producto
router.post('/' , [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(), 
    check('nombre').custom( nombre  => productoExiste(nombre)), 
    check('categoria','No es una id de Mongo').isMongoId(),
    check('categoria').custom( id  => existeCategoriaPorId(id)),
    validarCampos 
] , crearProducto);

//Actualizar registro por id
router.put('/:id' , [
    validarJWT,
    check('categoria','No es una id valido de MONGO').isMongoId(), 
    check('id').custom( id  => existeProductoPorId(id)), 
    validarCampos
],actualizarProducto);

//Borrar una producto
router.delete('/:id' , [
    validarJWT,
    esAdminRole,
    check('id','No es una id valido de MONGO').isMongoId(),  
    check('id').custom( id  => existeProductoPorId(id)), 
    validarCampos
] ,borrarProducto);



module.exports = router