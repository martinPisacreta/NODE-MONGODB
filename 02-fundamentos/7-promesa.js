//promesa en cadena -> no ayuda a trabajar con el callbacks hell
const empleados = [
    {	
        id: 1,
        nombre: 'fernando'
    },
    {	
        id: 2,
        nombre: 'linda'
    },
    {	
        id: 3,
        nombre: 'karen'
    }
];

const salarios = [
    {	
        id: 1,
        salario: 1000
    },
    {	
        id: 2,
        salario: 1500
    }
];


const getEmpleado = (id , callback) => {
    //resolve -> es el callback si todo anduvo ok
    //reject -> se acciona si hay un error
    return new Promise((resolve,reject) => {
        const empleado = empleados.find( (e) => e.id === id); //find es una funcion ya seteado que existe para buscar por ejemplo un objeto dentro de un array de objetos 
        (empleado)
            ? resolve(empleado)
            : reject(`No existe empleado con id ${id}`);
    });
}

const getSalario = (id , callback) => {
    //resolve -> es el callback si todo anduvo ok
    //reject -> se acciona si hay un error
    return new Promise((resolve,reject) => {
        const salario = salarios.find( (e) => e.id === id); //find es una funcion ya seteado que existe para buscar por ejemplo un objeto dentro de un array de objetos 
        (salario)
            ? resolve(salario)
            : reject(`No existe salario con id ${id}`);
    });
}


//promesas en cadena -> esto soluciona el problema de callbacks-hell
const id = 3;
let nombre;
getEmpleado(id)
    .then( empleado =>  {
        nombre = empleado.nombre;
        return getSalario(id)
    })
    .then( salario => console.log('El empleado : ' ,nombre, 'tiene un salario de :',salario.salario ))
    .catch(err => console.log(err));