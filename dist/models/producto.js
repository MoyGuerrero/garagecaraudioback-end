"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Producto = connection_1.default.define('producto', {
    codigo: { type: sequelize_1.DataTypes.STRING },
    nombre_producto: { type: sequelize_1.DataTypes.STRING },
    stock: { type: sequelize_1.DataTypes.INTEGER },
    talla: { type: sequelize_1.DataTypes.STRING },
    img: { type: sequelize_1.DataTypes.STRING },
    idprecio: { type: sequelize_1.DataTypes.STRING },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
exports.default = Producto;
//# sourceMappingURL=producto.js.map