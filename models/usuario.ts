import { DataTypes } from "sequelize";
import db from "../database/connection";

const Usuario = db.define('usuario', {
    nombre: { type: DataTypes.STRING },
    apellidos: { type: DataTypes.STRING },
    direccion: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    usuario_: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    rol_idrol: { type: DataTypes.INTEGER },
})


export default Usuario;