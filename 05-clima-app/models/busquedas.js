const fs = require('fs');

const axios = require('axios');

class Busquedas {

        historial = []
        dbPath = './db/database.json'

        constructor() {
            this.leerDB();
        }

        //geters y seters
        get paramsMapbox() {
            return {
               
                //creo un archivo .env (un archivo de variables de entorno) 
                //pongo el token de MAPBOX_KEY para despues poder acceder desde process.env.MAPBOX_KEY
                'access_token': process.env.MAPBOX_KEY,  
                'limit':5,
                'language': 'es'
            }
        }

        get paramsWeather() {
            return {
                //lat, //la saco de aca porque la defino cuando llamo al get
                //lon, //la saco de aca porque la defino cuando llamo al get
                appid: process.env.OPENWEATHER_KEY,  
                units: 'metric',
                lang: 'es'     
            }
        }

        //primera letra de una palabra en mayuscula
        get historialCapitalizado() {
            return this.historial.map(lugar => {
                let palabras = lugar.split(' '); //divido las palabras del lugar por el caracter ' ' espacio
                palabras = palabras.map(palabra => {
                    //palabra[0].toUpperCase() -> primera letra en mayuscula
                    //palabra.substring(1) -> resto de la palabra salvo la primer letra
                                              //al no definir segundo argumento en substring , toma desde la segunda letra hasta el final
                                              //substring(inicio,[fin])
                    return palabra[0].toUpperCase() + palabra.substring(1)
                })

                return palabras.join(' '); //uno un arreglo por el caracter que defino , osea un espacio ' ' 
            })
        }

     
        //lugar es un string 
        async ciudad (lugar = '') {
            try
            {
                //peticion http
                const instance = axios.create({
                    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                    params: this.paramsMapbox
                });

                const respuesta = await instance.get();

                //en una funcion map , si despues de "=>" uso ({}) quiere decir que voy a devolver un objeto
                return respuesta.data.features.map(lugar => ({
                    id: lugar.id,
                    nombre: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1]
                }))
             
            }
            catch(error){
                return [];
            }
        }

        async climarLugar(lat,lon) {
            try{
               
                 //peticion http
                 const instance = axios.create({
                    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                    params: {   ...this.paramsWeather,lat,lon   } //esta linea quiere decir que
                    /*
                        concateno a 
                        this.paramsWeather {
                                                appid: process.env.OPENWEATHER_KEY,  
                                                units: 'metric',
                                                lang: 'es',
                                            }  -> la lat y lon
                                            
                        por ende me quedaria que 
                        params: {
                            appid: process.env.OPENWEATHER_KEY,  
                            units: 'metric',
                            lang: 'es',
                            lat,
                            lon
                        }
                    */
                });

                const respuesta = await instance.get();

              
                return {
                    des: respuesta.data.weather[0].description,
                    min: respuesta.data.main.temp_min,
                    max: respuesta.data.main.temp_max,
                    temp: respuesta.data.main.temp
                }
            }
            catch(error){
                console.log(error)
            }
        }

        //lugar es un string 
        agregarHistorial(lugar = '') {

            if(this.historial.includes(lugar.toLowerCase)){
                return;
            }

            //agrego lugar al principio del array
            this.historial.unshift(lugar.toLocaleLowerCase());

            this.guardarDB();
        }

        guardarDB() {

            //creo otra constante por si hay algo mas que grabar en this.dbPath que solo el this.historial
            const payload  = {
                historial : this.historial
            }
            fs.writeFileSync(this.dbPath,JSON.stringify(payload))
        }

        leerDB(){
            if(!fs.existsSync(this.dbPath)){ //si no existe el archivo
                return;
            }

            //{encoding: 'utf-8'} -> esto se agrega para que no retorne los datos como bytes
            const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'})

            //JSON.parse(info) -> DESERIALIZO UN STRING , ES LO OPUESTO A JSON.stringify(data)
            const data = JSON.parse(info);

            this.historial = data.historial;
            
        }
}

module.exports = Busquedas;