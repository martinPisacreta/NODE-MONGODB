import { DataTypes, literal } from "sequelize";
import db from "../db/connection";


const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
     },
     updatedAt: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
     }
})

export default Usuario;