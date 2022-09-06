import { DataTypes } from "sequelize";
import db from "../database/connection";

const ventaProductos = db.define('venta_producto', {
    idventa: { type: DataTypes.INTEGER },
    idproducto: { type: DataTypes.INTEGER },
    cantidad: { type: DataTypes.INTEGER }
})


export default ventaProductos;