import express, { Application} from "express";
import * as userRoutes from '../routes/usuario' //todo lo que exporte la ruta '../routes/usuario' , va a ser conocido como userRoutes
import cors from 'cors'
import db from "../db/connection";

class Server{

    //a diferencia de js , en ts tengo que declarar las variables aca
    private app: Application; //app es del tipo Application
    private port: string;    //app es del tipo string
    private apiPaths = {
        usuarios: '/api/usuarios'
    };

    constructor() {
        this.app = express();
        this.port =  process.env.PORT || '8000';

        //conexion a bd
        this.dbConnection();

        //middlewares
        this.middlewares();

        //definir mis turas
        this.routes();

        
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (err) {
            throw new Error(`Error en la conexion a la base de datos ${err}`);
        }
    }

    middlewares() {
        //cors
        this.app.use(cors());

        //lectura del body
        this.app.use(express.json());

        //carpeta publica
        this.app.use(express.static('public'))
    }


    routes() {
        //userRoutes.default -> en caso de exportar otraCosa  desde '../routes/usuario' , podria poner userRoutes.otraCosa
        this.app.use(this.apiPaths.usuarios,userRoutes.default);
    }
    //levanto el servidor
    listen() {
        this.app.listen(this.port, /*aca esta el callback*/ () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        } /*hasta aca*/ )
    }
}


//la linea de abajo reemplaza -> "module.exports = Server"
export default Server;