import { DataTypes } from "sequelize";
import db from "../database/connection";

const Precio = db.define('precio', {
    precio: {
        type: DataTypes.INTEGER
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})


export default Precio;