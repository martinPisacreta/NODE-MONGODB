const {Role,Usuario, Categoria , Producto} = require('../models')

const esRoleValido =  async(rol = '') => {
    const existeRol = await Role.findOne({rol}) //findOne -> busco uno solo , y le mando el {rol} que cargo el usuario
    if( !existeRol  ){ //si no existe el rol en la base de datos...
            throw new Error('El rol no esta registrado en la base de datos')
    }
}

const correoExiste = async(correo = '') => {
    const existeCorreo = await Usuario.findOne({correo}) //findOne -> busco uno solo , y le mando el {correo} que desestructure arriba
    if( existeCorreo){ //si existe el correo , salgo de la funcion...
        throw new Error('El correo ya existe')
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id) //findById -> busca por id , y le mando el id que desestructure arriba
    if( !existeUsuario  ){ //si NO existe el usuario , salgo de la funcion...
        throw new Error('El id no existe')
    }
}

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id) //findById -> busca por id , y le mando el id que desestructure arriba
    if( !existeCategoria  ){ //si NO existe la categoria , salgo de la funcion...
        throw new Error('El id no existe')
    }
}


const productoExiste = async(producto = '') => {
    const existeProducto = await Producto.findOne({producto}) //findOne -> busco uno solo , y le mando el {producto} que desestructure arriba
    if( existeProducto){ //si existe el producto , salgo de la funcion...
        throw new Error('El producto ya existe')
    }
}

const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id) //findById -> busca por id , y le mando el id que desestructure arriba
    if( !existeProducto  ){ //si NO existe la producto , salgo de la funcion...
        throw new Error('El id no existe')
    }
}

module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    productoExiste
}