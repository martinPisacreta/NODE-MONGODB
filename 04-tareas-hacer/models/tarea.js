const {v4:uudiv4} = require('uuid');

class Tarea{
    id = '';
    desc= '';
    completadoEn = null;

    //constructor(desc) -> se ejecuta cuando creo una nueva instancia de la clase
    constructor( desc ) {
        this.id = uudiv4(); //crea un id unico mundial
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;
