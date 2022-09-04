import { DataTypes } from "sequelize";
import db from "../database/connection";

const Producto = db.define('producto', {
    codigo: { type: DataTypes.STRING },
    nombre_producto: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER },
    talla: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
    idprecio: { type: DataTypes.STRING },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})


export default Producto;