import { DataTypes } from "sequelize";
import db from "../database/connection";

const Rol = db.define('rol', {
    nombre_rol: { type: DataTypes.STRING },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})


export default Rol;