import { Sequelize } from "sequelize";

//nombre de la base de datos , usuario , contraseña
const db = new Sequelize('curso_node','sa','123456', {
    host: 'localhost', //pongo localhost porque es local , si fuera una conexion a un servidor externo , seria esa conexion
    dialect: 'mssql',
    //loggin: false
});

export default db;