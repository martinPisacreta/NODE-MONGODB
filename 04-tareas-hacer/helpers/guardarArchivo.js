const fs = require('fs');

const archivo = './db/data.json'

const guardarDB = (data) => {
   
    //JSON.stringify(data) -> CONVIERTE data EN UN JSON
    fs.writeFileSync(archivo,JSON.stringify(data));
}

const leerDB = () => {
    if( !fs.existsSync(archivo) ){ //si no existe el archivo
        return null;
    }

    //{encoding: 'utf-8'} -> esto se agrega para que no retorne los datos como bytes
    const info = fs.readFileSync(archivo,{encoding: 'utf-8'});

     //JSON.parse(info) -> DESERIALIZO UN STRING , ES LO OPUESTO A JSON.stringify(data)
    const data = JSON.parse(info);

    return data; //retorno un array de tareas
}

module.exports = {
    guardarDB,
    leerDB
}