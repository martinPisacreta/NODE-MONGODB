//#region desestructuracion			
	//#region desestructuracion_objeto
		const deadpool = {
			nombre: 'Wade',
			apellido: 'Winston',
			poder: 'Regeneracion',
			edad: 50,
			getNombre: function(){
				return  `${this.nombre}  ${this.apellido} ${this.poder}`
			}
		};
		console.log(deadpool.getNombre);

		//aca no uso desestructuracion
			const nombre = deadpool.nombre;
			const apellido = deadpool.apellido;
			const poder = deadpool.poder;
			console.log(nombre);
						
		//aca uso desestructuracion
			const {nombre , apellido , poder , edad = 0} = deadpool;
			console.log(nombre , edad ); 

		//aca no uso desestructuracion	
			function imprimeHeroe(heroe){
				const {nombre , apellido , poder , edad = 0} = heroe; //aca no voy a poder modificar ninguna constante -> nombre , apellido , poder , edad = 0
				console.log(nombre , edad );
			};
			imprimirHeroe(deadpool);

		//aca uso desestructuracion	
			function imprimeHeroe({nombre , apellido , poder , edad = 0}){
				nombre = 'Martin' //aca si voy a poder modificar lo que viene por parametro
				console.log(nombre , edad );
			};
			
			imprimirHeroe(deadpool);
	//#end region	desestructuracion_objeto
	
	//#region desestructuracion_arreglo
		const heroes = ['Deadpool','Superman','Batman'];
			
		//aca no uso desestructuracion		
			const h1 = heroes[0];
			console.log(h1); // muestra Deadpool
		
		//aca uso desestructuracion	
			const [h1,h2,h3] = heroes;
			console.log(h1,h2,h3); // muestra Deadpool Superman Batman
			
			const [,,h3] = heroes;
			console.log(h3); // muestra Batman
	//#end region desestructuracion_arreglo
//#end region	desestructuracion