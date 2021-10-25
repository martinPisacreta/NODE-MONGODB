const {Schema,model} = require('mongoose');

const CategoriaSchema = Schema ({
    nombre: {
        type: String,
        require: [true,'El nombre es obligatorio'],
        unique: true //el nombre es unico
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: { //esto es el usuario que creo la categoria
        type: Schema.Types.ObjectId, //quiere decir que corresponde a otro esquema 
        ref: 'Usuario', //y hace referencia al modelo Usuario , tiene que tener el mismo nombre que uso en el export de Usuario
        require: true
    }
});


//voy a modificar la funcion que devuelve la respuesta a la categoria.... osea la funcion existe por mongoose , pero yo la modifico
CategoriaSchema.methods.toJSON = function() {
    const { __v,            //de la respuesta (osea del this.toObject()) , desestructuro el "__v"
            estado ,        //de la respuesta (osea del this.toObject()) , desestructuro el "estado"
            ...categoria   //de la respuesta (osea del this.toObject()) , desestructuro los demas datos que no son  "__v" y "estado"
          } = this.toObject();

    return categoria; //retorno solamente la tercer linea , osea todos los datos que no son  "__v" y "estado"
}

module.exports = model('Categoria',CategoriaSchema);