require('colors');
const { guardarDB , leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu , 
        pausa , 
        leerInput,
        listadoTareasBorrar,
        confirmar} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    //cada await que vea va a significar que se espera hasta  que la funcion devuelva algo...


    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB){ //cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

   
    do{
        //se puede usar await porque inquirerMenu() devuelve una promesa
        //en el cuerpo del do while primero va a esperar(await) que inquirerMenu() devuelva algo
        //inquirerMenu() -> ACA IMPRIMO EL MENU
        opt = await inquirerMenu(); 

        switch(opt) {
            case '1': //crear tarea
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
            case '2':
               tareas.listadoCompleto(); //muestro las tareas que cargue arriba
            break;
            case '3':
                tareas.listarPendientesCompletadas(true); //muestro las tareas completadas
             break;
             case '4':
                tareas.listarPendientesCompletadas(false); //muestro las tareas pendientes
             break;
             case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr); 
                if(id !== '0') {

                    const ok = await confirmar('Esta seguro?')
                    if(ok) {
                        tareas.borrarTarea(id);
                    }
                }
             break;
        }
       
        //grabo el arreglo de tareas
        guardarDB(tareas.listadoArr);
        
        //aca se va a esperar que pausa devuelva algo...
        await pausa();
       
    }while(opt !== '0')
}

main();