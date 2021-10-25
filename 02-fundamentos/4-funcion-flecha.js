//#region funcion_flecha
	//funcion commun
		function sumar(a,b) {
				return a + b;
		}
		console.log(suma(5,10)); //15
		
		function sumar(a,b = 10) {
				return a + b;
		}
		console.log(suma(5)); //15
		
		function sumar(a,b) {
				return a + b;
		}
		console.log(suma(5)); //el valor de b es undefined
	
	//aca se usa funcion de flecha 
		const sumar = (a,b) => {
			return a + b;
		}
		console.log(suma(5,10)); //15
	
		const saludar = () => 'Hola mundo';
		console.log(saludar()); // Hola mundo
	
		//si encuentro que el cuerpo de la funcion , tiene una sola linea y esa linea es "return" , se puede resumar asi
		const sumar = (a,b) => a + b;
		console.log(suma(5,10)); //15
//#end region funcion_flecha	

//#region funcion_flecha

	//funcion commun
		function sumar(a,b) {
				return a + b;
		}
		console.log(suma(5,10)); //15
		
		function sumar(a,b = 10) {
				return a + b;
		}
		console.log(suma(5)); //15
		
		function sumar(a,b) {
				return a + b;
		}
		console.log(suma(5)); //el valor de b es undefined
	
	//aca se usa funcion de flecha 
		const sumar = (a,b) => {
			return a + b;
		}
		console.log(suma(5,10)); //15
	
		const saludar = () => 'Hola mundo';
		console.log(saludar()); // Hola mundo
	
		//si encuentro que el cuerpo de la funcion , tiene una sola linea y esa linea es "return" , se puede resumar asi
		const sumar = (a,b) => a + b;
		console.log(suma(5,10)); //15
//#end region funcion_flecha	