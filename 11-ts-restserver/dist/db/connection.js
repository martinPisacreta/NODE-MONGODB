"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//nombre de la base de datos , usuario , contraseña
const db = new sequelize_1.Sequelize('curso_node', 'sa', '123456', {
    host: 'localhost',
    dialect: 'mssql',
    //loggin: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map