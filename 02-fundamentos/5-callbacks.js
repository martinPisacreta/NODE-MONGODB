//callbacks -> funcion que se va a ejecutar cuando otra funcion diga que se puede ejecutar , tambien es una funcion que se manda como argumento a otra funcion
const getUsuarioByID = (id , callback) => {
    const usuario = {
        id, //usuario tiene una propiedad id , que es seteada del parametros id
        nombre: 'Martin'
    }
    
    setTimeout( () => {
        callback(usuario); //aca mando a llamar a la funcion que esta dentro de la funcion -> (usuario) => {console.log(usuario);}
    }, 1500)
}


getUsuarioByID(10 , (usuario) => {
    console.log(usuario);
}); //  {id: 10, nombre: 'Martin'}


