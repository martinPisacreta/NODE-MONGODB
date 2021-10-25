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
    const empleado = empleados.find( (e) => e.id === id); //find es una funcion ya seteado que existe para buscar por ejemplo un objeto dentro de un array de objetos 
    
    if(empleado) {
        callback(null,empleado); //no hay error -> aca llamo a la funcion callback y retorno (null , empleado)
    } else {
        callback(`Empleado con id ${id} no existe`); //hay error -> aca llamo a la funcion callback y retorno (`Empleado con id ${id} no existe` , undefined)
    }
}

const getSalario = (id , callback) => {
    //find es una funcion ya seteado que existe para buscar por ejemplo un objeto dentro de un array de objetos 
    //al poner "?" estoy preguntando si lo anterior al "?" devuelve algo , quiero solamente la propiedad salario 
    const salario = salarios.find( (s) => s.id === id).salario; 
    
    if(salario) {
        callback(null,salario); //no hay error -> aca llamo a la funcion callback y retorno (null , salario)
    } else {
        callback(`Salario con id ${id} no existe`); //hay error -> aca llamo a la funcion callback y retorno (`Salario con id ${id} no existe` , undefined)
    }
}

const id = 1;
getEmpleado(id, (err,empleado) => {
    if(err){
        console.log('ERROR');
        return console.log(err);
    }
    
    //justamente esto es lo que debemos evitar (callbacks hell) , ya que una funcion , podria tener adentro otra funcion y esa funcion otra y asi sucesivamente....
    getSalario(id, (err,salario) => {
        if(err){
            console.log('ERROR');
            return console.log(err);
        }
        
        console.log('Empleado: ',empleado,' Salario: ',salario);
    })
})