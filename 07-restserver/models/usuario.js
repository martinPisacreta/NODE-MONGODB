
/*
asi quiero grabar el objeto en la base de datos
{
    nombre: '',
    correo: '',
    password: '',
    img: '',
    rol: '',
    estado: false,
    google: true
}
*/

const {Schema,model} = require('mongoose');


//esto es un objeto
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true //esto es para no insertar correos duplicados
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROL','USER_ROL'] //los tipos de rol que pueden existir
    },
    estado: {
        type: Boolean,
        default: true //por defecto el estado es activo
    },
    google: {
        type: Boolean,
        default: false //por defecto el registro del usuario no fue por google
    },
})

//voy a modificar la funcion que devuelve la respuesta al usuario.... osea la funcion existe por mongoose , pero yo la modifico
UsuarioSchema.methods.toJSON = function() {
    const { __v,         //de la respuesta (osea del this.toObject()) , desestructuro el "__v"
            password ,   //de la respuesta (osea del this.toObject()) , desestructuro el "password"
            _id,         //de la respuesta (osea del this.toObject()) , desestructuro el "_id"
            ...usuario   //de la respuesta (osea del this.toObject()) , desestructuro los demas datos que no son  "__v" y "password" y "_id"
          } = this.toObject();

    //dentro de usuario no existe uid , con la linea de abajo hago que exista
    usuario.uid = _id;
    return usuario; //retorno solamente la tercer linea , osea todos los datos que no son  "__v" y "password"
}

//'Usuario' hace referencia a como se va a llamar el modelo fuera de este archivo
module.exports = model('Usuario',UsuarioSchema);