// Installed npm packages: jquery underscore request express
// jade shelljs passport http sys lodash async mocha chai sinon
// sinon-chai moment connect validator restify ejs ws co when
// helmet wrench brain mustache should backbone forever debug jsdom

/*
 
Given a list of Strings, return a Set of Sets, each of which contains all strings which are anagrams of each other. 
 
Example:
 
input = ['cats', 'redraw', 'tap', 'dog', 'pat', 'acts', 'drawer',
 'remote', 'reward', 'god']
 
Output = Set {
  Set {'cats', 'acts'},
  Set {'redraw', 'drawer', 'reward'},
  Set {'tap','pat'},
    Set {'dog','god'},
    Set {'remote'}
}

sjlavena@neginet.com



input.foreach((palabra,i) => {
  let out = [];
  out.push(palabra.split('').sort().join(''));
  
})

*/

input = ['cats', 'redraw', 'tap', 'dog', 'pat', 'acts', 'drawer',
 'remote', 'reward', 'god']
 
 const anagrama = {};

 for (let i in input) {
    
    let palabra = input[i];
 
     // ordeno la palabra alfabeticamente
     let palabraOrdenadaAlfabeticamente = palabra.split('').sort().join('')
 


     //si anagrama[palabraOrdenadaAlfabeticamente] tiene algo , inserto la palabra en anagrama[palabraOrdenadaAlfabeticamente]
     if (anagrama[palabraOrdenadaAlfabeticamente] != null) {
         anagrama[palabraOrdenadaAlfabeticamente].push(palabra);

     } 
     else { //sino... seteo en anagrama[palabraOrdenadaAlfabeticamente] la [ palabra ]
         anagrama[palabraOrdenadaAlfabeticamente] = [ palabra ];
     }
 }
 

 //salida
 for (let palabraOrdenadaAlfabeticamente in anagrama) {
     let entrada = anagrama[palabraOrdenadaAlfabeticamente];
     let separador = ",";
     let out = "";
     for (let n in entrada) {
         out += separador + ' ' +  entrada[n];
         separador = "";
     }
     console.log(palabraOrdenadaAlfabeticamente + ": " + out);
 }