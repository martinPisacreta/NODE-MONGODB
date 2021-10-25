const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    //se ejecuta cuando se hace new Server
    constructor() {
         this.app = express() ;
         this.port = process.env.PORT;

         //routes
         this.path = {
             auth: '/api/auth',
             buscar: '/api/buscar',
             categorias: '/api/categorias',
             productos: '/api/productos',
             usuarios: '/api/usuarios',
         }
       
         //conexion a la base de datos
         this.conectarDB();

         //Middleware -> funciones que agregan funcionalidad 
         this.middlewares();

         //rutas de mi aplicacion
         this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    //defino las rutas
    routes(){
       
       //el primer parametro hace referencia path que voy a usar , el primer parametro seria por ejemplo -> this.authPath
       //el segundo parametro hace referencia js que va a estar relacionado a ese path , el primer parametro seria por ejemplo -> require('../routes/auth')
       this.app.use(this.path.auth,require('../routes/auth'));
       this.app.use(this.path.buscar,require('../routes/buscar'));
       this.app.use(this.path.categorias,require('../routes/categorias'));
       this.app.use(this.path.productos,require('../routes/productos'));
       this.app.use(this.path.usuarios,require('../routes/usuarios'));
       
       

       
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ',this.port)
        }) 
    }

    middlewares() {

        //cors
        this.app.use(cors());

        //Parseo y lectura del Body
        this.app.use(express.json()); //cualquier info que venga en el body de post , put o delete , la recibe por aca y la transforma en json

        //directorio publico
        this.app.use(express.static('public'));

    }

}

module.exports = Server;