console.log('Inicio de programa'); 

//callback -> funcion que se mando a otra funcion
//setTimeout es no bloqueante
setTimeout( () => {
    console.log('Primer Timeout');
},3000);

setTimeout( () => {
    console.log('Segundo Timeout');
},0);

setTimeout( () => {
    console.log('Tercer Timeout');
},0);


console.log('Fin de programa');