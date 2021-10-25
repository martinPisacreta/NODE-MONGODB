const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');




//esto me permite tener una interfase en consola mas linda
const inquirerMenu = async() => {

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Que desea hacer?',
            choices: [
                {
                    value: '1',
                    name: `${'1.'.green} Crear tarea`
                },
                {
                    value: '2',
                    name: `${'2.'.green} Listar tareas`
                },
                {
                    value: '3',
                    name: `${'3.'.green} Listar tarea completadas`
                },
                {
                    value: '4',
                    name: `${'4.'.green} Listar tarea pendientes`
                },
                {
                    value: '5',
                    name: `${'5.'.green} Completar tarea(s)`
                },
                {
                    value: '6',
                    name: `${'6.'.green} Borrar tareas`
                },
                {
                    value: '0',
                    name: `${'0.'.green} Salir`
                }
            ]
        }
    ];

    console.clear();
    console.log("============================".green);
    console.log("   Seleccione una opcion   ".green);
    console.log("============================\n".green);

    //prompt -> muestra lo que quiero en consola
    //como esta el await , va a esperar que el usuario apriete una tecla
    //opcion -> hace referencia al atributo "name" de la const "preguntas"
    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}


const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar\n`
        }
    ];


    //prompt -> muestra lo que quiero en consola
    //como esta el await , va a esperar que se presione ENTER para continuar...
    //no es necesario retornar nada , sino que se espera a que se pulse la tecla ENTER
    await inquirer.prompt(question);

}

//aca le va a llegar un message , a ese mensaje le sumo un input
//voy a leer lo que escribe el usuario en input
const leerInput = async(message) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate(value) { //es obligatorio este input
            if(value.length === 0) {
                return 'Por favor ingrese un valor'
            }

            return true
        }
    }

    //desc -> hace referencia a el atributo "name" de la const "question"
    //prompt -> muestra lo que quiero en consola
    //como esta el await , va a esperar que el usuario apriete una tecla
    const {desc} =  await inquirer.prompt(question);
    return desc;
}


//recibe como parametros un array de tareas
const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map( (tarea , i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    //unshift agrega algo al inicio de un array
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    //prompt -> muestra lo que quiero en consola
    //como esta el await , va a esperar que el usuario apriete una tecla
    //opcion -> hace referencia al atributo "name" de la const "preguntas"
    const {id} = await inquirer.prompt(preguntas);
    return id;
   
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm', //regresa un valor boleano
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar
}