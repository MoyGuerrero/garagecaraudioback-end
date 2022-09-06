"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const ventaProductos = connection_1.default.define('venta_producto', {
    idventa: { type: sequelize_1.DataTypes.INTEGER },
    idproducto: { type: sequelize_1.DataTypes.INTEGER },
    cantidad: { type: sequelize_1.DataTypes.INTEGER }
});
exports.default = ventaProductos;
//# sourceMappingURL=venta_productos.js.map