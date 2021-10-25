
//instalo dotenv -> para manejar variables de entorno
require('dotenv').config()

const { leerInput , inquirerMenu , pausa, listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {
   let opt;
   console.clear();
   const busquedas = new Busquedas();

   do{
    //se puede usar await porque inquirerMenu() devuelve una promesa
    //en el cuerpo del do while primero va a esperar(await) que inquirerMenu() devuelva algo
    //inquirerMenu() -> ACA IMPRIMO EL MENU
    opt = await inquirerMenu(); 
    

    
    switch(opt) {
        case 1: 
           //Mostrar mensaje
           //espero(await) que leerInput devuelva algo para seguir
           const termino = await leerInput('Ciudad: ');
          
           //buscar el lugar
           //espero(await) que busquedas.ciudad(termino) devuelva algo para seguir
           const lugares = await busquedas.ciudad(termino);
           
           //seleccionar el lugar
           //espero(await) que listarLugares(lugares) devuelva algo para seguir
           const idSeleccionado = await listarLugares(lugares);
           if(idSeleccionado === '0') {
                continue;
           }
           
          

           const lugarSeleccionado = lugares.find(l => l.id === idSeleccionado);

            //guardar en DB
            busquedas.agregarHistorial(lugarSeleccionado.nombre);

           //clima
           const clima = await busquedas.climarLugar(lugarSeleccionado.lat,lugarSeleccionado.lng)
           
           //mostrar resultados
           console.log('\nInformacion de la ciudad\n'.green);
           console.log('Ciudad:',lugarSeleccionado.nombre.green);
           console.log('Lat:', lugarSeleccionado.lat);
           console.log('Lng:', lugarSeleccionado.lng);
           console.log('Temperatura:',clima.temp);
           console.log('Minima:',clima.min);
           console.log('Como esta el clima:',clima.des.green);
        break;
        case 2:
           busquedas.historialCapitalizado.forEach( (lugar,i) => {
               const idx = `${i + 1 }.`.green
               console.log(`${idx} ${lugar}`);
           })
        break;
    }
   
   
    //aca se va a esperar que pausa devuelva algo...
    if (opt !== 0) await pausa();
   
}while(opt !== 0)

 
}

main();