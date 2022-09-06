import { DataTypes } from "sequelize";
import db from "../database/connection";

const Venta = db.define('venta', {
    total: { type: DataTypes.INTEGER },
    fecha: { type: DataTypes.TIME },
    nombre_tickets: { type: DataTypes.STRING },
    idusuario: { type: DataTypes.INTEGER }
})


export default Venta;