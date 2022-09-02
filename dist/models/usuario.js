"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Usuario = connection_1.default.define('usuario', {
    nombre: { type: sequelize_1.DataTypes.STRING },
    apellidos: { type: sequelize_1.DataTypes.STRING },
    direccion: { type: sequelize_1.DataTypes.STRING },
    telefono: { type: sequelize_1.DataTypes.STRING },
    usuario_: { type: sequelize_1.DataTypes.STRING },
    password: { type: sequelize_1.DataTypes.STRING },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    rol_idrol: { type: sequelize_1.DataTypes.INTEGER },
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map