//archivo inicial de node
const {crearArchivo} = require('./helpers/multiplicar')
const argv = require('./config/yargs')



console.clear();

crearArchivo(argv.base,argv.l,argv.h)
    .then(nombreArchivo => console.log(nombreArchivo,'creado'))
    .catch(err => console.log(err));


    for(let i = 0; i <= 10;i++){
     salida = `${base} x ${id} = ${base} * ${i}`   
    }