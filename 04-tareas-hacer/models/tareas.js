//asi va a lucir "_listado"
    // _listado:
        // { 'uuid-1432423-432423-4' : {id:12 desc:aafd,completadoEn:20210101}},
        // { 'uuid-1432423-432423-5' : {id:13 desc:aafd,completadoEn:20210102}},
        // { 'uuid-1432423-432423-6' : {id:14 desc:aafd,completadoEn:20210103}}

const Tarea = require("./tarea");

class Tareas {
    _listado = {}; //es un objeto

    //geters y seters
    get listadoArr() {
        const listado = [];

        //esto recorre el objeto _listado
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })
        return listado;
    }

    //constructor
    //se ejecuta cuando creo una nueva instancia de la clase
    constructor() {
        this._listado = {}
    }

    //metodos
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        
       
        //this._listado.push(tarea) ->  //si _listado fuera un arreglo 
        this._listado[tarea.id] = tarea; //uso este por _listado es un objeto
    }

    //debemos recibir un array
    cargarTareasFromArray(tareas = []){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;  
        })
    }

    listadoCompleto() {
        this.listadoArr.forEach( (tarea , i) => {
            const idx = `${i + 1}.`.green;
            console.log(`${idx} ${tarea.desc} :: ${tarea.completadoEn ? 'Completado'.green : 'Pendiente'.red} `);
        })
    }

    listarPendientesCompletadas( completadas = true) {
        let contador = 0;
        this.listadoArr.forEach( (tarea) => {
            if(completadas) {
                if(tarea.completadoEn) {
                    contador +=  1;
                    console.log(`${ (contador + '.').green} ${tarea.desc} ::  ${tarea.completadoEn}  `);
                }
            }else{
                if( !tarea.completadoEn ) {
                    contador +=  1;
                    console.log(`${ (contador + '.').green} ${tarea.desc} :: ${'Pendiente'.red} `);
                }
            }                
        })
    }

    //el id es un string
    borrarTarea(id = '') {
        if(this._listado[id]){ //si existe el id...
            delete this._listado[id]; //lo borro
        }
    }
}


module.exports = Tareas;